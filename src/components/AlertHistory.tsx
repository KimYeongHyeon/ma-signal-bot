import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp, TrendingDown, ShoppingCart, Target, StopCircle } from "lucide-react";

interface TradingAlert {
  id: string;
  type: 'buy' | 'sell' | 'breakdown' | 'recovery';
  price: number;
  timestamp: string;
  sent: boolean;
  ma25: number;
  ma50: number;
  ma100: number;
  profitTarget?: number;
  stopLoss?: number;
  reason: string;
  pnl?: number;
}

const mockTradingAlerts: TradingAlert[] = [
  {
    id: '1',
    type: 'sell',
    price: 3567.23,
    timestamp: '2025-07-29T11:30:00Z',
    sent: true,
    ma25: 3456.78,
    ma50: 3423.45,
    ma100: 3398.76,
    reason: '수익 목표가 달성 - 매도',
    pnl: 156.45
  },
  {
    id: '2',
    type: 'buy',
    price: 3456.78,
    timestamp: '2025-07-29T09:15:00Z',
    sent: true,
    ma25: 3467.12,
    ma50: 3423.45,
    ma100: 3398.76,
    profitTarget: 3506.22,
    stopLoss: 3423.45,
    reason: 'MA25 상방 돌파 - 매수 신호 (하방돌파 후 45분 경과)'
  },
  {
    id: '3',
    type: 'breakdown',
    price: 3423.12,
    timestamp: '2025-07-29T08:30:00Z',
    sent: true,
    ma25: 3467.12,
    ma50: 3423.45,
    ma100: 3398.76,
    reason: 'MA25 하방 돌파 감지 - 회복 대기'
  },
  {
    id: '4',
    type: 'sell',
    price: 3123.45,
    timestamp: '2025-07-28T15:45:00Z',
    sent: true,
    ma25: 3156.78,
    ma50: 3123.45,
    ma100: 3098.76,
    reason: '손절가 도달 (MA50) - 매도',
    pnl: -23.67
  }
];

const getAlertIcon = (type: string) => {
  switch (type) {
    case 'buy':
      return <ShoppingCart className="w-4 h-4" />;
    case 'sell':
      return <Target className="w-4 h-4" />;
    case 'breakdown':
      return <TrendingDown className="w-4 h-4" />;
    case 'recovery':
      return <TrendingUp className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
};

const getAlertColor = (type: string) => {
  switch (type) {
    case 'buy':
      return 'bg-green-500/20 text-green-500';
    case 'sell':
      return 'bg-blue-500/20 text-blue-500';
    case 'breakdown':
      return 'bg-red-500/20 text-red-500';
    case 'recovery':
      return 'bg-orange-500/20 text-orange-500';
    default:
      return 'bg-muted/20 text-muted-foreground';
  }
};

const getAlertLabel = (type: string) => {
  switch (type) {
    case 'buy':
      return '매수';
    case 'sell':
      return '매도';
    case 'breakdown':
      return '하방돌파';
    case 'recovery':
      return '상방돌파';
    default:
      return '알림';
  }
};

export const AlertHistory = () => {
  return (
    <Card className="border-border/50 bg-gradient-to-br from-card to-card/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          매매 신호 기록
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockTradingAlerts.map((alert) => (
          <div
            key={alert.id}
            className="p-3 rounded-lg bg-muted/50 border border-border/30 hover:bg-muted/70 transition-colors space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${getAlertColor(alert.type)}`}>
                  {getAlertIcon(alert.type)}
                </div>
                <div>
                  <div className="font-medium flex items-center gap-2">
                    {getAlertLabel(alert.type)}
                    {alert.pnl && (
                      <Badge variant={alert.pnl > 0 ? "default" : "destructive"} className="text-xs">
                        {alert.pnl > 0 ? '+' : ''}${alert.pnl.toFixed(2)}
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    ${alert.price.toLocaleString('en-US', { 
                      minimumFractionDigits: 2, 
                      maximumFractionDigits: 2 
                    })}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <Badge variant={alert.sent ? "default" : "secondary"}>
                  {alert.sent ? '전송됨' : '대기중'}
                </Badge>
                <div className="text-xs text-muted-foreground mt-1">
                  {new Date(alert.timestamp).toLocaleString('ko-KR', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground pl-11">
              {alert.reason}
            </div>
            
            {(alert.profitTarget || alert.stopLoss) && (
              <div className="grid grid-cols-2 gap-2 text-xs pl-11">
                {alert.profitTarget && (
                  <div>
                    <span className="text-muted-foreground">수익목표: </span>
                    <span className="text-green-500 font-medium">
                      ${alert.profitTarget.toFixed(2)}
                    </span>
                  </div>
                )}
                {alert.stopLoss && (
                  <div>
                    <span className="text-muted-foreground">손절가: </span>
                    <span className="text-red-500 font-medium">
                      ${alert.stopLoss.toFixed(2)}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};