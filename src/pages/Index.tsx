
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import ModelCard from '@/components/ModelCard';

const Index = () => {
  // Mock data - in a real app this would come from an API
  const featuredModels = [
    {
      id: '1',
      name: 'Lucky Rajor',
      slug: 'lucky-rajor',
      theme: 'Exclusive Red Lingerie Collection',
      rating: 4.9,
      orders: 346,
      successRate: 100,
      image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
    },
    {
      id: '2',
      name: 'Miss Pinky (Sana)',
      slug: 'miss-pinky-sana',
      theme: 'Black and Red Saree videos',
      rating: 5.0,
      orders: 287,
      successRate: 100,
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    },
    {
      id: '3',
      name: 'Shanaya Katiyan',
      slug: 'shanaya-katiyan',
      theme: 'Sexy and Hot Dresses',
      rating: 5.0,
      orders: 529,
      successRate: 100,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <header className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-theme-secondary/50 z-10" />
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5')] bg-cover bg-center"
          style={{ filter: 'brightness(0.3)' }}
        />
        
        <div className="container max-w-6xl mx-auto px-4 relative z-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Premium <span className="gradient-text">Quality Content</span> From Verified Models
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
              Access exclusive high-quality 4K content from our carefully selected models. 
              100% satisfaction guaranteed with secure payment options.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-theme-primary hover:bg-theme-primary/90"
                asChild
              >
                <a href="#featured-models">Explore Models</a>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-theme-primary text-theme-primary hover:bg-theme-primary/10"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Models Section */}
      <section id="featured-models" className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Featured Models</h2>
            <Button variant="outline" className="border-theme-primary text-theme-primary hover:bg-theme-primary/10">
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredModels.map((model) => (
              <ModelCard
                key={model.id}
                {...model}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-secondary px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Platform</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide the best content with superior quality and seamless experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-card p-8 rounded-lg flex flex-col items-center text-center card-hover">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-theme-primary/20 mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-theme-primary">
                  <circle cx="12" cy="8" r="7"></circle>
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-3">Premium Quality</h3>
              <p className="text-muted-foreground text-sm">
                All videos provided in 4K quality with professional production standards.
              </p>
            </div>
            
            <div className="bg-card p-8 rounded-lg flex flex-col items-center text-center card-hover">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-theme-primary/20 mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-theme-primary">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-3">Secure Payments</h3>
              <p className="text-muted-foreground text-sm">
                QR code payment integration with secure verification process.
              </p>
            </div>
            
            <div className="bg-card p-8 rounded-lg flex flex-col items-center text-center card-hover">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-theme-primary/20 mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-theme-primary">
                  <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                  <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-3">Instant Access</h3>
              <p className="text-muted-foreground text-sm">
                Receive Google Drive links immediately after payment verification.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our simple process ensures you get access to premium content in just a few steps
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-theme-primary/30 -translate-y-1/2 hidden md:block"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-theme-primary flex items-center justify-center mb-4 z-10">
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className="font-bold mb-2">Choose a Model</h3>
                <p className="text-muted-foreground text-sm">
                  Browse our featured models and select your favorite
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-theme-primary flex items-center justify-center mb-4 z-10">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="font-bold mb-2">Select a Plan</h3>
                <p className="text-muted-foreground text-sm">
                  Choose from different pricing plans based on your needs
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-theme-primary flex items-center justify-center mb-4 z-10">
                  <span className="text-white font-bold">3</span>
                </div>
                <h3 className="font-bold mb-2">Make Payment</h3>
                <p className="text-muted-foreground text-sm">
                  Complete the secure payment process via QR code
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-theme-primary flex items-center justify-center mb-4 z-10">
                  <span className="text-white font-bold">4</span>
                </div>
                <h3 className="font-bold mb-2">Get Access</h3>
                <p className="text-muted-foreground text-sm">
                  Receive instant access to content via Google Drive links
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-theme-primary/90 to-theme-secondary z-10" />
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5')] bg-cover bg-center"
          style={{ filter: 'brightness(0.3)' }}
        />
        
        <div className="container max-w-6xl mx-auto px-4 relative z-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Access Premium Content?</h2>
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Browse our selection of premium models and select your preferred content package today.
          </p>
          
          <Button 
            size="lg" 
            className="bg-white text-theme-primary hover:bg-white/90"
            asChild
          >
            <a href="#featured-models">Explore Models Now</a>
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-theme-secondary py-12 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold gradient-text inline-block">Model Vault</h3>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-muted-foreground hover:text-theme-primary transition-colors">Terms</a>
              <a href="#" className="text-muted-foreground hover:text-theme-primary transition-colors">Privacy</a>
              <a href="#" className="text-muted-foreground hover:text-theme-primary transition-colors">Support</a>
            </div>
          </div>
          
          <Separator className="mb-8" />
          
          <div className="text-center text-muted-foreground text-sm">
            <p>&copy; {new Date().getFullYear()} Model Vault. All rights reserved.</p>
            <p className="mt-2">By accessing this site, you confirm you are 18+ years of age.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
