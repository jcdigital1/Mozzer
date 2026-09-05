import React from 'react';
import { ChatMessage } from '../types';
import { MASCOT_IMAGE_URL } from '../data/decorData';
import { CheckCheck } from 'lucide-react';
import { ProductCatalogCards } from './ProductCatalogCards';
import { ConversionSummaryCard } from './ConversionSummaryCard';
import { LeadData } from '../types';

interface ChatBubbleProps {
  message: ChatMessage;
  leadData: LeadData;
  onOptionClick?: (optionId: string, optionLabel: string) => void;
  onSelectProduct?: (productName: string) => void;
  isLastMessage?: boolean;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  leadData,
  onOptionClick,
  onSelectProduct,
  isLastMessage,
}) => {
  const isMascot = message.sender === 'mascot';

  if (isMascot) {
    return (
      <div className="flex items-start gap-2.5 sm:gap-3 max-w-full my-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
        {/* Mascot Avatar with royal blue border & status */}
        <div className="relative shrink-0 mt-0.5">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-blue-700 to-indigo-900 p-0.5 border border-blue-400/40 shadow-md shadow-blue-950/40 overflow-hidden">
            <img
              src={MASCOT_IMAGE_URL}
              alt="Consultor Mozzer Decor"
              className="w-full h-full object-cover object-top transform scale-125 translate-y-0.5"
            />
          </div>
        </div>

        {/* Message Content Container */}
        <div className="flex-1 max-w-[88%] sm:max-w-[80%] min-w-0">
          {/* Sender Title */}
          <div className="flex items-center gap-1.5 mb-1 px-1">
            <span className="text-xs font-bold text-blue-400 tracking-tight">
              Consultor Mozzer Decor
            </span>
            <span className="text-[9px] text-slate-500 font-mono">
              {message.timestamp}
            </span>
          </div>

          {/* Text Bubble */}
          <div className="rounded-2xl rounded-tl-sm bg-slate-900/90 text-slate-100 p-3.5 sm:p-4 border border-slate-800 shadow-lg shadow-black/40 backdrop-blur-sm">
            <p className="text-sm leading-relaxed whitespace-pre-line text-slate-200">
              {message.text}
            </p>

            {/* Optional Image attached inside message */}
            {message.imageUrl && (
              <div className="mt-3 rounded-xl overflow-hidden border border-slate-700">
                <img
                  src={message.imageUrl}
                  alt="Anexo de referência"
                  className="max-h-60 w-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Interactive Option Buttons if present */}
          {message.options && message.options.length > 0 && (
            <div className="mt-3 space-y-2">
              {message.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => onOptionClick && onOptionClick(opt.id, opt.label)}
                  className="w-full text-left py-3 px-4 rounded-2xl bg-gradient-to-r from-blue-900/40 via-slate-900 to-slate-900/90 hover:from-blue-600 hover:to-blue-700 border border-blue-500/30 hover:border-blue-400 text-slate-100 hover:text-white font-semibold text-xs sm:text-sm transition-all duration-200 shadow-md hover:shadow-blue-900/40 flex items-center justify-between group active:scale-[0.99]"
                >
                  <div className="flex items-center gap-2.5">
                    {opt.badge && (
                      <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                        {opt.badge}
                      </span>
                    )}
                    <span>{opt.label}</span>
                  </div>
                  <span className="text-blue-400 group-hover:text-white transform group-hover:translate-x-0.5 transition-transform text-xs font-bold">
                    →
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Product Catalog Cards if active */}
          {message.type === 'product_cards' && onSelectProduct && (
            <ProductCatalogCards onSelectProduct={onSelectProduct} />
          )}

          {/* Conversion Final Summary Card */}
          {message.isSummary && (
            <ConversionSummaryCard lead={leadData} />
          )}
        </div>
      </div>
    );
  }

  // User Message (right-aligned, WhatsApp blue style)
  return (
    <div className="flex justify-end my-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="max-w-[85%] sm:max-w-[75%]">
        <div className="rounded-2xl rounded-tr-sm bg-gradient-to-r from-blue-700 to-blue-600 text-white p-3.5 sm:p-4 shadow-lg shadow-blue-950/50 border border-blue-500/30">
          <p className="text-sm leading-relaxed whitespace-pre-line font-medium text-blue-50">
            {message.text}
          </p>

          {message.imageUrl && (
            <div className="mt-2 rounded-xl overflow-hidden border border-blue-400/30">
              <img
                src={message.imageUrl}
                alt="Foto enviada pelo usuário"
                className="max-h-52 w-full object-cover"
              />
            </div>
          )}

          <div className="flex items-center justify-end gap-1 mt-1.5 pt-1 border-t border-blue-500/30 text-[10px] text-blue-200">
            <span>{message.timestamp}</span>
            <CheckCheck className="w-3.5 h-3.5 text-blue-200 inline ml-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start gap-2.5 sm:gap-3 max-w-full my-3 animate-in fade-in duration-200">
      <div className="relative shrink-0 mt-0.5">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-blue-700 to-indigo-900 p-0.5 border border-blue-400/40 overflow-hidden">
          <img
            src={MASCOT_IMAGE_URL}
            alt="Consultor Mozzer Decor"
            className="w-full h-full object-cover object-top transform scale-125 translate-y-0.5 animate-pulse"
          />
        </div>
      </div>

      <div className="rounded-2xl rounded-tl-sm bg-slate-900/90 border border-slate-800 p-3 shadow-md">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400">
            digitando
          </span>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
};
