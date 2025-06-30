
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';
import { Download, ArrowLeft, Copy, CheckCircle } from 'lucide-react';
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
  id: string | number;
  descripcion: string;
  codigo?: string;
  videoUrl?: string;
}

const DetalleRecurso: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [flujo, setFlujo] = useState<Flujo | null>(null);
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [currentStep, setCurrentStep] = useState<number>(0);
  
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
        descripcion: step.descripcion || step.description || `Paso ${index + 1}`,
        codigo: step.codigo || step.code || '',
        videoUrl: step.videoUrl || step.video_url || step.video || ''
      }));
    }
    
    if (typeof stepsData === 'object' && stepsData !== null) {
      return [{
        id: stepsData.id || 1,
        descripcion: stepsData.descripcion || stepsData.description || 'Paso único',
        codigo: stepsData.codigo || stepsData.code || '',
        videoUrl: stepsData.videoUrl || stepsData.video_url || stepsData.video || ''
      }];
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
            description: "No se pudo cargar el flujo de trabajo",
            variant: "destructive",
          });
          navigate('/recursos');
        } else {
          const flujoData: Flujo = {
            id: data.id,
            nombre: data.nombre,
            descripcion: data.descripcion,
            imagen_url: data.imagen_url,
            link_descarga: data.link_descarga,
            pasos: data.pasos as any[]
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
      toast({
        title: "Descarga iniciada",
        description: "El archivo se está descargando",
      });
    } else {
      toast({
        title: "Error",
        description: "No hay enlace de descarga disponible",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copiado",
        description: "Código copiado al portapapeles",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo copiar el código",
        variant: "destructive",
      });
    }
  };

  const completeStep = (stepIndex: number) => {
    const newCompletedSteps = new Set(completedSteps);
    newCompletedSteps.add(stepIndex);
    setCompletedSteps(newCompletedSteps);
    
    // Move to next step automatically
    if (stepIndex + 1 < workflowSteps.length) {
      setCurrentStep(stepIndex + 1);
    }
    
    toast({
      title: "Paso completado",
      description: `Paso ${stepIndex + 1} marcado como completado`,
    });
  };

  const extractYouTubeId = (url: string): string | null => {
    if (!url) return null;
    
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    
    return null;
  };

  const renderVideoEmbed = (videoUrl: string) => {
    if (!videoUrl) {
      return (
        <div className="w-full aspect-video rounded-lg bg-gray-100 flex items-center justify-center">
          <div className="text-center text-gray-500 p-4">
            <div className="text-4xl mb-2">🎥</div>
            <p className="text-sm font-medium">Este paso no tiene video aún</p>
          </div>
        </div>
      );
    }
    
    const youtubeId = extractYouTubeId(videoUrl);
    
    if (youtubeId) {
      return (
        <div className="w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
            title="Video tutorial"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      );
    }
    
    return (
      <div className="w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
        <video
          controls
          className="w-full h-full object-cover"
          src={videoUrl}
        >
          Tu navegador no soporta la reproducción de video.
        </video>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow pt-24 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A90E2] mx-auto mb-4"></div>
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
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow pt-24 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <h1 className="text-2xl font-bold text-[#1B3A57] mb-4">Recurso no encontrado</h1>
            <p className="text-gray-600 mb-6">El recurso que buscas no existe o ha sido eliminado.</p>
            <Button 
              onClick={() => navigate('/recursos')} 
              className="bg-[#4A90E2] hover:bg-[#1B3A57] text-white"
            >
              Volver a recursos
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const workflowSteps = !isTutorial && flujo?.pasos ? parseWorkflowSteps(flujo.pasos) : [];
  
  // Get main video URL from first step or resource
  const mainVideoUrl = !isTutorial && workflowSteps.length > 0 ? workflowSteps[0].videoUrl : 
                       (isTutorial ? tutorial!.video_url : null);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Back Button */}
          <Button
            onClick={() => navigate('/recursos')}
            variant="outline"
            className="mb-6 text-[#1B3A57] border-[#4A90E2] hover:bg-[#4A90E2] hover:text-white"
          >
            <ArrowLeft size={18} className="mr-2" />
            Volver a recursos
          </Button>

          {/* Header Section with Title and CTA */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-3xl lg:text-4xl font-bold text-[#1B3A57] leading-tight">
                  {isTutorial ? tutorial!.titulo : flujo!.nombre}
                </h1>
                {currentResource.descripcion && (
                  <p className="text-gray-700 text-lg mt-4 leading-relaxed">
                    {currentResource.descripcion}
                  </p>
                )}
              </div>
              
              {/* CTA Badge */}
              {!isTutorial && flujo!.link_descarga && (
                <div className="flex-shrink-0">
                  <div className="bg-[#4A90E2] text-white px-6 py-3 rounded-full font-semibold text-center shadow-md">
                    ⬇️ Descarga gratis al final
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Video Section */}
          {mainVideoUrl && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-[#1B3A57] mb-6 text-center">
                🎬 Video principal del flujo
              </h2>
              <div className="max-w-4xl mx-auto">
                {renderVideoEmbed(mainVideoUrl)}
              </div>
            </div>
          )}

          {/* Tutorial Video (for tutorials) */}
          {isTutorial && tutorial!.video_url && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-[#1B3A57] mb-6 text-center">
                🎥 Video Tutorial
              </h2>
              <div className="max-w-4xl mx-auto">
                {renderVideoEmbed(tutorial!.video_url)}
              </div>
            </div>
          )}

          {/* No main video message */}
          {!mainVideoUrl && !isTutorial && (
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8 text-center">
              <div className="text-gray-400 text-6xl mb-4">🎥</div>
              <p className="text-gray-600 text-lg">Este flujo no tiene video principal aún</p>
            </div>
          )}

          {/* Workflow Steps */}
          {!isTutorial && workflowSteps.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-[#1B3A57] text-center mb-8">
                📋 Pasos del flujo
              </h2>
              
              {/* Progress indicator */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-medium text-[#1B3A57]">
                    Progreso: {completedSteps.size} / {workflowSteps.length} pasos completados
                  </span>
                  <span className="text-lg text-gray-600 font-semibold">
                    {Math.round((completedSteps.size / workflowSteps.length) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-[#4A90E2] h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(completedSteps.size / workflowSteps.length) * 100}%` }}
                  />
                </div>
              </div>

              {workflowSteps.map((paso, index) => {
                const isCompleted = completedSteps.has(index);
                const isActive = currentStep === index;
                const isAccessible = index === 0 || completedSteps.has(index - 1);
                
                return (
                  <Card key={paso.id} className={`transition-all duration-300 ${
                    isCompleted 
                      ? 'border-2 border-green-200 bg-green-50' 
                      : isActive && isAccessible
                      ? 'border-2 border-[#4A90E2] bg-white shadow-xl'
                      : 'border-2 border-gray-200 bg-gray-50'
                  }`}>
                    
                    <CardHeader className="pb-4">
                      <div className="flex items-center space-x-4">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl ${
                          isCompleted ? 'bg-green-500' : 'bg-[#4A90E2]'
                        }`}>
                          {isCompleted ? <CheckCircle size={32} /> : index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-[#1B3A57]">
                            Paso {index + 1}
                          </h3>
                          {isCompleted && (
                            <span className="text-green-600 text-lg font-semibold">✅ Completado</span>
                          )}
                          {!isAccessible && (
                            <span className="text-gray-500 text-lg">🔒 Bloqueado</span>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    
                    {isActive && isAccessible && (
                      <CardContent className="pt-0 space-y-6">
                        {/* Step Description */}
                        {paso.descripcion && (
                          <div className="prose max-w-none">
                            <p className="text-gray-700 leading-relaxed text-lg">
                              {paso.descripcion}
                            </p>
                          </div>
                        )}
                        
                        {/* Code Block */}
                        {paso.codigo && (
                          <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                            <div className="flex items-center justify-between bg-gray-100 px-6 py-4 border-b border-gray-200">
                              <span className="text-lg font-semibold text-gray-700 flex items-center">
                                💻 Código
                              </span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => copyToClipboard(paso.codigo!)}
                                className="text-sm hover:bg-[#4A90E2] hover:text-white"
                              >
                                <Copy size={16} className="mr-2" />
                                📋 Copiar
                              </Button>
                            </div>
                            <pre className="bg-gray-900 text-green-400 p-6 text-sm overflow-x-auto font-mono">
                              <code>{paso.codigo}</code>
                            </pre>
                          </div>
                        )}

                        {/* Step Video */}
                        <div>
                          <h4 className="text-xl font-semibold text-[#1B3A57] mb-4">
                            🎬 Video del paso
                          </h4>
                          {renderVideoEmbed(paso.videoUrl || '')}
                        </div>

                        {/* Complete Step Checkbox */}
                        {!isCompleted && (
                          <div className="flex items-center space-x-4 pt-6 pb-2">
                            <Checkbox
                              id={`step-${index}`}
                              checked={false}
                              onCheckedChange={() => completeStep(index)}
                              className="w-6 h-6"
                            />
                            <label 
                              htmlFor={`step-${index}`}
                              className="text-lg font-semibold text-[#1B3A57] cursor-pointer"
                            >
                              ✅ Completar este paso
                            </label>
                          </div>
                        )}
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>
          )}

          {/* Empty State for Workflows without steps */}
          {!isTutorial && workflowSteps.length === 0 && (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <div className="text-gray-400 text-8xl mb-6">📋</div>
              <p className="text-gray-500 text-xl">Este flujo no tiene pasos definidos aún.</p>
            </div>
          )}

          {/* Download Button - Bottom of page */}
          {!isTutorial && flujo!.link_descarga && (
            <div className="mt-16 text-center">
              <Button
                onClick={handleDownload}
                className="bg-[#4A90E2] hover:bg-[#1B3A57] text-white font-bold py-4 px-12 rounded-full text-xl shadow-lg hover:shadow-xl transition-all duration-300"
                size="lg"
              >
                <Download size={24} className="mr-3" />
                ⬇️ Descargar este flujo
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DetalleRecurso;
