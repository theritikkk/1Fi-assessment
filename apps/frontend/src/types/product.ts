export interface Variant {
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

export interface EmiPlan {
  id: string;
  tenureMonths: number;
  interestRate: number;
  monthlyPayment: number;
  cashback: number;
  isRecommended: boolean;
  planType: 'NO_COST' | 'LOW_COST' | 'STANDARD' | string;
  mfReturnBenefit: string | null;
}

export interface Product {
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
  variants: Variant[];
  emiPlans: EmiPlan[];
  defaultVariant?: Variant;
  startingEmi?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  error?: string;
}
