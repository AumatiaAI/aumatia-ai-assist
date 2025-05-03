
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Edit, CreditCard, Check } from 'lucide-react';

const PagoYResumen = () => {
  const navigate = useNavigate();
  const [selectedFrequency, setSelectedFrequency] = useState<'monthly' | 'semiannual' | 'annual'>('monthly');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      cardName: '',
      cardNumber: '',
      cardExpiry: '',
      cardCvc: '',
      acceptTerms: false,
    },
  });

  const prices = {
    monthly: 50,
    semiannual: 270, // 10% discount
    annual: 480 // 20% discount
  };

  const handleSubmit = form.handleSubmit((data) => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/pago-exitoso');
    }, 2000);
  });

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s/g, '')
      .replace(/(\d{4})/g, '$1 ')
      .trim();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#4A90E2] to-[#1B3A57]">
      <Header />
      
      <main className="flex-1 py-24 px-4 md:px-8 mt-5 scroll-mt-20">
        <div className="max-w-3xl mx-auto mb-16 text-center text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Resumen y pago de tu agente
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Revisa tu configuración y selecciona cómo quieres pagar tu plan para activar DomiAI.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Plan Summary Card */}
          <Card className="animate-fade-in">
            <CardContent className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">Plan Plus</h2>
                <div className="text-right">
                  <div className="text-2xl font-bold">${prices[selectedFrequency]} USD</div>
                  <div className="text-sm text-gray-500">
                    {selectedFrequency === 'monthly' ? 'Pago mensual' : 
                     selectedFrequency === 'semiannual' ? 'Pago semestral (ahorro 10%)' : 
                     'Pago anual (ahorro 20%)'}
                  </div>
                </div>
              </div>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-3">
                  <Check size={18} className="text-green-500" />
                  <span>Mensajes ilimitados</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={18} className="text-green-500" />
                  <span>3 personalizaciones al mes</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={18} className="text-green-500" />
                  <span>8 mensajes de marketing al mes</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={18} className="text-green-500" />
                  <span>Soporte 24/7</span>
                </li>
              </ul>
              
              <Button variant="link" asChild className="p-0 text-primary hover:text-primary/80">
                <a href="/productos">Cambiar plan</a>
              </Button>
            </CardContent>
          </Card>
          
          {/* Payment Frequency */}
          <div className="animate-fade-in">
            <h2 className="text-xl font-bold text-white mb-4">¿Cómo deseas pagar tu plan?</h2>
            
            <RadioGroup 
              value={selectedFrequency}
              onValueChange={(value) => setSelectedFrequency(value as 'monthly' | 'semiannual' | 'annual')}
              className="grid gap-4"
            >
              <label className="cursor-pointer">
                <div className={`flex items-center justify-between p-4 rounded-lg bg-white ${selectedFrequency === 'monthly' ? 'ring-2 ring-primary' : 'hover:bg-white/90'}`}>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="monthly" id="monthly" />
                    <span className="font-medium">Mensual</span>
                  </div>
                  <div className="font-semibold">$50 USD</div>
                </div>
              </label>
              
              <label className="cursor-pointer">
                <div className={`flex items-center justify-between p-4 rounded-lg bg-white ${selectedFrequency === 'semiannual' ? 'ring-2 ring-primary' : 'hover:bg-white/90'}`}>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="semiannual" id="semiannual" />
                    <span className="font-medium">Semestral</span>
                  </div>
                  <div>
                    <span className="font-semibold">$270 USD</span>
                    <span className="ml-2 text-green-600 text-sm font-medium">Ahorra 10%</span>
                  </div>
                </div>
              </label>
              
              <label className="cursor-pointer">
                <div className={`flex items-center justify-between p-4 rounded-lg bg-white ${selectedFrequency === 'annual' ? 'ring-2 ring-primary' : 'hover:bg-white/90'}`}>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="annual" id="annual" />
                    <span className="font-medium">Anual</span>
                  </div>
                  <div>
                    <span className="font-semibold">$480 USD</span>
                    <span className="ml-2 text-green-600 text-sm font-medium">Ahorra 20%</span>
                  </div>
                </div>
              </label>
            </RadioGroup>
            
            <div className="mt-4 text-center text-white">
              <p className="text-lg">
                Total a pagar: <span className="font-bold text-xl">${prices[selectedFrequency]} USD</span>
              </p>
            </div>
          </div>
          
          {/* Customization Summary */}
          <Card className="bg-gray-50 animate-fade-in">
            <CardContent className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold">Personalización de tu asistente</h2>
                <Button variant="ghost" size="sm" asChild className="flex items-center gap-2">
                  <a href="/customizacion-domiai">
                    <Edit size={16} />
                    <span>Editar información</span>
                  </a>
                </Button>
              </div>
              
              <ul className="space-y-3">
                <li className="flex gap-2">
                  <span className="text-gray-500">🧷 Restaurante:</span>
                  <span className="font-medium">La Esquina del Sabor</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-500">Tipo de comida:</span>
                  <span className="font-medium">Comida rápida mexicana</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-500">Horario:</span>
                  <span className="font-medium">Lunes a sábado, 11 am – 9 pm</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-500">Pagos aceptados:</span>
                  <span className="font-medium">Nequi, Daviplata, Tarjeta</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-500">Estilo del bot:</span>
                  <span className="font-medium">Cercano con emojis</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          {/* Payment Information */}
          <Card className="animate-fade-in">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                <CreditCard size={20} />
                <span>Información de pago</span>
              </h2>
              
              <Form {...form}>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="cardName"
                    rules={{ required: "El nombre es obligatorio" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre en la tarjeta</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Juan Pérez"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="cardNumber"
                    rules={{ 
                      required: "El número de tarjeta es obligatorio",
                      pattern: {
                        value: /^[\d\s]{16,19}$/,
                        message: "Número de tarjeta inválido"
                      }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número de tarjeta</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="1234 5678 9012 3456"
                            {...field}
                            onChange={(e) => {
                              const formatted = formatCardNumber(e.target.value);
                              field.onChange(formatted);
                            }}
                            maxLength={19}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="cardExpiry"
                      rules={{ 
                        required: "La fecha de vencimiento es obligatoria",
                        pattern: {
                          value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                          message: "Formato inválido (MM/AA)"
                        }
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fecha de vencimiento</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="MM/AA"
                              {...field}
                              maxLength={5}
                              onChange={(e) => {
                                let value = e.target.value.replace(/\D/g, '');
                                if (value.length > 2) {
                                  value = value.slice(0, 2) + '/' + value.slice(2, 4);
                                }
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="cardCvc"
                      rules={{ 
                        required: "El CVC es obligatorio",
                        pattern: {
                          value: /^\d{3,4}$/,
                          message: "Debe tener 3 o 4 dígitos"
                        }
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CVC</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="123"
                              {...field}
                              maxLength={4}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="pt-2">
                    <div className="flex items-start space-x-3">
                      <Checkbox 
                        id="terms" 
                        checked={form.watch('acceptTerms')}
                        onCheckedChange={(checked) => {
                          form.setValue('acceptTerms', checked === true);
                        }}
                        className="mt-1"
                      />
                      <label 
                        htmlFor="terms" 
                        className="text-sm text-gray-700 cursor-pointer leading-relaxed"
                      >
                        Acepto los <a href="#" className="text-primary hover:underline">Términos y condiciones</a> y autorizo el cobro automático del plan seleccionado.
                      </label>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full py-6 text-lg transition-all"
                    disabled={isSubmitting || !form.watch('acceptTerms')}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Procesando...
                      </div>
                    ) : "Confirmar y pagar"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PagoYResumen;
