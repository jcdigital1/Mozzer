import { LeadData } from '../types';
import { WHATSAPP_PHONE } from '../data/decorData';

/**
 * Aplica máscara de telefone brasileiro: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
 */
export function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) {
    return digits.length > 0 ? `(${digits}` : '';
  }
  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

/**
 * Retorna apenas os dígitos de uma string
 */
export function cleanDigits(value: string): string {
  return value.replace(/\D/g, '');
}

/**
 * Constrói a URL do WhatsApp com mensagem codificada para o lead
 */
export function buildWhatsAppUrl(lead: LeadData): string {
  const lines: string[] = [];

  lines.push('👋 *Olá, equipe Mozzer Decor!*');
  lines.push('Vim pelo site através do consultor virtual 3D e gostaria de dar continuidade ao meu atendimento:\n');

  if (lead.flowType === 'budget') {
    lines.push('📋 *SOLICITAÇÃO DE ORÇAMENTO:*');
    if (lead.product) {
      lines.push(`• *Produto de Interesse:* ${lead.product}`);
    }
    if (lead.projectDetails) {
      lines.push(`• *Detalhes / Área:* ${lead.projectDetails}`);
    }
  } else if (lead.flowType === 'catalog') {
    lines.push('🛋️ *INTERESSE EM PRODUTOS:*');
    if (lead.product) {
      lines.push(`• *Linha Escolhida:* ${lead.product}`);
    }
    if (lead.projectDetails) {
      lines.push(`• *Observações:* ${lead.projectDetails}`);
    }
  } else {
    lines.push('⭐ *CONSULTORIA COM ESPECIALISTA:*');
    if (lead.projectDetails) {
      lines.push(`• *Assunto:* ${lead.projectDetails}`);
    }
  }

  if (lead.name) {
    lines.push(`• *Nome:* ${lead.name}`);
  }
  if (lead.phone) {
    lines.push(`• *Telefone:* ${lead.phone}`);
  }
  if (lead.city) {
    lines.push(`• *Cidade/Região:* ${lead.city}`);
  }
  if (lead.attachedImage) {
    lines.push('• *Anexo:* Tenho uma foto/planta para enviar aqui no WhatsApp');
  }

  lines.push('\nPoderiam me enviar valores, prazos e opções disponíveis? Obrigado!');

  const fullText = lines.join('\n');
  const encoded = encodeURIComponent(fullText);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;
}

export function getCurrentTime(): string {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
