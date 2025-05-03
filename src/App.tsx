
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Products from "./pages/Products";
import DomiAI from "./pages/DomiAI";
import NotFound from "./pages/NotFound";
import CrearCuenta from "./pages/CrearCuenta";
import Login from "./pages/Login";
import Customizacion_DomiAI from "./pages/Customizacion_DomiAI";
import Vinculacion_Whatsapp from "./pages/Vinculacion_Whatsapp";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/DomiAI" element={<DomiAI />} />
          <Route path="/crear-cuenta" element={<CrearCuenta />} />
          <Route path="/login" element={<Login />} />
          <Route path="/customizacion-domiai" element={<Customizacion_DomiAI />} />
          <Route path="/Vinculacion_Whatsapp.html" element={<Vinculacion_Whatsapp />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
