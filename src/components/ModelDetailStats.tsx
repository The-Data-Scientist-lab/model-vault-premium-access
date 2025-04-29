
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Award, ShieldCheck } from "lucide-react";

type ModelDetailStatsProps = {
  views: number;
  orders: number;
  activeOrders: number;
  ranking: number;
  successRate: number;
  monthlyOrders: { name: string; orders: number }[];
};

const ModelDetailStats = ({
  views,
  orders,
  activeOrders,
  ranking,
  successRate,
  monthlyOrders,
}: ModelDetailStatsProps) => {
  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
      <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-slate-50 to-slate-100">
        <CardHeader className="flex flex-row items-center justify-between pb-1 pt-3 px-3 md:px-4 md:pb-2 md:pt-4">
          <CardTitle className="text-xs md:text-sm font-medium text-theme-primary">Total Views</CardTitle>
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-theme-primary/20 to-theme-accent/20 flex items-center justify-center">
            <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-theme-primary" />
          </div>
        </CardHeader>
        <CardContent className="px-3 pb-3 md:px-4 md:pb-4 pt-0">
          <div className="flex flex-col">
            <div className="text-lg md:text-2xl font-bold">{views.toLocaleString()}</div>
            <div className="w-full mt-1">
              <div className="h-1 md:h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-theme-primary to-theme-accent rounded-full"
                  style={{ width: '80%' }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-slate-50 to-slate-100">
        <CardHeader className="flex flex-row items-center justify-between pb-1 pt-3 px-3 md:px-4 md:pb-2 md:pt-4">
          <CardTitle className="text-xs md:text-sm font-medium text-theme-primary">Total Orders</CardTitle>
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-theme-primary/20 to-theme-accent/20 flex items-center justify-center">
            <Users className="h-4 w-4 md:h-5 md:w-5 text-theme-primary" />
          </div>
        </CardHeader>
        <CardContent className="px-3 pb-3 md:px-4 md:pb-4 pt-0">
          <div className="flex flex-col">
            <div className="flex items-baseline">
              <span className="text-lg md:text-2xl font-bold">{orders.toLocaleString()}</span>
              <span className="text-[10px] md:text-xs text-muted-foreground ml-1 md:ml-2">
                ({activeOrders} active)
              </span>
            </div>
            <div className="w-full mt-1">
              <div className="h-1 md:h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-theme-primary to-theme-accent rounded-full"
                  style={{ width: `${(activeOrders/orders)*100}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-slate-50 to-slate-100">
        <CardHeader className="flex flex-row items-center justify-between pb-1 pt-3 px-3 md:px-4 md:pb-2 md:pt-4">
          <CardTitle className="text-xs md:text-sm font-medium text-theme-primary">Ranking</CardTitle>
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-theme-primary/20 to-theme-accent/20 flex items-center justify-center">
            <Award className="h-4 w-4 md:h-5 md:w-5 text-theme-primary" />
          </div>
        </CardHeader>
        <CardContent className="px-3 pb-3 md:px-4 md:pb-4 pt-0">
          <div className="flex flex-col">
            <div className="text-lg md:text-2xl font-bold">#{ranking}</div>
            <div className="text-[10px] md:text-xs text-muted-foreground">
              Among top models
            </div>
            <div className="w-full mt-1">
              <div className="flex space-x-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1 flex-1 rounded-full ${i < 5-ranking ? 'bg-theme-accent' : 'bg-gray-200'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-slate-50 to-slate-100">
        <CardHeader className="flex flex-row items-center justify-between pb-1 pt-3 px-3 md:px-4 md:pb-2 md:pt-4">
          <CardTitle className="text-xs md:text-sm font-medium text-theme-primary">Success Rate</CardTitle>
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-theme-primary/20 to-theme-accent/20 flex items-center justify-center">
            <ShieldCheck className="h-4 w-4 md:h-5 md:w-5 text-theme-primary" />
          </div>
        </CardHeader>
        <CardContent className="px-3 pb-3 md:px-4 md:pb-4 pt-0">
          <div className="flex flex-col">
            <div className="text-lg md:text-2xl font-bold">{successRate}%</div>
            <div className="w-full mt-1">
              <Progress value={successRate} className="h-1.5 md:h-2 bg-gray-100" />
            </div>
            <div className="flex justify-between mt-1 text-[10px] text-muted-foreground">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModelDetailStats;
