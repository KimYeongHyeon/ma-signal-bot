import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp, TrendingDown } from "lucide-react";

interface Alert {
  id: string;
  type: 'golden' | 'death';
  price: number;
  timestamp: string;
  sent: boolean;
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'golden',
    price: 3456.78,
    timestamp: '2025-07-29T11:30:00Z',
    sent: true
  },
  {
    id: '2',
    type: 'death',
    price: 3123.45,
    timestamp: '2025-07-28T15:45:00Z',
    sent: true
  },
  {
    id: '3',
    type: 'golden',
    price: 2987.12,
    timestamp: '2025-07-27T09:15:00Z',
    sent: true
  }
];

export const AlertHistory = () => {
  return (
    <Card className="border-border/50 bg-gradient-to-br from-card to-card/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          알림 기록
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockAlerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border/30 hover:bg-muted/70 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${
                alert.type === 'golden' 
                  ? 'bg-crypto-green/20 text-crypto-green' 
                  : 'bg-crypto-red/20 text-crypto-red'
              }`}>
                {alert.type === 'golden' ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
              </div>
              <div>
                <div className="font-medium">
                  {alert.type === 'golden' ? '골든 크로스' : '데스 크로스'}
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
        ))}
      </CardContent>
    </Card>
  );
};