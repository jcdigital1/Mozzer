import React from 'react';
import { PRODUCTS_CATALOG } from '../data/decorData';
import { Layers, ShieldCheck, SunDim, Sparkles, Home, CheckCircle2, ArrowRight, Camera, Wrench, Zap } from 'lucide-react';
import { ProductInfo } from '../types';

interface ProductCatalogCardsProps {
  onSelectProduct: (productName: string) => void;
}

export const ProductCatalogCards: React.FC<ProductCatalogCardsProps> = ({ onSelectProduct }) => {
  const getProductIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers':
        return <Layers className="w-5 h-5 text-amber-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-blue-400" />;
      case 'SunDim':
        return <SunDim className="w-5 h-5 text-amber-300" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-purple-400" />;
      case 'Home':
        return <Home className="w-5 h-5 text-emerald-400" />;
      case 'Camera':
        return <Camera className="w-5 h-5 text-sky-400" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-orange-400" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-yellow-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div className="w-full my-3 space-y-3">
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-1">
        Catálogo Mozzer Decor • Escolha para cotar:
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PRODUCTS_CATALOG.map((prod: ProductInfo) => (
          <div
            key={prod.id}
            className="group relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 hover:border-blue-500/50 p-4 transition-all duration-300 hover:shadow-xl hover:shadow-blue-950/40 flex flex-col justify-between"
          >
            <div>
              {/* Header with Icon and Title */}
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-9 h-9 rounded-xl bg-slate-800/90 border border-slate-700/60 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  {getProductIcon(prod.icon)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                    {prod.name}
                  </h4>
                  <span className="text-[10px] text-amber-400 font-medium">
                    {prod.idealFor}
                  </span>
                </div>
              </div>

              {/* Tagline */}
              <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                {prod.tagline}
              </p>

              {/* Highlights */}
              <div className="space-y-1.5 mb-4">
                {prod.features.slice(0, 3).map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Select Button */}
            <button
              onClick={() => onSelectProduct(prod.name)}
              className="w-full py-2.5 px-3 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 hover:border-blue-400 text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-sm active:scale-98"
            >
              <span>Orçar {prod.name}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
