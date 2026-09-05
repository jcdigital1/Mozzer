import React from 'react';
import { LeadData } from '../types';
import { buildWhatsAppUrl } from '../utils/formatters';
import { MessageSquare, Check, Sparkles, MapPin, User, Phone, Layers, FileText, Image as ImageIcon } from 'lucide-react';
import { sound } from '../utils/audio';

interface ConversionSummaryCardProps {
  lead: LeadData;
  onEditField?: (stepIndex: number) => void;
}

export const ConversionSummaryCard: React.FC<ConversionSummaryCardProps> = ({ lead }) => {
  const whatsappUrl = buildWhatsAppUrl(lead);

  const handleWhatsAppClick = () => {
    sound.playSuccess();
  };

  return (
    <div className="w-full my-4 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/95 to-blue-950/60 border-2 border-blue-500/40 p-5 sm:p-6 shadow-2xl shadow-blue-950/70 overflow-hidden relative">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/15 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white font-display">
              Resumo do seu Atendimento
            </h3>
            <p className="text-[11px] text-slate-400">
              Pronto para envio imediato à equipe comercial
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold flex items-center gap-1">
          <Check className="w-3 h-3" /> Concluído
        </span>
      </div>

      {/* Collected Data Grid */}
      <div className="space-y-2.5 mb-5 text-xs">
        {lead.product && (
          <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <Layers className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Produto Solicitado</span>
              <span className="font-semibold text-slate-100">{lead.product}</span>
            </div>
          </div>
        )}

        {lead.projectDetails && (
          <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <FileText className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Detalhes do Projeto / Metragem</span>
              <span className="font-semibold text-slate-100 leading-relaxed">{lead.projectDetails}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {lead.name && (
            <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <User className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Nome</span>
                <span className="font-semibold text-slate-100 truncate block">{lead.name}</span>
              </div>
            </div>
          )}

          {lead.phone && (
            <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <Phone className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">WhatsApp</span>
                <span className="font-semibold text-slate-100 truncate block">{lead.phone}</span>
              </div>
            </div>
          )}
        </div>

        {lead.city && (
          <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <MapPin className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Localização</span>
              <span className="font-semibold text-slate-100">{lead.city}</span>
            </div>
          </div>
        )}

        {lead.attachedImage && (
          <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <div className="flex items-center gap-2 mb-1.5">
              <ImageIcon className="w-4 h-4 text-blue-400" />
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Foto / Planta Anexada</span>
            </div>
            <img
              src={lead.attachedImage}
              alt="Anexo do projeto"
              className="w-full max-h-36 object-cover rounded-lg border border-slate-700"
            />
          </div>
        )}
      </div>

      {/* Main Conversion Button: CONTINUAR NO WHATSAPP */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWhatsAppClick}
        className="group relative w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-extrabold text-sm sm:text-base tracking-wide flex items-center justify-center gap-3 shadow-xl shadow-emerald-950/60 border border-emerald-400/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
      >
        {/* Animated pulse ring */}
        <span className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 opacity-30 group-hover:opacity-75 blur transition duration-300 pointer-events-none" />
        
        <span className="relative z-10 flex items-center gap-2.5">
          <MessageSquare className="w-5 h-5 fill-white text-emerald-600" />
          <span>CONTINUAR NO WHATSAPP</span>
        </span>
      </a>

      <p className="text-[11px] text-center text-slate-400 mt-2.5">
        ⚡ Você será redirecionado para falar com um consultor humano da Mozzer Decor.
      </p>
    </div>
  );
};
