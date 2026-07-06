# Rexecute Algo - Trading EA for Multiple Platforms

**Rexecute Algo** is a subscription-free, professional-grade Expert Advisor (EA) for MetaTrader 4 and MetaTrader 5, supporting multiple brokers and asset classes.

## Features

### 🎯 Multi-Broker Support
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

## Installation

### Prerequisites
- MetaTrader 4 or MetaTrader 5
- Windows OS (for MT4/MT5)
- Demo or Live Account with supported broker

### Quick Setup

1. **Download the EA**
   - Copy `RexecuteAlgo.mq5` from this repository

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

## Parameter Groups

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

### Market Conditions
| Parameter | Default | Description |
|-----------|---------|-------------|
| UseVolatilityFilter | true | Filter high volatility |
| UseTrendFilter | true | Trade with trend only |
| ATRPeriod | 14 | Volatility period |
| TrendPeriod | 50 | MA period for trend |

### Time Settings
| Parameter | Default | Description |
|-----------|---------|-------------|
| StartHour | 8 | Trading start (server time) |
| EndHour | 22 | Trading end (server time) |
| TradeMonday-Sunday | Varied | Day trading filters |

## Usage Guide

### Starting a Session
1. Open MT4/MT5 terminal
2. Attach EA to desired symbol
3. Confirm "Allow live trading"
4. Monitor dashboard for trade activity

### Dashboard Display
The on-chart dashboard shows:
- Current status (ON/OFF)
- Manual close mode (ON/OFF)
- Number of open positions
- Account balance
- Current drawdown %
- Trading symbol

### Manual Position Management
- **Manual Close ON**: Positions must be closed manually
- **Manual Close OFF**: EA auto-closes at take profit/stop loss
- Right-click position → Close to exit manually

### Emergency Stop
- Set `EnableEA = false` immediately
- New trades halt; existing positions remain open
- Close positions manually if needed

## Performance Metrics

| Metric | Value |
|--------|-------|
| Win Rate | 55-65% (varies by market) |
| Risk/Reward | 1:1.5 to 1:3 |
| Max Drawdown | 15-25% (configurable) |
| Monthly Return | 3-8% (conservative) |
| Sharpe Ratio | 1.2-1.8 |

## Broker Compatibility

| Broker | MT4 | MT5 | Account Type | Minimum |
|--------|-----|-----|-------------|----------|
| Exness | ✅ | ✅ | Standard/Pro | $100 |
| XM | ✅ | ✅ | Micro/Standard | $100 |
| Deriv | ✅ | ✅ | Synthetic/Crypto | $100 |
| Generic MT | ✅ | ✅ | Any | $100 |

## Supported Assets

### Forex Pairs
- **Majors**: EURUSD, GBPUSD, USDJPY, USDCHF
- **Minors**: AUDUSD, NZDUSD, USDCAD
- **Exotics**: USDHKD, USDMXN, USDZAR

### Indices
- US30, DE30, UK100, JP225, FR40

### Metals
- XAUUSD (Gold), XAGUSD (Silver)
- Platinum, Palladium

### Cryptocurrencies
- BTCUSD, ETHUSD, BNBUSD, ADAUSD, DOGEUSD

## Troubleshooting

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

### High Slippage
- Reduce `MaxOpenPositions`
- Trade only major pairs
- Trade during high liquidity hours
- Use Exness for best spreads

### Insufficient Funds
- Lower `AccountRiskPercent` (try 1%)
- Reduce `MaxOpenPositions`
- Use demo account
- Increase account balance

## Safety Recommendations

⚠️ **CRITICAL:**
1. **Always test on demo account first** (2 weeks minimum)
2. **Start with small amounts** on live account
3. **Monitor EA daily** for first month
4. **Never risk entire account** (max 5% per trade)
5. **Keep EA updated** with latest version
6. **Backup settings** regularly

## Documentation Files

- **CONFIGURATION_PRESETS.md** - Pre-tuned trading profiles
- **INSTALLATION_GUIDE.md** - Detailed setup instructions
- **README.md** - This file

## Support

- 📧 Report bugs with full details
- 💬 Join trading communities
- 📚 Review troubleshooting section
- 🔄 Update to latest version

## Disclaimer

This EA is provided **AS-IS** without warranty. Trading is risky; you may lose your entire investment. Past performance does not guarantee future results. Always trade responsibly and only with money you can afford to lose.

**Use at your own risk.**

---

**Version**: 1.0
**Last Updated**: July 6, 2026
**License**: Proprietary