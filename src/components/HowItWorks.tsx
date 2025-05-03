
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: 1,
    title: "Responde preguntas clave",
    description: "Sobre tu negocio y clientes.",
    delay: 0
  },
  {
    number: 2,
    title: "Creamos tu agente personalizado",
    description: "Conectado a tu WhatsApp.",
    delay: 200
  },
  {
    number: 3,
    title: "Empieza a funcionar solo",
    description: "Responde, toma pedidos, agenda.",
    delay: 400
  }
];

const HowItWorks: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const steps = document.querySelectorAll('.step-item');
            steps.forEach((step, index) => {
              setTimeout(() => {
                step.classList.add('opacity-100');
                step.classList.remove('opacity-0', 'translate-y-10');
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="como-funciona" ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
            Actívalo hoy. Empieza a vender hoy.
          </h2>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 relative">
          {/* Line connector (desktop only) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10"></div>
          
          {steps.map((step, index) => (
            <div 
              key={index}
              className="step-item flex flex-col md:items-center text-center mb-10 md:mb-0 opacity-0 translate-y-10 transition-all duration-700 md:w-1/3"
              style={{ transitionDelay: `${step.delay}ms` }}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white text-xl font-bold mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 md:max-w-xs">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg">
            <a href="/DomiAI.html">Crear mi agente ahora</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
