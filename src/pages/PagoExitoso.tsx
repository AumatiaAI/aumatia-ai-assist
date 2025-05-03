
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from 'lucide-react';

const PagoExitoso = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#4A90E2] to-[#1B3A57]">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-24 px-4 md:px-8 mt-5 scroll-mt-20">
        <Card className="w-full max-w-2xl mx-auto animate-fade-in">
          <CardContent className="p-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6">
                <Check className="w-14 h-14 text-white" />
              </div>
              
              <h1 className="text-3xl font-bold mb-4">
                ¡Pago realizado con éxito!
              </h1>
              
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Tu asistente DomiAI ha sido activado y está listo para atender a tus clientes.
                Hemos enviado un correo con los detalles de la compra.
              </p>
              
              <div className="bg-gray-50 rounded-md p-6 w-full mb-8">
                <h3 className="font-semibold text-lg mb-2">Detalles de la compra:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div>
                    <p className="text-gray-500">Producto:</p>
                    <p className="font-medium">DomiAI - Plan Plus</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Número de orden:</p>
                    <p className="font-medium">#DOM-{Math.floor(100000 + Math.random() * 900000)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Fecha:</p>
                    <p className="font-medium">{new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <Button
                  onClick={() => navigate('/dashboard')}
                  className="px-8 py-5"
                >
                  Ir al dashboard
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="px-8 py-5"
                >
                  Volver al inicio
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default PagoExitoso;
