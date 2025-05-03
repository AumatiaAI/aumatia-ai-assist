
import React, { useState } from 'react';
import { Check, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Vinculacion_Whatsapp = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleScanned = () => {
    setIsSuccess(true);
  };

  const handleContinue = () => {
    navigate('/pago-y-resumen');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#4A90E2] to-[#1B3A57]">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-24 px-4 md:px-8 mt-5 scroll-mt-20">
        <Card className="w-full max-w-2xl mx-auto animate-fade-in">
          <CardContent className="p-8">
            <h1 className="text-3xl font-bold mb-4 text-center">
              Vincula tu WhatsApp con DomiAI
            </h1>
            
            <p className="text-center text-gray-600 mb-8">
              Escanea el siguiente código QR desde WhatsApp Web o tu celular para activar tu agente conversacional.
            </p>
            
            {!isSuccess ? (
              <>
                <div className="flex justify-center mb-8">
                  <img 
                    src="https://www.notacentral.com/WNC/wp-content/uploads/2021/01/feature-image.jpg" 
                    alt="Código QR para WhatsApp" 
                    className="w-full max-w-[90%] mx-auto rounded-md shadow-md"
                  />
                </div>
                
                <div className="flex justify-center mb-6">
                  <Button
                    onClick={handleScanned}
                    className="text-lg py-6 px-8 transition-all hover:scale-105"
                  >
                    Ya escaneé el código
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center text-center animate-fade-in">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6">
                  <Check className="w-12 h-12 text-white" />
                </div>
                
                <h2 className="text-2xl font-bold mb-4">
                  ¡Tu asistente DomiAI ya está conectado!
                </h2>
                
                <p className="text-gray-600 mb-8">
                  A partir de ahora, tus clientes podrán hablar con tu restaurante de forma automática, rápida y sin errores.
                  <br /><br />
                  Puedes continuar con la activación final o ir al panel de control para hacer pruebas.
                </p>
                
                <Button
                  onClick={handleContinue}
                  className="text-lg py-5 px-8 transition-all"
                >
                  Ir al resumen y pago final →
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      
      {/* WhatsApp floating button */}
      <a 
        href="https://wa.link/v80yk0" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#20BA5C] transition-all z-50"
        aria-label="Contáctanos por WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
      
      <Footer />
    </div>
  );
};

export default Vinculacion_Whatsapp;
