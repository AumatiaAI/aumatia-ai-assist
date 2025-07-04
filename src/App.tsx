
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import WhatsAppButton from "./components/WhatsAppButton";
import Index from "./pages/Index";
import Products from "./pages/Products";
import DomiAI from "./pages/DomiAI";
import NotFound from "./pages/NotFound";
import CrearCuenta from "./pages/CrearCuenta";
import Login from "./pages/Login";
import Customizacion_DomiAI from "./pages/Customizacion_DomiAI";
import Vinculacion_Whatsapp from "./pages/Vinculacion_Whatsapp";
import PagoYResumen from "./pages/PagoYResumen";
import PagoExitoso from "./pages/PagoExitoso";
import Dashboard from "./pages/Dashboard";
import HistoriasDeExito from "./pages/HistoriasDeExito";
import Recursos from "./pages/Recursos";
import DetalleRecurso from "./pages/DetalleRecurso";
import Descarga from "./pages/Descarga";
import SuccessYContenido from "./pages/SuccessYContenido";
import AdminRecursos from "./pages/AdminRecursos";
import AdminRecursosPrivado from "./pages/AdminRecursosPrivado";
import TestFlujos from "./pages/TestFlujos";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <WhatsAppButton />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/productos" element={<Products />} />
            <Route path="/recursos" element={<Recursos />} />
            <Route path="/recursos/detalle" element={<DetalleRecurso />} />
            <Route path="/DomiAI" element={<DomiAI />} />
            <Route path="/crear-cuenta" element={<CrearCuenta />} />
            <Route path="/login" element={<Login />} />
            <Route path="/customizacion-domiai" element={<Customizacion_DomiAI />} />
            <Route path="/vinculacion-whatsapp" element={<Vinculacion_Whatsapp />} />
            <Route path="/pago-y-resumen" element={<PagoYResumen />} />
            <Route path="/pago-exitoso" element={<PagoExitoso />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/historias-de-exito" element={<HistoriasDeExito />} />
            <Route path="/descarga" element={<Descarga />} />
            <Route path="/success-y-contenido" element={<SuccessYContenido />} />
            <Route path="/admin-recursos" element={<AdminRecursos />} />
            <Route path="/admin_recursos" element={<AdminRecursosPrivado />} />
            <Route path="/test-flujos" element={<TestFlujos />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
