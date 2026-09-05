import React from 'react';
import { Volume2, VolumeX, RotateCcw, ArrowLeft, Shield } from 'lucide-react';
import { MASCOT_IMAGE_URL, COMPANY_NAME, handleMascotImgError } from '../data/decorData';

interface HeaderBarProps {
  currentStepIndex: number;
  totalSteps: number;
  stepTitle: string;
  soundEnabled: boolean;
  canGoBack: boolean;
  onToggleSound: () => void;
  onGoBack: () => void;
  onRestart: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  currentStepIndex,
  totalSteps,
  stepTitle,
  soundEnabled,
  canGoBack,
  onToggleSound,
  onGoBack,
  onRestart,
}) => {
  const progressPercent = Math.min(100, Math.round((currentStepIndex / totalSteps) * 100));

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 px-3.5 py-2.5 sm:px-5">
      <div className="flex items-center justify-between gap-2">
        {/* Left: Mobile mascot + Brand or Back button */}
        <div className="flex items-center gap-2.5 min-w-0">
          {canGoBack ? (
            <button
              onClick={onGoBack}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all border border-slate-700/50 flex items-center gap-1.5 text-xs font-semibold shrink-0 active:scale-95"
              title="Voltar à pergunta anterior"
            >
              <ArrowLeft className="w-4 h-4 text-blue-400" />
              <span className="hidden sm:inline">Voltar</span>
            </button>
          ) : null}

          {/* Compact Mascot Avatar (prominently shown especially on mobile) */}
          <button
            onClick={() => onRestart && onRestart()}
            type="button"
            className="relative shrink-0 flex items-center group cursor-pointer"
            title="Ver consultor oficial Mozzer Decor"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-800 p-0.5 shadow-md shadow-blue-900/40 border border-blue-400/40 overflow-hidden relative group-hover:scale-105 transition-transform">
              <img
                src={MASCOT_IMAGE_URL}
                alt="Mascote Mozzer Decor"
                className="w-full h-full object-cover object-top transform scale-125 translate-y-0.5 animate-mascot-breathe"
                referrerPolicy="no-referrer"
                onError={handleMascotImgError}
              />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900 shadow-sm animate-pulse" />
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm font-bold text-white tracking-tight truncate font-display">
                {COMPANY_NAME}
              </h2>
              <span className="hidden sm:inline-flex items-center text-[10px] font-semibold px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                <Shield className="w-2.5 h-2.5 mr-0.5 text-amber-400" />
                Oficial
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="truncate">Consultor Virtual • Online</span>
            </div>
          </div>
        </div>

        {/* Center/Right: Progress & Quick Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Progress pill */}
          {totalSteps > 1 && (
            <div className="hidden sm:flex flex-col items-end pr-2 border-r border-slate-800">
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                Etapa {currentStepIndex} de {totalSteps}
              </span>
              <span className="text-[10px] text-blue-400 truncate max-w-[120px]">
                {stepTitle}
              </span>
            </div>
          )}

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className={`p-2 rounded-xl border transition-all text-xs active:scale-95 ${
              soundEnabled
                ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700'
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-400'
            }`}
            title={soundEnabled ? 'Silenciar sons' : 'Ativar sons'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Restart button */}
          <button
            onClick={onRestart}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700/50 transition-all text-xs active:scale-95"
            title="Reiniciar atendimento"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dynamic Progress Bar */}
      {totalSteps > 1 && (
        <div className="w-full bg-slate-800/80 h-1.5 rounded-full mt-2.5 overflow-hidden border border-slate-700/30">
          <div
            className="bg-gradient-to-r from-blue-600 via-blue-500 to-amber-500 h-full rounded-full transition-all duration-500 ease-out shadow-sm shadow-blue-500/50"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}
    </header>
  );
};
