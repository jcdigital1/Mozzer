export type FlowType = 'budget' | 'catalog' | 'specialist';

export type StepId =
  | 'INIT'
  | 'MAIN_CHOICE'
  | 'BUDGET_PRODUCT'
  | 'BUDGET_DETAILS'
  | 'BUDGET_NAME'
  | 'BUDGET_PHONE'
  | 'BUDGET_CITY'
  | 'BUDGET_SUMMARY'
  | 'CATALOG_OVERVIEW'
  | 'SPECIALIST_NEED'
  | 'SPECIALIST_NAME'
  | 'SPECIALIST_PHONE'
  | 'SPECIALIST_SUMMARY';

export interface MessageOption {
  id: string;
  label: string;
  icon?: string;
  badge?: string;
  actionValue?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'mascot' | 'user' | 'system';
  text: string;
  timestamp: string;
  options?: MessageOption[];
  type?: 'text' | 'options' | 'product_cards' | 'summary' | 'image';
  imageUrl?: string;
  isSummary?: boolean;
}

export interface LeadData {
  flowType: FlowType;
  product: string;
  projectDetails: string;
  name: string;
  phone: string;
  city: string;
  serviceType: string;
  attachedImage: string | null;
  timestamp: string;
}

export interface ProductInfo {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  features: string[];
  idealFor: string;
  popularFinishes: string[];
}
