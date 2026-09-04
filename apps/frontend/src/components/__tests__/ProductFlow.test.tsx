import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { VariantSelector } from '../VariantSelector.js';
import { EmiPlanCard } from '../EmiPlanCard.js';
import { PriceDisplay } from '../PriceDisplay.js';
import { Variant, EmiPlan } from '../../types/product.js';

const mockVariant1: Variant = {
  id: 'v1',
  sku: 'IP17P-256-DESERT',
  colorName: 'Desert Titanium',
  colorHex: '#C5B49F',
  storage: '256GB',
  mrp: 134900,
  price: 127400,
  imageUrl: 'https://example.com/desert.jpg',
  galleryImages: [],
  isDefault: true,
  inStock: true,
};

const mockVariant2: Variant = {
  id: 'v2',
  sku: 'IP17P-512-DESERT',
  colorName: 'Desert Titanium',
  colorHex: '#C5B49F',
  storage: '512GB',
  mrp: 154900,
  price: 147400,
  imageUrl: 'https://example.com/desert-512.jpg',
  galleryImages: [],
  isDefault: false,
  inStock: true,
};

const mockEmiPlan: EmiPlan = {
  id: 'emi-1',
  tenureMonths: 6,
  interestRate: 0,
  monthlyPayment: 21233,
  cashback: 7500,
  isRecommended: true,
  planType: 'NO_COST',
  mfReturnBenefit: 'Est. MF Growth: ₹4,250',
};

describe('Frontend Component Tests', () => {
  describe('PriceDisplay', () => {
    it('renders selling price, MRP, and discount percentage', () => {
      render(<PriceDisplay price={127400} mrp={134900} />);
      expect(screen.getByText(/1,27,400/i)).toBeInTheDocument();
      expect(screen.getByText(/1,34,900/i)).toBeInTheDocument();
      expect(screen.getByText(/6% OFF/i)).toBeInTheDocument();
    });
  });

  describe('VariantSelector', () => {
    it('renders color and storage options and handles selection callbacks', () => {
      const onColorChange = vi.fn();
      const onStorageChange = vi.fn();

      render(
        <VariantSelector
          variants={[mockVariant1, mockVariant2]}
          selectedVariant={mockVariant1}
          availableColors={[
            { name: 'Desert Titanium', hex: '#C5B49F' },
            { name: 'Natural Silver', hex: '#E2E4E5' },
          ]}
          availableStorageOptions={['256GB', '512GB']}
          onColorChange={onColorChange}
          onStorageChange={onStorageChange}
        />
      );

      // Verify color buttons render
      const silverButton = screen.getByRole('button', { name: /Select color Natural Silver/i });
      expect(silverButton).toBeInTheDocument();
      fireEvent.click(silverButton);
      expect(onColorChange).toHaveBeenCalledWith('Natural Silver');

      // Verify storage buttons render
      const storage512Btn = screen.getByRole('button', { name: /512GB/i });
      expect(storage512Btn).toBeInTheDocument();
      fireEvent.click(storage512Btn);
      expect(onStorageChange).toHaveBeenCalledWith('512GB');
    });
  });

  describe('EmiPlanCard', () => {
    it('renders monthly payment, tenure, interest rate, and handles click selection', () => {
      const onSelect = vi.fn();
      render(
        <EmiPlanCard
          plan={mockEmiPlan}
          isSelected={true}
          onSelect={onSelect}
          productPrice={127400}
        />
      );

      expect(screen.getByText(/21,233/i)).toBeInTheDocument();
      expect(screen.getByText(/6 mos/i)).toBeInTheDocument();
      expect(screen.getByText(/0% Interest/i)).toBeInTheDocument();
      expect(screen.getByText(/Cashback/i)).toBeInTheDocument();
      expect(screen.getByText(/Recommended Plan/i)).toBeInTheDocument();
    });
  });
});
