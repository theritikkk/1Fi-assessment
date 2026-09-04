import { Router } from 'express';
import { productController } from '../controllers/product.controller.js';

export const productRouter = Router();

// GET /api/products
productRouter.get('/', (req, res, next) => productController.getAllProducts(req, res, next));

// GET /api/products/:slug
productRouter.get('/:slug', (req, res, next) => productController.getProductBySlug(req, res, next));

// GET /api/products/:slug/variants
productRouter.get('/:slug/variants', (req, res, next) =>
  productController.getProductVariants(req, res, next)
);

// GET /api/products/:slug/emi-plans
productRouter.get('/:slug/emi-plans', (req, res, next) =>
  productController.getProductEmiPlans(req, res, next)
);
