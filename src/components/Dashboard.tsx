import { PriceCard } from "./PriceCard";
import { AlertHistory } from "./AlertHistory";
import { AlertSettings } from "./AlertSettings";
import cryptoHero from "@/assets/crypto-hero.jpg";

export const Dashboard = () => {
  // Mock data - will be replaced with real API data via Supabase
  const mockETHData = {
    symbol: "ETH/USD",
    price: 3456.78,
    change24h: 5.23,
    ma25: 3467.12,
    ma50: 3423.45,
    ma100: 3398.76,
    profitTarget: 3506.22,
    stopLoss: 3423.45,
    signalReason: '정방향 정렬 유지 중 - 매수 대기'
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={cryptoHero} 
          alt="Crypto Trading Dashboard" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">
              ETH MA 매매전략 시스템
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              MA25/50/100 기반 매매전략으로 자동 알림을 받고 수익을 극대화하세요
            </p>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Price Card - Takes up 1 column */}
          <div className="lg:col-span-1">
            <PriceCard {...mockETHData} />
          </div>

          {/* Alert History - Takes up 2 columns */}
          <div className="lg:col-span-2">
            <AlertHistory />
          </div>

          {/* Alert Settings - Full width */}
          <div className="lg:col-span-3">
            <AlertSettings />
          </div>
        </div>

        {/* Status Footer */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/50">
            <div className="w-2 h-2 rounded-full bg-crypto-green animate-pulse" />
            <span className="text-sm text-muted-foreground">
              매매전략 시스템: 정상 | 마지막 업데이트: 2분 전 | 수수료: 0.05%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};