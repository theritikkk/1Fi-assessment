import React from 'react';
import { formatCurrency, calculateSavings } from '../lib/utils.js';
import { Tag, Sparkles } from 'lucide-react';

interface PriceDisplayProps {
  price: number;
  mrp: number;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({ price, mrp }) => {
  const { percentage, amount } = calculateSavings(mrp, price);

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-md relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-xs font-semibold tracking-wider uppercase text-emerald-400 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Special 1Fi Member Price
          </span>
          {percentage > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-500 text-slate-950">
              <Tag className="w-3 h-3" />
              {percentage}% OFF
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-baseline gap-3">
          <span className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            {formatCurrency(price)}
          </span>
          {mrp > price && (
            <span className="text-base sm:text-lg text-slate-400 line-through font-medium">
              MRP {formatCurrency(mrp)}
            </span>
          )}
        </div>

        {amount > 0 && (
          <div className="mt-2 text-xs font-medium text-emerald-300 flex items-center gap-1.5">
            <span>🎉 Total Instant Discount:</span>
            <span className="font-bold underline decoration-emerald-400 underline-offset-2">
              {formatCurrency(amount)}
            </span>
            <span className="text-slate-400">• Inclusive of all taxes</span>
          </div>
        )}
      </div>
    </div>
  );
};
