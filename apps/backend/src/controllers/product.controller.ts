import { Request, Response, NextFunction } from 'express';
import { productService } from '../services/product.service.js';

export class ProductController {
  /**
   * GET /api/products
   */
  async getAllProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const products = await productService.getAllProducts();
      res.status(200).json({
        success: true,
        count: products.length,
        data: products,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/products/:slug
   */
  async getProductBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const slug = String(req.params.slug);
      const product = await productService.getProductBySlug(slug);
      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/products/:slug/variants
   */
  async getProductVariants(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const slug = String(req.params.slug);
      const variants = await productService.getProductVariants(slug);
      res.status(200).json({
        success: true,
        count: variants.length,
        data: variants,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/products/:slug/emi-plans
   */
  async getProductEmiPlans(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const slug = String(req.params.slug);
      const emiPlans = await productService.getProductEmiPlans(slug);
      res.status(200).json({
        success: true,
        count: emiPlans.length,
        data: emiPlans,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const productController = new ProductController();
