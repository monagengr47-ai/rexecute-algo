export class AccountService {
  async getAccountOverview() {
    return {
      accountNumber: 'MT5-123456',
      balance: 10000.00,
      equity: 10125.50,
      availableMargin: 9875.50,
      usedMargin: 250.00,
      marginLevel: 4050.20,
      currency: 'USD',
      leverage: 100,
      totalProfit: 125.50,
      totalDrawdown: 250.00,
      drawdownPercent: 2.50,
      status: 'ACTIVE'
    };
  }

  async getBalanceHistory(days: number) {
    const history = [];
    for (let i = days - 1; i >= 0; i--) {
      history.push({
        date: new Date(Date.now() - i * 86400000),
        balance: 10000 + Math.random() * 500 - 250,
        equity: 10000 + Math.random() * 500 - 200
      });
    }
    return history;
  }

  async getEquityCurve() {
    const curve = [];
    let equity = 10000;
    for (let i = 0; i < 30; i++) {
      equity += (Math.random() - 0.48) * 100;
      curve.push({
        date: new Date(Date.now() - (30 - i) * 86400000),
        equity: Math.max(equity, 9800)
      });
    }
    return curve;
  }

  async getDrawdownAnalysis() {
    return {
      currentDrawdown: 2.50,
      maxDrawdown: 8.75,
      averageDrawdown: 3.20,
      maxDrawdownPercent: 0.875,
      drawdownDays: 3,
      recoveryDays: 2
    };
  }
}
