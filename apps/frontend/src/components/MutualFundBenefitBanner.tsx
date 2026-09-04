import React from 'react';
import { TrendingUp, CheckCircle2, Percent, Sparkles } from 'lucide-react';

export const MutualFundBenefitBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 text-white p-5 rounded-2xl border border-emerald-500/30 shadow-lg relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-extrabold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
            The 1Fi Mutual Fund Advantage
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-3.5">
          Don’t liquidate your investments! Pledge your existing mutual funds to get instant zero-cost EMI while your portfolio continues to earn market returns.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
          <div className="flex items-start gap-2 bg-white/5 border border-white/10 p-2.5 rounded-xl backdrop-blur-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="text-[11px] leading-tight">
              <span className="font-bold text-white block">Keep Compounding</span>
              <span className="text-slate-400">Earn ~12% p.a. on pledged funds</span>
            </div>
          </div>

          <div className="flex items-start gap-2 bg-white/5 border border-white/10 p-2.5 rounded-xl backdrop-blur-sm">
            <Percent className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="text-[11px] leading-tight">
              <span className="font-bold text-white block">0% Interest Plans</span>
              <span className="text-slate-400">Up to ₹10,000 instant cashback</span>
            </div>
          </div>

          <div className="flex items-start gap-2 bg-white/5 border border-white/10 p-2.5 rounded-xl backdrop-blur-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="text-[11px] leading-tight">
              <span className="font-bold text-white block">Zero Foreclosure</span>
              <span className="text-slate-400">Preclose anytime at ₹0 fees</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
