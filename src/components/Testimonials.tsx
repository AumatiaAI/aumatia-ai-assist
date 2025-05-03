
import React, { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    image: "https://i.imgur.com/placeholder.svg",
    quote: "Aumatia me ahorra horas todos los días.",
    name: "Laura",
    business: "El Rincón Dulce"
  },
  {
    image: "https://i.imgur.com/placeholder.svg",
    quote: "Mis ventas aumentaron un 30% desde que activé mi asistente.",
    name: "Carlos",
    business: "Taller Mecánico Express"
  },
  {
    image: "https://i.imgur.com/placeholder.svg",
    quote: "Ahora puedo atender más clientes sin contratar personal.",
    name: "María",
    business: "Boutique Fashion"
  }
];

const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const testimonials = document.querySelectorAll('.testimonial-card');
            testimonials.forEach((testimonial, index) => {
              setTimeout(() => {
                testimonial.classList.add('opacity-100');
                testimonial.classList.remove('opacity-0', 'translate-y-10');
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
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
            Ellos ya venden sin estrés
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="testimonial-card bg-gray-50 rounded-xl p-6 opacity-0 translate-y-10 transition-all duration-700 flex flex-col items-center"
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <Avatar className="w-20 h-20 mb-4">
                <AvatarImage src={testimonial.image} alt={testimonial.name} />
                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <p className="text-lg italic mb-4 text-center">"{testimonial.quote}"</p>
              <div className="text-center">
                <span className="text-primary font-bold">{testimonial.name}</span>
                <span className="text-gray-700">, {testimonial.business}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg">
            <a href="/DomiAI.html">Quiero un asistente como este</a>
          </Button>
          <p className="text-gray-500 mt-2 text-sm">Actívalo en minutos. Sin código.</p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
