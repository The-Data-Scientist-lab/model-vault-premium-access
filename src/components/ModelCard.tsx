
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { StarIcon } from 'lucide-react';

type ModelCardProps = {
  id: string;
  name: string;
  theme: string;
  rating: number;
  orders: number;
  successRate: number;
  image: string;
  slug: string;
};

const ModelCard = ({ id, name, theme, rating, orders, successRate, image, slug }: ModelCardProps) => {
  return (
    <Link 
      to={`/model/${slug}`}
      className="group relative flex flex-col bg-card rounded-lg overflow-hidden shadow-md card-hover"
    >
      <div className="relative overflow-hidden aspect-[3/4] w-full">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <Badge 
          className="absolute top-3 right-3 bg-theme-accent text-theme-dark font-semibold z-20"
        >
          {successRate}% Success
        </Badge>
      </div>
      
      <div className="relative p-4 flex flex-col gap-1 z-10">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-muted-foreground text-sm">{theme}</p>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <StarIcon className="h-4 w-4 fill-theme-accent text-theme-accent mr-1" />
            <span className="font-medium">{rating}/5</span>
          </div>
          <span className="text-sm text-muted-foreground">{orders} Orders</span>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-theme-primary to-theme-accent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </Link>
  );
};

export default ModelCard;
