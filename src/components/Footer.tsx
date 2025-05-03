
import React from 'react';
import { Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <img 
              src="https://i.imgur.com/wR2n4Hg.png" 
              alt="Aumatia Logo" 
              className="h-8 md:h-10"
            />
            <p className="text-gray-600 mt-2">Automatiza sin miedo, crece sin límites</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <a href="/" className="text-gray-700 hover:text-primary">Home</a>
            <span className="text-gray-500 hidden md:inline">·</span>
            <a href="/productos.html" className="text-gray-700 hover:text-primary">Productos</a>
            <span className="text-gray-500 hidden md:inline">·</span>
            <a href="/historias-de-exito.html" className="text-gray-700 hover:text-primary">Historias de Éxito</a>
            <span className="text-gray-500 hidden md:inline">·</span>
            <a href="/login.html" className="text-gray-700 hover:text-primary">Login</a>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">© {new Date().getFullYear()} Aumatia. Todos los derechos reservados.</p>
          
          <div className="flex space-x-6">
            <a href="https://wa.link/v80yk0" className="text-gray-600 hover:text-primary">
              <span className="sr-only">WhatsApp</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12.031 6c-3.9 0-7.071 3.171-7.071 7.071 0 1.356.386 2.631 1.056 3.711l-.48 1.756 1.866-.478c1.018.555 2.131.83 3.34.83 3.9 0 7.071-3.171 7.071-7.071 0-3.901-3.171-7.071-7.071-7.071zm4.127 9.638c-.159.45-.687.773-.687.773-.293.1-1.807.762-2.068-.082 0 0-.319-.291-.732-.577-1.376-.95-2.289-2.264-2.356-2.368-.066-.105-.537-.673-.537-1.273s.335-.96.458-1.090c.123-.13.262-.157.349-.157.087 0 .175 0 .262.008.105.004.262-.044.412.308.158.36.528 1.252.574 1.342.047.091.078.196.016.305-.063.109-.095.175-.182.269-.087.095-.184.211-.263.283-.088.08-.187.215-.084.383.103.169.457.736.98 1.188.673.581 1.213.813 1.422.885.16.055.306.027.417-.075.14-.131.302-.345.47-.554.118-.143.27-.165.429-.101.16.065 1.082.509 1.268.602.185.93.302.138.343.214.042.076.042.438-.116.86z"></path>
              </svg>
            </a>
            
            <a href="https://www.linkedin.com/in/juancvelam/" className="text-gray-600 hover:text-primary">
              <span className="sr-only">LinkedIn</span>
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
