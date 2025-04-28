
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, ChartBar, ShieldCheck, Info } from "lucide-react";

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
    <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-1 pt-3 px-3 md:px-6 md:pb-2 md:pt-6">
          <CardTitle className="text-xs md:text-sm font-medium">Total Views</CardTitle>
          <Info className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
          <div className="flex items-center">
            <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-theme-primary mr-2" />
            <div className="text-lg md:text-2xl font-bold">{views.toLocaleString()}</div>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-1 pt-3 px-3 md:px-6 md:pb-2 md:pt-6">
          <CardTitle className="text-xs md:text-sm font-medium">Total Orders</CardTitle>
          <ChartBar className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
          <div className="flex items-center">
            <div className="text-lg md:text-2xl font-bold">{orders.toLocaleString()}</div>
            <span className="text-[10px] md:text-xs text-muted-foreground ml-1 md:ml-2">
              ({activeOrders} active)
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-1 pt-3 px-3 md:px-6 md:pb-2 md:pt-6">
          <CardTitle className="text-xs md:text-sm font-medium">Ranking</CardTitle>
          <TrendingUp className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
          <div className="text-lg md:text-2xl font-bold">#{ranking}</div>
          <p className="text-[10px] md:text-xs text-muted-foreground">
            Among top models
          </p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-1 pt-3 px-3 md:px-6 md:pb-2 md:pt-6">
          <CardTitle className="text-xs md:text-sm font-medium">Success Rate</CardTitle>
          <ShieldCheck className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="px-3 pb-3 md:px-6 md:pb-6">
          <div className="flex flex-col gap-1 md:gap-2">
            <div className="text-lg md:text-2xl font-bold">{successRate}%</div>
            <Progress value={successRate} className="h-1.5 md:h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModelDetailStats;
