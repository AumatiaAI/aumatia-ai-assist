
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CtaSection from '@/components/CtaSection';
import SuccessStoryCard from '@/components/SuccessStoryCard';

const HistoriasDeExito: React.FC = () => {
  const successStories = [
    {
      id: 1,
      image: "https://i.imgur.com/JKgFush.jpg",
      businessName: "El Rincón Dulce",
      location: "Medellín",
      sector: "Pastelería",
      agent: "DomiAI",
      testimonial: "Con DomiAI respondemos todo por WhatsApp sin perder pedidos.",
    },
    {
      id: 2,
      image: "https://i.imgur.com/LnKKROn.jpg",
      businessName: "Café Aromático",
      location: "Bogotá",
      sector: "Cafetería",
      agent: "DomiAI",
      testimonial: "Aumentamos nuestras ventas en un 25% automatizando pedidos.",
    },
    {
      id: 3,
      image: "https://i.imgur.com/VV8oRMR.jpg",
      businessName: "La Hamburguesería",
      location: "Cali",
      sector: "Comida rápida",
      agent: "DomiAI",
      testimonial: "Nuestros clientes valoran la atención inmediata a cualquier hora.",
    },
    {
      id: 4,
      image: "https://i.imgur.com/dH5OkXY.jpg",
      businessName: "Tech Solutions",
      location: "Barranquilla",
      sector: "Servicios IT",
      agent: "DomiAI",
      testimonial: "Automatizamos la primera fase de atención al cliente con gran éxito.",
    },
    {
      id: 5,
      image: "https://i.imgur.com/P9JKoxT.jpg",
      businessName: "Farmacia Express",
      location: "Cartagena",
      sector: "Farmacia",
      agent: "DomiAI",
      testimonial: "Nuestros clientes reciben información inmediata sobre medicamentos.",
    },
    {
      id: 6,
      image: "https://i.imgur.com/z6BgmPW.jpg",
      businessName: "Tienda Deportiva",
      location: "Pereira",
      sector: "Retail",
      agent: "DomiAI",
      testimonial: "Atendemos consultas sobre productos incluso fuera de horario comercial.",
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#F1F7FE] to-white pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[#1B3A57]">
            Historias de Éxito
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Descubre cómo negocios reales están automatizando su atención y aumentando ventas con nuestros agentes de IA.
          </p>
        </div>
      </section>
      
      {/* Success Stories Grid */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story) => (
              <SuccessStoryCard key={story.id} story={story} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Custom CTA Section with different background color */}
      <section className="py-20 bg-[#1B3A57] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para ser nuestra próxima historia de éxito?
          </h2>
          
          <div className="mb-6">
            <a 
              href="/productos" 
              className="inline-block bg-[#4A90E2] hover:bg-[#4A90E2]/90 transition-colors px-8 py-3 rounded-md text-white font-medium"
            >
              Automatiza tu negocio hoy
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HistoriasDeExito;
