
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface FlujoRaw {
  id: string;
  nombre: string;
  descripcion: string | null;
  link_descarga: string | null;
  imagen_url: string | null;
  pasos: any;
  creado_en: string | null;
  actualizado_en: string | null;
}

const TestFlujos: React.FC = () => {
  const [flujos, setFlujos] = useState<FlujoRaw[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllFlujos();
  }, []);

  const fetchAllFlujos = async () => {
    try {
      console.log('Fetching flujos from Supabase...');
      
      const { data, error } = await supabase
        .from('flujos')
        .select('*')
        .order('creado_en', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        setError(`Error fetching data: ${error.message}`);
      } else {
        console.log('Flujos fetched successfully:', data);
        setFlujos(data || []);
      }
    } catch (err) {
      console.error('General error:', err);
      setError(`General error: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const formatJSON = (obj: any) => {
    if (!obj) return 'null';
    try {
      return JSON.stringify(obj, null, 2);
    } catch {
      return String(obj);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Test de conexión con Supabase: Flujos
          </h1>
          <p className="text-gray-600">
            Lista cruda de registros obtenidos desde la tabla 'flujos'
          </p>
        </div>

        {/* Status Card */}
        <Card className="mb-6 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Estado de la consulta</CardTitle>
          </CardHeader>
          <CardContent>
            {loading && (
              <div className="text-blue-600 font-mono">
                🔄 Cargando datos desde Supabase...
              </div>
            )}
            {error && (
              <div className="text-red-600 font-mono bg-red-50 p-3 rounded">
                ❌ Error: {error}
              </div>
            )}
            {!loading && !error && (
              <div className="text-green-600 font-mono">
                ✅ Conexión exitosa. Registros encontrados: {flujos.length}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        {!loading && !error && (
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Datos de la tabla 'flujos'</CardTitle>
            </CardHeader>
            <CardContent>
              {flujos.length === 0 ? (
                <div className="text-center py-8 text-gray-500 font-mono">
                  📭 No hay registros en la tabla 'flujos'
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-mono text-xs">🆔 ID</TableHead>
                        <TableHead className="font-mono text-xs">📛 Nombre</TableHead>
                        <TableHead className="font-mono text-xs">📝 Descripción</TableHead>
                        <TableHead className="font-mono text-xs">🌐 Link Descarga</TableHead>
                        <TableHead className="font-mono text-xs">🖼️ URL Imagen</TableHead>
                        <TableHead className="font-mono text-xs">🧩 Pasos (JSON)</TableHead>
                        <TableHead className="font-mono text-xs">📅 Creado</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {flujos.map((flujo, index) => (
                        <TableRow key={flujo.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <TableCell className="font-mono text-xs max-w-[100px] truncate">
                            {flujo.id}
                          </TableCell>
                          <TableCell className="font-mono text-xs max-w-[150px]">
                            {flujo.nombre || 'null'}
                          </TableCell>
                          <TableCell className="font-mono text-xs max-w-[200px]">
                            {flujo.descripcion || 'null'}
                          </TableCell>
                          <TableCell className="font-mono text-xs max-w-[150px] truncate">
                            {flujo.link_descarga || 'null'}
                          </TableCell>
                          <TableCell className="font-mono text-xs max-w-[150px] truncate">
                            {flujo.imagen_url || 'null'}
                          </TableCell>
                          <TableCell className="font-mono text-xs max-w-[200px]">
                            <pre className="whitespace-pre-wrap text-xs bg-gray-100 p-2 rounded">
                              {formatJSON(flujo.pasos)}
                            </pre>
                          </TableCell>
                          <TableCell className="font-mono text-xs">
                            {flujo.creado_en ? new Date(flujo.creado_en).toLocaleString() : 'null'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Raw Data Section */}
        {!loading && !error && flujos.length > 0 && (
          <Card className="mt-6 bg-gray-900 text-green-400 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-green-400">Datos raw (JSON completo)</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap text-xs font-mono overflow-x-auto">
                {JSON.stringify(flujos, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TestFlujos;
