import React from 'react';

export const ProductDetailSkeleton: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="h-4 w-48 bg-slate-200 rounded mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left column: Gallery skeleton */}
        <div className="lg:col-span-6 space-y-4">
          <div className="w-full aspect-square bg-slate-200 rounded-3xl" />
          <div className="flex gap-3">
            <div className="w-20 h-20 bg-slate-200 rounded-2xl" />
            <div className="w-20 h-20 bg-slate-200 rounded-2xl" />
            <div className="w-20 h-20 bg-slate-200 rounded-2xl" />
          </div>
        </div>

        {/* Right column: Info & Plans skeleton */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="h-4 w-24 bg-slate-200 rounded" />
            <div className="h-8 w-3/4 bg-slate-200 rounded-lg" />
            <div className="h-4 w-1/2 bg-slate-200 rounded" />
          </div>

          <div className="h-28 bg-slate-200 rounded-2xl" />
          <div className="h-32 bg-slate-200 rounded-2xl" />
          <div className="h-48 bg-slate-200 rounded-2xl" />
          <div className="h-16 bg-slate-200 rounded-2xl" />
        </div>
      </div>
    </div>
  );
};

export const CatalogSkeleton: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse">
      <div className="h-10 w-64 bg-slate-200 rounded-lg mb-3" />
      <div className="h-5 w-96 bg-slate-200 rounded mb-8" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="bg-white p-5 rounded-3xl border border-slate-200 space-y-4">
            <div className="w-full aspect-square bg-slate-200 rounded-2xl" />
            <div className="h-5 w-3/4 bg-slate-200 rounded" />
            <div className="h-4 w-1/2 bg-slate-200 rounded" />
            <div className="h-10 bg-slate-200 rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
};
