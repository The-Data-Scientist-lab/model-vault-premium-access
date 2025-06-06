
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CountrySelectionDialog from './CountrySelectionDialog';

type PriceCardProps = {
  id: string;
  title: string;
  price: number;
  usdPrice?: number;
  features: string[];
  isPopular?: boolean;
  modelId: string;
  platformFee?: number;
  usdPlatformFee?: number;
};

const PriceCard = ({ 
  id, 
  title, 
  price, 
  features, 
  isPopular = false, 
  modelId,
  platformFee = 12,
  usdPlatformFee = 3
}: PriceCardProps) => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isCountryDialogOpen, setIsCountryDialogOpen] = React.useState(false);
  
  const handleSelectPlan = () => {
    setIsCountryDialogOpen(true);
  };

  const handleCountrySelect = (country: 'india' | 'international') => {
    setIsCountryDialogOpen(false);
    setIsDialogOpen(true);
    // Set prices based on country selection
    const planDetails = {
      india: {
        price,
        platformFee,
        currency: '₹',
        totalAmount: price + platformFee
      },
      international: {
        price: getUsdPrice(id),
        platformFee: usdPlatformFee,
        currency: '$',
        totalAmount: getUsdPrice(id) + usdPlatformFee
      }
    };
    
    const details = planDetails[country];
    setCurrentPlanDetails({...details, country});
  };

  const getUsdPrice = (planId: string) => {
    const usdPrices: Record<string, number> = {
      'basic': 7,
      'premium': 15,
      'vip': 19,
      'full': 23
    };
    return usdPrices[planId] || 7;
  };

  const [currentPlanDetails, setCurrentPlanDetails] = React.useState<{
    price: number;
    platformFee: number;
    currency: string;
    totalAmount: number;
    country?: 'india' | 'international';
  } | null>(null);

  const handleConfirmPlan = () => {
    setIsDialogOpen(false);
    if (!currentPlanDetails) return;
    
    navigate(`/payment/${modelId}`, { 
      state: { 
        planId: id, 
        planTitle: title, 
        ...currentPlanDetails,
        modelId,
        paymentCountry: currentPlanDetails.country 
      } 
    });
  };

  return (
    <>
      <div className={`flex flex-col p-4 md:p-6 rounded-lg shadow-md bg-card h-full transition-all duration-300 soft-shadow
        ${isPopular ? 'border-2 border-theme-primary scale-[1.02] md:scale-105 relative' : 'border border-border hover:border-theme-primary/50'}`
      }>
        {isPopular && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-theme-primary text-white text-xs font-bold uppercase py-1 px-4 rounded-full">
            Most Popular
          </div>
        )}
        
        <h3 className="text-lg md:text-xl font-bold mt-2">{title}</h3>
        
        <div className="mt-3 md:mt-4 mb-4 md:mb-6">
          <span className="text-2xl md:text-3xl font-bold">₹{price}</span>
          <div className="text-xs md:text-sm text-muted-foreground mt-1">
            (USD ${getUsdPrice(id)})
          </div>
        </div>
        
        <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8 flex-grow">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-4 w-4 md:h-5 md:w-5 text-theme-primary mr-2 shrink-0 mt-0.5" />
              <span className="text-xs md:text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        
        <div className="mt-auto">
          <Button 
            onClick={handleSelectPlan}
            className={`${isPopular ? 'bg-theme-primary hover:bg-theme-primary/90' : 'bg-secondary hover:bg-secondary/80 text-foreground'} w-full`}
          >
            Get Access Now
          </Button>
        </div>
      </div>
      
      <CountrySelectionDialog
        isOpen={isCountryDialogOpen}
        onClose={() => setIsCountryDialogOpen(false)}
        onSelectCountry={handleCountrySelect}
      />
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-sm md:max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle>Confirm Your Selection</DialogTitle>
            <DialogDescription>
              You are about to purchase the following plan:
            </DialogDescription>
          </DialogHeader>
          
          {currentPlanDetails && (
            <div className="py-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">{title}</span>
                <span>{currentPlanDetails.currency}{currentPlanDetails.price}</span>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span>Platform Fee</span>
                <span>{currentPlanDetails.currency}{currentPlanDetails.platformFee}</span>
              </div>
              
              <div className="border-t pt-2 mt-2 flex justify-between items-center font-bold">
                <span>Total</span>
                <span>{currentPlanDetails.currency}{currentPlanDetails.totalAmount}</span>
              </div>
              
              <ul className="space-y-1 mt-4 text-sm text-muted-foreground">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-4 w-4 text-theme-primary mr-2 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button className="bg-theme-primary hover:bg-theme-primary/90" onClick={handleConfirmPlan}>
              Proceed to Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PriceCard;
