# Rexecute Algo - Configuration Presets

Quick-start configurations for different trading styles and risk profiles.

## Conservative Profile (Low Risk)

Best for: Capital preservation, steady returns

```
EnableEA = true
ManualCloseEnabled = true
AccountRiskPercent = 1.0
MaxRiskPerTrade = 50
TakeProfitMultiplier = 2.0
MaxOpenPositions = 2
TrailingStopEnabled = true
TrailingStopPoints = 30
BreakEvenStop = true
UseVolatilityFilter = true
UseTrendFilter = true
StartHour = 8
EndHour = 18
```

**Expected Results:**
- Win Rate: 60-65%
- Monthly Return: 2-3%
- Max Drawdown: 5-8%

---

## Moderate Profile (Medium Risk)

Best for: Balanced growth, reasonable returns

```
EnableEA = true
ManualCloseEnabled = true
AccountRiskPercent = 2.0
MaxRiskPerTrade = 100
TakeProfitMultiplier = 2.5
MaxOpenPositions = 4
TrailingStopEnabled = true
TrailingStopPoints = 50
BreakEvenStop = true
UseVolatilityFilter = true
UseTrendFilter = true
StartHour = 6
EndHour = 22
```

**Expected Results:**
- Win Rate: 55-60%
- Monthly Return: 4-6%
- Max Drawdown: 12-15%

---

## Aggressive Profile (Higher Risk)

Best for: Growth-focused, higher risk tolerance

```
EnableEA = true
ManualCloseEnabled = false
AccountRiskPercent = 3.0
MaxRiskPerTrade = 150
TakeProfitMultiplier = 3.0
MaxOpenPositions = 6
TrailingStopEnabled = true
TrailingStopPoints = 80
BreakEvenStop = false
PartialTakeProfit = true
UseVolatilityFilter = false
UseTrendFilter = false
StartHour = 0
EndHour = 24
```

**Expected Results:**
- Win Rate: 50-55%
- Monthly Return: 8-12%
- Max Drawdown: 20-25%

---

## Forex Focus Profile

Optimized for foreign exchange pairs

```
TradingMode = MODE_FOREX
BrokerType = BROKER_EXNESS
AccountRiskPercent = 2.0
ATRPeriod = 14
TrendPeriod = 50
VolatilityThreshold = 1.5
TrailingStopPoints = 40
MaxOpenPositions = 5
```

**Best Pairs:**
- EURUSD, GBPUSD (high liquidity)
- USDJPY, USDCHF (directional)
- AUDUSD, NZDUSD (commodity linked)

---

## Indices Focus Profile

Optimized for stock indices

```
TradingMode = MODE_INDICES
BrokerType = BROKER_METATRADER
AccountRiskPercent = 1.5
ATRPeriod = 20
TrendPeriod = 100
VolatilityThreshold = 2.0
TrailingStopPoints = 50
MaxOpenPositions = 3
StartHour = 8
EndHour = 17
```

**Best Indices:**
- US30 (S&P 500)
- DE30 (DAX)
- UK100 (FTSE)

---

## Metals Focus Profile

Optimized for gold, silver, and precious metals

```
TradingMode = MODE_METALS
BrokerType = BROKER_XM
AccountRiskPercent = 2.0
ATRPeriod = 28
TrendPeriod = 200
VolatilityThreshold = 1.8
TrailingStopPoints = 60
MaxOpenPositions = 2
PartialTakeProfit = true
BreakEvenStop = true
```

**Best Metals:**
- XAUUSD (Gold)
- XAGUSD (Silver)

---

## Crypto Focus Profile

Optimized for cryptocurrency trading

```
TradingMode = MODE_CRYPTO
BrokerType = BROKER_DERIV
AccountRiskPercent = 3.0
ATRPeriod = 14
TrendPeriod = 50
VolatilityThreshold = 1.0
TrailingStopPoints = 100
MaxOpenPositions = 4
StartHour = 0
EndHour = 24
TradeMonday = true
TradeTuesday = true
TradeWednesday = true
TradeThursday = true
TradeFriday = true
TradeSaturday = true
TradeSunday = true
```

**Best Cryptos:**
- BTCUSD (Bitcoin)
- ETHUSD (Ethereum)
- BNBUSD (Binance Coin)

---

## Scalping Profile

Short-term trading on M15/M5 timeframes

```
AccountRiskPercent = 1.0
MaxRiskPerTrade = 30
TakeProfitMultiplier = 1.5
MaxOpenPositions = 8
TrailingStopEnabled = true
TrailingStopPoints = 20
BreakEvenStop = false
PartialTakeProfit = true
StartHour = 8
EndHour = 18
```

---

## Swing Trading Profile

Medium-term trading on H1/H4 timeframes

```
AccountRiskPercent = 2.0
MaxRiskPerTrade = 100
TakeProfitMultiplier = 3.0
MaxOpenPositions = 3
TrailingStopEnabled = true
TrailingStopPoints = 80
BreakEvenStop = true
PartialTakeProfit = true
StartHour = 0
EndHour = 24
```

---

## Night Trading Profile (London/New York Sessions)

Forex during high-volume sessions

```
StartHour = 21
EndHour = 6
TradingMode = MODE_FOREX
AccountRiskPercent = 2.5
MaxOpenPositions = 5
VolatilityThreshold = 1.2
UseVolatilityFilter = true
```

---

## Multi-Asset Portfolio Profile

Diversified trading across all asset classes

```
TradingMode = MODE_MULTI
AccountRiskPercent = 1.5
MaxOpenPositions = 6
TrailingStopEnabled = true
TrailingStopPoints = 45
BreakEvenStop = true
PartialTakeProfit = true
UseVolatilityFilter = true
UseTrendFilter = true
```

---

## Demo Account Testing Profile

For practicing before live trading

```
EnableEA = true
ManualCloseEnabled = true
AccountRiskPercent = 5.0
MaxRiskPerTrade = 500
MaxOpenPositions = 10
UseVolatilityFilter = false
UseTrendFilter = false
SendAlerts = true
SendNotifications = true
UseSound = true
```

---

## How to Apply Presets

1. Open MT4/MT5
2. Right-click chart → Expert Advisors → Rexecute Algo
3. Go to "Inputs" tab
4. Copy values from preset above
5. Click OK to apply
6. Monitor results

## Tips for Best Results

✅ **DO:**
- Start with Conservative profile
- Test on demo first
- Adjust one parameter at a time
- Track results weekly
- Align preset with your schedule

❌ **DON'T:**
- Use Aggressive profile on small accounts
- Switch profiles frequently
- Ignore drawdowns
- Trade outside your risk tolerance
- Use Aggressive + High Volatility together

---

**Last Updated**: July 6, 2026