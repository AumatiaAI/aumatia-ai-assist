
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Clock, DollarSign, Rocket } from 'lucide-react';

const benefitsData = [
  {
    icon: <Clock size={48} className="text-primary" />,
    title: "Contesta como tú, 24/7",
    description: "Nunca más pierdas un cliente por no responder. Tu asistente lo hace por ti, incluso mientras duermes."
  },
  {
    icon: <DollarSign size={48} className="text-primary" />,
    title: "A precio de emprendedor",
    description: "Tecnología pro, sin cuotas altas. Ideal para negocios que están creciendo."
  },
  {
    icon: <Rocket size={48} className="text-primary" />,
    title: "Empieza hoy mismo",
    description: "Configúralo una vez y empieza a vender desde el primer día. Sin complicaciones."
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
            Automatiza hoy. Vende todos los días, sin estar conectado.
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefitsData.map((benefit, index) => (
            <div 
              key={index}
              className="benefit-card bg-white border border-gray-100 rounded-xl p-8 shadow-sm hover:shadow-md transition-all opacity-0 translate-y-10 duration-500"
            >
              <div className="mb-4 flex justify-center">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">{benefit.title}</h3>
              <p className="text-gray-600 text-center">{benefit.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg">
            <a href="/DomiAI.html">Activa tu asistente ahora</a>
          </Button>
          <p className="text-gray-500 mt-2 text-sm">Sin tarjeta. Sin compromiso.</p>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
