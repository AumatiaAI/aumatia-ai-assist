
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface Flujo {
  id: string;
  nombre: string;
  descripcion: string | null;
  imagen_url: string | null;
  creado_en: string | null;
}

interface Tutorial {
  id: string;
  titulo: string;
  descripcion: string | null;
  imagen_url: string | null;
  creado_en: string | null;
}

const Recursos: React.FC = () => {
  const [flujos, setFlujos] = useState<Flujo[]>([]);
  const [tutoriales, setTutoriales] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecursos();
  }, []);

  const fetchRecursos = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch flujos
      const { data: flujosData, error: flujosError } = await supabase
        .from('flujos')
        .select('id, nombre, descripcion, imagen_url, creado_en')
        .order('creado_en', { ascending: false });

      if (flujosError) {
        console.error('Error fetching flujos:', flujosError);
        throw flujosError;
      }

      // Fetch tutoriales
      const { data: tutorialesData, error: tutorialesError } = await supabase
        .from('tutoriales')
        .select('id, titulo, descripcion, imagen_url, creado_en')
        .order('creado_en', { ascending: false });

      if (tutorialesError) {
        console.error('Error fetching tutoriales:', tutorialesError);
        throw tutorialesError;
      }

      setFlujos(flujosData || []);
      setTutoriales(tutorialesData || []);
    } catch (err) {
      console.error('Error fetching recursos:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const handleVerMasFlujo = (id: string) => {
    navigate(`/recursos/detalle?id=${id}`);
  };

  const handleVerMasTutorial = (id: string) => {
    navigate(`/recursos/detalle?id=${id}&tipo=tutorial`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando recursos...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error al cargar recursos: {error}</p>
            <Button onClick={fetchRecursos} className="bg-blue-600 hover:bg-blue-700">
              Intentar de nuevo
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Recursos gratuitos para automatizar tu negocio
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explora flujos listos para usar y aprende con nuestros tutoriales
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Flujos de Trabajo Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Flujos de trabajo</h2>
            <p className="text-lg text-gray-600">
              Workflows de automatización listos para implementar
            </p>
          </div>

          {flujos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No hay flujos disponibles en este momento</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {flujos.map((flujo) => (
                <Card key={flujo.id} className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    {flujo.imagen_url && (
                      <div className="w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={flujo.imagen_url}
                          alt={flujo.nombre}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      {flujo.nombre}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {flujo.descripcion || 'Sin descripción disponible'}
                    </p>
                    <Button
                      onClick={() => handleVerMasFlujo(flujo.id)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 px-4 transition-colors duration-300"
                    >
                      Ver más
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Tutoriales Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tutoriales</h2>
            <p className="text-lg text-gray-600">
              Aprende paso a paso cómo implementar automatizaciones
            </p>
          </div>

          {tutoriales.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No hay tutoriales disponibles en este momento</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {tutoriales.map((tutorial) => (
                <Card key={tutorial.id} className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    {tutorial.imagen_url && (
                      <div className="w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={tutorial.imagen_url}
                          alt={tutorial.titulo}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      {tutorial.titulo}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {tutorial.descripcion || 'Sin descripción disponible'}
                    </p>
                    <Button
                      onClick={() => handleVerMasTutorial(tutorial.id)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 px-4 transition-colors duration-300"
                    >
                      Ver más
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Recursos;
