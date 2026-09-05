import React, { useState } from 'react';
import { MASCOT_IMAGE_URL, handleMascotImgError } from '../data/decorData';
import { Sparkles, ChevronUp, ChevronDown } from 'lucide-react';

interface MobileMascotBarProps {
  isSpeaking: boolean;
  isReacting: boolean;
  activeProduct?: string;
}

export const MobileMascotBar: React.FC<MobileMascotBarProps> = ({
  isSpeaking,
  isReacting,
  activeProduct,
}) => {
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  const getMascotMessage = () => {
    if (isReacting) return 'Maravilha! Excelente escolha! ✨';
    if (isSpeaking) return 'Preparando sua resposta com carinho... ✍️';
    if (activeProduct) return `Excelente escolha com ${activeProduct}!`;
    return 'Vamos encontrar o piso ou acabamento ideal para o seu espaço!';
  };

  return (
    <div className="lg:hidden w-full px-3 py-1.5 bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border-b border-slate-800/80 shadow-sm relative z-30 transition-all duration-200">
      <div className="flex items-center justify-between gap-2.5">
        {/* Mascot & Bubble */}
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          {/* Floating Mascot Image */}
          <div
            className={`relative shrink-0 transition-transform duration-300 ${
              isReacting
                ? 'scale-110 -translate-y-1'
                : isSpeaking
                ? 'scale-105'
                : 'animate-mascot-float'
            }`}
          >
            <div className="w-12 h-14 relative flex items-center justify-center">
              <img
                src={MASCOT_IMAGE_URL}
                alt="Consultor Mozzer Decor"
                className="max-h-full w-auto object-contain drop-shadow-md animate-mascot-breathe"
                referrerPolicy="no-referrer"
                onError={handleMascotImgError}
              />
            </div>
          </div>

          {/* Compact Speech Message or Tagline */}
          <div className="min-w-0 flex-1">
            {!isMinimized ? (
              <div className="relative p-2 rounded-xl bg-slate-800/90 border border-blue-500/30 text-[11px] leading-tight text-slate-200 shadow-sm flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                <span className="truncate block font-medium">
                  {getMascotMessage()}
                </span>
              </div>
            ) : (
              <div className="text-[11px] text-slate-400 font-medium truncate">
                Consultor Mozzer Decor • Online
              </div>
            )}
          </div>
        </div>

        {/* Toggle Minimize Button */}
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="p-1 rounded-lg bg-slate-800/70 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700/40 shrink-0 text-xs"
          title={isMinimized ? 'Expandir consultor' : 'Minimizar'}
        >
          {isMinimized ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};
