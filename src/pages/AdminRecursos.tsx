import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Copy, CheckCircle, Eye } from 'lucide-react';

interface WorkflowStep {
  id: string;
  description: string;
  instruction: string;
  youtubeUrl?: string;
  completed: boolean;
}

interface Workflow {
  id: string;
  name: string;
  description: string;
  downloadLink: string;
  steps: WorkflowStep[];
  createdAt: string;
}

interface Tutorial {
  id: string;
  title: string;
  youtubeUrl: string;
  description?: string;
  createdAt: string;
}

const AdminRecursos = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState(false);
  const [isTutorialModalOpen, setIsTutorialModalOpen] = useState(false);
  const [editingWorkflow, setEditingWorkflow] = useState<Workflow | null>(null);
  const [editingTutorial, setEditingTutorial] = useState<Tutorial | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load data from localStorage
  useEffect(() => {
    const savedWorkflows = localStorage.getItem('admin_workflows');
    const savedTutorials = localStorage.getItem('admin_tutorials');
    
    if (savedWorkflows) {
      setWorkflows(JSON.parse(savedWorkflows));
    }
    if (savedTutorials) {
      setTutorials(JSON.parse(savedTutorials));
    }
  }, []);

  const saveWorkflows = (newWorkflows: Workflow[]) => {
    localStorage.setItem('admin_workflows', JSON.stringify(newWorkflows));
    setWorkflows(newWorkflows);
  };

  const saveTutorials = (newTutorials: Tutorial[]) => {
    localStorage.setItem('admin_tutorials', JSON.stringify(newTutorials));
    setTutorials(newTutorials);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado",
      description: "Instrucción copiada al portapapeles",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-[#1B3A57] mb-2">
            Administración de Recursos
          </h1>
          <p className="text-gray-600">
            Gestiona flujos de trabajo y tutoriales para Aumatia
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Workflows Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-[#1B3A57]">
                Gestión de Flujos
              </h2>
              <Button
                onClick={() => {
                  setEditingWorkflow(null);
                  setIsWorkflowModalOpen(true);
                }}
                className="bg-[#4A90E2] hover:bg-[#1B3A57] transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Flujo
              </Button>
            </div>

            <div className="space-y-4">
              {workflows.map((workflow) => (
                <Card key={workflow.id} className="border border-gray-200 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#1B3A57] mb-1">
                          {workflow.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {workflow.description}
                        </p>
                        <p className="text-xs text-gray-500">
                          {workflow.steps.length} pasos • {workflow.createdAt}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingWorkflow(workflow);
                            setIsWorkflowModalOpen(true);
                          }}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            if (confirm('¿Eliminar este flujo?')) {
                              const newWorkflows = workflows.filter(w => w.id !== workflow.id);
                              saveWorkflows(newWorkflows);
                              toast({
                                title: "Flujo eliminado",
                                description: "El flujo ha sido eliminado correctamente",
                              });
                            }
                          }}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Tutorials Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-[#1B3A57]">
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
              {tutorials.map((tutorial) => (
                <Card key={tutorial.id} className="border border-gray-200 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#1B3A57] mb-1">
                          {tutorial.title}
                        </h3>
                        {tutorial.description && (
                          <p className="text-gray-600 text-sm mb-2">
                            {tutorial.description}
                          </p>
                        )}
                        <p className="text-xs text-gray-500">
                          {tutorial.createdAt}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(tutorial.youtubeUrl, '_blank')}
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
                          onClick={() => {
                            if (confirm('¿Eliminar este tutorial?')) {
                              const newTutorials = tutorials.filter(t => t.id !== tutorial.id);
                              saveTutorials(newTutorials);
                              toast({
                                title: "Tutorial eliminado",
                                description: "El tutorial ha sido eliminado correctamente",
                              });
                            }
                          }}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Workflow Modal */}
      <WorkflowModal
        isOpen={isWorkflowModalOpen}
        onClose={() => setIsWorkflowModalOpen(false)}
        workflow={editingWorkflow}
        onSave={(workflow) => {
          if (editingWorkflow) {
            const newWorkflows = workflows.map(w => 
              w.id === workflow.id ? workflow : w
            );
            saveWorkflows(newWorkflows);
          } else {
            saveWorkflows([...workflows, workflow]);
          }
          setIsWorkflowModalOpen(false);
          toast({
            title: "Flujo guardado",
            description: "El flujo ha sido guardado correctamente",
          });
        }}
        copyToClipboard={copyToClipboard}
      />

      {/* Tutorial Modal */}
      <TutorialModal
        isOpen={isTutorialModalOpen}
        onClose={() => setIsTutorialModalOpen(false)}
        tutorial={editingTutorial}
        onSave={(tutorial) => {
          if (editingTutorial) {
            const newTutorials = tutorials.map(t => 
              t.id === tutorial.id ? tutorial : t
            );
            saveTutorials(newTutorials);
          } else {
            saveTutorials([...tutorials, tutorial]);
          }
          setIsTutorialModalOpen(false);
          toast({
            title: "Tutorial guardado",
            description: "El tutorial ha sido guardado correctamente",
          });
        }}
      />
    </div>
  );
};

// Workflow Modal Component
const WorkflowModal = ({ 
  isOpen, 
  onClose, 
  workflow, 
  onSave, 
  copyToClipboard 
}: {
  isOpen: boolean;
  onClose: () => void;
  workflow: Workflow | null;
  onSave: (workflow: Workflow) => void;
  copyToClipboard: (text: string) => void;
}) => {
  const [formData, setFormData] = useState<Omit<Workflow, 'id' | 'createdAt'>>({
    name: '',
    description: '',
    downloadLink: '',
    steps: []
  });

  useEffect(() => {
    if (workflow) {
      setFormData({
        name: workflow.name,
        description: workflow.description,
        downloadLink: workflow.downloadLink,
        steps: workflow.steps
      });
    } else {
      setFormData({
        name: '',
        description: '',
        downloadLink: '',
        steps: []
      });
    }
  }, [workflow, isOpen]);

  const addStep = () => {
    setFormData(prev => ({
      ...prev,
      steps: [...prev.steps, {
        id: Date.now().toString(),
        description: '',
        instruction: '',
        youtubeUrl: '',
        completed: false
      }]
    }));
  };

  const updateStep = (stepId: string, field: keyof WorkflowStep, value: any) => {
    setFormData(prev => ({
      ...prev,
      steps: prev.steps.map(step => 
        step.id === stepId ? { ...step, [field]: value } : step
      )
    }));
  };

  const removeStep = (stepId: string) => {
    setFormData(prev => ({
      ...prev,
      steps: prev.steps.filter(step => step.id !== stepId)
    }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.description) {
      toast({
        title: "Error",
        description: "Nombre y descripción son obligatorios",
        variant: "destructive",
      });
      return;
    }

    const savedWorkflow: Workflow = {
      id: workflow?.id || Date.now().toString(),
      ...formData,
      createdAt: workflow?.createdAt || new Date().toLocaleDateString()
    };

    onSave(savedWorkflow);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#1B3A57]">
            {workflow ? 'Editar Flujo' : 'Nuevo Flujo'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nombre del flujo</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Nombre del flujo"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Link de descarga</label>
              <Input
                value={formData.downloadLink}
                onChange={(e) => setFormData(prev => ({ ...prev, downloadLink: e.target.value }))}
                placeholder="https://..."
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Descripción corta</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Descripción del flujo"
              rows={3}
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
              {formData.steps.map((step, index) => (
                <Card key={step.id} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-[#1B3A57]">Paso {index + 1}</h4>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => updateStep(step.id, 'completed', !step.completed)}
                        className={step.completed ? 'text-green-600' : 'text-gray-400'}
                      >
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeStep(step.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Descripción del paso</label>
                      <Input
                        value={step.description}
                        onChange={(e) => updateStep(step.id, 'description', e.target.value)}
                        placeholder="Descripción del paso"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Instrucción para copiar</label>
                      <div className="flex gap-2">
                        <Textarea
                          value={step.instruction}
                          onChange={(e) => updateStep(step.id, 'instruction', e.target.value)}
                          placeholder="Codigo o configuración para copiar"
                          rows={3}
                          className="flex-1"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(step.instruction)}
                          disabled={!step.instruction}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">URL de video (opcional)</label>
                      <Input
                        value={step.youtubeUrl || ''}
                        onChange={(e) => updateStep(step.id, 'youtubeUrl', e.target.value)}
                        placeholder="https://youtube.com/..."
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3">
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

// Tutorial Modal Component
const TutorialModal = ({ 
  isOpen, 
  onClose, 
  tutorial, 
  onSave 
}: {
  isOpen: boolean;
  onClose: () => void;
  tutorial: Tutorial | null;
  onSave: (tutorial: Tutorial) => void;
}) => {
  const [formData, setFormData] = useState<Omit<Tutorial, 'id' | 'createdAt'>>({
    title: '',
    youtubeUrl: '',
    description: ''
  });

  useEffect(() => {
    if (tutorial) {
      setFormData({
        title: tutorial.title,
        youtubeUrl: tutorial.youtubeUrl,
        description: tutorial.description || ''
      });
    } else {
      setFormData({
        title: '',
        youtubeUrl: '',
        description: ''
      });
    }
  }, [tutorial, isOpen]);

  const handleSave = () => {
    if (!formData.title || !formData.youtubeUrl) {
      toast({
        title: "Error",
        description: "Título y URL de YouTube son obligatorios",
        variant: "destructive",
      });
      return;
    }

    const savedTutorial: Tutorial = {
      id: tutorial?.id || Date.now().toString(),
      ...formData,
      createdAt: tutorial?.createdAt || new Date().toLocaleDateString()
    };

    onSave(savedTutorial);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-[#1B3A57]">
            {tutorial ? 'Editar Tutorial' : 'Nuevo Tutorial'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Título del tutorial</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Título del tutorial"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">URL del video de YouTube</label>
            <Input
              value={formData.youtubeUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, youtubeUrl: e.target.value }))}
              placeholder="https://youtube.com/..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Descripción (opcional)</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Descripción del tutorial"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3">
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

export default AdminRecursos;
