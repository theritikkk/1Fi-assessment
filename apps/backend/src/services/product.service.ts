import { prisma } from '../lib/prisma.js';
import { AppError } from '../middleware/errorHandler.js';

export interface FormattedVariant {
  id: string;
  sku: string;
  colorName: string;
  colorHex: string;
  storage: string;
  mrp: number;
  price: number;
  imageUrl: string;
  galleryImages: string[];
  isDefault: boolean;
  inStock: boolean;
}

export interface FormattedEmiPlan {
  id: string;
  tenureMonths: number;
  interestRate: number;
  monthlyPayment: number;
  cashback: number;
  isRecommended: boolean;
  planType: string;
  mfReturnBenefit: string | null;
}

export interface FormattedProduct {
  id: string;
  slug: string;
  name: string;
  brand: string;
  tagline: string | null;
  description: string;
  baseMrp: number;
  basePrice: number;
  badge: string | null;
  rating: number;
  reviewCount: number;
  highlights: string[];
  variants: FormattedVariant[];
  emiPlans: FormattedEmiPlan[];
  defaultVariant?: FormattedVariant;
  startingEmi?: number;
}

export class ProductService {
  /**
   * Get all products with summary info, variants and emi plans
   */
  async getAllProducts(): Promise<FormattedProduct[]> {
    const products = await prisma.product.findMany({
      include: {
        variants: {
          orderBy: [{ isDefault: 'desc' }, { price: 'asc' }],
        },
        emiPlans: {
          orderBy: { tenureMonths: 'asc' },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    return products.map((p) => this.formatProduct(p));
  }

  /**
   * Get a single product by slug with all variants and emi plans
   */
  async getProductBySlug(slug: string): Promise<FormattedProduct> {
    if (!slug || typeof slug !== 'string') {
      throw new AppError('Product slug is required', 400);
    }

    const product = await prisma.product.findUnique({
      where: { slug: slug.toLowerCase() },
      include: {
        variants: {
          orderBy: [{ isDefault: 'desc' }, { price: 'asc' }],
        },
        emiPlans: {
          orderBy: { tenureMonths: 'asc' },
        },
      },
    });

    if (!product) {
      throw new AppError(`Product with slug '${slug}' not found`, 404);
    }

    return this.formatProduct(product);
  }

  /**
   * Get variants for a specific product
   */
  async getProductVariants(slug: string): Promise<FormattedVariant[]> {
    const product = await this.getProductBySlug(slug);
    return product.variants;
  }

  /**
   * Get EMI plans for a specific product
   */
  async getProductEmiPlans(slug: string): Promise<FormattedEmiPlan[]> {
    const product = await this.getProductBySlug(slug);
    return product.emiPlans;
  }

  /**
   * Formats database Prisma types (Decimals) into plain JSON numbers
   */
  private formatProduct(product: any): FormattedProduct {
    const variants: FormattedVariant[] = product.variants.map((v: any) => ({
      id: v.id,
      sku: v.sku,
      colorName: v.colorName,
      colorHex: v.colorHex,
      storage: v.storage,
      mrp: Number(v.mrp),
      price: Number(v.price),
      imageUrl: v.imageUrl,
      galleryImages: v.galleryImages,
      isDefault: v.isDefault,
      inStock: v.inStock,
    }));

    const emiPlans: FormattedEmiPlan[] = product.emiPlans.map((e: any) => ({
      id: e.id,
      tenureMonths: e.tenureMonths,
      interestRate: Number(e.interestRate),
      monthlyPayment: Number(e.monthlyPayment),
      cashback: Number(e.cashback),
      isRecommended: e.isRecommended,
      planType: e.planType,
      mfReturnBenefit: e.mfReturnBenefit,
    }));

    const defaultVariant = variants.find((v) => v.isDefault) || variants[0];
    const lowestEmi =
      emiPlans.length > 0
        ? Math.min(...emiPlans.map((plan) => plan.monthlyPayment))
        : undefined;

    return {
      id: product.id,
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      tagline: product.tagline,
      description: product.description,
      baseMrp: Number(product.baseMrp),
      basePrice: Number(product.basePrice),
      badge: product.badge,
      rating: product.rating ? Number(product.rating) : 4.8,
      reviewCount: product.reviewCount || 1000,
      highlights: product.highlights || [],
      variants,
      emiPlans,
      defaultVariant,
      startingEmi: lowestEmi,
    };
  }
}

export const productService = new ProductService();
