
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'es' | 'en' | 'pt';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  // Header
  'home': {
    'es': 'Home',
    'en': 'Home',
    'pt': 'Início'
  },
  'products': {
    'es': 'Productos',
    'en': 'Products',
    'pt': 'Produtos'
  },
  'success_stories': {
    'es': 'Historias de Éxito',
    'en': 'Success Stories',
    'pt': 'Histórias de Sucesso'
  },
  'resources': {
    'es': 'Recursos',
    'en': 'Resources',
    'pt': 'Recursos'
  },
  'login': {
    'es': 'Login',
    'en': 'Login',
    'pt': 'Login'
  },
  
  // Success Stories Page
  'success_stories_title': {
    'es': 'Historias de Éxito',
    'en': 'Success Stories',
    'pt': 'Histórias de Sucesso'
  },
  'success_stories_subtitle': {
    'es': 'Descubre cómo negocios reales están automatizando su atención y aumentando ventas con nuestros agentes de IA.',
    'en': 'Discover how real businesses are automating their customer service and increasing sales with our AI agents.',
    'pt': 'Descubra como empresas reais estão automatizando seu atendimento e aumentando vendas com nossos agentes de IA.'
  },
  'ready_for_success': {
    'es': '¿Listo para ser nuestra próxima historia de éxito?',
    'en': 'Ready to be our next success story?',
    'pt': 'Pronto para ser nossa próxima história de sucesso?'
  },
  'automate_business': {
    'es': 'Automatiza tu negocio hoy',
    'en': 'Automate your business today',
    'pt': 'Automatize seu negócio hoje'
  },
  
  // Resources Page
  'custom_agent_title': {
    'es': '¿Quieres un agente personalizado que automatice tu negocio?',
    'en': 'Want a custom agent to automate your business?',
    'pt': 'Quer um agente personalizado para automatizar seu negócio?'
  },
  'get_your_agent_now': {
    'es': 'Adquiere tu agente ahora',
    'en': 'Get your agent now',
    'pt': 'Obtenha seu agente agora'
  },
  'free_resources_title': {
    'es': 'Recursos gratuitos para automatizar tu negocio',
    'en': 'Free resources to automate your business',
    'pt': 'Recursos gratuitos para automatizar seu negócio'
  },
  'free_resources_subtitle': {
    'es': 'Descarga agentes listos para usar y comienza hoy mismo.',
    'en': 'Download ready-to-use agents and start today.',
    'pt': 'Baixe agentes prontos para uso e comece hoje mesmo.'
  },
  'domiai_description': {
    'es': 'Agente para responder mensajes, automatizar órdenes y tareas operativas en restaurantes.',
    'en': 'Agent for responding to messages, automating orders, and operational tasks in restaurants.',
    'pt': 'Agente para responder mensagens, automatizar pedidos e tarefas operacionais em restaurantes.'
  },
  'ventaai_description': {
    'es': 'Asistente de ventas para tiendas online, responde consultas y asesora a clientes.',
    'en': 'Sales assistant for online stores, answers queries and advises customers.',
    'pt': 'Assistente de vendas para lojas online, responde a consultas e aconselha clientes.'
  },
  'soporteai_description': {
    'es': 'Chatbot especializado en soporte técnico y solución de problemas comunes.',
    'en': 'Chatbot specialized in technical support and solving common problems.',
    'pt': 'Chatbot especializado em suporte técnico e solução de problemas comuns.'
  },
  'reservaai_description': {
    'es': 'Sistema automatizado para gestión de reservas en hoteles y restaurantes.',
    'en': 'Automated system for managing reservations in hotels and restaurants.',
    'pt': 'Sistema automatizado para gerenciamento de reservas em hotéis e restaurantes.'
  },
  'download_free': {
    'es': '⬇️ Descarga GRATIS',
    'en': '⬇️ Download FREE',
    'pt': '⬇️ Baixe GRÁTIS'
  },
  'newsletter_title': {
    'es': 'Recibe lo último en automatización e inteligencia artificial',
    'en': 'Get the latest in automation and artificial intelligence',
    'pt': 'Receba as últimas novidades em automação e inteligência artificial'
  },
  'newsletter_subtitle': {
    'es': 'Te enviaremos cada semana ideas, herramientas y agentes gratuitos.',
    'en': "We'll send you ideas, tools, and free agents every week.",
    'pt': 'Enviaremos ideias, ferramentas e agentes gratuitos todas as semanas.'
  },
  'email': {
    'es': 'Correo electrónico',
    'en': 'Email',
    'pt': 'Email'
  },
  'enter_email': {
    'es': 'Ingresa tu correo',
    'en': 'Enter your email',
    'pt': 'Digite seu email'
  },
  'accept_communications': {
    'es': 'Acepto recibir comunicaciones de Aumatia',
    'en': 'I agree to receive communications from Aumatia',
    'pt': 'Concordo em receber comunicações da Aumatia'
  },
  'subscribe': {
    'es': 'Suscribirme',
    'en': 'Subscribe',
    'pt': 'Inscrever-me'
  },
  'looking_for_more': {
    'es': '¿Buscas algo más avanzado?',
    'en': 'Looking for something more advanced?',
    'pt': 'Procurando algo mais avançado?'
  },
  'buy_custom_agent': {
    'es': 'Compra tu agente personalizado',
    'en': 'Buy your custom agent',
    'pt': 'Compre seu agente personalizado'
  },
  // Form validation and notifications
  'error': {
    'es': 'Error',
    'en': 'Error',
    'pt': 'Erro'
  },
  'success': {
    'es': 'Éxito',
    'en': 'Success',
    'pt': 'Sucesso'
  },
  'email_required': {
    'es': 'Por favor ingresa tu correo electrónico',
    'en': 'Please enter your email',
    'pt': 'Por favor, digite seu email'
  },
  'accept_terms': {
    'es': 'Debes aceptar los términos para continuar',
    'en': 'You must accept the terms to continue',
    'pt': 'Você deve aceitar os termos para continuar'
  },
  'newsletter_success': {
    'es': '¡Te has suscrito correctamente a nuestro newsletter!',
    'en': 'You have successfully subscribed to our newsletter!',
    'pt': 'Você se inscreveu com sucesso em nossa newsletter!'
  },
  'downloading': {
    'es': 'Descargando',
    'en': 'Downloading',
    'pt': 'Baixando'
  },
  'download_started': {
    'es': 'comenzó a descargarse',
    'en': 'download started',
    'pt': 'download iniciado'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string): string => {
    if (!translations[key as keyof typeof translations]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    
    return translations[key as keyof typeof translations][language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
