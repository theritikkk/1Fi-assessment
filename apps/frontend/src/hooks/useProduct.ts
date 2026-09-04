import { useState, useEffect, useMemo, useCallback } from 'react';
import { Product, Variant, EmiPlan } from '../types/product.js';
import { api } from '../services/api.js';

export function useProduct(slug: string | undefined) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [selectedEmiPlan, setSelectedEmiPlan] = useState<EmiPlan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchProduct = useCallback(async () => {
    if (!slug) return;
    try {
      setLoading(true);
      setError(null);
      const data = await api.getProductBySlug(slug);
      setProduct(data);

      // Default variant
      const defaultVar =
        data.variants.find((v) => v.isDefault) || data.variants[0] || null;
      setSelectedVariant(defaultVar);

      // Default EMI plan (recommended first, or lowest tenure)
      const recommendedPlan =
        data.emiPlans.find((p) => p.isRecommended) || data.emiPlans[0] || null;
      setSelectedEmiPlan(recommendedPlan);
    } catch (err: any) {
      setError(err.message || 'Failed to load product details');
      setProduct(null);
      setSelectedVariant(null);
      setSelectedEmiPlan(null);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  // Unique colors available
  const availableColors = useMemo(() => {
    if (!product) return [];
    const map = new Map<string, { name: string; hex: string }>();
    product.variants.forEach((v) => {
      if (!map.has(v.colorName)) {
        map.set(v.colorName, { name: v.colorName, hex: v.colorHex });
      }
    });
    return Array.from(map.values());
  }, [product]);

  // Unique storage options available
  const availableStorageOptions = useMemo(() => {
    if (!product) return [];
    const set = new Set<string>();
    product.variants.forEach((v) => set.add(v.storage));
    return Array.from(set);
  }, [product]);

  // Select color and update variant
  const handleColorChange = useCallback(
    (colorName: string) => {
      if (!product || !selectedVariant) return;

      // Try to find variant with current storage + new color
      let match = product.variants.find(
        (v) => v.colorName === colorName && v.storage === selectedVariant.storage
      );

      // If that combination doesn't exist, fallback to first variant with that color
      if (!match) {
        match = product.variants.find((v) => v.colorName === colorName);
      }

      if (match) {
        setSelectedVariant(match);
      }
    },
    [product, selectedVariant]
  );

  // Select storage and update variant
  const handleStorageChange = useCallback(
    (storage: string) => {
      if (!product || !selectedVariant) return;

      // Try to find variant with current color + new storage
      let match = product.variants.find(
        (v) => v.storage === storage && v.colorName === selectedVariant.colorName
      );

      // If that combination doesn't exist, fallback to first variant with that storage
      if (!match) {
        match = product.variants.find((v) => v.storage === storage);
      }

      if (match) {
        setSelectedVariant(match);
      }
    },
    [product, selectedVariant]
  );

  return {
    product,
    loading,
    error,
    selectedVariant,
    selectedEmiPlan,
    availableColors,
    availableStorageOptions,
    isModalOpen,
    setSelectedVariant,
    setSelectedEmiPlan,
    handleColorChange,
    handleStorageChange,
    openModal: () => setIsModalOpen(true),
    closeModal: () => setIsModalOpen(false),
    refetch: fetchProduct,
  };
}
