
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
  id?: number;
  descripcion: string;
  codigo?: string;
  video?: string;
  video_url?: string;
}

const DetalleRecurso: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [flujo, setFlujo] = useState<Flujo | null>(null);
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  
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
    
    // Handle array of steps
    if (Array.isArray(stepsData)) {
      return stepsData.map((step, index) => ({
        id: step.id || index + 1,
        descripcion: step.descripcion || step.description || `Paso ${index + 1}`,
        codigo: step.codigo || step.code || '',
        video: step.video || step.video_url || ''
      }));
    }
    
    // Handle single step object
    if (typeof stepsData === 'object' && stepsData !== null) {
      return [{
        id: 1,
        descripcion: stepsData.descripcion || stepsData.description || 'Paso único',
        codigo: stepsData.codigo || stepsData.code || '',
        video: stepsData.video || stepsData.video_url || ''
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
            pasos: Array.isArray(data.pasos) ? data.pasos : (data.pasos ? [data.pasos] : null)
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

  const toggleStepCompletion = (stepIndex: number) => {
    const newCompletedSteps = new Set(completedSteps);
    if (completedSteps.has(stepIndex)) {
      newCompletedSteps.delete(stepIndex);
    } else {
      newCompletedSteps.add(stepIndex);
    }
    setCompletedSteps(newCompletedSteps);
  };

  const isStepVisible = (stepIndex: number): boolean => {
    // First step is always visible
    if (stepIndex === 0) return true;
    // Show step if previous step is completed
    return completedSteps.has(stepIndex - 1);
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
    if (!videoUrl) return null;
    
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
    
    // Handle direct video URLs
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <Button
            onClick={() => navigate('/recursos')}
            variant="outline"
            className="mb-6 text-[#1B3A57] border-[#4A90E2] hover:bg-[#4A90E2] hover:text-white"
          >
            <ArrowLeft size={18} className="mr-2" />
            Volver a recursos
          </Button>

          {/* Main Content Card */}
          <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-white">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Image */}
                <div className="w-full lg:w-1/3">
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    {currentResource.imagen_url ? (
                      <img 
                        src={currentResource.imagen_url}
                        alt={isTutorial ? tutorial!.titulo : flujo!.nombre}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement!.innerHTML = `
                            <div class="text-gray-400 text-4xl">
                              ${isTutorial ? '🎥' : '📋'}
                            </div>
                          `;
                        }}
                      />
                    ) : (
                      <div className="text-gray-400 text-6xl">
                        {isTutorial ? '🎥' : '📋'}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Title and Description */}
                <div className="w-full lg:w-2/3 space-y-4">
                  <CardTitle className="text-2xl lg:text-3xl font-bold text-[#1B3A57] leading-tight">
                    {isTutorial ? tutorial!.titulo : flujo!.nombre}
                  </CardTitle>
                  
                  {currentResource.descripcion && (
                    <div className="prose prose-lg max-w-none">
                      <p className="text-gray-700 text-lg leading-relaxed">
                        {currentResource.descripcion}
                      </p>
                    </div>
                  )}
                  
                  {/* Download Button for Workflows */}
                  {!isTutorial && flujo!.link_descarga && (
                    <Button
                      onClick={handleDownload}
                      className="bg-[#4A90E2] hover:bg-[#1B3A57] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                      size="lg"
                    >
                      <Download size={18} className="mr-2" />
                      Descargar flujo
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-8">
              {/* Tutorial Video */}
              {isTutorial && tutorial!.video_url && (
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-[#1B3A57] mb-6 flex items-center">
                    🎥 Video Tutorial
                  </h3>
                  {renderVideoEmbed(tutorial!.video_url)}
                </div>
              )}

              {/* Workflow Steps */}
              {!isTutorial && workflowSteps.length > 0 && (
                <div>
                  <h3 className="text-2xl font-semibold text-[#1B3A57] mb-6 flex items-center">
                    📋 Pasos del Workflow
                  </h3>
                  
                  {/* Progress indicator */}
                  <div className="mb-8 bg-gray-100 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-[#1B3A57]">
                        Progreso: {completedSteps.size} / {workflowSteps.length} pasos completados
                      </span>
                      <span className="text-sm text-gray-600">
                        {Math.round((completedSteps.size / workflowSteps.length) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[#4A90E2] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(completedSteps.size / workflowSteps.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    {workflowSteps.map((paso, index) => {
                      const isCompleted = completedSteps.has(index);
                      const isVisible = isStepVisible(index);
                      
                      if (!isVisible) {
                        return (
                          <Card key={index} className="border-2 border-dashed border-gray-200 bg-gray-50">
                            <CardContent className="p-6 text-center">
                              <div className="text-gray-400 mb-2">🔒</div>
                              <p className="text-gray-500">
                                Completa el paso anterior para desbloquear este paso
                              </p>
                            </CardContent>
                          </Card>
                        );
                      }

                      return (
                        <Card 
                          key={index} 
                          className={`border-2 transition-all duration-300 ${
                            isCompleted 
                              ? 'border-green-200 bg-green-50' 
                              : 'border-[#4A90E2] bg-white'
                          }`}
                        >
                          <CardHeader className="pb-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                                  isCompleted ? 'bg-green-500' : 'bg-[#4A90E2]'
                                }`}>
                                  {isCompleted ? <CheckCircle size={24} /> : index + 1}
                                </div>
                                <div>
                                  <h4 className="text-xl font-semibold text-[#1B3A57]">
                                    Paso {index + 1}
                                  </h4>
                                  {isCompleted && (
                                    <span className="text-green-600 text-sm font-medium">✅ Completado</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          
                          <CardContent className="space-y-6">
                            {/* Step Description */}
                            {paso.descripcion && (
                              <div className="prose max-w-none">
                                <p className="text-gray-700 leading-relaxed text-base">
                                  {paso.descripcion}
                                </p>
                              </div>
                            )}
                            
                            {/* Code Block */}
                            {paso.codigo && (
                              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                                <div className="flex items-center justify-between bg-gray-100 px-4 py-3 border-b border-gray-200">
                                  <span className="text-sm font-medium text-gray-700 flex items-center">
                                    💻 Código
                                  </span>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => copyToClipboard(paso.codigo!)}
                                    className="text-xs hover:bg-[#4A90E2] hover:text-white"
                                  >
                                    <Copy size={14} className="mr-1" />
                                    Copiar
                                  </Button>
                                </div>
                                <pre className="bg-gray-900 text-green-400 p-4 text-sm overflow-x-auto">
                                  <code>{paso.codigo}</code>
                                </pre>
                              </div>
                            )}
                            
                            {/* Step Video */}
                            {paso.video && (
                              <div>
                                <h5 className="text-lg font-medium text-[#1B3A57] mb-3 flex items-center">
                                  🎬 Video explicativo
                                </h5>
                                {renderVideoEmbed(paso.video)}
                              </div>
                            )}

                            {/* Completion Checkbox */}
                            <div className="pt-4 border-t border-gray-200">
                              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                                <Checkbox
                                  id={`step-${index}`}
                                  checked={isCompleted}
                                  onCheckedChange={() => toggleStepCompletion(index)}
                                  className="data-[state=checked]:bg-[#4A90E2] data-[state=checked]:border-[#4A90E2]"
                                />
                                <label 
                                  htmlFor={`step-${index}`}
                                  className="text-sm font-medium text-[#1B3A57] cursor-pointer"
                                >
                                  ✅ Marcar este paso como completado
                                </label>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Empty State for Workflows without steps */}
              {!isTutorial && workflowSteps.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-4xl mb-4">📋</div>
                  <p className="text-gray-500 text-lg">Este flujo no tiene pasos definidos aún.</p>
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
