import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, ChevronDown, Smartphone, Laptop, Sparkles } from 'lucide-react';
import { api } from '../services/api.js';
import { Product } from '../types/product.js';

export const Navbar: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    api
      .getProducts()
      .then((data) => setProducts(data))
      .catch((err) => console.error('Navbar failed to fetch products', err));
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all duration-200">
      {/* Top micro-bar for trust */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium text-emerald-400">1Fi Smart EMI:</span>
            <span className="hidden sm:inline text-slate-300">
              Zero upfront liquidation. Keep earning ~12% mutual fund returns while paying EMI.
            </span>
            <span className="sm:hidden text-slate-300">MF-backed Zero Cost EMI</span>
          </div>
          <div className="flex items-center space-x-4 text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>SEBI Regulated Partners</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
                <span className="font-black text-xl tracking-tight">1Fi</span>
              </div>
              <div>
                <span className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
                  1Fi <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Store</span>
                </span>
                <p className="text-[10px] text-slate-500 font-medium leading-none">
                  Mutual Fund Powered Gadgets
                </p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1">
              <Link
                to="/"
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  location.pathname === '/'
                    ? 'text-emerald-700 bg-emerald-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                All Products
              </Link>

              {/* Products Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
                  className="px-3.5 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
                >
                  <span>Featured Devices</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      dropdownOpen ? 'rotate-180 text-emerald-600' : 'text-slate-400'
                    }`}
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Available on 1Fi EMI
                    </div>
                    {products.map((p) => (
                      <Link
                        key={p.id}
                        to={`/products/${p.slug}`}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center px-3 py-2.5 hover:bg-slate-50 text-slate-800 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center mr-3 text-slate-500 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                          {p.slug.includes('macbook') ? (
                            <Laptop className="w-4 h-4" />
                          ) : (
                            <Smartphone className="w-4 h-4" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-900 truncate group-hover:text-emerald-700">
                            {p.name}
                          </p>
                          <p className="text-xs text-emerald-600 font-medium">
                            From ₹{p.startingEmi?.toLocaleString('en-IN') || '5,840'}/mo
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Right utility info */}
          <div className="flex items-center space-x-3">
            <div className="hidden lg:flex items-center space-x-2 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200 text-xs text-slate-700 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Up to ₹10,000 Instant Cashback</span>
            </div>

            <Link
              to="/products/iphone-17-pro"
              className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-xl shadow-sm transition-all duration-150 flex items-center gap-1.5"
            >
              <span>Explore EMI</span>
              <span className="text-emerald-200">→</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
