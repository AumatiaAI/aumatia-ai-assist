
import React from 'react';

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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
              </svg>
            </a>
            
            <a href="#" className="text-gray-600 hover:text-primary">
              <span className="sr-only">Instagram</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
