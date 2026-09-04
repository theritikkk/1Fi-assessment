import React from 'react';
import { EmiPlan } from '../types/product.js';
import { EmiPlanCard } from './EmiPlanCard.js';
import { ShieldAlert, CreditCard } from 'lucide-react';

interface EmiPlanListProps {
  plans: EmiPlan[];
  selectedPlan: EmiPlan | null;
  onSelectPlan: (plan: EmiPlan) => void;
  productPrice: number;
}

export const EmiPlanList: React.FC<EmiPlanListProps> = ({
  plans,
  selectedPlan,
  onSelectPlan,
  productPrice,
}) => {
  if (!plans || plans.length === 0) {
    return (
      <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-center gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0" />
        <p className="text-sm">No EMI plans currently available for this product.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-emerald-600" />
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-700">
            Available 1Fi EMI Plans:
          </h3>
        </div>
        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
          {plans.length} flexible tenures
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {plans.map((plan) => (
          <EmiPlanCard
            key={plan.id}
            plan={plan}
            isSelected={selectedPlan?.id === plan.id}
            onSelect={onSelectPlan}
            productPrice={productPrice}
          />
        ))}
      </div>
    </div>
  );
};
