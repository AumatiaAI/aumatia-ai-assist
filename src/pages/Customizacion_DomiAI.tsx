
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Customizacion_DomiAI = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [sliding, setSliding] = useState<'right' | 'left' | null>(null);
  const [formData, setFormData] = useState({
    // Sección 1
    restaurantName: "",
    phoneNumber: "",
    foodType: "",
    address: "",
    city: "",
    schedule: "",
    
    // Sección 2
    services: {
      menu: false,
      orders: false,
      reservations: false,
      schedules: false,
      location: false,
      promotions: false,
      humanContact: false,
      other: false,
      otherText: ""
    },
    humanAttention: "",
    botTone: "",
    customTone: "",
    
    // Sección 3
    menuFile: null as File | null,
    promotions: "",
    faqs: "",
    
    // Sección 4
    logo: null as File | null,
    collectCustomerData: "",
    paymentMethods: {
      bold: false,
      nequi: false,
      daviplata: false,
      cash: false
    },
    usesCRM: "",
    crmName: "",
    deliveryLimit: 0
  });
  
  const navigate = useNavigate();
  
  const totalSteps = 4;
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
  
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setSliding('left');
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setSliding(null);
      }, 300);
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 1) {
      setSliding('right');
      setTimeout(() => {
        setCurrentStep(prev => prev - 1);
        setSliding(null);
      }, 300);
    }
  };
  
  const handleInputChange = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };
  
  const handleDirectInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleCheckboxChange = (section: string, field: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: checked
      }
    }));
  };
  
  const handleFileChange = (field: string, file: File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const handleFinish = () => {
    // Here you would typically send the data to your backend
    toast.success("¡Personalización completada con éxito!");
    // Navigate to WhatsApp linking page
    navigate("/Vinculacion_Whatsapp.html");
  };
  
  // Check if we can proceed to the next step
  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return formData.restaurantName && 
               formData.phoneNumber && 
               formData.foodType && 
               formData.address && 
               formData.city && 
               formData.schedule;
      case 2:
        return (
          (formData.services.menu || 
           formData.services.orders || 
           formData.services.reservations || 
           formData.services.schedules || 
           formData.services.location || 
           formData.services.promotions || 
           formData.services.humanContact || 
           formData.services.other) && 
          formData.humanAttention && 
          formData.botTone
        );
      case 3:
        return true; // All fields in step 3 are optional
      case 4:
        return formData.collectCustomerData !== "" && 
               (formData.paymentMethods.bold || 
                formData.paymentMethods.nequi || 
                formData.paymentMethods.daviplata || 
                formData.paymentMethods.cash) && 
               formData.usesCRM !== "";
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-primary">
      <Header />
      
      <main className="flex-1 flex flex-col pt-24 pb-12 px-4">
        {/* Progress Steps */}
        <div className="container mx-auto mb-8">
          <div className="flex justify-between items-center mb-2 overflow-x-auto py-2">
            {['Información básica', 'Servicios', 'Menú y promociones', 'Personalización'].map((step, index) => (
              <div key={index} className="flex flex-col items-center min-w-[80px] px-2">
                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-full 
                  ${currentStep > index + 1 ? 'bg-white border-2 border-primary text-primary' : 
                    currentStep === index + 1 ? 'bg-primary text-white' : 
                    'bg-gray-200 text-gray-500'}
                  transition-all duration-200
                `}>
                  {index + 1}
                </div>
                <span className="text-xs text-white mt-1 text-center">{step}</span>
              </div>
            ))}
          </div>
          
          <Progress value={progressPercentage} className="h-2" />
        </div>
        
        <div className="container mx-auto max-w-3xl">
          {/* Form Steps */}
          <Card className={`
            w-full overflow-hidden transition-all duration-300 transform
            ${sliding === 'left' ? '-translate-x-full opacity-0' : 
              sliding === 'right' ? 'translate-x-full opacity-0' : 
              'translate-x-0 opacity-100'}
          `}>
            <CardContent className="p-6">
              {/* Step 1: Restaurant Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h1 className="text-2xl font-bold text-center mb-6 text-secondary">Información básica del restaurante</h1>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="restaurantName">¿Cómo se llama tu restaurante?</Label>
                      <Input 
                        id="restaurantName" 
                        placeholder="Nombre del restaurante" 
                        value={formData.restaurantName}
                        onChange={(e) => handleDirectInputChange('restaurantName', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phoneNumber">¿A qué número estará conectado el chatbot de WhatsApp?</Label>
                      <Input 
                        id="phoneNumber" 
                        type="tel" 
                        placeholder="Ej: +573001234567" 
                        value={formData.phoneNumber}
                        onChange={(e) => handleDirectInputChange('phoneNumber', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="foodType">¿Qué tipo de comida ofreces?</Label>
                      <Input 
                        id="foodType" 
                        placeholder="Ej: rápida, gourmet, japonesa" 
                        value={formData.foodType}
                        onChange={(e) => handleDirectInputChange('foodType', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="address">Dirección exacta del restaurante</Label>
                      <Input 
                        id="address" 
                        placeholder="Dirección completa" 
                        value={formData.address}
                        onChange={(e) => handleDirectInputChange('address', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="city">Ciudad donde opera el restaurante</Label>
                      <Input 
                        id="city" 
                        placeholder="Nombre de la ciudad" 
                        value={formData.city}
                        onChange={(e) => handleDirectInputChange('city', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="schedule">¿Cuáles son tus días y horarios de atención?</Label>
                      <Textarea 
                        id="schedule" 
                        placeholder="Ej: Lunes a Viernes: 8am - 10pm, Sábados y Domingos: 9am - 11pm" 
                        value={formData.schedule}
                        onChange={(e) => handleDirectInputChange('schedule', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end pt-4">
                    <Button 
                      onClick={handleNext} 
                      disabled={!canProceedToNext()}
                    >
                      Siguiente
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Step 2: Bot Services */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h1 className="text-2xl font-bold text-center mb-6 text-secondary">Servicios y experiencia del cliente</h1>
                  
                  <div className="space-y-2">
                    <Label className="text-base font-medium">¿Qué quieres que el bot pueda hacer?</Label>
                    
                    <div className="grid gap-2 pt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="menu" 
                          checked={formData.services.menu}
                          onCheckedChange={(checked) => handleCheckboxChange('services', 'menu', checked as boolean)}
                        />
                        <Label htmlFor="menu" className="font-normal">Ver menú</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="orders" 
                          checked={formData.services.orders}
                          onCheckedChange={(checked) => handleCheckboxChange('services', 'orders', checked as boolean)}
                        />
                        <Label htmlFor="orders" className="font-normal">Hacer pedidos</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="reservations" 
                          checked={formData.services.reservations}
                          onCheckedChange={(checked) => handleCheckboxChange('services', 'reservations', checked as boolean)}
                        />
                        <Label htmlFor="reservations" className="font-normal">Reservar mesa</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="schedules" 
                          checked={formData.services.schedules}
                          onCheckedChange={(checked) => handleCheckboxChange('services', 'schedules', checked as boolean)}
                        />
                        <Label htmlFor="schedules" className="font-normal">Mostrar horarios</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="location" 
                          checked={formData.services.location}
                          onCheckedChange={(checked) => handleCheckboxChange('services', 'location', checked as boolean)}
                        />
                        <Label htmlFor="location" className="font-normal">Mostrar ubicación</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="promotions" 
                          checked={formData.services.promotions}
                          onCheckedChange={(checked) => handleCheckboxChange('services', 'promotions', checked as boolean)}
                        />
                        <Label htmlFor="promotions" className="font-normal">Mostrar promociones</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="humanContact" 
                          checked={formData.services.humanContact}
                          onCheckedChange={(checked) => handleCheckboxChange('services', 'humanContact', checked as boolean)}
                        />
                        <Label htmlFor="humanContact" className="font-normal">Contactar con un humano</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="other" 
                          checked={formData.services.other}
                          onCheckedChange={(checked) => handleCheckboxChange('services', 'other', checked as boolean)}
                        />
                        <Label htmlFor="other" className="font-normal">Otro</Label>
                      </div>
                      
                      {formData.services.other && (
                        <div className="ml-6">
                          <Input 
                            placeholder="Especifica otra funcionalidad" 
                            value={formData.services.otherText}
                            onChange={(e) => handleInputChange('services', 'otherText', e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-base font-medium">¿El bot debe permitir cambiar a atención humana en cualquier momento?</Label>
                    <RadioGroup 
                      value={formData.humanAttention} 
                      onValueChange={(value) => handleDirectInputChange('humanAttention', value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="humanAttentionYes" />
                        <Label htmlFor="humanAttentionYes" className="font-normal">Sí</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="humanAttentionNo" />
                        <Label htmlFor="humanAttentionNo" className="font-normal">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-base font-medium">¿Qué tono prefieres para el bot?</Label>
                    <RadioGroup 
                      value={formData.botTone} 
                      onValueChange={(value) => handleDirectInputChange('botTone', value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="formal" id="toneFormal" />
                        <Label htmlFor="toneFormal" className="font-normal">Formal</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="friendly" id="toneFriendly" />
                        <Label htmlFor="toneFriendly" className="font-normal">Cercano / amigable</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="fun" id="toneFun" />
                        <Label htmlFor="toneFun" className="font-normal">Divertido / con emojis</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="custom" id="toneCustom" />
                        <Label htmlFor="toneCustom" className="font-normal">Otro</Label>
                      </div>
                    </RadioGroup>
                    
                    {formData.botTone === 'custom' && (
                      <div className="ml-6 mt-2">
                        <Input 
                          placeholder="Describe el tono que prefieres" 
                          value={formData.customTone}
                          onChange={(e) => handleDirectInputChange('customTone', e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={handlePrevious}>
                      Atrás
                    </Button>
                    <Button 
                      onClick={handleNext} 
                      disabled={!canProceedToNext()}
                    >
                      Siguiente
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Step 3: Menu and Promotions */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h1 className="text-2xl font-bold text-center mb-6 text-secondary">Menú y promociones</h1>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="menuFile" className="block mb-2">Sube tu menú</Label>
                      <Input
                        id="menuFile"
                        type="file"
                        accept=".pdf,.xlsx,.xls,.csv"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          handleFileChange('menuFile', file);
                        }}
                      />
                      <p className="text-xs text-gray-500 mt-1">Formatos aceptados: PDF, Excel</p>
                    </div>
                    
                    <div>
                      <Label htmlFor="promotions">¿Tienes promociones o combos frecuentes?</Label>
                      <Textarea
                        id="promotions"
                        placeholder="Describe tus promociones o combos habituales"
                        value={formData.promotions}
                        onChange={(e) => handleDirectInputChange('promotions', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="faqs">¿Preguntas frecuentes que el bot debe responder automáticamente?</Label>
                      <Textarea
                        id="faqs"
                        placeholder="Escribe las preguntas más comunes de tus clientes y sus respuestas"
                        className="min-h-[120px]"
                        value={formData.faqs}
                        onChange={(e) => handleDirectInputChange('faqs', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={handlePrevious}>
                      Atrás
                    </Button>
                    <Button onClick={handleNext}>
                      Siguiente
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Step 4: Advanced Customization */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h1 className="text-2xl font-bold text-center mb-6 text-secondary">Personalización avanzada</h1>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="logo" className="block mb-2">Sube tu logo (PNG, JPG o SVG)</Label>
                      <Input
                        id="logo"
                        type="file"
                        accept=".png,.jpg,.jpeg,.svg"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          handleFileChange('logo', file);
                        }}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-base font-medium">¿Quieres recopilar datos de los clientes?</Label>
                      <RadioGroup 
                        value={formData.collectCustomerData} 
                        onValueChange={(value) => handleDirectInputChange('collectCustomerData', value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="collectDataYes" />
                          <Label htmlFor="collectDataYes" className="font-normal">Sí</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="collectDataNo" />
                          <Label htmlFor="collectDataNo" className="font-normal">No</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-base font-medium">¿Cómo deseas que tus clientes paguen?</Label>
                      
                      <div className="grid gap-2 pt-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="bold" 
                            checked={formData.paymentMethods.bold}
                            onCheckedChange={(checked) => handleCheckboxChange('paymentMethods', 'bold', checked as boolean)}
                          />
                          <Label htmlFor="bold" className="font-normal">Pasarela de pagos (Bold)</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="nequi" 
                            checked={formData.paymentMethods.nequi}
                            onCheckedChange={(checked) => handleCheckboxChange('paymentMethods', 'nequi', checked as boolean)}
                          />
                          <Label htmlFor="nequi" className="font-normal">Nequi</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="daviplata" 
                            checked={formData.paymentMethods.daviplata}
                            onCheckedChange={(checked) => handleCheckboxChange('paymentMethods', 'daviplata', checked as boolean)}
                          />
                          <Label htmlFor="daviplata" className="font-normal">Daviplata</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="cash" 
                            checked={formData.paymentMethods.cash}
                            onCheckedChange={(checked) => handleCheckboxChange('paymentMethods', 'cash', checked as boolean)}
                          />
                          <Label htmlFor="cash" className="font-normal">Efectivo</Label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-base font-medium">¿Usas un sistema de pedidos o CRM?</Label>
                      <RadioGroup 
                        value={formData.usesCRM} 
                        onValueChange={(value) => handleDirectInputChange('usesCRM', value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="crmYes" />
                          <Label htmlFor="crmYes" className="font-normal">Sí</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="crmNo" />
                          <Label htmlFor="crmNo" className="font-normal">No</Label>
                        </div>
                      </RadioGroup>
                      
                      {formData.usesCRM === 'yes' && (
                        <div className="ml-6 mt-2">
                          <Input 
                            placeholder="¿Cuál sistema utilizas?" 
                            value={formData.crmName}
                            onChange={(e) => handleDirectInputChange('crmName', e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="deliveryLimit">¿Tienes límite de cobertura para domicilios? (en km)</Label>
                      <Input 
                        id="deliveryLimit" 
                        type="number"
                        min="0"
                        step="0.1"
                        placeholder="Ej: 5" 
                        value={formData.deliveryLimit || ""}
                        onChange={(e) => handleDirectInputChange('deliveryLimit', Number(e.target.value))}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={handlePrevious}>
                      Atrás
                    </Button>
                    <Button 
                      onClick={handleFinish} 
                      disabled={!canProceedToNext()}
                    >
                      Finalizar personalización
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Confirmation */}
              {currentStep === 5 && (
                <div className="space-y-6 py-8">
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-secondary">¡Listo!</h2>
                    <p className="text-gray-600">Has personalizado tu asistente DomiAI. Ahora vamos a vincularlo con tu WhatsApp.</p>
                  </div>
                  
                  <div className="flex justify-center pt-6">
                    <Button 
                      className="px-8"
                      onClick={() => navigate("/Vinculacion_Whatsapp.html")}
                    >
                      Vincular con WhatsApp
                    </Button>
                  </div>
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

export default Customizacion_DomiAI;
