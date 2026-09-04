import React, { useState, useEffect } from 'react';
import { Product, Variant, EmiPlan } from '../types/product.js';
import { formatCurrency, calculateSavings } from '../lib/utils.js';
import {
  X,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  Gift,
  ArrowRight,
  Calendar,
} from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  variant: Variant;
  emiPlan: EmiPlan;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  product,
  variant,
  emiPlan,
}) => {
  const [step, setStep] = useState<'review' | 'success'>('review');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep('review');
      setIsSubmitting(false);
      // Disable body scrolling when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const totalPayable = emiPlan.monthlyPayment * emiPlan.tenureMonths;
  const netEffectivePrice = Math.max(0, totalPayable - emiPlan.cashback);
  const { percentage: discountPct } = calculateSavings(variant.mrp, variant.price);

  const handleSimulateSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('success');
    }, 1000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1 text-xs font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              1Fi Verified Checkout
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            {step === 'review' ? 'Review & Confirm EMI Plan' : '🎉 EMI Approved!'}
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            {step === 'review'
              ? 'Zero upfront liquidation with 1Fi Mutual Fund-backed EMI'
              : 'Your mutual fund pledge is verified. Your order is confirmed!'}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {step === 'review' ? (
            <>
              {/* Product item summary card */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="w-16 h-16 rounded-xl bg-white border border-slate-200 p-2 flex items-center justify-center flex-shrink-0">
                  <img
                    src={variant.imageUrl}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                    {product.brand}
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 truncate">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-600 font-medium">
                    <span className="flex items-center gap-1">
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-slate-300 inline-block"
                        style={{ backgroundColor: variant.colorHex }}
                      />
                      {variant.colorName}
                    </span>
                    <span>•</span>
                    <span className="bg-slate-200 px-1.5 py-0.2 rounded font-bold text-slate-800">
                      {variant.storage}
                    </span>
                    {discountPct > 0 && (
                      <span className="text-emerald-600 font-bold">
                        ({discountPct}% off)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Selected Plan Details Table */}
              <div className="rounded-2xl border border-slate-200 overflow-hidden text-sm">
                <div className="bg-emerald-50/80 px-4 py-2.5 border-b border-emerald-100 flex items-center justify-between text-xs font-bold text-emerald-900">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                    Selected 1Fi EMI Plan Breakdown
                  </span>
                  <span className="uppercase tracking-wider font-extrabold text-emerald-700">
                    {emiPlan.tenureMonths} Months Tenure
                  </span>
                </div>

                <div className="divide-y divide-slate-100 bg-white">
                  <div className="px-4 py-2.5 flex justify-between">
                    <span className="text-slate-600">Product Price (MRP)</span>
                    <span className="font-semibold text-slate-800 line-through">
                      {formatCurrency(variant.mrp)}
                    </span>
                  </div>
                  <div className="px-4 py-2.5 flex justify-between bg-slate-50/50">
                    <span className="text-slate-600">Special Offer Price</span>
                    <span className="font-bold text-slate-900">
                      {formatCurrency(variant.price)}
                    </span>
                  </div>
                  <div className="px-4 py-2.5 flex justify-between text-emerald-800">
                    <span className="font-medium">Interest Rate</span>
                    <span className="font-extrabold bg-emerald-100 px-2 py-0.5 rounded text-xs">
                      {emiPlan.interestRate === 0
                        ? '0% Interest (No Cost)'
                        : `${emiPlan.interestRate}% p.a.`}
                    </span>
                  </div>
                  <div className="px-4 py-2.5 flex justify-between bg-slate-50/50">
                    <span className="text-slate-600">Monthly Installment</span>
                    <span className="font-extrabold text-slate-900 text-base">
                      {formatCurrency(emiPlan.monthlyPayment)} / month
                    </span>
                  </div>
                  {emiPlan.cashback > 0 && (
                    <div className="px-4 py-2.5 flex justify-between text-amber-900 bg-amber-50/50">
                      <span className="font-medium flex items-center gap-1">
                        <Gift className="w-3.5 h-3.5 text-amber-600" />
                        Guaranteed Cashback
                      </span>
                      <span className="font-bold text-amber-700">
                        - {formatCurrency(emiPlan.cashback)}
                      </span>
                    </div>
                  )}
                  <div className="px-4 py-3 flex justify-between bg-emerald-500/10 font-bold text-slate-900">
                    <div>
                      <span>Net Effective Total Cost</span>
                      <p className="text-[11px] font-normal text-slate-500">
                        After cashback adjustment
                      </p>
                    </div>
                    <span className="text-lg font-black text-emerald-800">
                      {formatCurrency(netEffectivePrice)}
                    </span>
                  </div>
                </div>
              </div>

              {/* 1Fi Mutual Fund Pledge info */}
              <div className="p-3.5 rounded-xl bg-slate-900 text-white text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>1Fi Mutual Fund Guarantee</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  {emiPlan.mfReturnBenefit ||
                    'Your pledged mutual fund units will continue compounding and generating dividends during your loan tenure.'}
                </p>
              </div>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-1/3 py-3 px-4 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors"
                >
                  Back to Product
                </button>
                <button
                  type="button"
                  onClick={handleSimulateSubmit}
                  disabled={isSubmitting}
                  className="w-full sm:w-2/3 py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Verifying MF Portfolio...</span>
                    </div>
                  ) : (
                    <>
                      <span>Complete 1Fi Order</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            /* Success screen */
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Congratulations on your new {product.name}!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto mt-1.5">
                  Your 1Fi Mutual Fund-backed EMI plan of{' '}
                  <strong className="text-emerald-700">
                    {formatCurrency(emiPlan.monthlyPayment)} / month for {emiPlan.tenureMonths} months
                  </strong>{' '}
                  has been approved.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-slate-500">Order Reference:</span>
                  <span className="font-mono font-bold text-slate-800">
                    1FI-ORD-{Math.floor(100000 + Math.random() * 900000)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Device:</span>
                  <span className="font-bold text-slate-800">
                    {variant.colorName} ({variant.storage})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">1st EMI Due Date:</span>
                  <span className="font-bold text-slate-800">5th of Next Month</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-bold pt-1 border-t border-slate-200">
                  <span>Cashback Status:</span>
                  <span>{formatCurrency(emiPlan.cashback)} Credited on Delivery</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="py-3 px-8 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all inline-flex items-center gap-2"
              >
                <span>Continue Shopping</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
