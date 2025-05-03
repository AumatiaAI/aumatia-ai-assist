
import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const formSchema = z.object({
  correo: z.string().email({
    message: "Ingresa un correo electrónico válido"
  }),
  contraseña: z.string().min(1, {
    message: "La contraseña es requerida"
  }),
  recuerdame: z.boolean().optional(),
});

type FormData = z.infer<typeof formSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      correo: "",
      contraseña: "",
      recuerdame: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Login form submitted:', data);
      
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido de nuevo a Aumatia",
      });
      
    } catch (error) {
      toast({
        title: "Error al iniciar sesión",
        description: "Credenciales incorrectas o problema de conexión",
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
      
      <main className="flex-1 bg-gradient-primary">
        <div className="container mx-auto flex flex-col items-center justify-center py-16 px-4 mt-16 md:mt-24">
          <div className="text-center text-white mb-8">
            <h1 className="text-3xl font-bold mb-2">Inicia sesión en Aumatia</h1>
            <p className="text-lg">Accede a tu cuenta y gestiona tu agente personalizado.</p>
          </div>
          
          <Card className="w-full max-w-md shadow-lg animate-fade-in">
            <CardHeader className="text-center">
              <h2 className="text-2xl font-bold text-[#1B3A57]">Bienvenido</h2>
            </CardHeader>
            
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    name="contraseña"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type={showPassword ? "text" : "password"}
                              placeholder="•••••••••" 
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="recuerdame"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-1">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-normal">
                            Recuérdame
                          </FormLabel>
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
                        Iniciando sesión...
                      </>
                    ) : (
                      "Iniciar sesión"
                    )}
                  </Button>
                </form>
              </Form>
              
              <div className="my-6 flex items-center">
                <Separator className="flex-1" />
                <span className="mx-4 text-sm text-gray-500">o entra con</span>
                <Separator className="flex-1" />
              </div>
              
              <Button variant="outline" className="w-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-800">
                <img 
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                  alt="Google logo" 
                  className="mr-2 h-5 w-5" 
                />
                Iniciar sesión con Google
              </Button>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4 text-center text-sm text-gray-600">
              <a href="#" className="text-primary hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
              <p>
                ¿Aún no tienes cuenta?{" "}
                <Link to="/crear-cuenta" className="text-primary hover:underline font-medium">
                  👉 Crear una cuenta
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
