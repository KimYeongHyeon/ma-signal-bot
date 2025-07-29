export interface PriceData {
  price: number;
  timestamp: Date;
}

export interface MAValues {
  ma25: number;
  ma50: number;
  ma100: number;
}

export interface TradingSignal {
  type: 'buy' | 'sell' | 'none';
  price: number;
  timestamp: Date;
  ma25: number;
  ma50: number;
  ma100: number;
  profitTarget?: number;
  stopLoss?: number;
  reason: string;
}

export class TradingStrategy {
  private priceHistory: PriceData[] = [];
  private lastBreakdown: Date | null = null;
  private isInPosition = false;
  private readonly FEE_RATE = 0.0005; // 0.05%

  calculateMA(prices: number[], period: number): number {
    if (prices.length < period) return 0;
    const relevantPrices = prices.slice(-period);
    return relevantPrices.reduce((sum, price) => sum + price, 0) / period;
  }

  calculateAllMAs(prices: number[]): MAValues {
    return {
      ma25: this.calculateMA(prices, 25),
      ma50: this.calculateMA(prices, 50),
      ma100: this.calculateMA(prices, 100)
    };
  }

  isProperAlignment(currentPrice: number, ma25: number, ma50: number, ma100: number): boolean {
    return currentPrice > ma25 && ma25 > ma50 && ma50 > ma100;
  }

  detectBreakdown(currentPrice: number, ma25: number, previousPrice: number, previousMA25: number): boolean {
    return previousPrice >= previousMA25 && currentPrice < ma25;
  }

  detectRecovery(currentPrice: number, ma25: number, previousPrice: number, previousMA25: number): boolean {
    return previousPrice <= previousMA25 && currentPrice > ma25;
  }

  calculateProfitTarget(entryPrice: number, ma50: number): number {
    const profitRange = entryPrice - ma50;
    return entryPrice + (profitRange * 1.5);
  }

  calculateTradingFees(price: number, quantity: number): number {
    return price * quantity * this.FEE_RATE;
  }

  analyzeSignal(newPriceData: PriceData): TradingSignal {
    this.priceHistory.push(newPriceData);
    
    // Keep only last 150 data points for efficiency
    if (this.priceHistory.length > 150) {
      this.priceHistory = this.priceHistory.slice(-150);
    }

    const prices = this.priceHistory.map(d => d.price);
    const currentPrice = newPriceData.price;
    
    if (prices.length < 100) {
      return {
        type: 'none',
        price: currentPrice,
        timestamp: newPriceData.timestamp,
        ma25: 0,
        ma50: 0,
        ma100: 0,
        reason: '데이터 부족 (최소 100개 가격 데이터 필요)'
      };
    }

    const mas = this.calculateAllMAs(prices);
    const { ma25, ma50, ma100 } = mas;

    // Previous values for comparison
    const previousPrices = prices.slice(0, -1);
    const previousMAs = this.calculateAllMAs(previousPrices);
    const previousPrice = prices[prices.length - 2];

    // Check for proper alignment
    const hasProperAlignment = this.isProperAlignment(currentPrice, ma25, ma50, ma100);
    
    if (!hasProperAlignment) {
      return {
        type: 'none',
        price: currentPrice,
        timestamp: newPriceData.timestamp,
        ...mas,
        reason: '정방향 정렬 조건 불만족 (현재가 > MA25 > MA50 > MA100)'
      };
    }

    // Detect breakdown
    if (this.detectBreakdown(currentPrice, ma25, previousPrice, previousMAs.ma25)) {
      this.lastBreakdown = newPriceData.timestamp;
      return {
        type: 'none',
        price: currentPrice,
        timestamp: newPriceData.timestamp,
        ...mas,
        reason: 'MA25 하방 돌파 감지 - 회복 대기'
      };
    }

    // Detect recovery and generate buy signal
    if (this.lastBreakdown && 
        this.detectRecovery(currentPrice, ma25, previousPrice, previousMAs.ma25) &&
        !this.isInPosition) {
      
      // Check if breakdown was recent (within reasonable time)
      const timeSinceBreakdown = newPriceData.timestamp.getTime() - this.lastBreakdown.getTime();
      const maxWaitTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      
      if (timeSinceBreakdown <= maxWaitTime) {
        this.isInPosition = true;
        const profitTarget = this.calculateProfitTarget(currentPrice, ma50);
        
        return {
          type: 'buy',
          price: currentPrice,
          timestamp: newPriceData.timestamp,
          ...mas,
          profitTarget,
          stopLoss: ma50,
          reason: `MA25 상방 돌파 - 매수 신호 (하방돌파 후 ${Math.round(timeSinceBreakdown / (60 * 1000))}분 경과)`
        };
      }
    }

    // Check sell conditions if in position
    if (this.isInPosition) {
      const profitTarget = this.calculateProfitTarget(currentPrice, ma50);
      
      // Profit target hit
      if (currentPrice >= profitTarget) {
        this.isInPosition = false;
        this.lastBreakdown = null;
        return {
          type: 'sell',
          price: currentPrice,
          timestamp: newPriceData.timestamp,
          ...mas,
          reason: '수익 목표가 달성 - 매도'
        };
      }
      
      // Stop loss hit
      if (currentPrice <= ma50) {
        this.isInPosition = false;
        this.lastBreakdown = null;
        return {
          type: 'sell',
          price: currentPrice,
          timestamp: newPriceData.timestamp,
          ...mas,
          reason: '손절가 도달 (MA50) - 매도'
        };
      }
      
      return {
        type: 'none',
        price: currentPrice,
        timestamp: newPriceData.timestamp,
        ...mas,
        profitTarget,
        stopLoss: ma50,
        reason: '포지션 유지 중'
      };
    }

    return {
      type: 'none',
      price: currentPrice,
      timestamp: newPriceData.timestamp,
      ...mas,
      reason: '대기 중 - 신호 없음'
    };
  }

  reset(): void {
    this.priceHistory = [];
    this.lastBreakdown = null;
    this.isInPosition = false;
  }
}