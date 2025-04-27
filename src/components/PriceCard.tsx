
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

type PriceCardProps = {
  title: string;
  price: number;
  features: string[];
  isPopular?: boolean;
  onClick: () => void;
};

const PriceCard = ({ title, price, features, isPopular = false, onClick }: PriceCardProps) => {
  return (
    <div 
      className={`flex flex-col p-6 rounded-lg shadow-md bg-card transition-all duration-300 
        ${isPopular ? 'border-2 border-theme-primary scale-105 relative shadow-xl shadow-theme-primary/20' : 'border border-border hover:border-theme-primary/50'}`
      }
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-theme-primary text-white text-xs font-bold uppercase py-1 px-4 rounded-full">
          Most Popular
        </div>
      )}
      
      <h3 className="text-xl font-bold">{title}</h3>
      <div className="mt-4 mb-6">
        <span className="text-3xl font-bold">₹{price}</span>
      </div>
      
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-theme-primary mr-2 shrink-0" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button 
        onClick={onClick}
        className={`${isPopular ? 'bg-theme-primary hover:bg-theme-primary/90' : 'bg-secondary hover:bg-secondary/80'} w-full mt-auto`}
      >
        Get Access Now
      </Button>
    </div>
  );
};

export default PriceCard;
