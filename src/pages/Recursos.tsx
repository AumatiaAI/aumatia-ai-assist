
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';
import { Eye, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface Flujo {
  id: string;
  nombre: string;
  descripcion: string | null;
  imagen_url: string | null;
  link_descarga: string | null;
}

interface Tutorial {
  id: string;
  titulo: string;
  descripcion: string | null;
  imagen_url: string | null;
  video_url: string | null;
}

const Recursos: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [flujos, setFlujos] = useState<Flujo[]>([]);
  const [tutoriales, setTutoriales] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(true);
  
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch flujos
      const { data: flujosData, error: flujosError } = await supabase
        .from('flujos')
        .select('*')
        .order('creado_en', { ascending: false });

      if (flujosError) {
        console.error('Error fetching flujos:', flujosError);
        toast({
          title: "Error",
          description: "No se pudieron cargar los workflows",
          variant: "destructive",
        });
      } else {
        setFlujos(flujosData || []);
      }

      // Fetch tutoriales
      const { data: tutorialesData, error: tutorialesError } = await supabase
        .from('tutoriales')
        .select('*')
        .order('creado_en', { ascending: false });

      if (tutorialesError) {
        console.error('Error fetching tutoriales:', tutorialesError);
        toast({
          title: "Error",
          description: "No se pudieron cargar los tutoriales",
          variant: "destructive",
        });
      } else {
        setTutoriales(tutorialesData || []);
      }
    } catch (error) {
      console.error('Error general:', error);
      toast({
        title: "Error",
        description: "Ocurrió un error al cargar los recursos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewFlujo = (flujoId: string) => {
    navigate(`/recursos/detalle?id=${flujoId}&tipo=flujo`);
  };

  const handleViewTutorial = (tutorialId: string) => {
    navigate(`/recursos/detalle?id=${tutorialId}&tipo=tutorial`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="bg-[#F1F7FE] py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-[#1B3A57] animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
              Recursos gratuitos para automatizar tu negocio
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-100">
              Explora flujos listos para usar y aprende con nuestros tutoriales
            </p>
          </div>
        </section>

        {/* Workflows Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-[#1B3A57] animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                Workflows Automatizados
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-100">
                Flujos de trabajo listos para implementar en tu negocio
              </p>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Cargando workflows...</p>
              </div>
            ) : flujos.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">No hay workflows disponibles por el momento.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {flujos.map((flujo) => (
                  <Card 
                    key={flujo.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-on-scroll opacity-0 translate-y-10"
                  >
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="w-full h-40 mb-4 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                        {flujo.imagen_url ? (
                          <img 
                            src={flujo.imagen_url}
                            alt={`${flujo.nombre} image`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-gray-400 text-4xl">📋</div>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-[#1B3A57] mb-2">{flujo.nombre}</h3>
                      <p className="text-gray-700 mb-6 flex-grow">
                        {flujo.descripcion || "Workflow automatizado para optimizar tu negocio"}
                      </p>
                      <Button 
                        onClick={() => handleViewFlujo(flujo.id)}
                        className="bg-[#4A90E2] hover:bg-[#1B3A57] text-white transition-colors duration-300"
                      >
                        <Eye size={18} className="mr-2" />
                        Ver más
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Tutorials Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-[#1B3A57] animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                Tutoriales
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-100">
                Aprende paso a paso cómo implementar automatizaciones
              </p>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Cargando tutoriales...</p>
              </div>
            ) : tutoriales.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">No hay tutoriales disponibles por el momento.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tutoriales.map((tutorial) => (
                  <Card 
                    key={tutorial.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-on-scroll opacity-0 translate-y-10"
                  >
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="w-full h-40 mb-4 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                        {tutorial.imagen_url ? (
                          <img 
                            src={tutorial.imagen_url}
                            alt={`${tutorial.titulo} thumbnail`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-gray-400 text-4xl">🎥</div>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-[#1B3A57] mb-2">{tutorial.titulo}</h3>
                      <p className="text-gray-700 mb-6 flex-grow">
                        {tutorial.descripcion || "Tutorial paso a paso"}
                      </p>
                      <Button 
                        onClick={() => handleViewTutorial(tutorial.id)}
                        className="bg-[#4A90E2] hover:bg-[#1B3A57] text-white transition-colors duration-300"
                      >
                        <Play size={18} className="mr-2" />
                        Ver más
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-6 text-[#1B3A57] animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
              ¿Necesitas algo más personalizado?
            </h2>
            <Button 
              asChild
              className="bg-[#4A90E2] hover:bg-[#1B3A57] text-white px-8 py-6 text-lg animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-100"
            >
              <a href="/productos">
                Crear agente personalizado
              </a>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Recursos;
