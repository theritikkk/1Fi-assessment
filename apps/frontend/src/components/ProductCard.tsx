import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/product.js';
import { formatCurrency, calculateSavings } from '../lib/utils.js';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const defaultVar = product.defaultVariant || product.variants[0];
  const { percentage } = calculateSavings(
    defaultVar ? defaultVar.mrp : product.baseMrp,
    defaultVar ? defaultVar.price : product.basePrice
  );

  return (
    <div className="group relative bg-white rounded-3xl border border-slate-200/80 p-5 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between overflow-hidden">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          {product.badge ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              {product.badge}
            </span>
          ) : (
            <span className="text-xs font-semibold text-slate-400">
              {product.brand}
            </span>
          )}

          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            1Fi Assured
          </span>
        </div>

        {/* Product Image */}
        <Link
          to={`/products/${product.slug}`}
          className="relative block w-full aspect-square bg-slate-50 rounded-2xl p-6 mb-4 overflow-hidden group-hover:bg-emerald-50/30 transition-colors"
        >
          <img
            src={defaultVar?.imageUrl || product.variants[0]?.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain filter drop-shadow group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </Link>

        {/* Color swatches preview */}
        <div className="flex items-center gap-1.5 mb-2.5">
          {product.variants.slice(0, 4).map((v) => (
            <span
              key={v.id}
              className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-inner"
              style={{ backgroundColor: v.colorHex }}
              title={v.colorName}
            />
          ))}
          {product.variants.length > 4 && (
            <span className="text-[10px] text-slate-400 font-bold">
              +{product.variants.length - 4}
            </span>
          )}
        </div>

        {/* Title */}
        <Link to={`/products/${product.slug}`} className="block group-hover:text-emerald-700 transition-colors">
          <h3 className="text-base font-extrabold text-slate-900 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-2 mt-1 min-h-[32px]">
            {product.tagline || product.description}
          </p>
        </Link>
      </div>

      {/* Pricing & EMI CTA */}
      <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-slate-900">
                {formatCurrency(defaultVar ? defaultVar.price : product.basePrice)}
              </span>
              {(defaultVar?.mrp || product.baseMrp) > (defaultVar?.price || product.basePrice) && (
                <span className="text-xs text-slate-400 line-through">
                  {formatCurrency(defaultVar ? defaultVar.mrp : product.baseMrp)}
                </span>
              )}
            </div>
            {percentage > 0 && (
              <span className="text-[11px] font-bold text-emerald-600">
                {percentage}% Instant Savings
              </span>
            )}
          </div>

          {product.startingEmi && (
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                1Fi EMI From
              </span>
              <span className="text-sm font-extrabold text-emerald-700">
                {formatCurrency(product.startingEmi)}/mo
              </span>
            </div>
          )}
        </div>

        <Link
          to={`/products/${product.slug}`}
          className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-extrabold flex items-center justify-center gap-2 transition-all group-hover:bg-emerald-600"
        >
          <span>View EMI Plans</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
