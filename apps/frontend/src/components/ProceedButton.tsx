import React from 'react';
import { EmiPlan, Variant } from '../types/product.js';
import { formatCurrency } from '../lib/utils.js';
import { ArrowRight, Lock, CheckCircle2 } from 'lucide-react';

interface ProceedButtonProps {
  selectedPlan: EmiPlan | null;
  selectedVariant: Variant | null;
  onProceed: () => void;
}

export const ProceedButton: React.FC<ProceedButtonProps> = ({
  selectedPlan,
  selectedVariant,
  onProceed,
}) => {
  return (
    <>
      {/* Desktop Proceed Action Box */}
      <div className="hidden sm:block p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            256-Bit Bank Grade Encryption
          </span>
          <span className="flex items-center gap-1 font-medium text-emerald-700">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Instant MF Pledge Approval
          </span>
        </div>

        <button
          type="button"
          onClick={onProceed}
          disabled={!selectedPlan || !selectedVariant}
          className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-extrabold text-base shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:shadow-emerald-600/30 transition-all duration-150 flex items-center justify-between group"
        >
          <div className="text-left leading-tight">
            <span className="block text-xs font-semibold text-emerald-200">
              {selectedPlan
                ? `${selectedPlan.tenureMonths} Months Plan Selected`
                : 'Select an EMI plan'}
            </span>
            <span className="text-base font-black">
              {selectedPlan
                ? `Proceed with ${formatCurrency(selectedPlan.monthlyPayment)}/mo`
                : 'Choose an EMI Plan to Proceed'}
            </span>
          </div>

          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
            <ArrowRight className="w-5 h-5 text-white" />
          </div>
        </button>
      </div>

      {/* Mobile Sticky Floating Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 shadow-2xl safe-area-bottom">
        <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              {selectedPlan ? `${selectedPlan.tenureMonths} Mos EMI` : 'Total Price'}
            </p>
            <p className="text-lg font-black text-slate-900 truncate">
              {selectedPlan
                ? `${formatCurrency(selectedPlan.monthlyPayment)}/mo`
                : selectedVariant
                ? formatCurrency(selectedVariant.price)
                : '—'}
            </p>
          </div>

          <button
            type="button"
            onClick={onProceed}
            disabled={!selectedPlan || !selectedVariant}
            className="flex-shrink-0 py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:bg-slate-300 text-white font-bold text-sm shadow-md shadow-emerald-600/20 flex items-center gap-2"
          >
            <span>Proceed</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
};
