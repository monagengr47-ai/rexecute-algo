export class TradeService {
  async getTradeHistory(limit: number, offset: number) {
    // Mock data - Replace with actual database queries
    return {
      trades: [
        {
          id: 1,
          symbol: 'EURUSD',
          type: 'BUY',
          openTime: new Date(Date.now() - 86400000),
          closeTime: new Date(),
          openPrice: 1.0850,
          closePrice: 1.0875,
          volume: 1.0,
          profit: 25.00,
          profitPercent: 0.23
        },
        {
          id: 2,
          symbol: 'GBPUSD',
          type: 'SELL',
          openTime: new Date(Date.now() - 172800000),
          closeTime: new Date(Date.now() - 86400000),
          openPrice: 1.2650,
          closePrice: 1.2620,
          volume: 1.0,
          profit: 30.00,
          profitPercent: 0.24
        }
      ],
      total: 2,
      limit,
      offset
    };
  }

  async getTradeStatistics() {
    return {
      totalTrades: 125,
      winTrades: 75,
      lossTrades: 50,
      winRate: 60.0,
      profitFactor: 1.85,
      averageWin: 45.50,
      averageLoss: -38.25,
      riskRewardRatio: 1.19,
      sharpeRatio: 1.45,
      totalProfit: 1850.00,
      maxConsecutiveWins: 8,
      maxConsecutiveLosses: 5
    };
  }

  async getDailyPerformance() {
    return [
      { date: new Date(Date.now() - 604800000), profit: 120.50, trades: 5 },
      { date: new Date(Date.now() - 518400000), profit: 85.25, trades: 4 },
      { date: new Date(Date.now() - 432000000), profit: -45.00, trades: 3 },
      { date: new Date(Date.now() - 345600000), profit: 210.75, trades: 6 },
      { date: new Date(Date.now() - 259200000), profit: 95.00, trades: 4 },
      { date: new Date(Date.now() - 172800000), profit: 150.25, trades: 5 },
      { date: new Date(Date.now() - 86400000), profit: 75.50, trades: 3 }
    ];
  }

  async getTradeById(id: string) {
    return {
      id,
      symbol: 'EURUSD',
      type: 'BUY',
      status: 'CLOSED',
      openTime: new Date(),
      closeTime: new Date(),
      openPrice: 1.0850,
      closePrice: 1.0875,
      volume: 1.0,
      stopLoss: 1.0820,
      takeProfit: 1.0900,
      profit: 25.00,
      profitPercent: 0.23,
      reason: 'RSI Signal'
    };
  }
}
