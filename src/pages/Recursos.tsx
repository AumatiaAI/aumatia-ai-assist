
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';
import { Download, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface Resource {
  id: number;
  logo: string;
  name: string;
  description: string;
}

const Recursos: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [acceptTerms, setAcceptTerms] = React.useState(false);
  
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
  
  const resources: Resource[] = [
    {
      id: 1,
      logo: "https://i.imgur.com/S0x8zFg.png",
      name: "DomiAI",
      description: t('domiai_description')
    },
    {
      id: 2,
      logo: "https://i.imgur.com/S0x8zFg.png",
      name: "VentaAI",
      description: t('ventaai_description')
    },
    {
      id: 3,
      logo: "https://i.imgur.com/S0x8zFg.png",
      name: "SoporteAI",
      description: t('soporteai_description')
    },
    {
      id: 4,
      logo: "https://i.imgur.com/S0x8zFg.png",
      name: "ReservaAI",
      description: t('reservaai_description')
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: t('error'),
        description: t('email_required'),
        variant: "destructive",
      });
      return;
    }
    
    if (!acceptTerms) {
      toast({
        title: t('error'),
        description: t('accept_terms'),
        variant: "destructive",
      });
      return;
    }
    
    // Here you would typically handle the newsletter subscription
    console.log("Subscribing email:", email);
    
    toast({
      title: t('success'),
      description: t('newsletter_success'),
    });
    
    setEmail('');
    setAcceptTerms(false);
  };
  
  const handleDownload = (resourceName: string) => {
    console.log(`Downloading ${resourceName}`);
    
    toast({
      title: t('downloading'),
      description: `${resourceName} ${t('download_started')}`,
    });
    
    // Navigate to the download page with the resource name as a parameter
    navigate(`/descarga?recurso=${resourceName}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="bg-[#F1F7FE] py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
              {t('custom_agent_title')}
            </h1>
            <Button 
              asChild
              className="bg-primary hover:bg-primary/90 text-white px-6 py-6 text-lg animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-100"
            >
              <a href="/productos">
                🔥 {t('get_your_agent_now')}
              </a>
            </Button>
          </div>
        </section>

        {/* Free Resources Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
                {t('free_resources_title')}
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-100">
                {t('free_resources_subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {resources.map((resource) => (
                <Card 
                  key={resource.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-on-scroll opacity-0 translate-y-10"
                >
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-20 h-20 mb-4">
                      <img 
                        src={resource.logo}
                        alt={`${resource.name} logo`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-2">{resource.name}</h3>
                    <p className="text-gray-700 mb-6">{resource.description}</p>
                    <Button 
                      onClick={() => handleDownload(resource.name)}
                      className="bg-primary hover:bg-primary/90 text-white"
                    >
                      <Download size={18} className="mr-2" />
                      {t('download_free')}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-3xl">
            <Card className="bg-white rounded-xl shadow-md p-6 md:p-8 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
              <CardContent className="flex flex-col items-center text-center p-0">
                <div className="mb-2">
                  <Mail size={30} className="text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-2">{t('newsletter_title')}</h2>
                <p className="text-gray-700 mb-6">{t('newsletter_subtitle')}</p>
                
                <form onSubmit={handleSubmit} className="w-full max-w-md">
                  <div className="mb-4">
                    <Label htmlFor="email" className="sr-only">{t('email')}</Label>
                    <Input 
                      id="email"
                      type="email" 
                      placeholder={t('enter_email')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-6">
                    <Checkbox 
                      id="terms" 
                      checked={acceptTerms}
                      onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm text-gray-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t('accept_communications')}
                    </label>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    {t('subscribe')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-6 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
              {t('looking_for_more')}
            </h2>
            <Button 
              asChild
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-100"
            >
              <a href="/productos">
                {t('buy_custom_agent')}
              </a>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Recursos;
