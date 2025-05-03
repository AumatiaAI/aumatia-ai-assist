
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DashboardCard from '@/components/dashboard/DashboardCard';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import StatsSection from '@/components/dashboard/StatsSection';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle, Edit, ExternalLink, HelpCircle, MessageSquare, PieChart, Settings, CreditCard } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Mock user data - in a real application, this would come from authentication
  const userData = {
    name: "María",
    agentStatus: "active",
    lastUpdate: "Hace 2 horas",
    subscription: {
      plan: "Plus",
      nextPayment: "15/06/2024",
      paymentMethod: "Visa ****4589"
    },
    stats: {
      today: 12,
      week: 94,
      conversions: 7
    },
    lastEdit: "Ayer a las 14:30"
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleExportData = () => {
    toast({
      title: "Datos exportados",
      description: "El archivo CSV ha sido generado y descargado.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <div className="flex flex-1 mt-20">
        <DashboardSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        
        <main className={`flex-1 p-4 md:p-8 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : ''}`}>
          <div className="max-w-7xl mx-auto">
            {/* Dashboard Header */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Hola, {userData.name}, bienvenido a tu panel</h1>
              <p className="text-gray-600 mt-2">Aquí puedes gestionar tu agente, revisar mensajes y configurar nuevas automatizaciones.</p>
            </div>
            
            {/* Welcome Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-100">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-medium">Estado del agente:</h3>
                    {userData.agentStatus === "active" ? (
                      <Badge className="bg-green-500 hover:bg-green-600">Activo</Badge>
                    ) : (
                      <Badge variant="destructive">Inactivo</Badge>
                    )}
                  </div>
                  <p className="text-gray-500">Última actualización: {userData.lastUpdate}</p>
                </div>
                <Button className="bg-[#4A90E2] hover:bg-[#4A90E2]/90 text-white px-6">
                  Probar agente
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Dashboard Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <DashboardCard 
                icon={<CheckCircle className="h-8 w-8 text-[#4A90E2]" />}
                title="Mi agente DomiAI"
                description={`Estado: ${userData.agentStatus === 'active' ? 'Activo' : 'Inactivo'}`}
                actionText="Ver detalles"
                onClick={() => navigate('/mi-agente')}
              />
              
              <DashboardCard 
                icon={<Edit className="h-8 w-8 text-[#4A90E2]" />}
                title="Personalización"
                description={`Última edición: ${userData.lastEdit}`}
                actionText="Editar"
                onClick={() => navigate('/customizacion-domiai')}
              />
              
              <DashboardCard 
                icon={<CreditCard className="h-8 w-8 text-[#4A90E2]" />}
                title="Suscripción"
                description={
                  <>
                    <div>Plan actual: {userData.subscription.plan}</div>
                    <div>Método: {userData.subscription.paymentMethod}</div>
                    <div>Próximo cobro: {userData.subscription.nextPayment}</div>
                  </>
                }
                actionText="Cambiar plan"
                onClick={() => navigate('/suscripcion')}
              />
              
              <DashboardCard 
                icon={<PieChart className="h-8 w-8 text-[#4A90E2]" />}
                title="Estadísticas"
                description={
                  <>
                    <div>Hoy: {userData.stats.today} conversaciones</div>
                    <div>Semana: {userData.stats.week} mensajes</div>
                    <div>Conversiones: {userData.stats.conversions}</div>
                  </>
                }
                actionText="Ver detalle"
                onClick={() => navigate('/estadisticas')}
              />
              
              <DashboardCard 
                icon={<MessageSquare className="h-8 w-8 text-[#4A90E2]" />}
                title="Mensajes recientes"
                description={
                  <div className="line-clamp-3 text-sm text-gray-500">
                    <p>Cliente: "¿Tienen delivery para la zona norte?"</p>
                    <p>DomiAI: "¡Claro! Hacemos entregas en toda la zona norte..."</p>
                    <p>Cliente: "Perfecto, quisiera ordenar..."</p>
                  </div>
                }
                actionText="Ver todos"
                onClick={() => navigate('/mensajes')}
              />
              
              <DashboardCard 
                icon={<HelpCircle className="h-8 w-8 text-[#25D366]" />}
                title="Soporte y ayuda"
                description="¿Necesitas ayuda? Nuestro equipo está listo para asistirte con cualquier consulta."
                actionText="Contactar por WhatsApp"
                actionIcon={<MessageSquare className="h-4 w-4" />}
                className="bg-[#25D366] hover:bg-[#25D366]/90"
                onClick={() => window.open('https://wa.me/1234567890', '_blank')}
              />
            </div>
            
            {/* Stats Section */}
            <StatsSection onExport={handleExportData} />
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
