
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
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10 font-medium text-lg px-8">
                <a href="#como-funciona">Ver cómo funciona</a>
              </Button>
            </div>
          </div>
          
          <div className="md:w-2/5 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-300">
            <div className="relative">
              <img 
                src="https://i.imgur.com/1531297484001-80022131f5a1.jpg" 
                alt="Aumatia WhatsApp AI Assistant" 
                className="rounded-lg shadow-2xl mx-auto md:mx-0"
                style={{ maxWidth: "100%", height: "auto" }}
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-lg p-3 shadow-lg hidden md:block">
                <div className="text-primary font-bold text-lg">24/7</div>
                <div className="text-gray-600 text-sm">Siempre activo</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
