import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  isNotFound?: boolean;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'We encountered an error loading the product information. Please try again.',
  onRetry,
  isNotFound = false,
}) => {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-600 mx-auto flex items-center justify-center mb-6 shadow-soft">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
        {isNotFound ? 'Product Not Found' : title}
      </h2>
      <p className="text-sm text-slate-600 mb-8 max-w-md mx-auto">
        {isNotFound
          ? 'The requested product could not be found or may have been discontinued.'
          : message}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {onRetry && !isNotFound && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        )}

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all"
        >
          {isNotFound ? <Home className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>Browse All Products</span>
        </Link>
      </div>
    </div>
  );
};
