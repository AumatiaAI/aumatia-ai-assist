
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare, Settings, Rocket, Clock, Users } from 'lucide-react';

const benefitsData = [
  {
    icon: <MessageSquare size={32} className="text-primary" />,
    title: "Contesta como tú, 24/7",
    description: "Tu asistente responde incluso cuando estás ocupado."
  },
  {
    icon: <Settings size={32} className="text-primary" />,
    title: "Sin código",
    description: "Solo responde unas preguntas y lo activamos."
  },
  {
    icon: <Rocket size={32} className="text-primary" />,
    title: "Listo en minutos",
    description: "Empieza a vender hoy mismo."
  },
  {
    icon: <Clock size={32} className="text-primary" />,
    title: "A precio de emprendedor",
    description: "Tecnología pro, sin cuotas altas."
  },
  {
    icon: <Users size={32} className="text-primary" />,
    title: "Para negocios reales",
    description: "Ideal para tiendas, restaurantes, peluquerías."
  }
];

const Benefits: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const benefits = document.querySelectorAll('.benefit-card');
            benefits.forEach((benefit, index) => {
              setTimeout(() => {
                benefit.classList.add('opacity-100');
                benefit.classList.remove('opacity-0', 'translate-y-10');
              }, index * 100);
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
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
            Lo haces una vez. Vende todos los días.
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefitsData.map((benefit, index) => (
            <div 
              key={index}
              className="benefit-card bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all opacity-0 translate-y-10 duration-500"
            >
              <div className="mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg">
            <a href="/DomiAI.html">Quiero mi asistente</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
