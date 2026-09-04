import React, { useState, useEffect } from 'react';
import { api } from '../services/api.js';
import { Product } from '../types/product.js';
import { ProductCard } from '../components/ProductCard.js';
import { CatalogSkeleton } from '../components/LoadingSkeleton.js';
import { ErrorState } from '../components/ErrorState.js';
import { MutualFundBenefitBanner } from '../components/MutualFundBenefitBanner.js';
import { Sparkles, Smartphone, Laptop, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export const CatalogPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'phones' | 'laptops'>('all');

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getProducts();
      setProducts(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch product catalog');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading) {
    return <CatalogSkeleton />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={loadProducts} />;
  }

  const filteredProducts = products.filter((p) => {
    if (categoryFilter === 'phones') return !p.slug.includes('macbook');
    if (categoryFilter === 'laptops') return p.slug.includes('macbook');
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Hero Section */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white p-8 sm:p-12 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-extrabold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            1Fi Zero-Liquidation Gadget Credit
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Upgrade Your Tech.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
              Keep Compounding.
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Get the latest flagship smartphones and laptops on flexible EMI backed by your mutual fund portfolio. 0% interest, instant cashbacks, and ₹0 foreclosure penalties.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold text-slate-300">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>No Hard Credit Card Limit Blocks</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>SEBI Regulated Pledging</span>
            </div>
          </div>
        </div>
      </div>

      {/* 1Fi Benefit Explainer Banner */}
      <MutualFundBenefitBanner />

      {/* Product Catalog Listing */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Featured Flagship Devices
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Choose your device to configure color, storage, and custom EMI plans
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 bg-slate-200/70 p-1 rounded-xl">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                categoryFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({products.length})
            </button>
            <button
              onClick={() => setCategoryFilter('phones')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                categoryFilter === 'phones'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              Smartphones
            </button>
            <button
              onClick={() => setCategoryFilter('laptops')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                categoryFilter === 'laptops'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              Laptops
            </button>
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
