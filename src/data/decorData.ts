import { SyntheticEvent } from 'react';
import { ProductInfo } from '../types';

/**
 * ====================================================================
 * CONFIGURAÇÃO PRINCIPAL - MOZZER DECOR
 * Altere aqui o número de WhatsApp para onde os contatos serão direcionados.
 * Formato internacional: código do país (55) + DDD + número (apenas números).
 * Exemplo: '5511999998888' (São Paulo) ou '5521999998888' (Rio)
 * ====================================================================
 */
export const WHATSAPP_PHONE = '5511999998888';

/**
 * URL Oficial do Mascote 3D fornecida pelo cliente.
 * Usamos '/mascot.png' diretamente na pasta public para garantir que carregue
 * com 100% de estabilidade na Vercel e qualquer servidor sem depender de serviços externos.
 * Mantemos o link externo como fallback automático caso necessário.
 */
export const MASCOT_IMAGE_URL = '/mascot.png';
export const MASCOT_FALLBACK_URL = 'https://i.postimg.cc/X73HKBzX/file-00000000239c81f5957793e0a895524a.png';

export const handleMascotImgError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.currentTarget;
  if (!target.src.includes('postimg.cc')) {
    target.src = MASCOT_FALLBACK_URL;
  }
};

export const COMPANY_NAME = 'MOZZER DECOR';
export const COMPANY_TAGLINE = 'Decoração, Móveis Planejados, Câmeras, Portões & Elétrica';

export const PRODUCTS_CATALOG: ProductInfo[] = [
  {
    id: 'piso-laminado',
    name: 'Piso Laminado',
    tagline: 'Conforto térmico, visual nobre de madeira e instalação rápida sem quebra-quebra.',
    icon: 'Layers',
    features: ['Instalação tipo click ágil', 'Hipoalergênico e fácil limpeza', 'Variedade de padrões amadeirados', 'Garantia contra desgaste'],
    idealFor: 'Salas, quartos e escritórios residenciais',
    popularFinishes: ['Carvalho Natural', 'Nogueira Rústica', 'Cinza Urbano', 'Ipê Real']
  },
  {
    id: 'piso-vinilico',
    name: 'Piso Vinílico',
    tagline: '100% resistente à umidade, absorção acústica superior e toque suave.',
    icon: 'ShieldCheck',
    features: ['Resistente à água e derramamentos', 'Excelente conforto acústico (sem toc-toc)', 'Anti-chamas e antiderrapante', 'Ideal com pets e crianças'],
    idealFor: 'Apartamentos inteiros, cozinhas, lavabos e áreas comerciais',
    popularFinishes: ['Cimento Queimado', 'Carvalho Europeu', 'Madeira Demolição', 'Bege Mineral']
  },
  {
    id: 'persianas',
    name: 'Persianas & Cortinas',
    tagline: 'Controle solar inteligente, privacidade sob medida e sofisticação.',
    icon: 'SunDim',
    features: ['Opções Rolô, Double Vision e Horizontal', 'Telas solares com bloqueio UV', 'Tecidos Blackout para quartos', 'Opção motorizada compatível com Alexa'],
    idealFor: 'Varandas gourmet, salas de estar, dormitórios e escritórios',
    popularFinishes: ['Rolô Screen 3%', 'Double Vision Off-White', 'Blackout Nobre', 'Alumínio Escovado']
  },
  {
    id: 'papel-de-parede',
    name: 'Papel de Parede',
    tagline: 'Transformação imediata de paredes sem sujeira com acabamentos vinílicos importados.',
    icon: 'Sparkles',
    features: ['Lavável e de alta durabilidade', 'Texturas 3D, linho e geométricos', 'Aplicação limpa em poucas horas', 'Design exclusivo e sofisticado'],
    idealFor: 'Paredes de destaque em quartos, lavabos, halls e salas',
    popularFinishes: ['Textura Linho Cru', 'Geométrico Ouro e Azul', 'Palha Natural', 'Marmorizado Luxo']
  },
  {
    id: 'moveis-planejados',
    name: 'Móveis Planejados',
    tagline: 'Aproveitamento milimétrico de cada espaço com 100% MDF e ferragens de amortecimento.',
    icon: 'Home',
    features: ['Projeto 3D personalizado', 'Corrediças telescópicas ocultas com amortecedor', 'Puxadores embutidos e perfil slim', 'Acabamento premium sem folgas'],
    idealFor: 'Cozinhas planejadas, dormitórios, closets e banheiros',
    popularFinishes: ['MDF Louro Freijó', 'Cinza Grafite Acetinado', 'Branco Supremo', 'Vidro Reflecta Fumê']
  },
  {
    id: 'instalacao-cameras',
    name: 'Instalação de Câmeras',
    tagline: 'Sistemas de segurança CFTV e Wi-Fi com monitoramento em tempo real no celular.',
    icon: 'Camera',
    features: ['Acesso e alertas no smartphone 24h', 'Câmeras Full HD com visão noturna nítida', 'Gravação segura em nuvem ou DVR/NVR', 'Instalação limpa com fiação organizada'],
    idealFor: 'Residências, condomínios, lojas e empresas',
    popularFinishes: ['Câmeras Wi-Fi Inteligentes', 'Kit CFTV 4 a 16 Câmeras', 'Câmeras 360° com Áudio', 'DVR / NVR Alta Definição']
  },
  {
    id: 'manutencao-portao',
    name: 'Manutenção de Portão Eletrônico',
    tagline: 'Conserto ágil, substituição de motores, placas centrais, controles e automação.',
    icon: 'Wrench',
    features: ['Atendimento rápido para portão travado', 'Troca e codificação de controles remotos', 'Motores rápidos turbo / industriais', 'Instalação de travas eletromagnéticas e sensores'],
    idealFor: 'Portões deslizantes, basculantes e pivotantes',
    popularFinishes: ['Motores Rápidos JetFlex / Turbo', 'Placas Centrais e Fim de Curso', 'Controles e Botoeiras Extras', 'Travas e Fotocélulas Anti-Esmagamento']
  },
  {
    id: 'eletrica',
    name: 'Serviços de Elétrica',
    tagline: 'Instalações e reparos elétricos com segurança técnica, normas ABNT e garantia.',
    icon: 'Zap',
    features: ['Instalação de quadros e disjuntores', 'Iluminação LED, perfis, spots e pendentes', 'Novos pontos de tomadas e interruptores 110V/220V', 'Revisão geral de fiação e eliminação de curtos'],
    idealFor: 'Reformas, construções e manutenções emergenciais',
    popularFinishes: ['Quadros de Distribuição (QDC)', 'Iluminação Arquitetônica LED', 'Instalação de Chuveiros e Tomadas 20A', 'Revisão Elétrica Completa']
  }
];

export const QUICK_AREA_SUGGESTIONS = [
  'Apartamento completo (~60 a 80m²)',
  'Sala e corredor (~25m²)',
  'Quarto casal + closet (~18m²)',
  'Kit de Câmeras (4 a 8 pontos)',
  'Manutenção urgente de Portão',
  'Instalação ou Revisão Elétrica',
  'Quero visita técnica para avaliar'
];
