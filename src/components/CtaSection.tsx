
import React from 'react';
import { Button } from "@/components/ui/button";

const CtaSection: React.FC = () => {
  return (
    <section className="py-20 bg-secondary text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
          ¿Listo para automatizar tu negocio sin complicaciones?
        </h2>
        
        <div className="mb-6">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg">
            <a href="/CrearCuenta.html">Activa tu asistente gratis</a>
          </Button>
        </div>
        
        <p className="text-white/80 text-sm">
          Solo activamos 10 agentes diarios. ¡Aprovecha el tuyo!
        </p>
      </div>
    </section>
  );
};

export default CtaSection;
