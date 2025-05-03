
import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  
  return (
    <div className="flex items-center">
      <Select value={language} onValueChange={(value) => setLanguage(value as 'es' | 'en' | 'pt')}>
        <SelectTrigger className="w-[80px] bg-transparent border-none hover:bg-gray-100 focus:ring-0">
          <div className="flex items-center gap-2">
            <Globe size={18} />
            <SelectValue placeholder={language.toUpperCase()} />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="es">ES</SelectItem>
          <SelectItem value="en">EN</SelectItem>
          <SelectItem value="pt">PT</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
