
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';
import { Download, ArrowLeft } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface Flujo {
  id: string;
  nombre: string;
  descripcion: string | null;
  imagen_url: string | null;
  link_descarga: string | null;
  pasos: any[] | null;
}

interface Tutorial {
  id: string;
  titulo: string;
  descripcion: string | null;
  imagen_url: string | null;
  video_url: string | null;
}

interface WorkflowStep {
  id: number;
  descripcion: string;
  codigo?: string;
  video_url?: string;
}

const DetalleRecurso: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [flujo, setFlujo] = useState<Flujo | null>(null);
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  
  const id = searchParams.get('id');
  const tipo = searchParams.get('tipo');
  const isTutorial = tipo === 'tutorial';

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      fetchResourceData();
    } else {
      navigate('/recursos');
    }
  }, [id, tipo]);

  const parseWorkflowSteps = (stepsData: any): WorkflowStep[] => {
    if (!stepsData) return [];
    if (Array.isArray(stepsData)) {
      return stepsData.map((step, index) => ({
        id: step.id || index + 1,
        descripcion: step.descripcion || '',
        codigo: step.codigo || '',
        video_url: step.video_url || ''
      }));
    }
    return [];
  };

  const fetchResourceData = async () => {
    try {
      setLoading(true);
      
      if (isTutorial) {
        const { data, error } = await supabase
          .from('tutoriales')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Error fetching tutorial:', error);
          toast({
            title: "Error",
            description: "No se pudo cargar el tutorial",
            variant: "destructive",
          });
          navigate('/recursos');
        } else {
          setTutorial(data);
        }
      } else {
        const { data, error } = await supabase
          .from('flujos')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Error fetching flujo:', error);
          toast({
            title: "Error",
            description: "No se pudo cargar el workflow",
            variant: "destructive",
          });
          navigate('/recursos');
        } else {
          // Transform the data to match our interface
          const flujoData: Flujo = {
            id: data.id,
            nombre: data.nombre,
            descripcion: data.descripcion,
            imagen_url: data.imagen_url,
            link_descarga: data.link_descarga,
            pasos: Array.isArray(data.pasos) ? data.pasos : null
          };
          setFlujo(flujoData);
        }
      }
    } catch (error) {
      console.error('Error general:', error);
      toast({
        title: "Error",
        description: "Ocurrió un error al cargar el recurso",
        variant: "destructive",
      });
      navigate('/recursos');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (flujo?.link_descarga) {
      window.open(flujo.link_descarga, '_blank');
    } else {
      toast({
        title: "Error",
        description: "No hay enlace de descarga disponible",
        variant: "destructive",
      });
    }
  };

  const renderVideoEmbed = (videoUrl: string) => {
    if (!videoUrl) return null;
    
    // Handle YouTube URLs
    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
      let videoId = '';
      if (videoUrl.includes('youtu.be/')) {
        videoId = videoUrl.split('youtu.be/')[1].split('?')[0];
      } else if (videoUrl.includes('youtube.com/watch?v=')) {
        videoId = videoUrl.split('v=')[1].split('&')[0];
      }
      
      if (videoId) {
        return (
          <div className="w-full aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        );
      }
    }
    
    // Handle direct video URLs
    return (
      <video
        controls
        className="w-full rounded-lg"
        src={videoUrl}
      >
        Tu navegador no soporta el elemento video.
      </video>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-24 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg text-gray-600">Cargando recurso...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const currentResource = isTutorial ? tutorial : flujo;
  
  if (!currentResource) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-24 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#1B3A57] mb-4">Recurso no encontrado</h1>
            <Button onClick={() => navigate('/recursos')} className="bg-[#4A90E2] hover:bg-[#1B3A57]">
              Volver a recursos
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <Button
            onClick={() => navigate('/recursos')}
            variant="outline"
            className="mb-6"
          >
            <ArrowLeft size={18} className="mr-2" />
            Volver a recursos
          </Button>

          {/* Main Content Card */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <div className="flex flex-col md:flex-row gap-6">
                {/* Image */}
                <div className="w-full md:w-1/3">
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    {currentResource.imagen_url ? (
                      <img 
                        src={currentResource.imagen_url}
                        alt={isTutorial ? tutorial!.titulo : flujo!.nombre}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-400 text-4xl">
                        {isTutorial ? '🎥' : '📋'}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Title and Description */}
                <div className="w-full md:w-2/3">
                  <CardTitle className="text-2xl md:text-3xl font-bold text-[#1B3A57] mb-4">
                    {isTutorial ? tutorial!.titulo : flujo!.nombre}
                  </CardTitle>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {isTutorial ? tutorial!.descripcion : flujo!.descripcion}
                  </p>
                  
                  {/* Download Button for Workflows */}
                  {!isTutorial && flujo!.link_descarga && (
                    <Button
                      onClick={handleDownload}
                      className="bg-[#4A90E2] hover:bg-[#1B3A57] text-white mt-6"
                      size="lg"
                    >
                      <Download size={18} className="mr-2" />
                      Descargar flujo
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {/* Tutorial Video */}
              {isTutorial && tutorial!.video_url && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-[#1B3A57] mb-4">Video Tutorial</h3>
                  {renderVideoEmbed(tutorial!.video_url)}
                </div>
              )}

              {/* Workflow Steps */}
              {!isTutorial && flujo!.pasos && (
                <div>
                  <h3 className="text-xl font-semibold text-[#1B3A57] mb-6">Pasos del Workflow</h3>
                  <Accordion type="single" collapsible className="w-full">
                    {parseWorkflowSteps(flujo!.pasos).map((paso, index) => (
                      <AccordionItem key={paso.id} value={`step-${index}`}>
                        <AccordionTrigger className="text-left">
                          <span className="flex items-center">
                            <span className="bg-[#4A90E2] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                              {index + 1}
                            </span>
                            Paso {index + 1}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="pt-4">
                          <div className="space-y-4">
                            <p className="text-gray-700 leading-relaxed">{paso.descripcion}</p>
                            
                            {/* Code Block */}
                            {paso.codigo && (
                              <div className="bg-gray-50 border rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-medium text-gray-600">Código:</span>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      navigator.clipboard.writeText(paso.codigo!);
                                      toast({
                                        title: "Copiado",
                                        description: "Código copiado al portapapeles",
                                      });
                                    }}
                                  >
                                    Copiar
                                  </Button>
                                </div>
                                <pre className="bg-gray-900 text-green-400 p-3 rounded text-sm overflow-x-auto">
                                  <code>{paso.codigo}</code>
                                </pre>
                              </div>
                            )}
                            
                            {/* Step Video */}
                            {paso.video_url && (
                              <div>
                                <h4 className="text-sm font-medium text-gray-600 mb-2">Video explicativo:</h4>
                                {renderVideoEmbed(paso.video_url)}
                              </div>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DetalleRecurso;
