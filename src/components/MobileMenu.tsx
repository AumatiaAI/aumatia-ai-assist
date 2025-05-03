
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      <div className="flex justify-between items-center px-6 py-4 border-b">
        <a href="/" className="flex items-center">
          <img 
            src="https://i.imgur.com/wR2n4Hg.png" 
            alt="Aumatia Logo" 
            className="h-8"
          />
        </a>
        <button 
          className="text-gray-800 focus:outline-none"
          onClick={onClose}
        >
          <X size={24} />
        </button>
      </div>
      
      <div className="flex flex-col flex-grow px-6 py-8 space-y-6">
        <a 
          href="/" 
          className="text-xl font-medium text-gray-800"
          onClick={onClose}
        >
          Home
        </a>
        <a 
          href="/productos.html" 
          className="text-xl font-medium text-gray-800"
          onClick={onClose}
        >
          Productos
        </a>
        <a 
          href="/historias-de-exito.html" 
          className="text-xl font-medium text-gray-800"
          onClick={onClose}
        >
          Historias de Éxito
        </a>
        <a 
          href="/login.html" 
          className="text-xl font-medium text-gray-800"
          onClick={onClose}
        >
          Login
        </a>
        
        <div className="mt-auto">
          <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg">
            <a 
              href="/CrearCuenta.html"
              onClick={onClose}
            >
              Empieza gratis
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
