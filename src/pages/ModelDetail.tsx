import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import PriceCard from '@/components/PriceCard';
import { useIsMobile } from '@/hooks/use-mobile';
import ModelDetailStats from '@/components/ModelDetailStats';

// Mock data - in a real app, this would come from an API
const modelData = {
  'lucky-rajor': {
    id: '1',
    name: 'Lucky Rajor',
    theme: 'Exclusive Red Lingerie Collection',
    description: 'Premium private collection with 4K quality content. Featuring exclusive red lingerie sets and professional photography.',
    rating: 4.9,
    orders: 346,
    successRate: 100,
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1000',
    features: [
      'High definition 4K videos',
      'Professional photography',
      'Exclusive content not available elsewhere',
      'Regular updates with new material',
    ],
    indianPlans: [
      {
        id: 'in-basic',
        title: 'Basic Plan',
        price: 449,
        features: [
          '30 Minutes Nude Video',
          '4K quality',
          'Basic collection access',
          'Google Drive Links',
          'Instant access',
        ],
      },
      {
        id: 'in-premium',
        title: 'Premium Plan',
        price: 590,
        features: [
          '2 Nude videos (45 mins each)',
          '4K quality',
          'Premium collection',
          '15 Nude photos Bonus',
          'Google Drive Links',
          'Instant access',
        ],
        isPopular: true,
      },
      {
        id: 'in-vip',
        title: 'VIP Plan',
        price: 780,
        features: [
          '4 Nude videos (45 mins each)',
          'Theme-specific content',
          'VIP collection',
          '25 Nude Photos Bonus',
          'Google Drive Links',
          'Instant access',
        ],
      },
      {
        id: 'in-full',
        title: 'Full Package',
        price: 1399,
        features: [
          '10+ Nude videos (30-45 Minutes Each)',
          'Complete collection',
          '150+ bonus photos',
          'Google Drive Links',
          'All premium content',
          'Instant access',
        ],
      },
    ],
    internationalPlans: [
      {
        id: 'int-basic',
        title: 'Basic Plan',
        price: 449,
        usdPrice: 7,
        features: [
          '30 Minutes Nude Video',
          '4K quality',
          'Basic collection access',
          'Google Drive Links',
          'Instant access',
        ],
      },
      {
        id: 'int-premium',
        title: 'Premium Plan',
        price: 590,
        usdPrice: 15,
        features: [
          '2 Nude videos (45 mins each)',
          '4K quality',
          'Premium collection',
          '15 Nude photos Bonus',
          'Google Drive Links',
          'Instant access',
        ],
        isPopular: true,
      },
      {
        id: 'int-vip',
        title: 'VIP Plan',
        price: 780,
        usdPrice: 19,
        features: [
          '4 Nude videos (45 mins each)',
          'Theme-specific content',
          'VIP collection',
          '25 Nude Photos Bonus',
          'Google Drive Links',
          'Instant access',
        ],
      },
      {
        id: 'int-full',
        title: 'Full Package',
        price: 1399,
        usdPrice: 23,
        features: [
          '10+ Nude videos (30-45 Minutes Each)',
          'Complete collection',
          '150+ bonus photos',
          'Google Drive Links',
          'All premium content',
          'Instant access',
        ],
      },
    ],
  },
  'miss-pinky': {
    id: '2',
    name: 'Miss Pinky (Sana)',
    theme: 'Black and Red Saree videos',
    description: 'Premium collection featuring saree-themed content with professional photography and 4K video quality.',
    rating: 5.0,
    orders: 287,
    successRate: 100,
    image: 'https://images.unsplash.com/photo-1536924430914-91f9e2041b83?q=80&w=1000',
    features: [
      'High definition 4K videos',
      'Professional photography',
      'Exclusive content not available elsewhere',
      'Regular updates with new material',
    ],
    indianPlans: [
    ],
    internationalPlans: [
    ],
  },
  'shanaya-katiyan': {
    id: '3',
    name: 'Shanaya Katiyan',
    theme: 'Sexy and Hot Dresses',
    description: 'Private collection with short dress themes and professional photography in 4K quality.',
    rating: 5.0,
    orders: 529,
    successRate: 100,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000',
    features: [
      'High definition 4K videos',
      'Professional photography',
      'Exclusive content not available elsewhere',
      'Regular updates with new material',
    ],
    indianPlans: [
    ],
    internationalPlans: [
    ],
  },
};

const ModelDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const isMobile = useIsMobile();
  
  if (!slug || !modelData[slug as keyof typeof modelData]) {
    return (
      <Layout>
        <div className="container mx-auto p-6 text-center">
          <h1 className="text-2xl font-bold">Model not found</h1>
          <p className="mt-4">The model you're looking for doesn't exist.</p>
        </div>
      </Layout>
    );
  }
  
  const model = modelData[slug as keyof typeof modelData];

  // Sample monthly orders data
  const monthlyOrders = [
    { name: 'Jan', orders: 65 },
    { name: 'Feb', orders: 85 },
    { name: 'Mar', orders: 73 },
    { name: 'Apr', orders: 92 },
    { name: 'May', orders: 78 },
    { name: 'Jun', orders: 95 }
  ];
  
  return (
    <Layout>
      <div className="container mx-auto p-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Model Image */}
          <div className="md:col-span-1">
            <div className="space-y-6">
              <div className="overflow-hidden rounded-lg aspect-[3/4]">
                <img 
                  src={model.image} 
                  alt={model.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* Model Details and Plans */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">{model.name}</h1>
              <p className="text-muted-foreground mb-4">{model.theme}</p>
              <p className="mb-6">{model.description}</p>
              
              <ModelDetailStats
                views={15000}
                orders={model.orders}
                activeOrders={Math.floor(model.orders * 0.4)}
                ranking={3}
                successRate={model.successRate}
                monthlyOrders={monthlyOrders}
              />

              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-6">Choose Your Plan</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {model.indianPlans.map((plan) => (
                    <PriceCard 
                      key={plan.id}
                      id={plan.id}
                      title={plan.title}
                      price={plan.price}
                      features={plan.features}
                      isPopular={plan.isPopular}
                      modelId={model.id}
                      platformFee={12}
                      usdPlatformFee={3}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ModelDetail;
