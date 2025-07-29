import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface PriceCardProps {
  symbol: string;
  price: number;
  change24h: number;
  ma25: number;
  ma50: number;
  ma100: number;
  lastUpdate?: string;
  profitTarget?: number;
  stopLoss?: number;
  signalReason?: string;
}

export const PriceCard = ({ 
  symbol, 
  price, 
  change24h, 
  ma25,
  ma50, 
  ma100, 
  lastUpdate = "2분 전",
  profitTarget,
  stopLoss,
  signalReason
}: PriceCardProps) => {
  const isPositive = change24h >= 0;
  const isProperAlignment = price > ma25 && ma25 > ma50 && ma50 > ma100;
  
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
        
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div>
            <div className="text-muted-foreground">MA25</div>
            <div className="font-semibold text-orange-500">
              ${ma25.toLocaleString('en-US', { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
              })}
            </div>
          </div>
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
            <div className="text-muted-foreground">MA100</div>
            <div className="font-semibold text-accent">
              ${ma100.toLocaleString('en-US', { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
              })}
            </div>
          </div>
        </div>
        
        {(profitTarget || stopLoss) && (
          <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-border/50">
            {profitTarget && (
              <div>
                <div className="text-muted-foreground">수익목표</div>
                <div className="font-semibold text-green-500">
                  ${profitTarget.toLocaleString('en-US', { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2 
                  })}
                </div>
              </div>
            )}
            {stopLoss && (
              <div>
                <div className="text-muted-foreground">손절가</div>
                <div className="font-semibold text-red-500">
                  ${stopLoss.toLocaleString('en-US', { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2 
                  })}
                </div>
              </div>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <Badge 
            variant={isProperAlignment ? "default" : "secondary"}
            className={isProperAlignment ? "animate-pulse-glow" : ""}
          >
            {isProperAlignment ? "정방향 정렬" : "역방향 정렬"}
          </Badge>
          <span className="text-xs text-muted-foreground">{lastUpdate}</span>
        </div>
        
        {signalReason && (
          <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded border-t border-border/50">
            <div className="font-medium mb-1">전략 상태:</div>
            <div>{signalReason}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};