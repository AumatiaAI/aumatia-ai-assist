
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { MenuIcon } from 'lucide-react';
import MobileMenu from './MobileMenu';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md' : 'bg-white/95'
        }`}
      >
        <div className={`container mx-auto px-4 flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'py-2' : 'py-4'
        }`}>
          <a href="/" className="flex items-center flex-1">
            <img 
              src="https://i.imgur.com/wR2n4Hg.png" 
              alt="Aumatia Logo" 
              className={`transition-all duration-300 ${
                isScrolled ? 'h-12 md:h-16' : 'h-16 md:h-20'
              }`}
            />
          </a>

          <nav className="hidden md:flex items-center space-x-6 ml-auto">
            <a href="/" className="text-gray-800 hover:text-primary font-medium">{t('home')}</a>
            <a href="/productos" className="text-gray-800 hover:text-primary font-medium">{t('products')}</a>
            <a href="/historias-de-exito" className="text-gray-800 hover:text-primary font-medium">{t('success_stories')}</a>
            <a href="/recursos" className="text-gray-800 hover:text-primary font-medium">{t('resources')}</a>
            <LanguageSelector />
            <Button asChild className="bg-primary hover:bg-primary/90 text-white ml-2 px-6">
              <a href="/login">{t('login')}</a>
            </Button>
          </nav>

          <div className="flex items-center md:hidden">
            <LanguageSelector />
            <button 
              className="ml-2 text-gray-800 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <MenuIcon size={24} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
};

export default Header;
