
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { MenuIcon } from 'lucide-react';
import MobileMenu from './MobileMenu';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center">
            <img 
              src="https://i.imgur.com/wR2n4Hg.png" 
              alt="Aumatia Logo" 
              className="h-12 md:h-16"
            />
          </a>

          <nav className="hidden md:flex items-center space-x-6 ml-auto">
            <a href="/" className="text-gray-800 hover:text-primary font-medium">Home</a>
            <a href="/productos.html" className="text-gray-800 hover:text-primary font-medium">Productos</a>
            <a href="/historias-de-exito.html" className="text-gray-800 hover:text-primary font-medium">Historias de Éxito</a>
            <a href="/recursos.html" className="text-gray-800 hover:text-primary font-medium">Recursos</a>
            <Button asChild className="bg-primary hover:bg-primary/90 text-white ml-2 px-6">
              <a href="/login.html">Login</a>
            </Button>
          </nav>

          <button 
            className="md:hidden text-gray-800 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <MenuIcon size={24} />
          </button>
        </div>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
};

export default Header;
