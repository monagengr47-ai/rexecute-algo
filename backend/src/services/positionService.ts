export class PositionService {
  async getOpenPositions() {
    return {
      positions: [
        {
          ticket: 101,
          symbol: 'EURUSD',
          type: 'BUY',
          volume: 1.0,
          openPrice: 1.0850,
          currentPrice: 1.0875,
          stopLoss: 1.0820,
          takeProfit: 1.0920,
          profit: 25.00,
          profitPercent: 0.23,
          openTime: new Date(),
          duration: '2h 30m'
        },
        {
          ticket: 102,
          symbol: 'GBPUSD',
          type: 'SELL',
          volume: 1.0,
          openPrice: 1.2650,
          currentPrice: 1.2630,
          stopLoss: 1.2700,
          takeProfit: 1.2550,
          profit: 20.00,
          profitPercent: 0.16,
          openTime: new Date(Date.now() - 3600000),
          duration: '1h'
        }
      ],
      total: 2
    };
  }

  async getPositionByTicket(ticket: string) {
    return {
      ticket,
      symbol: 'EURUSD',
      type: 'BUY',
      volume: 1.0,
      openPrice: 1.0850,
      currentPrice: 1.0875,
      stopLoss: 1.0820,
      takeProfit: 1.0920,
      profit: 25.00,
      profitPercent: 0.23,
      openTime: new Date(),
      duration: '2h 30m'
    };
  }

  async closePosition(ticket: string) {
    return {
      success: true,
      ticket,
      message: 'Position closed successfully',
      closePrice: 1.0875,
      profit: 25.00
    };
  }

  async modifyPosition(ticket: string, stopLoss: number, takeProfit: number) {
    return {
      success: true,
      ticket,
      message: 'Position modified successfully',
      stopLoss,
      takeProfit
    };
  }
}
