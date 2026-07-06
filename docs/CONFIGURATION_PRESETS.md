# Configuration Presets for Rexecute Algo

## Conservative Strategy

Low risk, stable returns

```
AccountRiskPercent = 1.0
MaxOpenPositions = 3
TakeProfitMultiplier = 3.0
TrailingStopEnabled = true
TrailingStopPoints = 75
BreakEvenStopEnabled = true
UseVolatilityFilter = true
UseTrendFilter = true
```

## Moderate Strategy

Balanced risk/reward

```
AccountRiskPercent = 2.0
MaxOpenPositions = 5
TakeProfitMultiplier = 2.0
TrailingStopEnabled = true
TrailingStopPoints = 50
BreakEvenStopEnabled = true
UseVolatilityFilter = true
UseTrendFilter = true
```

## Aggressive Strategy

Higher risk, higher potential returns

```
AccountRiskPercent = 3.0
MaxOpenPositions = 8
TakeProfitMultiplier = 1.5
TrailingStopEnabled = true
TrailingStopPoints = 30
BreakEvenStopEnabled = false
UseVolatilityFilter = false
UseTrendFilter = true
```

## Forex Optimized

Optimized for Forex pairs

```
AccountRiskPercent = 2.0
MaxOpenPositions = 5
TakeProfitMultiplier = 2.5
TrailingStopEnabled = true
TrailingStopPoints = 40
ATRPeriod = 14
TrendPeriod = 50
StartHour = 8
EndHour = 22
```

## Indices Optimized

Optimized for Index trading

```
AccountRiskPercent = 1.5
MaxOpenPositions = 3
TakeProfitMultiplier = 3.0
TrailingStopEnabled = true
TrailingStopPoints = 100
ATRPeriod = 20
TrendPeriod = 100
```

## Metals Optimized

Optimized for Gold/Silver trading

```
AccountRiskPercent = 1.0
MaxOpenPositions = 2
TakeProfitMultiplier = 4.0
TrailingStopEnabled = true
TrailingStopPoints = 50
ATRPeriod = 14
TrendPeriod = 200
```

## Time-Based Restrictions

### London Session
```
StartHour = 8
EndHour = 16
TradeMonday = true
TradeTuesday = true
TradeWednesday = true
TradeThursday = true
TradeFriday = true
```

### New York Session
```
StartHour = 13
EndHour = 21
TradeMonday = true
TradeTuesday = true
TradeWednesday = true
TradeThursday = true
TradeFriday = true
```

### Asian Session
```
StartHour = 0
EndHour = 8
TradeMonday = true
TradeTuesday = true
TradeWednesday = true
TradeThursday = true
TradeFriday = true
TradeSaturday = true
TradeSunday = false
```

## How to Apply Presets

1. Open Rexecute Algo EA in MetaTrader
2. Right-click chart > Expert Advisors > Rexecute Algo
3. Paste preset values into parameter fields
4. Click OK

Or use dashboard:

1. Go to Settings page
2. Adjust parameters
3. Click "Save Settings"
