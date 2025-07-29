import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface PriceCardProps {
  symbol: string;
  price: number;
  change24h: number;
  ma50: number;
  ma200: number;
  lastUpdate?: string;
}

export const PriceCard = ({ 
  symbol, 
  price, 
  change24h, 
  ma50, 
  ma200, 
  lastUpdate = "2분 전" 
}: PriceCardProps) => {
  const isPositive = change24h >= 0;
  const isGoldenCross = ma50 > ma200;
  
  return (
    <Card className="relative overflow-hidden border-border/50 bg-gradient-to-br from-card to-card/50 animate-slide-up">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5" />
      <CardHeader className="relative">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-foreground">{symbol}</CardTitle>
          <Badge variant={isPositive ? "default" : "destructive"} className="flex items-center gap-1">
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {isPositive ? '+' : ''}{change24h.toFixed(2)}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="relative space-y-4">
        <div className="text-3xl font-bold text-foreground">
          ${price.toLocaleString('en-US', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
          })}
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground">MA50</div>
            <div className="font-semibold text-crypto-blue">
              ${ma50.toLocaleString('en-US', { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
              })}
            </div>
          </div>
          <div>
            <div className="text-muted-foreground">MA200</div>
            <div className="font-semibold text-accent">
              ${ma200.toLocaleString('en-US', { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
              })}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <Badge 
            variant={isGoldenCross ? "default" : "secondary"}
            className={isGoldenCross ? "animate-pulse-glow" : ""}
          >
            {isGoldenCross ? "골든 크로스" : "데스 크로스"}
          </Badge>
          <span className="text-xs text-muted-foreground">{lastUpdate}</span>
        </div>
      </CardContent>
    </Card>
  );
};