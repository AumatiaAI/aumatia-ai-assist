
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Copy, Eye, Lock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface WorkflowStep {
  id: string;
  descripcion: string;
  codigo: string;
  videoUrl?: string;
}

interface Flujo {
  id: string;
  nombre: string;
  descripcion: string;
  imagen_url: string;
  link_descarga: string;
  pasos: WorkflowStep[];
  creado_en: string;
  actualizado_en: string;
}

interface Tutorial {
  id: string;
  titulo: string;
  descripcion?: string;
  video_url: string;
  imagen_url: string;
  creado_en: string;
  actualizado_en: string;
}

const AdminRecursosPrivado = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [flujos, setFlujos] = useState<Flujo[]>([]);
  const [tutoriales, setTutoriales] = useState<Tutorial[]>([]);
  const [isFlowModalOpen, setIsFlowModalOpen] = useState(false);
  const [isTutorialModalOpen, setIsTutorialModalOpen] = useState(false);
  const [editingFlow, setEditingFlow] = useState<Flujo | null>(null);
  const [editingTutorial, setEditingTutorial] = useState<Tutorial | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Verificar acceso de administrador
  const handleAdminLogin = () => {
    // Sistema simple de autenticación - en producción usar Supabase Auth
    if (adminPassword === 'admin123') {
      setIsAdmin(true);
      toast({
        title: "Acceso concedido",
        description: "Bienvenido al panel de administración",
      });
    } else {
      toast({
        title: "Acceso denegado",
        description: "Contraseña incorrecta",
        variant: "destructive",
      });
    }
  };

  // Cargar datos desde Supabase
  const loadData = async () => {
    setIsLoading(true);
    try {
      // Cargar flujos
      const { data: flujosData, error: flujosError } = await supabase
        .from('flujos')
        .select('*')
        .order('creado_en', { ascending: false });

      if (flujosError) throw flujosError;
      setFlujos(flujosData || []);

      // Cargar tutoriales
      const { data: tutorialesData, error: tutorialesError } = await supabase
        .from('tutoriales')
        .select('*')
        .order('creado_en', { ascending: false });

      if (tutorialesError) throw tutorialesError;
      setTutoriales(tutorialesData || []);
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error",
        description: "Error al cargar los datos",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadData();
    }
  }, [isAdmin]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado",
      description: "Texto copiado al portapapeles",
    });
  };

  // Pantalla de login
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1B3A57] to-[#4A90E2] flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-[#4A90E2] rounded-full flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-[#1B3A57]">
              Acceso Restringido
            </CardTitle>
            <p className="text-gray-600">
              Panel de administración de recursos
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Contraseña de Administrador</label>
              <Input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Ingrese la contraseña"
                onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
              />
            </div>
            <Button 
              onClick={handleAdminLogin}
              className="w-full bg-[#4A90E2] hover:bg-[#1B3A57] transition-colors"
            >
              Acceder al Panel
            </Button>
            <p className="text-xs text-gray-500 text-center">
              Esta página requiere permisos de administrador
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#1B3A57] mb-2">
                Panel de Administración de Recursos
              </h1>
              <p className="text-gray-600">
                Gestiona flujos de trabajo y tutoriales para Aumatia
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsAdmin(false)}
              className="text-red-600 hover:text-red-700"
            >
              Cerrar Sesión
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Gestión de Flujos */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#1B3A57]">
                Gestión de Flujos
              </h2>
              <Button
                onClick={() => {
                  setEditingFlow(null);
                  setIsFlowModalOpen(true);
                }}
                className="bg-[#4A90E2] hover:bg-[#1B3A57] transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Flujo
              </Button>
            </div>

            <div className="space-y-4">
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4A90E2] mx-auto"></div>
                </div>
              ) : (
                flujos.map((flujo) => (
                  <Card key={flujo.id} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-[#1B3A57] mb-2 text-lg">
                            {flujo.nombre}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3">
                            {flujo.descripcion}
                          </p>
                          <div className="text-xs text-gray-500 space-y-1">
                            <p>{flujo.pasos?.length || 0} pasos</p>
                            <p>Creado: {new Date(flujo.creado_en).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingFlow(flujo);
                              setIsFlowModalOpen(true);
                            }}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={async () => {
                              if (confirm('¿Eliminar este flujo?')) {
                                try {
                                  const { error } = await supabase
                                    .from('flujos')
                                    .delete()
                                    .eq('id', flujo.id);
                                  
                                  if (error) throw error;
                                  
                                  await loadData();
                                  toast({
                                    title: "Flujo eliminado",
                                    description: "El flujo ha sido eliminado correctamente",
                                  });
                                } catch (error) {
                                  console.error('Error deleting flow:', error);
                                  toast({
                                    title: "Error",
                                    description: "Error al eliminar el flujo",
                                    variant: "destructive",
                                  });
                                }
                              }
                            }}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Gestión de Tutoriales */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#1B3A57]">
                Gestión de Tutoriales
              </h2>
              <Button
                onClick={() => {
                  setEditingTutorial(null);
                  setIsTutorialModalOpen(true);
                }}
                className="bg-[#4A90E2] hover:bg-[#1B3A57] transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Tutorial
              </Button>
            </div>

            <div className="space-y-4">
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4A90E2] mx-auto"></div>
                </div>
              ) : (
                tutoriales.map((tutorial) => (
                  <Card key={tutorial.id} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-[#1B3A57] mb-2 text-lg">
                            {tutorial.titulo}
                          </h3>
                          {tutorial.descripcion && (
                            <p className="text-gray-600 text-sm mb-3">
                              {tutorial.descripcion}
                            </p>
                          )}
                          <div className="text-xs text-gray-500">
                            <p>Creado: {new Date(tutorial.creado_en).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(tutorial.video_url, '_blank')}
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingTutorial(tutorial);
                              setIsTutorialModalOpen(true);
                            }}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={async () => {
                              if (confirm('¿Eliminar este tutorial?')) {
                                try {
                                  const { error } = await supabase
                                    .from('tutoriales')
                                    .delete()
                                    .eq('id', tutorial.id);
                                  
                                  if (error) throw error;
                                  
                                  await loadData();
                                  toast({
                                    title: "Tutorial eliminado",
                                    description: "El tutorial ha sido eliminado correctamente",
                                  });
                                } catch (error) {
                                  console.error('Error deleting tutorial:', error);
                                  toast({
                                    title: "Error",
                                    description: "Error al eliminar el tutorial",
                                    variant: "destructive",
                                  });
                                }
                              }
                            }}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Flujos */}
      <FlowModal
        isOpen={isFlowModalOpen}
        onClose={() => setIsFlowModalOpen(false)}
        flow={editingFlow}
        onSave={async (flowData) => {
          try {
            if (editingFlow) {
              const { error } = await supabase
                .from('flujos')
                .update(flowData)
                .eq('id', editingFlow.id);
              
              if (error) throw error;
            } else {
              const { error } = await supabase
                .from('flujos')
                .insert([flowData]);
              
              if (error) throw error;
            }
            
            await loadData();
            setIsFlowModalOpen(false);
            toast({
              title: "Flujo guardado",
              description: "El flujo ha sido guardado correctamente",
            });
          } catch (error) {
            console.error('Error saving flow:', error);
            toast({
              title: "Error",
              description: "Error al guardar el flujo",
              variant: "destructive",
            });
          }
        }}
        copyToClipboard={copyToClipboard}
      />

      {/* Modal de Tutoriales */}
      <TutorialModal
        isOpen={isTutorialModalOpen}
        onClose={() => setIsTutorialModalOpen(false)}
        tutorial={editingTutorial}
        onSave={async (tutorialData) => {
          try {
            if (editingTutorial) {
              const { error } = await supabase
                .from('tutoriales')
                .update(tutorialData)
                .eq('id', editingTutorial.id);
              
              if (error) throw error;
            } else {
              const { error } = await supabase
                .from('tutoriales')
                .insert([tutorialData]);
              
              if (error) throw error;
            }
            
            await loadData();
            setIsTutorialModalOpen(false);
            toast({
              title: "Tutorial guardado",
              description: "El tutorial ha sido guardado correctamente",
            });
          } catch (error) {
            console.error('Error saving tutorial:', error);
            toast({
              title: "Error",
              description: "Error al guardar el tutorial",
              variant: "destructive",
            });
          }
        }}
      />
    </div>
  );
};

// Modal para Flujos
const FlowModal = ({ 
  isOpen, 
  onClose, 
  flow, 
  onSave, 
  copyToClipboard 
}: {
  isOpen: boolean;
  onClose: () => void;
  flow: Flujo | null;
  onSave: (flow: any) => void;
  copyToClipboard: (text: string) => void;
}) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    imagen_url: '',
    link_descarga: '',
    pasos: [] as WorkflowStep[]
  });

  useEffect(() => {
    if (flow) {
      setFormData({
        nombre: flow.nombre,
        descripcion: flow.descripcion,
        imagen_url: flow.imagen_url || '',
        link_descarga: flow.link_descarga || '',
        pasos: flow.pasos || []
      });
    } else {
      setFormData({
        nombre: '',
        descripcion: '',
        imagen_url: '',
        link_descarga: '',
        pasos: []
      });
    }
  }, [flow, isOpen]);

  const addStep = () => {
    setFormData(prev => ({
      ...prev,
      pasos: [...prev.pasos, {
        id: Date.now().toString(),
        descripcion: '',
        codigo: '',
        videoUrl: ''
      }]
    }));
  };

  const updateStep = (stepId: string, field: keyof WorkflowStep, value: string) => {
    setFormData(prev => ({
      ...prev,
      pasos: prev.pasos.map(step => 
        step.id === stepId ? { ...step, [field]: value } : step
      )
    }));
  };

  const removeStep = (stepId: string) => {
    setFormData(prev => ({
      ...prev,
      pasos: prev.pasos.filter(step => step.id !== stepId)
    }));
  };

  const handleSave = () => {
    if (!formData.nombre || !formData.descripcion) {
      toast({
        title: "Error",
        description: "Nombre y descripción son obligatorios",
        variant: "destructive",
      });
      return;
    }

    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#1B3A57] text-xl">
            {flow ? 'Editar Flujo' : 'Nuevo Flujo'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nombre del flujo *</label>
              <Input
                value={formData.nombre}
                onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
                placeholder="Nombre del flujo"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Link de descarga</label>
              <Input
                value={formData.link_descarga}
                onChange={(e) => setFormData(prev => ({ ...prev, link_descarga: e.target.value }))}
                placeholder="https://..."
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Descripción corta *</label>
            <Textarea
              value={formData.descripcion}
              onChange={(e) => setFormData(prev => ({ ...prev, descripcion: e.target.value }))}
              placeholder="Descripción del flujo"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">URL de imagen de portada</label>
            <Input
              value={formData.imagen_url}
              onChange={(e) => setFormData(prev => ({ ...prev, imagen_url: e.target.value }))}
              placeholder="https://..."
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[#1B3A57]">Pasos del flujo</h3>
              <Button onClick={addStep} size="sm" className="bg-[#4A90E2] hover:bg-[#1B3A57]">
                <Plus className="w-4 h-4 mr-2" />
                Agregar paso
              </Button>
            </div>
            
            <div className="space-y-4">
              {formData.pasos.map((step, index) => (
                <Card key={step.id} className="p-4 border-l-4 border-l-[#4A90E2]">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-[#1B3A57]">Paso {index + 1}</h4>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeStep(step.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Descripción del paso</label>
                      <Input
                        value={step.descripcion}
                        onChange={(e) => updateStep(step.id, 'descripcion', e.target.value)}
                        placeholder="Descripción del paso"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Código o texto para copiar</label>
                      <div className="flex gap-2">
                        <Textarea
                          value={step.codigo}
                          onChange={(e) => updateStep(step.id, 'codigo', e.target.value)}
                          placeholder="Código o configuración para copiar"
                          rows={3}
                          className="flex-1"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(step.codigo)}
                          disabled={!step.codigo}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">URL de video (opcional)</label>
                      <Input
                        value={step.videoUrl || ''}
                        onChange={(e) => updateStep(step.id, 'videoUrl', e.target.value)}
                        placeholder="https://youtube.com/..."
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSave} className="bg-[#4A90E2] hover:bg-[#1B3A57]">
              Guardar flujo
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Modal para Tutoriales
const TutorialModal = ({ 
  isOpen, 
  onClose, 
  tutorial, 
  onSave 
}: {
  isOpen: boolean;
  onClose: () => void;
  tutorial: Tutorial | null;
  onSave: (tutorial: any) => void;
}) => {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    video_url: '',
    imagen_url: ''
  });

  useEffect(() => {
    if (tutorial) {
      setFormData({
        titulo: tutorial.titulo,
        descripcion: tutorial.descripcion || '',
        video_url: tutorial.video_url,
        imagen_url: tutorial.imagen_url || ''
      });
    } else {
      setFormData({
        titulo: '',
        descripcion: '',
        video_url: '',
        imagen_url: ''
      });
    }
  }, [tutorial, isOpen]);

  const handleSave = () => {
    if (!formData.titulo || !formData.video_url) {
      toast({
        title: "Error",
        description: "Título y URL de video son obligatorios",
        variant: "destructive",
      });
      return;
    }

    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-[#1B3A57] text-xl">
            {tutorial ? 'Editar Tutorial' : 'Nuevo Tutorial'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Título del tutorial *</label>
            <Input
              value={formData.titulo}
              onChange={(e) => setFormData(prev => ({ ...prev, titulo: e.target.value }))}
              placeholder="Título del tutorial"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">URL del video de YouTube *</label>
            <Input
              value={formData.video_url}
              onChange={(e) => setFormData(prev => ({ ...prev, video_url: e.target.value }))}
              placeholder="https://youtube.com/..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">URL de imagen de portada</label>
            <Input
              value={formData.imagen_url}
              onChange={(e) => setFormData(prev => ({ ...prev, imagen_url: e.target.value }))}
              placeholder="https://..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Descripción (opcional)</label>
            <Textarea
              value={formData.descripcion}
              onChange={(e) => setFormData(prev => ({ ...prev, descripcion: e.target.value }))}
              placeholder="Descripción del tutorial"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSave} className="bg-[#4A90E2] hover:bg-[#1B3A57]">
              Guardar tutorial
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminRecursosPrivado;
