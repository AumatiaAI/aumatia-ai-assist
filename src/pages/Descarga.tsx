
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface DownloadFormValues {
  nombreCompleto: string;
  correo: string;
  telefono: string;
  pais: string;
  descripcionAutomatizacion: string;
}

const Descarga: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const agentName = "DomiAI"; // This could be dynamic based on URL params or context
  
  const formSchema = z.object({
    nombreCompleto: z.string().min(2, t('name_required')),
    correo: z.string().email(t('valid_email_required')),
    telefono: z.string().min(8, t('valid_phone_required')),
    pais: z.string().min(1, t('country_required')),
    descripcionAutomatizacion: z.string().min(10, t('description_required')),
  });

  const form = useForm<DownloadFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombreCompleto: '',
      correo: '',
      telefono: '',
      pais: '',
      descripcionAutomatizacion: '',
    },
  });
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Animation observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  const onSubmit = async (values: DownloadFormValues) => {
    setIsSubmitting(true);
    
    try {
      console.log('Form values:', values);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success toast
      toast({
        title: t('success'),
        description: t('download_starting'),
      });
      
      // Redirect to success page (this would be implemented later)
      // For now we'll just redirect back to recursos
      navigate('/recursos');
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        variant: "destructive",
        title: t('error'),
        description: t('form_error'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const countryOptions = [
    { value: 'colombia', label: 'Colombia' },
    { value: 'mexico', label: 'México' },
    { value: 'peru', label: 'Perú' },
    { value: 'chile', label: 'Chile' },
    { value: 'argentina', label: 'Argentina' },
    { value: 'otro', label: t('other') },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f9fc]">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
              <h1 className="text-2xl md:text-3xl font-bold text-[#1B3A57] mb-3">
                {t('download_workflow')} {agentName}
              </h1>
              <p className="text-gray-600">
                {t('complete_form_download')}
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-100">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="nombreCompleto"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('full_name')}</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={t('name_placeholder')} 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="correo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('email')}</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder={t('email_placeholder')} 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="telefono"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('phone_number')}</FormLabel>
                        <FormControl>
                          <Input 
                            type="tel" 
                            placeholder={t('phone_placeholder')} 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="pais"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('country')}</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t('select_country')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {countryOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="descripcionAutomatizacion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('what_to_automate')}</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={t('automation_placeholder')} 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-white py-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t('downloading') : t('download_workflow_button')}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Descarga;
