
import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Mail, User, Phone, Lock, EyeOff, Eye } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const formSchema = z.object({
  nombre_completo: z.string().min(3, {
    message: "El nombre completo debe tener al menos 3 caracteres"
  }),
  correo: z.string().email({
    message: "Ingresa un correo electrónico válido"
  }),
  whatsapp: z.string().min(8, {
    message: "Ingresa un número de WhatsApp válido"
  }),
  contraseña: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres"
  }),
  checkbox_terminos: z.literal(true, {
    errorMap: () => ({ message: "Debes aceptar los términos y condiciones para continuar" }),
  }),
});

type FormData = z.infer<typeof formSchema>;

const CrearCuenta = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre_completo: "",
      correo: "",
      whatsapp: "",
      contraseña: "",
      checkbox_terminos: false as any, // Cast to 'any' to fix TypeScript error
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form data submitted:', data);
      
      toast({
        title: "Cuenta creada correctamente",
        description: "Te hemos enviado un correo para verificar tu cuenta",
      });
      
      // Reset form
      form.reset();
    } catch (error) {
      toast({
        title: "Error al crear la cuenta",
        description: "Por favor intenta nuevamente",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="flex-1 container mx-auto flex flex-col items-center justify-center py-16 px-4 mt-16 md:mt-24">
        <Card className="w-full max-w-md shadow-lg animate-fade-in mt-10 md:mt-6">
          <CardHeader className="text-center">
            <h2 className="text-2xl font-bold text-[#1B3A57] mb-2">Crea tu cuenta</h2>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="nombre_completo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre completo</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input placeholder="Ej: Laura Martínez" {...field} className="pl-10" />
                          <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="correo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo electrónico</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type="email" placeholder="Ej: hola@miempresa.com" {...field} className="pl-10" />
                          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="whatsapp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>WhatsApp (prioridad de contacto)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input placeholder="Ej: +57 300 123 4567" {...field} className="pl-10" />
                          <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="contraseña"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Crea una contraseña segura" 
                            {...field} 
                            className="pl-10"
                          />
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            className="absolute right-1 top-1" 
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? 
                              <EyeOff className="h-4 w-4 text-gray-400" /> : 
                              <Eye className="h-4 w-4 text-gray-400" />
                            }
                          </Button>
                        </div>
                      </FormControl>
                      <FormDescription className="text-xs">
                        Mínimo 6 caracteres
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="checkbox_terminos"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                      <FormControl>
                        <Checkbox 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal">
                          Acepto los <a href="#" className="text-primary hover:underline">Términos y Condiciones</a> y la <a href="#" className="text-primary hover:underline">Política de privacidad</a>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full mt-2 bg-primary hover:bg-primary/90" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                      Creando cuenta...
                    </>
                  ) : (
                    "Crear cuenta"
                  )}
                </Button>
              </form>
            </Form>
            
            <div className="my-6 flex items-center">
              <Separator className="flex-1" />
              <span className="mx-4 text-sm text-gray-500">o continúa con</span>
              <Separator className="flex-1" />
            </div>
            
            <Button variant="outline" className="w-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-800">
              <img 
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                alt="Google logo" 
                className="mr-2 h-5 w-5" 
              />
              Registrarme con Google
            </Button>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4 text-center text-sm text-gray-600">
            <p>
              Al crear tu cuenta, podrás activar tu agente, personalizarlo y empezar a recibir pedidos automatizados por WhatsApp.
            </p>
            <p>
              ¿Ya tienes una cuenta?{" "}
              <Link to="/" className="text-primary hover:underline font-medium">
                👉 Inicia sesión aquí
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default CrearCuenta;
