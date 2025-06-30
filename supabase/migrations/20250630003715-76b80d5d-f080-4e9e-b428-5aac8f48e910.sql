
-- Habilitar Row Level Security en las tablas existentes
ALTER TABLE public.flujos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tutoriales ENABLE ROW LEVEL SECURITY;

-- Crear políticas que permiten acceso completo (ya que manejaremos la autenticación en el frontend)
-- Para flujos
CREATE POLICY "Allow all operations on flujos" ON public.flujos
FOR ALL USING (true) WITH CHECK (true);

-- Para tutoriales  
CREATE POLICY "Allow all operations on tutoriales" ON public.tutoriales
FOR ALL USING (true) WITH CHECK (true);

-- Actualizar la estructura de la tabla flujos para que coincida con los requerimientos
ALTER TABLE public.flujos 
ADD COLUMN IF NOT EXISTS actualizado_en timestamp with time zone DEFAULT now();

-- Actualizar la estructura de la tabla tutoriales
ALTER TABLE public.tutoriales 
ADD COLUMN IF NOT EXISTS actualizado_en timestamp with time zone DEFAULT now();

-- Crear función trigger para actualizar el campo actualizado_en automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.actualizado_en = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Crear triggers para las tablas
DROP TRIGGER IF EXISTS update_flujos_updated_at ON public.flujos;
CREATE TRIGGER update_flujos_updated_at
    BEFORE UPDATE ON public.flujos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_tutoriales_updated_at ON public.tutoriales;
CREATE TRIGGER update_tutoriales_updated_at
    BEFORE UPDATE ON public.tutoriales
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
