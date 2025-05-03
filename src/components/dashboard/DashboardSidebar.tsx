
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight, ClipboardList, Bot, Settings, MessageSquare, BarChart2, HelpCircle, FileText, CreditCard } from 'lucide-react';

interface DashboardSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
}

const SidebarLink = ({ to, icon, label, isOpen }: SidebarLinkProps) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center p-3 rounded-md transition-all duration-200 ${
        isActive
          ? 'bg-[#4A90E2]/10 text-[#4A90E2]'
          : 'text-gray-700 hover:bg-gray-100'
      }`
    }
  >
    <span className="mr-3">{icon}</span>
    {isOpen && <span className="transition-opacity duration-200">{label}</span>}
  </NavLink>
);

const DashboardSidebar = ({ isOpen, toggleSidebar }: DashboardSidebarProps) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`fixed top-20 bottom-0 bg-white shadow-lg z-30 transition-all duration-300 flex flex-col
          ${isOpen ? 'left-0 w-64' : '-left-64 md:left-0 md:w-16'}`}
      >
        <div className="flex justify-end p-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="md:flex hidden" 
            onClick={toggleSidebar}
          >
            {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </Button>
        </div>
        
        <Separator />
        
        <div className="flex-1 overflow-auto py-4 px-2">
          <nav className="flex flex-col space-y-1">
            <SidebarLink
              to="/dashboard"
              icon={<ClipboardList size={20} />}
              label="Resumen"
              isOpen={isOpen}
            />
            <SidebarLink
              to="/mi-agente"
              icon={<Bot size={20} />}
              label="Mi agente DomiAI"
              isOpen={isOpen}
            />
            <SidebarLink
              to="/customizacion-domiai"
              icon={<FileText size={20} />}
              label="Personalización"
              isOpen={isOpen}
            />
            <SidebarLink
              to="/suscripcion"
              icon={<CreditCard size={20} />}
              label="Suscripción y pagos"
              isOpen={isOpen}
            />
            <SidebarLink
              to="/mensajes"
              icon={<MessageSquare size={20} />}
              label="Mensajes recibidos"
              isOpen={isOpen}
            />
            <SidebarLink
              to="/estadisticas"
              icon={<BarChart2 size={20} />}
              label="Estadísticas"
              isOpen={isOpen}
            />
            <SidebarLink
              to="/configuracion"
              icon={<Settings size={20} />}
              label="Configuración"
              isOpen={isOpen}
            />
            <SidebarLink
              to="/soporte"
              icon={<HelpCircle size={20} />}
              label="Soporte"
              isOpen={isOpen}
            />
          </nav>
        </div>
        
        <Separator />
        
        <div className="p-4">
          {isOpen && (
            <div className="text-xs text-gray-500">
              <p>DomiAI v1.0</p>
              <p>© 2024 Aumatia</p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
