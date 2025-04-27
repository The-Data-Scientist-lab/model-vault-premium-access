
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Gallery from '@/components/Gallery';
import PriceCard from '@/components/PriceCard';
import { Badge } from '@/components/ui/badge';

// Mock data - in a real app this would come from an API
const modelsData = [
  {
    id: '1',
    name: 'Lucky Rajor',
    slug: 'lucky-rajor',
    theme: 'Exclusive Red Lingerie Collection',
    rating: 4.9,
    orders: 346,
    successRate: 100,
    mainImage: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
    gallery: [
      'https://images.unsplash.com/photo-1500673922987-e212871fec22',
      'https://images.unsplash.com/photo-1518495973542-4542c06a5843',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
    ],
    description: 'Premium private collection with 4K quality content, featuring exclusive red lingerie themes. Lucky Rajor provides some of the most high-quality content available, with exceptional production values and artistic direction.',
    plans: [
      {
        title: 'Basic Plan',
        price: 449,
        features: [
          '30 Minutes Nude Video',
          '4K quality',
          'Basic collection access',
          'Google Drive Links',
          'Instant access'
        ]
      },
      {
        title: 'Premium Plan',
        price: 590,
        features: [
          '2 Nude videos (45 mins each)',
          '4K quality',
          'Premium collection',
          '15 Nude photos Bonus',
          'Google Drive Links',
          'Instant access'
        ],
        isPopular: true
      },
      {
        title: 'VIP Plan',
        price: 780,
        features: [
          '4 Nude videos (45 mins each)',
          'Red Lingerie themed content',
          'VIP collection',
          '25 Nude Photos Bonus',
          'Google Drive Links',
          'Instant access'
        ]
      },
      {
        title: 'Full Package',
        price: 1399,
        features: [
          '10+ Nude videos (30-45 Minutes Each)',
          'Complete collection',
          '150+ bonus photos',
          'Google Drive Links',
          'All premium content',
          'Instant access'
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Miss Pinky (Sana)',
    slug: 'miss-pinky-sana',
    theme: 'Black and Red Saree videos',
    rating: 5.0,
    orders: 287,
    successRate: 100,
    mainImage: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    gallery: [
      'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
      'https://images.unsplash.com/photo-1518495973542-4542c06a5843',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
    ],
    description: 'Premium collection featuring saree-themed content. Miss Pinky (Sana) creates elegant and sensual content with a focus on traditional attire with a modern twist.',
    plans: [
      {
        title: 'Basic Plan',
        price: 449,
        features: [
          '30 Minutes Nude Video',
          '4K quality',
          'Basic collection access',
          'Google Drive Links',
          'Instant access'
        ]
      },
      {
        title: 'Premium Plan',
        price: 590,
        features: [
          '2 Nude videos (45 mins each)',
          '4K quality',
          'Premium collection',
          '15 Nude photos Bonus',
          'Google Drive Links',
          'Instant access'
        ],
        isPopular: true
      },
      {
        title: 'VIP Plan',
        price: 780,
        features: [
          '4 Nude videos (45 mins each)',
          'Saree themed content',
          'VIP collection',
          '25 Nude Photos Bonus',
          'Google Drive Links',
          'Instant access'
        ]
      },
      {
        title: 'Full Package',
        price: 1399,
        features: [
          '10+ Nude videos (30-45 Minutes Each)',
          'Complete collection',
          '150+ bonus photos',
          'Google Drive Links',
          'All premium content',
          'Instant access'
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Shanaya Katiyan',
    slug: 'shanaya-katiyan',
    theme: 'Sexy and Hot Dresses',
    rating: 5.0,
    orders: 529,
    successRate: 100,
    mainImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    gallery: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      'https://images.unsplash.com/photo-1518495973542-4542c06a5843',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
    ],
    description: 'Private collection with short dress themes. Shanaya Katiyan brings modern fashion and bold looks to her content, creating uniquely stylish and alluring videos.',
    plans: [
      {
        title: 'Basic Plan',
        price: 449,
        features: [
          '30 Minutes Nude Video',
          '4K quality',
          'Basic collection access',
          'Google Drive Links',
          'Instant access'
        ]
      },
      {
        title: 'Premium Plan',
        price: 590,
        features: [
          '2 Nude videos (45 mins each)',
          '4K quality',
          'Premium collection',
          '15 Nude photos Bonus',
          'Google Drive Links',
          'Instant access'
        ],
        isPopular: true
      },
      {
        title: 'VIP Plan',
        price: 780,
        features: [
          '4 Nude videos (45 mins each)',
          'Short Dress themed content',
          'VIP collection',
          '25 Nude Photos Bonus',
          'Google Drive Links',
          'Instant access'
        ]
      },
      {
        title: 'Full Package',
        price: 1399,
        features: [
          '10+ Nude videos (30-45 Minutes Each)',
          'Complete collection',
          '150+ bonus photos',
          'Google Drive Links',
          'All premium content',
          'Instant access'
        ]
      }
    ]
  }
];

const ModelDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  
  const model = modelsData.find(model => model.slug === slug);
  
  if (!model) {
    return (
      <div className="container max-w-4xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold">Model not found</h2>
        <Link to="/" className="text-theme-primary hover:underline mt-4 inline-block">
          Return to home
        </Link>
      </div>
    );
  }
  
  const handlePlanSelect = (planTitle: string) => {
    setSelectedPlan(planTitle);
    // In a real app, this would open a payment modal or redirect to checkout
    alert(`You selected the ${planTitle} for ${model.name}. This would open a payment process in a real app.`);
  };
  
  return (
    <div className="container max-w-7xl mx-auto py-8 px-4">
      <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Featured Models
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div>
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-4">
            <img 
              src={model.mainImage} 
              alt={model.name} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div>
          <div className="flex items-center mb-2">
            <h1 className="text-3xl md:text-4xl font-bold">{model.name}</h1>
            <Badge className="ml-4 bg-theme-accent text-theme-dark font-medium">
              {model.successRate}% Success
            </Badge>
          </div>
          
          <h2 className="text-xl text-muted-foreground mb-6">{model.theme}</h2>
          
          <div className="flex items-center space-x-6 mb-6">
            <div className="flex items-center">
              <Star className="w-5 h-5 fill-theme-accent stroke-theme-accent mr-1" />
              <span className="font-medium">{model.rating}/5</span>
            </div>
            <div className="text-muted-foreground">{model.orders} Recent Orders</div>
          </div>
          
          <p className="text-muted-foreground mb-8">{model.description}</p>
          
          <Separator className="mb-8" />
          
          <h3 className="text-2xl font-bold mb-6">Content Description</h3>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-theme-primary mr-3"></span>
              <span>Professional 4K quality videos</span>
            </li>
            <li className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-theme-primary mr-3"></span>
              <span>Exclusive content not available elsewhere</span>
            </li>
            <li className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-theme-primary mr-3"></span>
              <span>Themed content unique to this model</span>
            </li>
            <li className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-theme-primary mr-3"></span>
              <span>Bonus high-resolution photos</span>
            </li>
          </ul>
          
          <Button 
            className="w-full bg-theme-primary hover:bg-theme-primary/90"
            size="lg"
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Pricing Plans
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="gallery" className="mb-12">
        <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 mb-8">
          <TabsTrigger value="gallery">Image Gallery</TabsTrigger>
          <TabsTrigger value="pricing" id="pricing">Pricing Plans</TabsTrigger>
        </TabsList>
        
        <TabsContent value="gallery" className="px-2">
          <Gallery images={model.gallery} />
        </TabsContent>
        
        <TabsContent value="pricing" className="px-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {model.plans.map((plan, index) => (
              <PriceCard
                key={index}
                title={plan.title}
                price={plan.price}
                features={plan.features}
                isPopular={'isPopular' in plan ? plan.isPopular : false}
                onClick={() => handlePlanSelect(plan.title)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="bg-card p-6 rounded-lg mb-12">
        <h3 className="text-xl font-bold mb-4">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-theme-primary flex items-center justify-center mb-4">
              <span className="text-white font-bold">1</span>
            </div>
            <h4 className="font-bold mb-2">Choose a Plan</h4>
            <p className="text-muted-foreground text-sm">Select the plan that suits your preferences</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-theme-primary flex items-center justify-center mb-4">
              <span className="text-white font-bold">2</span>
            </div>
            <h4 className="font-bold mb-2">Complete Payment</h4>
            <p className="text-muted-foreground text-sm">Pay securely using our QR payment system</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-theme-primary flex items-center justify-center mb-4">
              <span className="text-white font-bold">3</span>
            </div>
            <h4 className="font-bold mb-2">Get Instant Access</h4>
            <p className="text-muted-foreground text-sm">Receive Google Drive links immediately after verification</p>
          </div>
        </div>
      </div>
      
      <Separator className="mb-8" />
      
      <div className="text-center mb-12">
        <h3 className="text-2xl font-bold gradient-text inline-block mb-4">100% Satisfaction Guaranteed</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We're confident you'll be satisfied with your purchase. If you encounter any issues, 
          our customer support team is ready to assist.
        </p>
      </div>
    </div>
  );
};

export default ModelDetail;
