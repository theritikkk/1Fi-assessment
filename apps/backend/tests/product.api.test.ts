import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../src/app.js';
import { prisma } from '../src/lib/prisma.js';

describe('1Fi Assessment Backend API Tests', () => {
  beforeAll(async () => {
    // Ensure DB connection is active
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('GET /health', () => {
    it('should return 200 and status ok', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
      expect(res.body.service).toBe('1Fi Assessment API');
      expect(res.body).toHaveProperty('uptime');
    });
  });

  describe('GET /api/products', () => {
    it('should return list of all products with variants and emi plans', async () => {
      const res = await request(app).get('/api/products');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThanOrEqual(3);

      const firstProduct = res.body.data[0];
      expect(firstProduct).toHaveProperty('id');
      expect(firstProduct).toHaveProperty('slug');
      expect(firstProduct).toHaveProperty('name');
      expect(firstProduct).toHaveProperty('basePrice');
      expect(firstProduct).toHaveProperty('baseMrp');
      expect(firstProduct).toHaveProperty('variants');
      expect(firstProduct).toHaveProperty('emiPlans');
      expect(firstProduct.variants.length).toBeGreaterThanOrEqual(2);
      expect(firstProduct.emiPlans.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('GET /api/products/:slug', () => {
    it('should return full details for Apple iPhone 17 Pro', async () => {
      const res = await request(app).get('/api/products/iphone-17-pro');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.slug).toBe('iphone-17-pro');
      expect(res.body.data.name).toContain('iPhone');
      expect(res.body.data.variants.length).toBeGreaterThanOrEqual(3);
      expect(res.body.data.emiPlans.length).toBeGreaterThanOrEqual(3);

      // Verify variant structure
      const variant = res.body.data.variants[0];
      expect(variant).toHaveProperty('colorName');
      expect(variant).toHaveProperty('colorHex');
      expect(variant).toHaveProperty('storage');
      expect(variant).toHaveProperty('imageUrl');
      expect(typeof variant.price).toBe('number');
      expect(typeof variant.mrp).toBe('number');

      // Verify EMI plan structure
      const emiPlan = res.body.data.emiPlans[0];
      expect(emiPlan).toHaveProperty('tenureMonths');
      expect(emiPlan).toHaveProperty('interestRate');
      expect(emiPlan).toHaveProperty('monthlyPayment');
      expect(typeof emiPlan.monthlyPayment).toBe('number');
    });

    it('should return full details for Samsung Galaxy S24 Ultra', async () => {
      const res = await request(app).get('/api/products/samsung-galaxy-s24-ultra');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.slug).toBe('samsung-galaxy-s24-ultra');
      expect(res.body.data.variants.length).toBeGreaterThanOrEqual(2);
    });

    it('should return full details for Google Pixel 9 Pro', async () => {
      const res = await request(app).get('/api/products/google-pixel-9-pro');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.slug).toBe('google-pixel-9-pro');
      expect(res.body.data.variants.length).toBeGreaterThanOrEqual(2);
    });

    it('should return 404 for non-existent product slug', async () => {
      const res = await request(app).get('/api/products/non-existent-phone-xyz');
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('not found');
    });
  });

  describe('GET /api/products/:slug/variants', () => {
    it('should return only variants for a given slug', async () => {
      const res = await request(app).get('/api/products/iphone-17-pro/variants');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('GET /api/products/:slug/emi-plans', () => {
    it('should return only EMI plans for a given slug', async () => {
      const res = await request(app).get('/api/products/iphone-17-pro/emi-plans');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThanOrEqual(3);
    });
  });
});
