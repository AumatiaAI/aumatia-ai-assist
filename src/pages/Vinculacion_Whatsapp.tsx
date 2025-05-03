
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";

const Vinculacion_Whatsapp = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-primary">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-24 px-4">
        <Card className="w-full max-w-lg">
          <CardContent className="p-8 text-center">
            <h1 className="text-3xl font-bold mb-6 text-secondary">Vinculación con WhatsApp</h1>
            <p className="text-gray-600 mb-4">
              Esta página está en desarrollo. Aquí se implementará el proceso de vinculación 
              de tu chatbot DomiAI con tu número de WhatsApp.
            </p>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Vinculacion_Whatsapp;
