import React from 'react';
import { Variant } from '../types/product.js';
import { Check } from 'lucide-react';
import { formatCurrency } from '../lib/utils.js';

interface VariantSelectorProps {
  variants: Variant[];
  selectedVariant: Variant | null;
  availableColors: { name: string; hex: string }[];
  availableStorageOptions: string[];
  onColorChange: (colorName: string) => void;
  onStorageChange: (storage: string) => void;
}

export const VariantSelector: React.FC<VariantSelectorProps> = ({
  variants,
  selectedVariant,
  availableColors,
  availableStorageOptions,
  onColorChange,
  onStorageChange,
}) => {
  if (!selectedVariant) return null;

  return (
    <div className="space-y-5 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card">
      {/* 1. Color Selector */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Select Finish / Color:
          </label>
          <span className="text-sm font-bold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-full">
            {selectedVariant.colorName}
          </span>
        </div>

        <div className="flex flex-wrap gap-3">
          {availableColors.map((color) => {
            const isSelected = selectedVariant.colorName === color.name;
            return (
              <button
                key={color.name}
                type="button"
                onClick={() => onColorChange(color.name)}
                className={`group relative flex items-center gap-2.5 px-3 py-2 rounded-xl border-2 transition-all duration-150 ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-sm ring-1 ring-emerald-500'
                    : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                }`}
                aria-pressed={isSelected}
                aria-label={`Select color ${color.name}`}
              >
                <span
                  className="w-5 h-5 rounded-full border border-slate-300 shadow-inner flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: color.hex }}
                >
                  {isSelected && (
                    <Check
                      className={`w-3 h-3 ${
                        color.hex.toLowerCase() === '#f4f0ea' ||
                        color.hex.toLowerCase() === '#e2e4e5' ||
                        color.hex.toLowerCase() === '#ffffff'
                          ? 'text-slate-900'
                          : 'text-white'
                      }`}
                      strokeWidth={3}
                    />
                  )}
                </span>
                <span
                  className={`text-xs font-semibold ${
                    isSelected ? 'text-emerald-950 font-bold' : 'text-slate-700'
                  }`}
                >
                  {color.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Storage Selector */}
      {availableStorageOptions.length > 0 && (
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Select Storage Capacity:
            </label>
            <span className="text-sm font-bold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-full">
              {selectedVariant.storage}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {availableStorageOptions.map((storage) => {
              const isSelected = selectedVariant.storage === storage;

              // Find price for this storage in the current color or any variant
              const matchingVar =
                variants.find(
                  (v) =>
                    v.storage === storage &&
                    v.colorName === selectedVariant.colorName
                ) || variants.find((v) => v.storage === storage);

              return (
                <button
                  key={storage}
                  type="button"
                  onClick={() => onStorageChange(storage)}
                  className={`flex flex-col p-3 rounded-xl border-2 text-left transition-all ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-sm ring-1 ring-emerald-500'
                      : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                  }`}
                  aria-pressed={isSelected}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-sm font-extrabold ${
                        isSelected ? 'text-emerald-950' : 'text-slate-800'
                      }`}
                    >
                      {storage}
                    </span>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5" strokeWidth={3} />
                      </span>
                    )}
                  </div>
                  {matchingVar && (
                    <span className="text-xs text-slate-500 font-medium mt-1">
                      {formatCurrency(matchingVar.price)}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
