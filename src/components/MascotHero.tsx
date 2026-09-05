import React from 'react';
import { MASCOT_IMAGE_URL, COMPANY_NAME, COMPANY_TAGLINE, handleMascotImgError } from '../data/decorData';
import { ShieldCheck, Sparkles, Award, Clock } from 'lucide-react';

interface MascotHeroProps {
  isReacting: boolean;
  isSpeaking: boolean;
  currentStepTitle?: string;
  activeProduct?: string;
}

export const MascotHero: React.FC<MascotHeroProps> = ({
  isReacting,
  isSpeaking,
  currentStepTitle,
  activeProduct,
}) => {
  // Dynamic speech bubble for desktop mascot
  const getMascotQuote = () => {
    if (isReacting) return 'Maravilha! Excelente escolha! ✨';
    if (isSpeaking) return 'Deixa comigo, estou preparando os detalhes... ✍️';
    if (activeProduct) return `Adoro trabalhar com ${activeProduct}! Fica espetacular.`;
    return 'Vamos transformar seu ambiente com qualidade impecável!';
  };

  return (
    <div className="relative h-full flex flex-col justify-between p-6 lg:p-8 select-none overflow-hidden">
      {/* Subtle interior design decorative background patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }} 
        />
        {/* Subtle wood / parquet grain aesthetic lines */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 via-transparent to-amber-500/10" />
      </div>

      {/* Ambient glowing orbs */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 left-1/3 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header Branding */}
      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 flex items-center justify-center shadow-lg shadow-blue-600/30 border border-blue-400/30">
            <span className="font-extrabold text-lg text-white tracking-wider font-display">M</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-tight text-white font-display">
                {COMPANY_NAME}
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Oficial
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium line-clamp-1">
              {COMPANY_TAGLINE}
            </p>
          </div>
        </div>

        {/* Online Status Pill */}
        <div className="mt-4 inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 shadow-sm backdrop-blur-md">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-xs font-semibold text-slate-200">
            Consultor Virtual Online
          </span>
          <span className="text-[11px] text-slate-400 font-normal">
            • Resposta imediata
          </span>
        </div>
      </div>

      {/* Central Mascot Presentation Area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center my-4">
        {/* Floating Mascot Quote Bubble */}
        <div 
          className={`mb-3 max-w-xs transition-all duration-300 transform ${
            isSpeaking ? 'scale-105 -translate-y-1' : ''
          }`}
        >
          <div className="relative px-4 py-2.5 rounded-2xl bg-gradient-to-br from-slate-900/95 to-slate-800/90 text-slate-100 text-xs font-medium border border-blue-500/30 shadow-xl shadow-blue-950/50 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-spin" style={{ animationDuration: '6s' }} />
              <p className="leading-snug">{getMascotQuote()}</p>
            </div>
            {/* Speech bubble pointer */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-800 rotate-45 border-r border-b border-blue-500/30" />
          </div>
        </div>

        {/* 3D Mascot Image Container */}
        <div className="relative flex flex-col items-center justify-center">
          {/* Subtle floor backlight */}
          <div className="absolute bottom-6 w-60 h-28 bg-gradient-to-t from-blue-600/30 to-transparent rounded-full blur-2xl pointer-events-none" />

          {/* Exact Mascot PNG */}
          <div
            className={`relative transition-all duration-500 ease-out ${
              isReacting
                ? 'animate-mascot-react'
                : isSpeaking
                ? 'animate-mascot-speak'
                : 'animate-mascot-float'
            }`}
          >
            <img
              src={MASCOT_IMAGE_URL}
              alt="Consultor Virtual Mozzer Decor"
              className="h-72 sm:h-80 md:h-92 lg:h-[400px] xl:h-[440px] w-auto object-contain select-none drop-shadow-[0_25px_35px_rgba(0,0,0,0.7)] animate-mascot-breathe"
              draggable={false}
              loading="eager"
              referrerPolicy="no-referrer"
              onError={handleMascotImgError}
            />
          </div>

          {/* Animated 3D Floor Shadow */}
          <div className="w-48 sm:w-56 h-7 bg-slate-950/80 rounded-[100%] blur-md animate-shadow-pulse -mt-4 border-t border-slate-800/40" />
        </div>

        {/* Active Product / Current Focus Tag */}
        {activeProduct && (
          <div className="mt-3 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold flex items-center gap-2 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Foco: {activeProduct}</span>
          </div>
        )}
      </div>

      {/* Footer Credibility Indicators */}
      <div className="relative z-10 pt-4 border-t border-slate-800/80">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col items-center">
            <Award className="w-4 h-4 text-amber-400 mb-1" />
            <span className="text-[11px] font-bold text-white">10+ Anos</span>
            <span className="text-[9px] text-slate-400 leading-tight">Tradição & Solidez</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col items-center">
            <ShieldCheck className="w-4 h-4 text-blue-400 mb-1" />
            <span className="text-[11px] font-bold text-white">Garantia</span>
            <span className="text-[9px] text-slate-400 leading-tight">Instalação Oficial</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col items-center">
            <Clock className="w-4 h-4 text-emerald-400 mb-1" />
            <span className="text-[11px] font-bold text-white">Agilidade</span>
            <span className="text-[9px] text-slate-400 leading-tight">Orçamento Rápido</span>
          </div>
        </div>
      </div>
    </div>
  );
};
