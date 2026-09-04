import React, { useState, useEffect } from 'react';
import { Variant } from '../types/product.js';
import { ShieldCheck, Truck, RotateCcw, Sparkles } from 'lucide-react';

interface ProductGalleryProps {
  variant: Variant | null;
  productName: string;
  badge?: string | null;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  variant,
  productName,
  badge,
}) => {
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    if (variant) {
      setActiveImage(variant.imageUrl);
    }
  }, [variant]);

  if (!variant) return null;

  const images = variant.galleryImages && variant.galleryImages.length > 0
    ? variant.galleryImages
    : [variant.imageUrl];

  return (
    <div className="flex flex-col space-y-4">
      {/* Main Image Container */}
      <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square bg-gradient-to-b from-slate-100/80 via-white to-slate-50 rounded-3xl border border-slate-200/80 p-8 flex items-center justify-center overflow-hidden group shadow-soft">
        {/* Badge */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
          {badge && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-emerald-600 text-white shadow-sm shadow-emerald-600/20">
              <Sparkles className="w-3 h-3 text-emerald-200" />
              {badge}
            </span>
          )}
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/90 backdrop-blur-sm text-slate-700 border border-slate-200 shadow-sm">
            <span
              className="w-2.5 h-2.5 rounded-full border border-slate-300 inline-block"
              style={{ backgroundColor: variant.colorHex }}
            />
            {variant.colorName} • {variant.storage}
          </span>
        </div>

        {/* Mutual Fund Protected Watermark Tag */}
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            1Fi Assured
          </span>
        </div>

        {/* Product Image */}
        <img
          src={activeImage}
          alt={`${productName} - ${variant.colorName}`}
          className="max-h-full max-w-full object-contain filter drop-shadow-xl group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="eager"
        />
      </div>

      {/* Thumbnails Gallery */}
      {images.length > 1 && (
        <div className="flex items-center space-x-3 overflow-x-auto pb-1">
          {images.map((imgUrl, index) => {
            const isSelected = activeImage === imgUrl;
            return (
              <button
                key={index}
                onClick={() => setActiveImage(imgUrl)}
                className={`relative flex-shrink-0 w-20 h-20 rounded-2xl bg-white border-2 p-2 flex items-center justify-center transition-all ${
                  isSelected
                    ? 'border-emerald-600 shadow-md ring-2 ring-emerald-600/20'
                    : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
                }`}
                aria-label={`View image ${index + 1}`}
              >
                <img
                  src={imgUrl}
                  alt={`${productName} thumbnail ${index + 1}`}
                  className="max-h-full max-w-full object-contain"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Feature Micro-Badges under gallery */}
      <div className="grid grid-cols-3 gap-2 pt-2">
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200/70 text-slate-700">
          <Truck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <div className="text-[11px] leading-tight">
            <p className="font-bold text-slate-900">Free Express</p>
            <p className="text-slate-500">2-Day Delivery</p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200/70 text-slate-700">
          <RotateCcw className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <div className="text-[11px] leading-tight">
            <p className="font-bold text-slate-900">7-Day Return</p>
            <p className="text-slate-500">Hassle-free</p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200/70 text-slate-700">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <div className="text-[11px] leading-tight">
            <p className="font-bold text-slate-900">1-Yr Warranty</p>
            <p className="text-slate-500">Brand Official</p>
          </div>
        </div>
      </div>
    </div>
  );
};
