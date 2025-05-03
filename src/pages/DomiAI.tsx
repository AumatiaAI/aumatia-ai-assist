
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { CheckIcon } from 'lucide-react';

const DomiAI: React.FC = () => {
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

  return (
    <div className="flex flex-col min-h-screen font-poppins">
      <Header />
      
      <main className="flex-grow pt-24">
        {/* Hero Section - UPDATED to optimize image size and position */}
        <section className="bg-gradient-primary text-white py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-3/5 mb-10 md:mb-0 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  DomiAI: Tu asistente para pedidos en WhatsApp
                </h1>
                <p className="text-lg md:text-xl mb-8 text-white/90">
                  Automatiza tus pedidos con inteligencia artificial, responde en tiempo real y cobra sin levantar un dedo.
                </p>
                <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-medium text-lg px-8">
                  <a href="/CrearCuenta.html">Activar ahora</a>
                </Button>
              </div>
              
              <div className="md:w-2/5 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-100">
                <div className="relative flex justify-center h-full items-center">
                  <img
                    src="https://i.imgur.com/S0x8zFg.png"
                    alt="DomiAI Logo"
                    className="w-full max-w-md object-contain drop-shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What is DomiAI? Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
              ¿Qué es DomiAI?
            </h2>
            <p className="text-lg text-gray-700 mb-8 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-100">
              DomiAI_V0.1 es un agente conversacional innovador desarrollado por Aumatia, diseñado para automatizar la gestión de pedidos a través de WhatsApp. Este agente es capaz de recibir mensajes tanto de texto como de audio, interpretarlos y ejecutar acciones como mostrar el menú disponible, realizar cálculos o generar enlaces de pago.
            </p>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-200"></div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
              Así trabaja tu nuevo asistente
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="bg-white p-6 rounded-xl shadow-md animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-3">
                    1
                  </div>
                  <h3 className="text-xl font-bold">Recibe mensajes</h3>
                </div>
                <p className="text-gray-700">
                  El cliente escribe o graba un audio en WhatsApp. DomiAI recibe mensajes de texto, audio e imagen.
                </p>
              </div>
              
              {/* Step 2 */}
              <div className="bg-white p-6 rounded-xl shadow-md animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-3">
                    2
                  </div>
                  <h3 className="text-xl font-bold">Interpreta y responde</h3>
                </div>
                <p className="text-gray-700">
                  Usa los modelos de lenguaje más avanzados para entender y responder consultas con inteligencia artificial.
                </p>
              </div>
              
              {/* Step 3 */}
              <div className="bg-white p-6 rounded-xl shadow-md animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-3">
                    3
                  </div>
                  <h3 className="text-xl font-bold">Gestiona domicilios</h3>
                </div>
                <p className="text-gray-700">
                  Toma pedidos, confirma productos y responde dudas directamente en WhatsApp sin intervención humana.
                </p>
              </div>
              
              {/* Step 4 */}
              <div className="bg-white p-6 rounded-xl shadow-md animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-400">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-3">
                    4
                  </div>
                  <h3 className="text-xl font-bold">Confirma pagos</h3>
                </div>
                <p className="text-gray-700">
                  Acepta pagos por Nequi, Daviplata o genera links para PSE, tarjeta débito o crédito automáticamente.
                </p>
              </div>
              
              {/* Step 5 */}
              <div className="bg-white p-6 rounded-xl shadow-md animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-500">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-3">
                    5
                  </div>
                  <h3 className="text-xl font-bold">Envía comandas</h3>
                </div>
                <p className="text-gray-700">
                  Envía el pedido directo al WhatsApp de cocina o caja para preparación inmediata.
                </p>
              </div>
              
              {/* Step 6 */}
              <div className="bg-white p-6 rounded-xl shadow-md animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-600">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-3">
                    6
                  </div>
                  <h3 className="text-xl font-bold">Sigue conversando</h3>
                </div>
                <p className="text-gray-700">
                  Responde preguntas frecuentes y actualiza estados manteniendo al cliente informado.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Who is DomiAI for? Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
              ¿Para quién es DomiAI?
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 text-center animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-100">
              DomiAI está diseñado para restaurantes, cafeterías, panaderías y cocinas ocultas que reciben pedidos por WhatsApp y quieren brindar una atención profesional, rápida y sin perder ventas.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-xl mb-8 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-200">
              <p className="font-medium mb-4">👉 Si ya recibes mensajes en WhatsApp, pero:</p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">❌</span>
                  <span>No puedes responder todos a tiempo</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">❌</span>
                  <span>Pierdes pedidos en horas pico</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">❌</span>
                  <span>Quieres mejorar tu servicio sin contratar más personal</span>
                </li>
              </ul>
              <p className="font-bold mt-4 text-center">DomiAI es para ti.</p>
            </div>
            
            <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-300">
              <p className="font-medium mb-4">Beneficios clave:</p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✅</span>
                  <span>Automatizar la atención 24/7 o en horarios personalizados</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✅</span>
                  <span>Vender más con respuestas instantáneas y sin errores</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✅</span>
                  <span>Aumentar el ticket promedio con recomendaciones y venta cruzada</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✅</span>
                  <span>Ofrecer una experiencia premium sin estar pegado al celular</span>
                </li>
              </ul>
            </div>
            
            <p className="text-xl font-bold text-center mt-8 text-gray-800 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-400">
              Convierte cada mensaje en una venta, sin esfuerzo.
            </p>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
              Elige tu plan
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Basic Plan */}
              <Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-100">
                <CardHeader className="p-6 pb-2 flex flex-col items-center border-b border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-4">
                    <span className="text-white font-bold text-lg">B</span>
                  </div>
                  <h3 className="text-2xl font-bold">Básico</h3>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <p className="text-3xl font-bold">$20 USD<span className="text-sm font-normal text-gray-500">/mes</span></p>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                      <span>Mensajes ilimitados</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                      <span>1 customización por mes</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                      <span>3 mensajes de marketing al mes</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                      <span>Soporte 24/7</span>
                    </li>
                  </ul>
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium">Incluye:</p>
                    <p className="text-sm text-gray-600">Activación rápida, IA de última generación, vinculación WhatsApp</p>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-2 flex justify-center">
                  <Button asChild className="w-full bg-primary hover:bg-primary/90">
                    <a href="/CrearCuenta.html">Lo quiero</a>
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Plus Plan */}
              <Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-200 relative transform hover:-translate-y-1">
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">Recomendado</span>
                </div>
                <CardHeader className="p-6 pb-2 flex flex-col items-center border-b border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mb-4">
                    <span className="text-white font-bold text-lg">P</span>
                  </div>
                  <h3 className="text-2xl font-bold">Plus</h3>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <p className="text-3xl font-bold">$50 USD<span className="text-sm font-normal text-gray-500">/mes</span></p>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-blue-500 mr-2" />
                      <span>Mensajes ilimitados</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-blue-500 mr-2" />
                      <span>3 customizaciones por mes</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-blue-500 mr-2" />
                      <span>8 mensajes de marketing al mes</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-blue-500 mr-2" />
                      <span>Soporte 24/7</span>
                    </li>
                  </ul>
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium">Incluye:</p>
                    <p className="text-sm text-gray-600">Activación rápida, IA de última generación, vinculación WhatsApp</p>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-2 flex justify-center">
                  <Button asChild className="w-full bg-primary hover:bg-primary/90">
                    <a href="/CrearCuenta.html">Lo quiero</a>
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Pro Plan */}
              <Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-300">
                <CardHeader className="p-6 pb-2 flex flex-col items-center border-b border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center mb-4">
                    <span className="text-white font-bold text-lg">P</span>
                  </div>
                  <h3 className="text-2xl font-bold">Pro</h3>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <p className="text-3xl font-bold">$100 USD<span className="text-sm font-normal text-gray-500">/mes</span></p>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-purple-500 mr-2" />
                      <span>Mensajes ilimitados</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-purple-500 mr-2" />
                      <span>10 customizaciones por mes</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-purple-500 mr-2" />
                      <span>30 mensajes de marketing al mes</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-purple-500 mr-2" />
                      <span>Soporte 24/7</span>
                    </li>
                  </ul>
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium">Incluye:</p>
                    <p className="text-sm text-gray-600">Activación rápida, IA de última generación, vinculación WhatsApp</p>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-2 flex justify-center">
                  <Button asChild className="w-full bg-primary hover:bg-primary/90">
                    <a href="/CrearCuenta.html">Lo quiero</a>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 bg-secondary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
              Activa tu asistente DomiAI en minutos y empieza a vender más, sin estrés.
            </h2>
            <Button asChild className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-100">
              <a href="/CrearCuenta.html">
                Quiero mi agente ahora
              </a>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default DomiAI;
