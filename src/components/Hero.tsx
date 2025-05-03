
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";

const Hero: React.FC = () => {
  // Animation on load
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <section className="gradient-primary text-white pt-24 md:pt-32">
      <div className="container mx-auto px-4 pb-20">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-3/5 mb-10 md:mb-0 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Automatiza tu negocio, <br /> sin miedo.
            </h1>
            <p className="text-xl md:text-2xl mb-8 md:pr-10 text-white/90">
              Activa en minutos un asistente de IA que responde en WhatsApp por ti.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-medium text-lg px-8">
                <a href="/DomiAI.html">Crea tu agente gratis</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white text-primary border-primary hover:bg-[#E3F2FD] font-medium text-lg px-8">
                <a href="#como-funciona">Ver cómo funciona</a>
              </Button>
            </div>
          </div>
          
          <div className="md:w-2/5 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-300">
            <div className="relative">
              <div className="phone-mockup bg-white rounded-3xl shadow-xl p-3 mx-auto md:mx-0 max-w-[280px]">
                <div className="phone-header bg-gray-100 rounded-t-xl p-2 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0"></div>
                  <div className="ml-2">
                    <div className="text-sm font-medium text-gray-800">Mi Negocio</div>
                    <div className="text-xs text-gray-500">en línea</div>
                  </div>
                </div>
                
                <div className="chat-container p-3 bg-gray-50 h-[400px] overflow-y-auto">
                  <div className="flex justify-end mb-3">
                    <div className="bg-[#dcf8c6] p-3 rounded-lg max-w-[80%] shadow-sm">
                      <p className="text-sm text-gray-800">Hola, ¿aún están abiertos hoy?</p>
                      <p className="text-xs text-gray-500 text-right mt-1">10:45 AM</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-start mb-3">
                    <div className="bg-[#f1f1f1] p-3 rounded-lg max-w-[80%] shadow-sm">
                      <p className="text-sm text-gray-800">¡Hola! Sí, estamos abiertos hasta las 8pm. ¿Te gustaría ver nuestro menú?</p>
                      <p className="text-xs text-gray-500 text-right mt-1">10:46 AM</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mb-3">
                    <div className="bg-[#dcf8c6] p-3 rounded-lg max-w-[80%] shadow-sm">
                      <p className="text-sm text-gray-800">¡Sí, por favor!</p>
                      <p className="text-xs text-gray-500 text-right mt-1">10:46 AM</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-start">
                    <div className="bg-[#f1f1f1] p-3 rounded-lg max-w-[80%] shadow-sm">
                      <p className="text-sm text-gray-800">Aquí lo tienes 👉 <span className="text-blue-600 underline">Ver menú</span></p>
                      <p className="text-xs text-gray-500 text-right mt-1">10:47 AM</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-6 -right-6 bg-white rounded-lg p-3 shadow-lg hidden md:block">
                  <div className="text-primary font-bold text-lg">24/7</div>
                  <div className="text-gray-600 text-sm">Siempre activo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
