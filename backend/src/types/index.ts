export interface Trade {
  id: number;
  symbol: string;
  type: 'BUY' | 'SELL';
  openTime: Date;
  closeTime?: Date;
  openPrice: number;
  closePrice?: number;
  volume: number;
  profit?: number;
  profitPercent?: number;
}

export interface Position {
  ticket: number;
  symbol: string;
  type: 'BUY' | 'SELL';
  volume: number;
  openPrice: number;
  currentPrice: number;
  stopLoss: number;
  takeProfit: number;
  profit: number;
  profitPercent: number;
  openTime: Date;
}

export interface AccountInfo {
  accountNumber: string;
  balance: number;
  equity: number;
  availableMargin: number;
  usedMargin: number;
  marginLevel: number;
  currency: string;
  leverage: number;
}

export interface EASettings {
  enableEA: boolean;
  manualCloseEnabled: boolean;
  accountRiskPercent: number;
  maxOpenPositions: number;
  trailingStopEnabled: boolean;
  trailingStopPoints: number;
  breakEvenStopEnabled: boolean;
  breakEvenProfitPoints: number;
  useVolatilityFilter: boolean;
  useTrendFilter: boolean;
  startHour: number;
  endHour: number;
}
