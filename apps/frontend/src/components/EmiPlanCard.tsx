import React from 'react';
import { EmiPlan } from '../types/product.js';
import { formatCurrency } from '../lib/utils.js';
import { CheckCircle, Sparkles, TrendingUp, Gift } from 'lucide-react';

interface EmiPlanCardProps {
  plan: EmiPlan;
  isSelected: boolean;
  onSelect: (plan: EmiPlan) => void;
  productPrice?: number;
}

export const EmiPlanCard: React.FC<EmiPlanCardProps> = ({
  plan,
  isSelected,
  onSelect,
}) => {
  const isZeroInterest = plan.interestRate === 0;
  const totalPayable = plan.monthlyPayment * plan.tenureMonths;
  const netEffectivePrice = Math.max(0, totalPayable - plan.cashback);

  return (
    <div
      onClick={() => onSelect(plan)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(plan);
        }
      }}
      className={`relative rounded-2xl p-4 sm:p-5 border-2 cursor-pointer transition-all duration-200 outline-none ${
        isSelected
          ? 'border-emerald-600 bg-emerald-50/40 shadow-selected ring-2 ring-emerald-500/20'
          : 'border-slate-200 hover:border-emerald-300 bg-white hover:bg-slate-50/70 shadow-sm'
      }`}
    >
      {/* Recommended Tag */}
      {plan.isRecommended && (
        <div className="absolute -top-3 left-4 z-10">
          <span className="inline-flex items-center gap-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[11px] font-extrabold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-sm">
            <Sparkles className="w-3 h-3 text-amber-300" />
            Recommended Plan
          </span>
        </div>
      )}

      <div className="flex items-start justify-between gap-3">
        {/* Left: Monthly amount & Tenure */}
        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {formatCurrency(plan.monthlyPayment)}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              / month × {plan.tenureMonths} mos
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            {/* Interest Badge */}
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                isZeroInterest
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {isZeroInterest ? '0% Interest (No Cost)' : `${plan.interestRate}% Interest p.a.`}
            </span>

            {/* Cashback Badge */}
            {plan.cashback > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                <Gift className="w-3 h-3 text-amber-600" />
                Cashback {formatCurrency(plan.cashback)}
              </span>
            )}
          </div>
        </div>

        {/* Right: Selection Radio Icon */}
        <div className="flex-shrink-0 pt-1">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
              isSelected
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'border-2 border-slate-300 bg-white text-transparent'
            }`}
          >
            <CheckCircle className="w-4 h-4 fill-current" />
          </div>
        </div>
      </div>

      {/* Bottom info: MF Returns & Effective price */}
      <div className="mt-3 pt-3 border-t border-slate-100/90 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
        <div className="flex items-center gap-1 font-medium text-emerald-800">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
          <span>{plan.mfReturnBenefit || 'Keep compounding your mutual funds'}</span>
        </div>

        <div className="text-right">
          <span className="text-slate-500">Effective Total: </span>
          <span className="font-extrabold text-slate-900">
            {formatCurrency(netEffectivePrice)}
          </span>
        </div>
      </div>
    </div>
  );
};
