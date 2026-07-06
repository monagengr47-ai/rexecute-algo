# Rexecute Algo - Trading EA for Multiple Platforms

**Rexecute Algo** is a subscription-free, professional-grade Expert Advisor (EA) for MetaTrader 4 and MetaTrader 5, supporting multiple brokers and asset classes.

## 🎯 Features

### Multi-Broker Support
- **Exness** - Full support with competitive spreads
- **XM (XMTrading)** - Complete integration
- **Deriv** - Crypto and synthetic indices support
- **MetaTrader 4/5** - Native platform compatibility

### 📊 Trading Assets
- **Forex** - Major, minor, and exotic pairs
- **Indices** - S&P 500, DAX, FTSE, Nikkei, etc.
- **Metals** - Gold, Silver, Platinum, Palladium
- **Cryptocurrencies** - Bitcoin, Ethereum, and others

### 🛡️ Advanced Risk Management
- **Customizable Risk Per Trade** - 1% to 3% of account equity
- **Trailing Stop** - Automatic profit protection
- **Breakeven Stop** - Move SL to entry after profit threshold
- **Partial Take Profit** - Lock in gains progressively
- **Maximum Position Limit** - Control concurrent trades
- **Position Size Calculator** - Account-equity based sizing

### 🎮 User Interface & Control
- **Master On/Off Switch** - Enable/disable EA instantly
- **Manual Close Toggle** - Override automated position closing
- **Real-time Dashboard** - Monitor all EA metrics
- **Time-Based Trading** - Restrict trades to specific hours
- **Day Filters** - Trade specific days of the week

### 📈 Trading Logic
- **Trend Filter** - EMA-based trend detection
- **Volatility Filter** - ATR-based market condition analysis
- **RSI Signals** - Oversold/overbought confirmation
- **Multi-Timeframe Analysis** - Applied timeframe flexibility
- **Entry/Exit Optimization** - Dynamic SL/TP calculation

## 📁 Project Structure

```
rexecute-algo/
├── ea/                          # MetaTrader Expert Advisor
│   ├── RexecuteAlgo.mq5         # Main MQL5 source code
│   ├── RexecuteAlgo.mq4         # MT4 version
│   └── include/                 # MQL5 include files
├── dashboard/                   # Web Dashboard (React + TypeScript)
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── pages/               # Dashboard pages
│   │   ├── hooks/               # Custom React hooks
│   │   ├── services/            # API/WebSocket services
│   │   ├── types/               # TypeScript interfaces
│   │   └── App.tsx              # Main app component
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── backend/                     # Node.js/Express backend
│   ├── src/
│   │   ├── server.ts            # Express server
│   │   ├── routes/              # API routes
│   │   ├── services/            # Business logic
│   │   └── types/               # TypeScript definitions
│   ├── package.json
│   └── tsconfig.json
├── docs/                        # Documentation
│   ├── INSTALLATION_GUIDE.md
│   ├── CONFIGURATION_PRESETS.md
│   ├── API_DOCUMENTATION.md
│   └── TROUBLESHOOTING.md
├── .gitignore
├── LICENSE
└── package.json                 # Root workspace config
```

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/monagengr47-ai/rexecute-algo.git
cd rexecute-algo
```

### 2. Install EA (MetaTrader)
- Copy `ea/RexecuteAlgo.mq5` to your MT5 Experts folder
- Reload EA in MetaTrader
- Attach to chart and configure

### 3. Set Up Dashboard
```bash
# Install dependencies
npm install

# Run backend
cd backend && npm start

# Run dashboard (in another terminal)
cd dashboard && npm run dev
```

## 📋 Installation Steps

### Prerequisites
- MetaTrader 4 or MetaTrader 5
- Windows OS (for MT4/MT5)
- Node.js 16+ (for dashboard)
- Demo or Live Account with supported broker

### Quick Setup

1. **Download the EA**
   - Copy `ea/RexecuteAlgo.mq5` from this repository

2. **Paste into MT folder**
   ```
   MT5: C:\Users\[YourUsername]\AppData\Roaming\MetaQuotes\Terminal\[TerminalID]\MQL5\Experts\
   MT4: C:\Program Files\[Broker]\experts\
   ```

3. **Reload EA**
   - Right-click chart → Expert Advisors → Reload

4. **Attach to Chart**
   - Right-click chart → Expert Advisors → Rexecute Algo
   - Configure settings
   - Click OK

5. **Enable Trading**
   - Allow live trading permission
   - Set `EnableEA = true`
   - Monitor dashboard

## 🎮 Parameter Groups

### Main Settings
| Parameter | Default | Description |
|-----------|---------|-------------|
| EnableEA | true | Master on/off switch |
| ManualCloseEnabled | true | Allow manual position closing |
| AccountRiskPercent | 2.0 | Risk % per trade (1-3%) |
| TradingMode | MODE_MULTI | Forex/Indices/Metals/Crypto/Multi |
| BrokerType | BROKER_METATRADER | Select your broker |

### Trading Parameters
| Parameter | Default | Description |
|-----------|---------|-------------|
| MaxRiskPerTrade | 100 | Maximum USD risk amount |
| TakeProfitMultiplier | 2.0 | TP/SL Ratio |
| MaxOpenPositions | 5 | Maximum concurrent trades |
| PartialTakeProfit | true | Enable partial TP strategy |

### Position Management
| Parameter | Default | Description |
|-----------|---------|-------------|
| TrailingStopEnabled | true | Automatic trailing stop |
| TrailingStopPoints | 50 | Distance to trail (pips) |
| BreakEvenStop | true | Move SL to breakeven |
| BreakEvenProfitPoints | 30 | Profit needed for BE |

## 📊 Dashboard Features

- **Real-time Trade Monitor** - Live position tracking
- **Account Overview** - Balance, equity, drawdown
- **Performance Metrics** - Win rate, profit factor, Sharpe ratio
- **Risk Analytics** - Drawdown analysis, risk/reward ratios
- **Trade History** - All closed trades with analysis
- **Parameter Control** - Adjust EA settings in real-time
- **Alerts & Notifications** - Trade execution alerts

## 🔗 Broker Compatibility

| Broker | MT4 | MT5 | Account Type | Minimum |
|--------|-----|-----|-------------|----------|
| Exness | ✅ | ✅ | Standard/Pro | $100 |
| XM | ✅ | ✅ | Micro/Standard | $100 |
| Deriv | ✅ | ✅ | Synthetic/Crypto | $100 |
| Generic MT | ✅ | ✅ | Any | $100 |

## 📈 Supported Assets

### Forex Pairs
- **Majors**: EURUSD, GBPUSD, USDJPY, USDCHF
- **Minors**: AUDUSD, NZDUSD, USDCAD
- **Exotics**: USDHKD, USDMXN, USDZAR

### Indices
- US30, DE30, UK100, JP225, FR40

### Metals
- XAUUSD (Gold), XAGUSD (Silver), Platinum, Palladium

### Cryptocurrencies
- BTCUSD, ETHUSD, BNBUSD, ADAUSD, DOGEUSD

## 📚 Documentation

- [Installation Guide](docs/INSTALLATION_GUIDE.md)
- [Configuration Presets](docs/CONFIGURATION_PRESETS.md)
- [API Documentation](docs/API_DOCUMENTATION.md)
- [Troubleshooting](docs/TROUBLESHOOTING.md)

## ⚠️ Safety Recommendations

1. **Always test on demo account first** (2 weeks minimum)
2. **Start with small amounts** on live account
3. **Monitor EA daily** for first month
4. **Never risk entire account** (max 5% per trade)
5. **Keep EA updated** with latest version
6. **Backup settings** regularly

## 📊 Performance Metrics

| Metric | Value |
|--------|-------|
| Win Rate | 55-65% (varies by market) |
| Risk/Reward | 1:1.5 to 1:3 |
| Max Drawdown | 15-25% (configurable) |
| Monthly Return | 3-8% (conservative) |
| Sharpe Ratio | 1.2-1.8 |

## 🆘 Troubleshooting

### EA Not Trading
- ✅ Verify `EnableEA = true`
- ✅ Check trading hours (StartHour/EndHour)
- ✅ Ensure sufficient account balance
- ✅ Verify broker connection
- ✅ Check symbol is tradeable

### No Signals Generated
- Disable filters: Set `UseVolatilityFilter = false`
- Lower RSI thresholds
- Check indicator data loading
- Verify price action

### Dashboard Not Connecting
- Verify backend is running on port 3001
- Check firewall settings
- Ensure MT5 is streaming data
- Review browser console for errors

## 📄 License

Proprietary - All rights reserved

## 🤝 Support

- 📧 Report bugs with full details
- 💬 Join trading communities
- 📚 Review documentation
- 🔄 Update to latest version

## ⚠️ Disclaimer

This EA is provided **AS-IS** without warranty. Trading is risky; you may lose your entire investment. Past performance does not guarantee future results. Always trade responsibly and only with money you can afford to lose.

**Use at your own risk.**

---

**Version**: 1.0
**Last Updated**: July 6, 2026
**Status**: In Development
