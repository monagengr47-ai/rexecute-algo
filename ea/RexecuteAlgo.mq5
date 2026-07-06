//+------------------------------------------------------------------+
//|                                                  RexecuteAlgo.mq5 |
//|                          Professional Algorithmic Trading System |
//|                                         Version 1.0 - July 2026 |
//+------------------------------------------------------------------+
#property copyright "Rexecute Algo Trading"
#property link      "https://github.com/monagengr47-ai/rexecute-algo"
#property version   "1.0"
#property strict
#property description "Multi-broker, multi-asset Expert Advisor with advanced risk management"

#include <Trade\Trade.mqh>
#include <Trade\OrderInfo.mqh>
#include <Trade\PositionInfo.mqh>
#include <Trade\DealInfo.mqh>

//+------------------------------------------------------------------+
//| ENUMS AND CONSTANTS
//+------------------------------------------------------------------+
enum TRADING_MODE {
    MODE_FOREX = 1,
    MODE_INDICES = 2,
    MODE_METALS = 3,
    MODE_CRYPTO = 4,
    MODE_MULTI = 5
};

enum BROKER_TYPE {
    BROKER_EXNESS = 1,
    BROKER_XM = 2,
    BROKER_DERIV = 3,
    BROKER_METATRADER = 4
};

//+------------------------------------------------------------------+
//| INPUT PARAMETERS - MAIN SETTINGS
//+------------------------------------------------------------------+
input bool EnableEA = true;                          // Master On/Off Switch
input bool ManualCloseEnabled = true;                // Allow Manual Close Toggle
input double AccountRiskPercent = 2.0;               // Risk % Per Trade (1-3%)
input TRADING_MODE TradingMode = MODE_MULTI;         // Trading Mode
input BROKER_TYPE BrokerType = BROKER_METATRADER;    // Broker Type

//+------------------------------------------------------------------+
//| INPUT PARAMETERS - TRADING SETTINGS
//+------------------------------------------------------------------+
input double MaxRiskPerTrade = 100;                  // Maximum USD Risk Per Trade
input double TakeProfitMultiplier = 2.0;             // Take Profit / Stop Loss Ratio
input int MaxOpenPositions = 5;                      // Maximum Open Positions
input bool PartialTakeProfitEnabled = true;          // Enable Partial Take Profit

//+------------------------------------------------------------------+
//| INPUT PARAMETERS - POSITION MANAGEMENT
//+------------------------------------------------------------------+
input bool TrailingStopEnabled = true;               // Enable Trailing Stop
input int TrailingStopPoints = 50;                   // Trailing Stop Distance (pips)
input bool BreakEvenStopEnabled = true;              // Enable Breakeven Stop
input int BreakEvenProfitPoints = 30;                // Breakeven Profit Threshold (pips)

//+------------------------------------------------------------------+
//| INPUT PARAMETERS - MARKET FILTERS
//+------------------------------------------------------------------+
input bool UseVolatilityFilter = true;               // Use Volatility Filter
input bool UseTrendFilter = true;                    // Use Trend Filter
input int ATRPeriod = 14;                            // ATR Period for Volatility
input int TrendPeriod = 50;                          // EMA Period for Trend

//+------------------------------------------------------------------+
//| INPUT PARAMETERS - TIME SETTINGS
//+------------------------------------------------------------------+
input int StartHour = 8;                             // Trading Start Hour (Server Time)
input int EndHour = 22;                              // Trading End Hour (Server Time)
input bool TradeMonday = true;                       // Trade on Monday
input bool TradeTuesday = true;                      // Trade on Tuesday
input bool TradeWednesday = true;                    // Trade on Wednesday
input bool TradeThursday = true;                     // Trade on Thursday
input bool TradeFriday = true;                       // Trade on Friday
input bool TradeSaturday = false;                    // Trade on Saturday
input bool TradeSunday = false;                      // Trade on Sunday

//+------------------------------------------------------------------+
//| GLOBAL VARIABLES
//+------------------------------------------------------------------+
CTrade trade;
CPositionInfo posInfo;
COrderInfo ordInfo;
CDealInfo dealInfo;

// Statistics
int totalTrades = 0;
int winTrades = 0;
int lossTrades = 0;
double totalProfit = 0;
double maxDrawdown = 0;
double currentDrawdown = 0;

// Dashboard info
string dashboardInfo = "";
bool isTradeTime = false;
bool isTrendUp = false;
bool volatilityHigh = false;

//+------------------------------------------------------------------+
//| EXPERT INITIALIZATION
//+------------------------------------------------------------------+
int OnInit() {
    if (!EnableEA) {
        Print("EA is disabled. Set EnableEA = true to activate.");
        return INIT_SUCCEEDED;
    }
    
    // Validate inputs
    if (AccountRiskPercent < 1.0 || AccountRiskPercent > 3.0) {
        Alert("Account Risk % must be between 1% and 3%");
        return INIT_PARAMETERS_INCORRECT;
    }
    
    if (MaxOpenPositions < 1 || MaxOpenPositions > 10) {
        Alert("Max Open Positions must be between 1 and 10");
        return INIT_PARAMETERS_INCORRECT;
    }
    
    // Initialize trade object
    trade.SetExpertMagicNumber(123456 + (int)Symbol());
    
    Print("Rexecute Algo EA initialized successfully!");
    Print("Broker: ", BrokerType, " | Trading Mode: ", TradingMode);
    Print("Account Risk: ", AccountRiskPercent, "% | Max Positions: ", MaxOpenPositions);
    
    return INIT_SUCCEEDED;
}

//+------------------------------------------------------------------+
//| EXPERT DEINITIALIZATION
//+------------------------------------------------------------------+
void OnDeinit(const int reason) {
    Print("EA deinitialized. Reason code: ", reason);
}

//+------------------------------------------------------------------+
//| EXPERT TICK
//+------------------------------------------------------------------+
void OnTick() {
    if (!EnableEA) {
        return;
    }
    
    // Update market analysis
    AnalyzeMarket();
    
    // Check if it's trading time
    isTradeTime = IsWithinTradingHours();
    
    // Close positions if it's not trading time
    if (!isTradeTime) {
        CloseAllPositions();
        return;
    }
    
    // Manage existing positions
    ManagePositions();
    
    // Generate new signals
    if (CountOpenPositions() < MaxOpenPositions) {
        GenerateSignals();
    }
    
    // Update dashboard
    UpdateDashboard();
}

//+------------------------------------------------------------------+
//| ANALYZE MARKET CONDITIONS
//+------------------------------------------------------------------+
void AnalyzeMarket() {
    // Trend analysis using EMA
    double ema50 = iMA(Symbol(), PERIOD_CURRENT, TrendPeriod, 0, MODE_EMA, PRICE_CLOSE, 0);
    double close = iClose(Symbol(), PERIOD_CURRENT, 0);
    
    isTrendUp = close > ema50;
    
    // Volatility analysis using ATR
    double atr = iATR(Symbol(), PERIOD_CURRENT, ATRPeriod, 0);
    double avgATR = iATR(Symbol(), PERIOD_CURRENT, ATRPeriod, 20);
    
    volatilityHigh = atr > avgATR * 1.5;
}

//+------------------------------------------------------------------+
//| CHECK TRADING TIME
//+------------------------------------------------------------------+
bool IsWithinTradingHours() {
    MqlDateTime now;
    TimeCurrent(now);
    
    // Check hour
    if (now.hour < StartHour || now.hour >= EndHour) {
        return false;
    }
    
    // Check day of week
    switch(now.day_of_week) {
        case 1: return TradeMonday;
        case 2: return TradeTuesday;
        case 3: return TradeWednesday;
        case 4: return TradeThursday;
        case 5: return TradeFriday;
        case 6: return TradeSaturday;
        case 0: return TradeSunday;
        default: return false;
    }
}

//+------------------------------------------------------------------+
//| MANAGE OPEN POSITIONS
//+------------------------------------------------------------------+
void ManagePositions() {
    for (int i = PositionsTotal() - 1; i >= 0; i--) {
        if (!posInfo.SelectByIndex(i)) continue;
        if (posInfo.Symbol() != Symbol()) continue;
        if (posInfo.Magic() != trade.RequestMagic()) continue;
        
        double posProfit = posInfo.Profit();
        double posOpenPrice = posInfo.PriceOpen();
        double currentPrice = PositionGetDouble(POSITION_PRICE_CURRENT);
        
        // Trailing stop
        if (TrailingStopEnabled && posProfit > TrailingStopPoints * _Point) {
            UpdateTrailingStop(posInfo.Ticket(), currentPrice, posInfo.PositionType());
        }
        
        // Breakeven stop
        if (BreakEvenStopEnabled && posProfit > BreakEvenProfitPoints * _Point) {
            if (posInfo.PositionType() == POSITION_TYPE_BUY) {
                if (posInfo.StopLoss() < posOpenPrice) {
                    trade.PositionModify(posInfo.Ticket(), posOpenPrice, posInfo.TakeProfit());
                }
            } else if (posInfo.PositionType() == POSITION_TYPE_SELL) {
                if (posInfo.StopLoss() > posOpenPrice) {
                    trade.PositionModify(posInfo.Ticket(), posOpenPrice, posInfo.TakeProfit());
                }
            }
        }
        
        // Partial take profit
        if (PartialTakeProfitEnabled && posProfit > (posInfo.TakeProfit() - posOpenPrice) * 0.5) {
            double halfLot = posInfo.Volume() / 2;
            if (halfLot >= SymbolInfoDouble(Symbol(), SYMBOL_VOLUME_MIN)) {
                trade.Sell(halfLot, Symbol());
            }
        }
    }
}

//+------------------------------------------------------------------+
//| UPDATE TRAILING STOP
//+------------------------------------------------------------------+
void UpdateTrailingStop(ulong ticket, double currentPrice, ENUM_POSITION_TYPE posType) {
    double newStopLoss;
    
    if (posType == POSITION_TYPE_BUY) {
        newStopLoss = currentPrice - (TrailingStopPoints * _Point);
        if (newStopLoss > posInfo.StopLoss()) {
            trade.PositionModify(ticket, newStopLoss, posInfo.TakeProfit());
        }
    } else if (posType == POSITION_TYPE_SELL) {
        newStopLoss = currentPrice + (TrailingStopPoints * _Point);
        if (newStopLoss < posInfo.StopLoss()) {
            trade.PositionModify(ticket, newStopLoss, posInfo.TakeProfit());
        }
    }
}

//+------------------------------------------------------------------+
//| GENERATE TRADING SIGNALS
//+------------------------------------------------------------------+
void GenerateSignals() {
    // Apply filters
    if (UseTrendFilter && !isTrendUp) {
        return; // Don't trade downtrend
    }
    
    if (UseVolatilityFilter && volatilityHigh) {
        return; // Don't trade high volatility
    }
    
    // RSI Signal Generation
    double rsi = iRSI(Symbol(), PERIOD_CURRENT, 14, PRICE_CLOSE, 0);
    
    // BUY Signal: RSI < 30 (oversold)
    if (rsi < 30 && isTrendUp) {
        ExecuteBuySignal();
    }
    
    // SELL Signal: RSI > 70 (overbought)
    if (rsi > 70 && !isTrendUp) {
        ExecuteSellSignal();
    }
}

//+------------------------------------------------------------------+
//| EXECUTE BUY SIGNAL
//+------------------------------------------------------------------+
void ExecuteBuySignal() {
    double bid = SymbolInfoDouble(Symbol(), SYMBOL_BID);
    double ask = SymbolInfoDouble(Symbol(), SYMBOL_ASK);
    
    double stopLoss = bid - (50 * _Point);
    double takeProfit = ask + (50 * TakeProfitMultiplier * _Point);
    
    double volume = CalculatePositionSize(bid - stopLoss);
    
    if (volume > 0) {
        trade.BuyStop(volume, ask + (5 * _Point), Symbol(), stopLoss, takeProfit, ORDER_TIME_GTC, 0, "Rexecute Algo Buy");
    }
}

//+------------------------------------------------------------------+
//| EXECUTE SELL SIGNAL
//+------------------------------------------------------------------+
void ExecuteSellSignal() {
    double bid = SymbolInfoDouble(Symbol(), SYMBOL_BID);
    double ask = SymbolInfoDouble(Symbol(), SYMBOL_ASK);
    
    double stopLoss = ask + (50 * _Point);
    double takeProfit = bid - (50 * TakeProfitMultiplier * _Point);
    
    double volume = CalculatePositionSize(stopLoss - ask);
    
    if (volume > 0) {
        trade.SellStop(volume, bid - (5 * _Point), Symbol(), stopLoss, takeProfit, ORDER_TIME_GTC, 0, "Rexecute Algo Sell");
    }
}

//+------------------------------------------------------------------+
//| CALCULATE POSITION SIZE
//+------------------------------------------------------------------+
double CalculatePositionSize(double riskAmount) {
    double accountBalance = AccountInfoDouble(ACCOUNT_BALANCE);
    double riskAmount_USD = accountBalance * (AccountRiskPercent / 100.0);
    
    // Cap at MaxRiskPerTrade
    if (riskAmount_USD > MaxRiskPerTrade) {
        riskAmount_USD = MaxRiskPerTrade;
    }
    
    double tickValue = SymbolInfoDouble(Symbol(), SYMBOL_TRADE_TICK_VALUE);
    double volume = (riskAmount_USD / riskAmount) / tickValue;
    
    double minVolume = SymbolInfoDouble(Symbol(), SYMBOL_VOLUME_MIN);
    double maxVolume = SymbolInfoDouble(Symbol(), SYMBOL_VOLUME_MAX);
    double stepVolume = SymbolInfoDouble(Symbol(), SYMBOL_VOLUME_STEP);
    
    // Normalize volume
    volume = MathRound(volume / stepVolume) * stepVolume;
    
    if (volume < minVolume) return 0;
    if (volume > maxVolume) volume = maxVolume;
    
    return volume;
}

//+------------------------------------------------------------------+
//| COUNT OPEN POSITIONS
//+------------------------------------------------------------------+
int CountOpenPositions() {
    int count = 0;
    for (int i = PositionsTotal() - 1; i >= 0; i--) {
        if (posInfo.SelectByIndex(i)) {
            if (posInfo.Symbol() == Symbol() && posInfo.Magic() == trade.RequestMagic()) {
                count++;
            }
        }
    }
    return count;
}

//+------------------------------------------------------------------+
//| CLOSE ALL POSITIONS
//+------------------------------------------------------------------+
void CloseAllPositions() {
    if (!ManualCloseEnabled) {
        for (int i = PositionsTotal() - 1; i >= 0; i--) {
            if (posInfo.SelectByIndex(i)) {
                if (posInfo.Symbol() == Symbol() && posInfo.Magic() == trade.RequestMagic()) {
                    trade.PositionClose(posInfo.Ticket());
                }
            }
        }
    }
}

//+------------------------------------------------------------------+
//| UPDATE DASHBOARD
//+------------------------------------------------------------------+
void UpdateDashboard() {
    double balance = AccountInfoDouble(ACCOUNT_BALANCE);
    double equity = AccountInfoDouble(ACCOUNT_EQUITY);
    double drawdown = (balance - equity) / balance * 100;
    
    dashboardInfo = "╔═══════════════════════════════════════════╗\n";
    dashboardInfo += "║       REXECUTE ALGO - EA DASHBOARD       ║\n";
    dashboardInfo += "╠═══════════════════════════════════════════╣\n";
    dashboardInfo += "║ Status: " + (EnableEA ? "✓ ENABLED" : "✗ DISABLED") + " (Manual Close: " + (ManualCloseEnabled ? "ON" : "OFF") + ")\n";
    dashboardInfo += "║ Symbol: " + Symbol() + "\n";
    dashboardInfo += "║ Account Balance: $" + DoubleToString(balance, 2) + "\n";
    dashboardInfo += "║ Current Equity: $" + DoubleToString(equity, 2) + "\n";
    dashboardInfo += "║ Drawdown: " + DoubleToString(drawdown, 2) + "%\n";
    dashboardInfo += "║ Open Positions: " + CountOpenPositions() + "/" + MaxOpenPositions + "\n";
    dashboardInfo += "║ Trend: " + (isTrendUp ? "↑ UP" : "↓ DOWN") + " | Volatility: " + (volatilityHigh ? "HIGH" : "NORMAL") + "\n";
    dashboardInfo += "║ Trading Hours: " + (isTradeTime ? "✓ ACTIVE" : "✗ CLOSED") + "\n";
    dashboardInfo += "╚═══════════════════════════════════════════╝\n";
    
    Comment(dashboardInfo);
}

//+------------------------------------------------------------------+
//| END OF EXPERT ADVISOR
//+------------------------------------------------------------------+
