
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
