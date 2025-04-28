
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { StarIcon } from 'lucide-react';

type ModelStatsProps = {
  rating: number;
  orders: number;
  successRate: number;
};

const ModelStats = ({ rating, orders, successRate }: ModelStatsProps) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6 space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center">
            <div className="flex items-center mb-1">
              <StarIcon className="h-5 w-5 fill-theme-accent text-theme-accent mr-1" />
              <span className="font-bold text-lg">{rating}/5</span>
            </div>
            <span className="text-xs text-muted-foreground">Rating</span>
          </div>
          
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg">{orders}+</span>
            <span className="text-xs text-muted-foreground">Orders</span>
          </div>
          
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg">{successRate}%</span>
            <span className="text-xs text-muted-foreground">Success Rate</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Success Rate</span>
            <span>{successRate}%</span>
          </div>
          <Progress value={successRate} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Customer Satisfaction</span>
            <span>{Math.round(rating * 20)}%</span>
          </div>
          <Progress value={rating * 20} className="h-2" />
        </div>
        
        <div className="text-center text-sm">
          <span className="text-muted-foreground">Trusted by {orders}+ customers</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelStats;
