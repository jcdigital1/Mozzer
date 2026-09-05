import React, { useState, useRef } from 'react';
import { Send, Paperclip, X, Image as ImageIcon } from 'lucide-react';
import { formatPhoneNumber } from '../utils/formatters';

interface ChatInputBarProps {
  onSendMessage: (text: string, imageBase64?: string) => void;
  placeholder?: string;
  inputType?: 'text' | 'phone' | 'city';
  quickSuggestions?: string[];
  disabled?: boolean;
}

export const ChatInputBar: React.FC<ChatInputBarProps> = ({
  onSendMessage,
  placeholder = 'Digite sua mensagem...',
  inputType = 'text',
  quickSuggestions = [],
  disabled = false,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (inputType === 'phone') {
      val = formatPhoneNumber(val);
    }
    setInputValue(val);
  };

  const handleSend = () => {
    const trimmed = inputValue.trim();
    if (!trimmed && !selectedImage) return;

    onSendMessage(trimmed || 'Foto anexada', selectedImage || undefined);
    setInputValue('');
    setSelectedImage(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit ~5MB
    if (file.size > 5 * 1024 * 1024) {
      alert('Por favor escolha uma imagem menor que 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setSelectedImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <div className="p-3 sm:p-4 bg-slate-900/95 border-t border-slate-800 backdrop-blur-md">
      {/* Quick suggestions if available */}
      {quickSuggestions.length > 0 && !disabled && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-2 no-scrollbar">
          <span className="text-[10px] uppercase font-bold text-slate-500 shrink-0">
            Sugestões:
          </span>
          {quickSuggestions.map((sug, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSendMessage(sug)}
              className="text-xs px-3 py-1 rounded-full bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white border border-slate-700 hover:border-blue-500 whitespace-nowrap transition-all duration-150 shrink-0 active:scale-95"
            >
              {sug}
            </button>
          ))}
        </div>
      )}

      {/* Preview selected image */}
      {selectedImage && (
        <div className="relative inline-block mb-2 p-1 rounded-xl bg-slate-800 border border-blue-500/40">
          <img
            src={selectedImage}
            alt="Imagem selecionada"
            className="h-16 w-16 object-cover rounded-lg"
          />
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 shadow-md"
            title="Remover anexo"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Input container */}
      <div className="flex items-center gap-2">
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Attachment button */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => fileInputRef.current?.click()}
          className={`p-2.5 rounded-2xl border transition-all shrink-0 ${
            disabled
              ? 'opacity-40 cursor-not-allowed bg-slate-800/40 border-slate-800 text-slate-500'
              : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300 hover:text-white active:scale-95'
          }`}
          title="Anexar foto do ambiente ou planta (opcional)"
        >
          <Paperclip className="w-4 h-4" />
        </button>

        {/* Text Field */}
        <div className="relative flex-1">
          <input
            type={inputType === 'phone' ? 'tel' : 'text'}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={
              disabled
                ? 'Selecione uma das opções acima 👆'
                : placeholder
            }
            className={`w-full py-3 px-4 rounded-2xl text-xs sm:text-sm transition-all outline-none ${
              disabled
                ? 'bg-slate-800/40 text-slate-500 border border-slate-800/80 cursor-not-allowed'
                : 'bg-slate-800/90 text-white border border-slate-700/80 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 placeholder:text-slate-500'
            }`}
          />
        </div>

        {/* Send button */}
        <button
          type="button"
          onClick={handleSend}
          disabled={disabled || (!inputValue.trim() && !selectedImage)}
          className={`p-3 rounded-2xl font-bold flex items-center justify-center transition-all duration-200 shrink-0 ${
            disabled || (!inputValue.trim() && !selectedImage)
              ? 'bg-slate-800 border border-slate-700/50 text-slate-600 cursor-not-allowed opacity-50'
              : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg shadow-blue-900/40 active:scale-95'
          }`}
          title="Enviar"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
