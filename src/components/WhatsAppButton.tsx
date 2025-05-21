
import React, { useEffect, useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const WhatsAppButton = () => {
  const [showToast, setShowToast] = useState(false);
  const { t } = useLanguage();
  
  useEffect(() => {
    // Show toast notification after a short delay when component mounts
    const timer = setTimeout(() => {
      setShowToast(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (showToast) {
      toast({
        title: t('try_it_free'),
        description: t('get_free_demo'),
      });
      setShowToast(false);
    }
  }, [showToast, t]);
  
  const handleWhatsAppClick = () => {
    // Official WhatsApp link from the Footer component
    window.open('https://wa.link/v80yk0', '_blank', 'noopener,noreferrer');
  };
  
  return (
    <button 
      onClick={handleWhatsAppClick}
      className="fixed left-4 bottom-24 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110 focus:outline-none"
      aria-label="WhatsApp"
    >
      <MessageCircle className="w-7 h-7 fill-white stroke-white" />
    </button>
  );
};

export default WhatsAppButton;
