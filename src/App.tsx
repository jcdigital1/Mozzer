import React, { useState, useEffect, useRef } from 'react';
import { MascotHero } from './components/MascotHero';
import { HeaderBar } from './components/HeaderBar';
import { MobileMascotBar } from './components/MobileMascotBar';
import { ChatBubble, TypingIndicator } from './components/ChatBubble';
import { ChatInputBar } from './components/ChatInputBar';
import { ChatMessage, LeadData, StepId } from './types';
import { sound } from './utils/audio';
import { getCurrentTime, formatPhoneNumber } from './utils/formatters';
import { QUICK_AREA_SUGGESTIONS, COMPANY_NAME, MASCOT_IMAGE_URL, handleMascotImgError } from './data/decorData';
import { Sparkles } from 'lucide-react';

interface StepHistorySnapshot {
  messages: ChatMessage[];
  leadData: LeadData;
  step: StepId;
  inputConfig: {
    placeholder: string;
    type: 'text' | 'phone' | 'city';
    suggestions: string[];
    disabled: boolean;
  };
}

const INITIAL_LEAD_DATA: LeadData = {
  flowType: 'budget',
  product: '',
  projectDetails: '',
  name: '',
  phone: '',
  city: '',
  serviceType: '',
  attachedImage: null,
  timestamp: '',
};

export default function App() {
  // Splash loader
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Sound enabled
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('mozzer_sound_enabled');
    return saved !== null ? saved === 'true' : true;
  });

  // Chat messages
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<StepId>('INIT');
  const [leadData, setLeadData] = useState<LeadData>(INITIAL_LEAD_DATA);

  // Mascot animations
  const [isMascotReacting, setIsMascotReacting] = useState<boolean>(false);
  const [isMascotSpeaking, setIsMascotSpeaking] = useState<boolean>(false);

  // Input bar state
  const [inputConfig, setInputConfig] = useState<{
    placeholder: string;
    type: 'text' | 'phone' | 'city';
    suggestions: string[];
    disabled: boolean;
  }>({
    placeholder: 'Aguarde...',
    type: 'text',
    suggestions: [],
    disabled: true,
  });

  // History stack for "Voltar" functionality
  const [historyStack, setHistoryStack] = useState<StepHistorySnapshot[]>([]);

  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Save sound setting
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.enabled = next;
    localStorage.setItem('mozzer_sound_enabled', String(next));
    if (next) sound.playOptionClick();
  };

  // Scroll to bottom smoothly
  const scrollToBottom = (delay = 50) => {
    setTimeout(() => {
      if (chatScrollRef.current) {
        chatScrollRef.current.scrollTo({
          top: chatScrollRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    }, delay);
  };

  // Trigger mascot reaction animation
  const triggerReaction = () => {
    setIsMascotReacting(true);
    setTimeout(() => setIsMascotReacting(false), 900);
  };

  // Helper to push history snapshot before changing state
  const pushHistory = () => {
    setHistoryStack((prev) => [
      ...prev,
      {
        messages: [...messages],
        leadData: { ...leadData },
        step: currentStep,
        inputConfig: { ...inputConfig },
      },
    ]);
  };

  // Back button handler
  const handleGoBack = () => {
    if (historyStack.length === 0) return;
    sound.playOptionClick();

    const previous = historyStack[historyStack.length - 1];
    setHistoryStack((prev) => prev.slice(0, -1));

    setMessages(previous.messages);
    setLeadData(previous.leadData);
    setCurrentStep(previous.step);
    setInputConfig(previous.inputConfig);
    scrollToBottom();
  };

  // Restart conversation
  const handleRestart = () => {
    sound.playOptionClick();
    if (window.confirm('Deseja reiniciar a conversa desde o início?')) {
      localStorage.removeItem('mozzer_decor_conversation');
      setHistoryStack([]);
      setLeadData(INITIAL_LEAD_DATA);
      startInitialConversation();
    }
  };

  // Mascot sends message with typing indicator
  const mascotSend = (
    text: string,
    options?: ChatMessage['options'],
    extra?: Partial<ChatMessage>,
    typingDuration = 750
  ) => {
    setIsTyping(true);
    setIsMascotSpeaking(true);
    scrollToBottom();

    setTimeout(() => {
      setIsTyping(false);
      setIsMascotSpeaking(false);
      sound.playIncomingMessage();

      const newMsg: ChatMessage = {
        id: 'msg-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
        sender: 'mascot',
        text,
        timestamp: getCurrentTime(),
        options,
        ...extra,
      };

      setMessages((prev) => [...prev, newMsg]);
      scrollToBottom();
    }, typingDuration);
  };

  // Add user response to chat
  const addUserMessage = (text: string, imageUrl?: string) => {
    sound.playSendMessage();
    const userMsg: ChatMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text,
      timestamp: getCurrentTime(),
      imageUrl,
    };
    setMessages((prev) => [...prev, userMsg]);
    scrollToBottom();
  };

  // Initial welcome sequence
  const startInitialConversation = () => {
    setMessages([]);
    setCurrentStep('INIT');
    setInputConfig({
      placeholder: 'Selecione uma opção acima 👆',
      type: 'text',
      suggestions: [],
      disabled: true,
    });

    // Initial greeting
    setTimeout(() => {
      mascotSend(
        'Olá! 👋 Seja muito bem-vindo à Mozzer Decor!',
        undefined,
        undefined,
        600
      );

      // Second message with initial buttons
      setTimeout(() => {
        mascotSend(
          'Eu sou o consultor virtual da Mozzer Decor. Vou te ajudar a encontrar a melhor solução para transformar seu ambiente.',
          [
            { id: 'opt_budget', label: 'Quero fazer um orçamento', badge: 'Mais rápido' },
            { id: 'opt_catalog', label: 'Quero conhecer os produtos' },
            { id: 'opt_specialist', label: 'Quero falar com um especialista' },
          ],
          undefined,
          900
        );
        setCurrentStep('MAIN_CHOICE');
      }, 1600);
    }, 400);
  };

  // Initialize on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      startInitialConversation();
    }, 1100);

    return () => clearTimeout(timer);
  }, []);

  // Handle option button clicks
  const handleOptionClick = (optionId: string, optionLabel: string) => {
    pushHistory();
    triggerReaction();
    sound.playOptionClick();
    addUserMessage(optionLabel);

    if (optionId === 'opt_budget') {
      setLeadData((prev) => ({ ...prev, flowType: 'budget' }));
      setCurrentStep('BUDGET_PRODUCT');

      setTimeout(() => {
        mascotSend('Perfeito! 😎 Vamos montar seu orçamento rapidinho.', undefined, undefined, 500);

        setTimeout(() => {
          mascotSend(
            'Qual produto você está procurando?',
            [
              { id: 'prod_laminado', label: 'Piso Laminado' },
              { id: 'prod_vinilico', label: 'Piso Vinílico', badge: 'Popular' },
              { id: 'prod_persianas', label: 'Persianas' },
              { id: 'prod_papel', label: 'Papel de Parede' },
              { id: 'prod_moveis', label: 'Móveis Planejados' },
            ],
            undefined,
            750
          );
        }, 1100);
      }, 300);
      return;
    }

    if (optionId.startsWith('prod_')) {
      const productName = optionLabel;
      setLeadData((prev) => ({ ...prev, product: productName }));
      setCurrentStep('BUDGET_DETAILS');

      setTimeout(() => {
        mascotSend(
          `Ótima escolha! O ${productName} proporciona um acabamento sofisticado e durável.\n\nAgora me diga um pouco mais sobre o seu projeto: qual ambiente e metragem estimada você pretende transformar?`,
          undefined,
          undefined,
          750
        );

        setInputConfig({
          placeholder: 'Ex: Sala e 2 quartos, aprox 45m²...',
          type: 'text',
          suggestions: QUICK_AREA_SUGGESTIONS,
          disabled: false,
        });
      }, 350);
      return;
    }

    if (optionId === 'opt_catalog') {
      setLeadData((prev) => ({ ...prev, flowType: 'catalog' }));
      setCurrentStep('CATALOG_OVERVIEW');

      setTimeout(() => {
        mascotSend(
          'Aqui está o catálogo dos nossos principais produtos e acabamentos. Você pode clicar no que mais gostar para solicitar uma cotação direta!',
          undefined,
          { type: 'product_cards' },
          800
        );
      }, 400);
      return;
    }

    if (optionId === 'opt_specialist') {
      setLeadData((prev) => ({ ...prev, flowType: 'specialist' }));
      setCurrentStep('SPECIALIST_NEED');

      setTimeout(() => {
        mascotSend(
          'Com certeza! Nossos consultores técnicos atendem com assessoria completa para arquitetos, designers e proprietários.\n\nQual o principal assunto ou projeto que você deseja discutir?',
          undefined,
          undefined,
          750
        );

        setInputConfig({
          placeholder: 'Ex: Dúvidas sobre contrapiso, prazos de entrega...',
          type: 'text',
          suggestions: [
            'Visita técnica no local',
            'Dúvida sobre piso adequado para reforma',
            'Parceria para arquitetos e decoradores',
          ],
          disabled: false,
        });
      }, 350);
      return;
    }
  };

  // Handle direct product selection from catalog cards
  const handleSelectProductFromCatalog = (productName: string) => {
    pushHistory();
    triggerReaction();
    sound.playOptionClick();
    addUserMessage(`Quero orçamento de ${productName}`);

    setLeadData((prev) => ({ ...prev, product: productName, flowType: 'budget' }));
    setCurrentStep('BUDGET_DETAILS');

    setTimeout(() => {
      mascotSend(
        `Excelente escolha! O ${productName} é um dos nossos grandes destaques.\n\nMe conte um pouco sobre o ambiente: você tem uma metragem aproximada ou ideia dos cômodos?`,
        undefined,
        undefined,
        700
      );

      setInputConfig({
        placeholder: 'Ex: Apartamento 60m², sala e quartos...',
        type: 'text',
        suggestions: QUICK_AREA_SUGGESTIONS,
        disabled: false,
      });
    }, 400);
  };

  // Handle typed messages & inputs from ChatInputBar
  const handleSendTextMessage = (text: string, imageBase64?: string) => {
    pushHistory();
    addUserMessage(text, imageBase64);

    if (imageBase64) {
      setLeadData((prev) => ({ ...prev, attachedImage: imageBase64 }));
    }

    // Step 1: Details / Area
    if (currentStep === 'BUDGET_DETAILS') {
      setLeadData((prev) => ({ ...prev, projectDetails: text }));
      setCurrentStep('BUDGET_NAME');

      setInputConfig({
        placeholder: 'Digite seu nome...',
        type: 'text',
        suggestions: [],
        disabled: false,
      });

      setTimeout(() => {
        mascotSend(
          'Anotado! Já estou montando a prévia. 😊\n\nComo posso te chamar? Digite seu nome completo ou como prefere ser chamado:',
          undefined,
          undefined,
          700
        );
      }, 400);
      return;
    }

    // Step 2: Name
    if (currentStep === 'BUDGET_NAME') {
      setLeadData((prev) => ({ ...prev, name: text }));
      setCurrentStep('BUDGET_PHONE');

      setInputConfig({
        placeholder: '(11) 99999-9999',
        type: 'phone',
        suggestions: [],
        disabled: false,
      });

      setTimeout(() => {
        mascotSend(
          `Prazer em te conhecer, ${text}! 🤝\n\nQual o seu número de WhatsApp com DDD para enviarmos a proposta formal com fotos e valores?`,
          undefined,
          undefined,
          700
        );
      }, 400);
      return;
    }

    // Step 3: Phone
    if (currentStep === 'BUDGET_PHONE') {
      setLeadData((prev) => ({ ...prev, phone: text }));
      setCurrentStep('BUDGET_CITY');

      setInputConfig({
        placeholder: 'Ex: São Paulo - Morumbi, Santo André...',
        type: 'text',
        suggestions: ['São Paulo - Capital', 'ABC Paulista', 'Campinas e Região', 'Litoral'],
        disabled: false,
      });

      setTimeout(() => {
        mascotSend(
          'Ótimo! Em qual cidade e bairro fica o imóvel? Assim calculamos a logística e equipe de instalação mais próxima:',
          undefined,
          undefined,
          700
        );
      }, 400);
      return;
    }

    // Step 4: City -> Final conversion
    if (currentStep === 'BUDGET_CITY') {
      const updatedLead = { ...leadData, city: text };
      setLeadData(updatedLead);
      setCurrentStep('BUDGET_SUMMARY');

      setInputConfig({
        placeholder: 'Atendimento concluído 🎉',
        type: 'text',
        suggestions: [],
        disabled: true,
      });

      setTimeout(() => {
        triggerReaction();
        mascotSend(
          'Perfeito! Já tenho as informações necessárias. 😊',
          undefined,
          undefined,
          600
        );

        setTimeout(() => {
          mascotSend(
            'Quer continuar seu atendimento diretamente pelo WhatsApp com nossos consultores?',
            undefined,
            { isSummary: true },
            800
          );
        }, 1200);
      }, 400);
      return;
    }

    // Specialist Need
    if (currentStep === 'SPECIALIST_NEED') {
      setLeadData((prev) => ({ ...prev, projectDetails: text }));
      setCurrentStep('SPECIALIST_NAME');

      setInputConfig({
        placeholder: 'Digite seu nome...',
        type: 'text',
        suggestions: [],
        disabled: false,
      });

      setTimeout(() => {
        mascotSend('Perfeito! Como podemos te chamar?', undefined, undefined, 600);
      }, 350);
      return;
    }

    // Specialist Name
    if (currentStep === 'SPECIALIST_NAME') {
      setLeadData((prev) => ({ ...prev, name: text }));
      setCurrentStep('SPECIALIST_PHONE');

      setInputConfig({
        placeholder: '(11) 99999-9999',
        type: 'phone',
        suggestions: [],
        disabled: false,
      });

      setTimeout(() => {
        mascotSend(
          `Ótimo, ${text}! Qual o seu WhatsApp com DDD para o especialista entrar em contato?`,
          undefined,
          undefined,
          600
        );
      }, 350);
      return;
    }

    // Specialist Phone -> Summary
    if (currentStep === 'SPECIALIST_PHONE') {
      const updatedLead = { ...leadData, phone: text };
      setLeadData(updatedLead);
      setCurrentStep('SPECIALIST_SUMMARY');

      setInputConfig({
        placeholder: 'Atendimento concluído 🎉',
        type: 'text',
        suggestions: [],
        disabled: true,
      });

      setTimeout(() => {
        triggerReaction();
        mascotSend(
          'Tudo pronto! Seu consultor exclusivo já foi notificado. 😊',
          undefined,
          undefined,
          500
        );

        setTimeout(() => {
          mascotSend(
            'Clique abaixo para abrir a conversa VIP diretamente no WhatsApp:',
            undefined,
            { isSummary: true },
            750
          );
        }, 1100);
      }, 350);
      return;
    }

    // Free text fallback if typed during other steps
    setTimeout(() => {
      mascotSend(
        'Entendi perfeitamente! Vamos dar seguimento ao seu projeto com a equipe comercial.',
        undefined,
        undefined,
        600
      );
    }, 400);
  };

  // Determine current step index and total for the progress indicator
  const getStepProgress = () => {
    switch (currentStep) {
      case 'INIT':
      case 'MAIN_CHOICE':
        return { current: 1, total: 5, title: 'Início' };
      case 'BUDGET_PRODUCT':
        return { current: 2, total: 5, title: 'Produto' };
      case 'BUDGET_DETAILS':
        return { current: 3, total: 5, title: 'Ambiente' };
      case 'BUDGET_NAME':
        return { current: 4, total: 5, title: 'Identificação' };
      case 'BUDGET_PHONE':
      case 'BUDGET_CITY':
        return { current: 5, total: 5, title: 'Localização & Contato' };
      case 'BUDGET_SUMMARY':
      case 'SPECIALIST_SUMMARY':
        return { current: 5, total: 5, title: 'Finalização' };
      default:
        return { current: 1, total: 5, title: 'Atendimento' };
    }
  };

  const progress = getStepProgress();

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center p-6 z-50">
        <div className="relative flex flex-col items-center">
          {/* Glowing pulse ring */}
          <div className="absolute w-40 h-40 bg-blue-600/30 rounded-full blur-2xl animate-pulse" />

          {/* Mascot in loader */}
          <div className="relative w-28 h-28 rounded-3xl bg-slate-900 border-2 border-blue-500/40 p-2 shadow-2xl flex items-center justify-center mb-6">
            <img
              src={MASCOT_IMAGE_URL}
              alt="Mascote Mozzer Decor"
              className="h-full w-auto object-contain drop-shadow-lg animate-bounce"
              style={{ animationDuration: '1.4s' }}
              referrerPolicy="no-referrer"
              onError={handleMascotImgError}
            />
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight font-display mb-2">
            {COMPANY_NAME}
          </h2>
          <p className="text-xs text-blue-300 font-medium mb-6 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Iniciando consultor virtual 3D...
          </p>

          <div className="w-48 bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 via-amber-400 to-blue-600 h-full rounded-full animate-pulse w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Subtle architectural interior texture overlay */}
      <div
        className="fixed inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Ambient background light gradients */}
      <div className="fixed -top-40 -left-40 w-96 h-96 bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed -bottom-40 -right-40 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container - Responsive 2-column desktop / Fullscreen mobile */}
      <main className="w-full max-w-7xl h-screen max-h-screen sm:h-[94vh] sm:max-h-[920px] sm:my-auto flex flex-col lg:flex-row bg-slate-950/70 sm:rounded-3xl sm:border sm:border-slate-800/90 sm:shadow-2xl sm:shadow-blue-950/50 backdrop-blur-xl overflow-hidden">
        {/* ========================================================= */}
        {/* DESKTOP LEFT COLUMN: 3D Mascot Interactive Showcase       */}
        {/* ========================================================= */}
        <section className="hidden lg:flex lg:w-5/12 xl:w-5/12 border-r border-slate-800/80 bg-gradient-to-b from-slate-900/95 via-slate-950 to-blue-950/30 flex-col relative">
          <MascotHero
            isReacting={isMascotReacting}
            isSpeaking={isMascotSpeaking}
            currentStepTitle={progress.title}
            activeProduct={leadData.product}
          />
        </section>

        {/* ========================================================= */}
        {/* RIGHT COLUMN (DESKTOP) / FULL SCREEN (MOBILE): Chat Flow   */}
        {/* ========================================================= */}
        <section className="flex-1 flex flex-col h-full overflow-hidden bg-slate-950/90 relative">
          {/* Top Navigation & Status Bar */}
          <HeaderBar
            currentStepIndex={progress.current}
            totalSteps={progress.total}
            stepTitle={progress.title}
            soundEnabled={soundEnabled}
            canGoBack={historyStack.length > 0}
            onToggleSound={toggleSound}
            onGoBack={handleGoBack}
            onRestart={handleRestart}
          />

          {/* Mobile Mascot Floating Banner (Compact top area) */}
          <MobileMascotBar
            isSpeaking={isMascotSpeaking}
            isReacting={isMascotReacting}
            activeProduct={leadData.product}
          />

          {/* Conversation Messages Container */}
          <div
            ref={chatScrollRef}
            className="flex-1 overflow-y-auto px-3.5 sm:px-6 py-4 space-y-2 custom-scrollbar"
          >
            {/* Conversation Date/Security Notice */}
            <div className="text-center my-2">
              <span className="inline-block text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-slate-900/90 text-slate-400 border border-slate-800 shadow-sm">
                Atendimento Oficial Criptografado Mozzer Decor
              </span>
            </div>

            {/* Render Chat Messages */}
            {messages.map((msg, index) => (
              <ChatBubble
                key={msg.id}
                message={msg}
                leadData={leadData}
                onOptionClick={handleOptionClick}
                onSelectProduct={handleSelectProductFromCatalog}
                isLastMessage={index === messages.length - 1}
              />
            ))}

            {/* Animated Typing Indicator */}
            {isTyping && <TypingIndicator />}
          </div>

          {/* WhatsApp-Inspired Bottom Input Bar */}
          <ChatInputBar
            onSendMessage={handleSendTextMessage}
            placeholder={inputConfig.placeholder}
            inputType={inputConfig.type}
            quickSuggestions={inputConfig.suggestions}
            disabled={inputConfig.disabled}
          />
        </section>
      </main>
    </div>
  );
}
