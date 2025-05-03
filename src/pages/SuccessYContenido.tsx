
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Linkedin, Youtube, Instagram } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from 'react';

const SuccessYContenido: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showVideoDialog, setShowVideoDialog] = useState(false);
  
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

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!email) {
      toast({
        variant: "destructive",
        title: t('error'),
        description: t('email_required')
      });
      return;
    }
    
    if (!acceptTerms) {
      toast({
        variant: "destructive",
        title: t('error'),
        description: t('accept_terms')
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: t('success'),
        description: t('newsletter_success')
      });
      
      setEmail('');
      setAcceptTerms(false);
    } catch (error) {
      console.error('Error submitting newsletter form:', error);
      toast({
        variant: "destructive",
        title: t('error'),
        description: 'An error occurred.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const showVideo = () => {
    setShowVideoDialog(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      
      <main className="flex-grow">
        {/* CTA Principal section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
              <h1 className="text-2xl md:text-4xl font-bold text-[#1B3A57] mb-6">
                {t('want_to_automate_more')}
              </h1>
              <Button 
                size="lg" 
                className="mt-4 py-6 px-8 text-lg"
                onClick={() => navigate('/productos')}
              >
                {t('get_your_ai_agent_now')}
              </Button>
            </div>
          </div>
        </section>

        {/* Success Confirmation section */}
        <section className="py-16 container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-100">
            <div className="flex justify-center mb-6">
              <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1B3A57] mb-3">
              {t('thank_you_download_ready')}
            </h2>
            <p className="text-gray-600">
              {t('download_ready_description')}
            </p>
          </div>
        </section>

        {/* Downloadable Content section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <Card className="border-0 shadow-lg animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-200">
                <CardContent className="p-6 md:p-10">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-xl md:text-2xl font-semibold text-[#1B3A57]">
                        {t('included_content')}
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="flex-shrink-0 text-green-500 mr-2">✅</span>
                          <span>{t('workflow_n8n')}</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 text-green-500 mr-2">✅</span>
                          <span>{t('whitepaper_pdf')}</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 text-blue-500 mr-2">▶️</span>
                          <span>{t('youtube_video')}</span>
                        </li>
                      </ul>
                    </div>
                    <div className="flex flex-col justify-center space-y-4">
                      <Button 
                        size="lg" 
                        className="w-full py-8 bg-primary text-white"
                        onClick={() => openExternalLink('https://drive.google.com/drive/folders/1VraZmoOd7AG_GFjuUqik4preG3MrdxbR')}
                      >
                        🔽 {t('download_complete_folder')}
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="w-full py-8 border-primary text-primary hover:bg-primary/10"
                        onClick={showVideo}
                      >
                        ▶️ {t('watch_explainer_video')}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Newsletter section */}
        <section className="py-16 container mx-auto px-4">
          <div className="max-w-3xl mx-auto animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-300">
            <Card className="border border-gray-100 shadow">
              <CardContent className="p-6 md:p-10">
                <div className="text-center mb-6">
                  <h3 className="text-xl md:text-2xl font-semibold text-[#1B3A57]">
                    {t('want_more_free_tools')}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    {t('send_exclusive_resources')}
                  </p>
                </div>
                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <Input
                      type="email"
                      placeholder={t('enter_email')}
                      className="flex-1 md:h-12"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button 
                      type="submit" 
                      className="md:h-12"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? t('subscribing') : t('subscribe')}
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2 mt-4">
                    <Checkbox 
                      id="terms" 
                      checked={acceptTerms} 
                      onCheckedChange={(checked) => setAcceptTerms(!!checked)} 
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t('accept_communications')}
                    </label>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Social Media section */}
        <section className="py-16 container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-400">
            <h3 className="text-xl font-semibold text-[#1B3A57] mb-6">
              {t('follow_for_updates')}
            </h3>
            <div className="flex justify-center space-x-6">
              <button 
                className="flex items-center justify-center w-14 h-14 rounded-full bg-[#1B3A57] text-white hover:bg-[#4A90E2] transition-colors duration-200"
                onClick={() => openExternalLink('https://www.linkedin.com/in/juancvelam/')}
              >
                <Linkedin size={24} />
              </button>
              <button 
                className="flex items-center justify-center w-14 h-14 rounded-full bg-[#1B3A57] text-white hover:bg-[#4A90E2] transition-colors duration-200"
                onClick={() => openExternalLink('https://www.instagram.com/')}
              >
                <Instagram size={24} />
              </button>
              <button 
                className="flex items-center justify-center w-14 h-14 rounded-full bg-[#1B3A57] text-white hover:bg-[#4A90E2] transition-colors duration-200"
                onClick={() => openExternalLink('https://www.youtube.com/')}
              >
                <Youtube size={24} />
              </button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />

      {/* Video Dialog */}
      <Dialog open={showVideoDialog} onOpenChange={setShowVideoDialog}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>{t('explainer_video')}</DialogTitle>
            <DialogDescription>{t('video_description')}</DialogDescription>
          </DialogHeader>
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SuccessYContenido;
