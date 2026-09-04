import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar.js';
import { CatalogPage } from './pages/CatalogPage.js';
import { ProductPage } from './pages/ProductPage.js';
import { NotFoundPage } from './pages/NotFoundPage.js';
import { ShieldCheck, Heart } from 'lucide-react';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white pb-16 sm:pb-0">
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<CatalogPage />} />
            <Route path="/products/:slug" element={<ProductPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Global Fintech Footer */}
        <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-3 md:col-span-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black text-lg">
                    1Fi
                  </div>
                  <span className="text-lg font-black text-white tracking-tight">
                    1Fi Smart EMI Platform
                  </span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed max-w-md">
                  Empowering smart consumers to acquire premium consumer tech and smartphones with zero upfront capital drain by leveraging existing mutual fund investments.
                </p>
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs pt-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>SEBI Regulated Custodians (NSDL / CDSL) • RBI Compliant NBFCs</span>
                </div>
              </div>

              <div>
                <h4 className="font-extrabold text-white uppercase tracking-wider text-xs mb-3">
                  Quick Access
                </h4>
                <ul className="space-y-2 text-xs">
                  <li>
                    <Link to="/products/iphone-17-pro" className="hover:text-emerald-400 transition-colors">
                      Apple iPhone 17 Pro
                    </Link>
                  </li>
                  <li>
                    <Link to="/products/samsung-galaxy-s24-ultra" className="hover:text-emerald-400 transition-colors">
                      Samsung Galaxy S24 Ultra
                    </Link>
                  </li>
                  <li>
                    <Link to="/products/google-pixel-9-pro" className="hover:text-emerald-400 transition-colors">
                      Google Pixel 9 Pro
                    </Link>
                  </li>
                  <li>
                    <Link to="/products/macbook-pro-14-m4" className="hover:text-emerald-400 transition-colors">
                      MacBook Pro 14" (M4)
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-extrabold text-white uppercase tracking-wider text-xs mb-3">
                  Technical Architecture
                </h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Built with React 18, TypeScript, Tailwind CSS, Express.js REST API, Prisma ORM, and PostgreSQL.
                </p>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
              <p>
                © {new Date().getFullYear()} 1Fi Technologies Private Limited. SDE Technical Assessment.
              </p>
              <div className="flex items-center gap-1 text-slate-400">
                <span>Designed & Engineered with</span>
                <Heart className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500 inline" />
                <span>for 1Fi Internship Evaluation</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
};
