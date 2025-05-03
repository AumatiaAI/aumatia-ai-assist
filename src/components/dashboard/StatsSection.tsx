
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Calendar } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

// Mock data for the charts
const messageData = [
  { name: 'Lun', mensajes: 14 },
  { name: 'Mar', mensajes: 22 },
  { name: 'Mie', mensajes: 18 },
  { name: 'Jue', mensajes: 27 },
  { name: 'Vie', mensajes: 35 },
  { name: 'Sab', mensajes: 28 },
  { name: 'Dom', mensajes: 15 },
];

const responseTimeData = [
  { name: 'Lun', tiempo: 2.1 },
  { name: 'Mar', tiempo: 1.8 },
  { name: 'Mie', tiempo: 2.3 },
  { name: 'Jue', tiempo: 1.5 },
  { name: 'Vie', tiempo: 1.7 },
  { name: 'Sab', tiempo: 1.9 },
  { name: 'Dom', tiempo: 2.2 },
];

const conversionData = [
  { name: 'Lun', tasa: 22 },
  { name: 'Mar', tasa: 28 },
  { name: 'Mie', tasa: 25 },
  { name: 'Jue', tasa: 31 },
  { name: 'Vie', tasa: 35 },
  { name: 'Sab', tasa: 30 },
  { name: 'Dom', tasa: 24 },
];

const orderTypeData = [
  { name: 'Lun', automatico: 12, manual: 4 },
  { name: 'Mar', automatico: 18, manual: 6 },
  { name: 'Mie', automatico: 15, manual: 5 },
  { name: 'Jue', automatico: 22, manual: 7 },
  { name: 'Vie', automatico: 25, manual: 8 },
  { name: 'Sab', automatico: 19, manual: 7 },
  { name: 'Dom', automatico: 11, manual: 4 },
];

interface StatsSectionProps {
  onExport: () => void;
}

const StatsSection = ({ onExport }: StatsSectionProps) => {
  const [dateRange, setDateRange] = useState('week');

  return (
    <section className="mb-8">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gray-50 border-b border-gray-100 pb-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="text-xl text-gray-800">Estadísticas</CardTitle>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <Tabs defaultValue="week" onValueChange={setDateRange} value={dateRange}>
                  <TabsList className="bg-white border border-gray-200">
                    <TabsTrigger value="week">Últimos 7 días</TabsTrigger>
                    <TabsTrigger value="month">Mes actual</TabsTrigger>
                    <TabsTrigger value="custom">Personalizado</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <Button onClick={onExport} variant="outline" size="sm" className="whitespace-nowrap">
                <Download className="h-4 w-4 mr-2" />
                Exportar CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Mensajes recibidos */}
            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Mensajes recibidos</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={messageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="mensajes" fill="#4A90E2" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Tiempo de respuesta */}
            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Tiempos de respuesta (min)</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={responseTimeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="tiempo" stroke="#4A90E2" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Tasa de conversión */}
            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Tasa de conversión (%)</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={conversionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="tasa" stroke="#1B3A57" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Pedidos automatizados vs manuales */}
            <div className="bg-white p-4 rounded-lg border border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Pedidos automatizados vs manuales</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={orderTypeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="automatico" fill="#4A90E2" />
                    <Bar dataKey="manual" fill="#1B3A57" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default StatsSection;
