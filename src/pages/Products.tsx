
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Products: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Animation observer for scroll animations
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
    <div className="flex flex-col min-h-screen font-poppins">
      <Header />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-primary text-white py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
              Nuestros agentes de automatización
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-100">
              Activa el que se adapta a tu negocio y empieza a automatizar hoy mismo.
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Product Card - DomiAI */}
              <Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 animate-on-scroll opacity-0 translate-y-10">
                <CardHeader className="p-6 pb-2 flex flex-col items-center">
                  <div className="w-full mb-4 flex justify-center">
                    <img 
                      src="https://i.imgur.com/S0x8zFg.png" 
                      alt="DomiAI Logo" 
                      className="w-24 h-24 object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-[#fa563a]">DomiAI</h3>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 mt-2">
                    Asistente de WhatsApp
                  </Badge>
                </CardHeader>
                <CardContent className="px-6 pt-2 pb-4">
                  <p className="text-gray-700 mb-4">
                    Responde pedidos por WhatsApp, envía menú y cobra automáticamente.
                  </p>
                  <p className="font-semibold text-lg text-primary">
                    Desde $20 USD/mes
                  </p>
                </CardContent>
                <CardFooter className="px-6 pb-6 pt-2 flex flex-col md:flex-row gap-4">
                  <Button asChild className="w-full bg-primary hover:bg-primary/90">
                    <a href="/DomiAI.html">Ver más</a>
                  </Button>
                  <Button asChild className="w-full bg-primary hover:bg-primary/90">
                    <a href="/CrearCuenta.html">Activar ahora</a>
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Placeholder Cards for Future Agents */}
              <div className="hidden md:block">
                {/* This empty div creates space for future products in the grid */}
              </div>
              <div className="hidden md:block">
                {/* This empty div creates space for future products in the grid */}
              </div>
            </div>
          </div>
        </section>

        {/* Help Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
              ¿No sabes cuál elegir?
            </h2>
            <p className="text-lg text-gray-700 mb-8 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-100">
              Contáctanos y te ayudamos a elegir el agente ideal para tu negocio.
            </p>
            <Button asChild className="bg-green-500 hover:bg-green-600 text-white animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-200">
              <a href="https://wa.link/v80yk0" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                  <path d="M12.031 6c-3.9 0-7.071 3.171-7.071 7.071 0 1.356.386 2.631 1.056 3.711l-.48 1.756 1.866-.478c1.018.555 2.131.83 3.34.83 3.9 0 7.071-3.171 7.071-7.071 0-3.901-3.171-7.071-7.071-7.071zm4.127 9.638c-.159.45-.687.773-.687.773-.293.1-1.807.762-2.068-.082 0 0-.319-.291-.732-.577-1.376-.95-2.289-2.264-2.356-2.368-.066-.105-.537-.673-.537-1.273s.335-.96.458-1.090c.123-.13.262-.157.349-.157.087 0 .175 0 .262.008.105.004.262-.044.412.308.158.36.528 1.252.574 1.342.047.091.078.196.016.305-.063.109-.095.175-.182.269-.087.095-.184.211-.263.283-.088.08-.187.215-.084.383.103.169.457.736.98 1.188.673.581 1.213.813 1.422.885.16.055.306.027.417-.075.14-.131.302-.345.47-.554.118-.143.27-.165.429-.101.16.065 1.082.509 1.268.602.185.93.302.138.343.214.042.076.042.438-.116.86z"></path>
                </svg>
                Hablar por WhatsApp
              </a>
            </Button>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 bg-secondary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
              Activa tu primer agente hoy y empieza a vender sin estrés
            </h2>
            <Button asChild className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-100">
              <a href="/agentes.html">
                Ver agentes
              </a>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
