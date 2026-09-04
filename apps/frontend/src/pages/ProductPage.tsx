import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct.js';
import { ProductGallery } from '../components/ProductGallery.js';
import { VariantSelector } from '../components/VariantSelector.js';
import { PriceDisplay } from '../components/PriceDisplay.js';
import { EmiPlanList } from '../components/EmiPlanList.js';
import { ProceedButton } from '../components/ProceedButton.js';
import { ConfirmationModal } from '../components/ConfirmationModal.js';
import { MutualFundBenefitBanner } from '../components/MutualFundBenefitBanner.js';
import { ProductDetailSkeleton } from '../components/LoadingSkeleton.js';
import { ErrorState } from '../components/ErrorState.js';
import {
  ChevronRight,
  Star,
  CheckCircle2,
  Cpu,
  Layers,
} from 'lucide-react';
import { formatNumber } from '../lib/utils.js';

export const ProductPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const {
    product,
    loading,
    error,
    selectedVariant,
    selectedEmiPlan,
    availableColors,
    availableStorageOptions,
    isModalOpen,
    setSelectedEmiPlan,
    handleColorChange,
    handleStorageChange,
    openModal,
    closeModal,
    refetch,
  } = useProduct(slug);

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (error || !product) {
    const is404 = error?.toLowerCase().includes('not found') || !product;
    return (
      <ErrorState
        isNotFound={is404}
        message={error || 'Product not found'}
        onRetry={refetch}
      />
    );
  }

  const activePrice = selectedVariant ? selectedVariant.price : product.basePrice;
  const activeMrp = selectedVariant ? selectedVariant.mrp : product.baseMrp;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
        <Link to="/" className="hover:text-emerald-700 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to="/" className="hover:text-emerald-700 transition-colors">
          Products
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-900 font-bold truncate max-w-[200px] sm:max-w-none">
          {product.name}
        </span>
      </nav>

      {/* Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* LEFT COLUMN: Product Gallery (Sticky on Desktop) */}
        <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-6">
          <ProductGallery
            variant={selectedVariant}
            productName={product.name}
            badge={product.badge}
          />

          {/* Product Highlights Card */}
          {product.highlights && product.highlights.length > 0 && (
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                <Cpu className="w-4 h-4 text-emerald-600" />
                <span>Key Hardware & Tech Highlights</span>
              </div>
              <ul className="space-y-2">
                {product.highlights.map((highlight: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Info, Pricing, Variants & EMI Plans */}
        <div className="lg:col-span-6 space-y-6">
          {/* Header info */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {product.brand}
              </span>
              <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 text-xs font-bold text-amber-900">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span className="text-slate-400 font-normal">
                  ({formatNumber(product.reviewCount)} reviews)
                </span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {product.name}
            </h1>

            {product.tagline && (
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                {product.tagline}
              </p>
            )}
          </div>

          {/* Price Box */}
          <PriceDisplay price={activePrice} mrp={activeMrp} />

          {/* Variant Selector */}
          <VariantSelector
            variants={product.variants}
            selectedVariant={selectedVariant}
            availableColors={availableColors}
            availableStorageOptions={availableStorageOptions}
            onColorChange={handleColorChange}
            onStorageChange={handleStorageChange}
          />

          {/* 1Fi Benefit Banner */}
          <MutualFundBenefitBanner />

          {/* EMI Plans Section */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-600" />
                <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-800">
                  Select EMI Tenure & Monthly Plan
                </h2>
              </div>
            </div>

            <EmiPlanList
              plans={product.emiPlans}
              selectedPlan={selectedEmiPlan}
              onSelectPlan={(plan) => setSelectedEmiPlan(plan)}
              productPrice={activePrice}
            />
          </div>

          {/* Action CTA Button */}
          <ProceedButton
            selectedPlan={selectedEmiPlan}
            selectedVariant={selectedVariant}
            onProceed={openModal}
          />
        </div>
      </div>

      {/* Checkout Review Modal */}
      {selectedVariant && selectedEmiPlan && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={closeModal}
          product={product}
          variant={selectedVariant}
          emiPlan={selectedEmiPlan}
        />
      )}
    </div>
  );
};
