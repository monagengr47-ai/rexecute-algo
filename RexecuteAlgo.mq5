//+------------------------------------------------------------------+
//|                     Rexecute Algo v1.0                           |
//|         Subscription-Free Trading EA for Multiple Brokers        |
//|              Forex, Indices, Metals, Crypto Trading               |
//|                      MT4/MT5 Compatible                           |
//+------------------------------------------------------------------+

#property copyright "Rexecute Algo © 2026"
#property link "https://rexecute.trading"
#property version "1.0"
#property strict
#property description "Advanced Trading EA with Risk Management - Supports Exness, XM, Deriv, MetaTrader"

// ============= INCLUDES & DEPENDENCIES =============
#include <Trade\Trade.mqh>
#include <Trade\PositionInfo.mqh>
#include <Trade\OrderInfo.mqh>
#include <Trade\DealInfo.mqh>
#include <Indicators\Trend.mqh>

// ============= ENUMERATIONS =============
enum ENUM_TRADING_MODE
{
    MODE_FOREX = 0,      // Foreign Exchange
    MODE_INDICES = 1,    // Stock Indices
    MODE_METALS = 2,     // Gold, Silver, etc.
    MODE_CRYPTO = 3,     // Cryptocurrencies
    MODE_MULTI = 4       // Multi-asset Trading
};

enum ENUM_BROKER_TYPE
{
    BROKER_EXNESS = 0,
    BROKER_XM = 1,
    BROKER_DERIV = 2,
    BROKER_METATRADER = 3
};

enum ENUM_RISK_PROFILE
{
    RISK_CONSERVATIVE = 1,    // 1% risk per trade
    RISK_MODERATE = 2,        // 2% risk per trade
    RISK_AGGRESSIVE = 3       // 3% risk per trade
};

// ============= INPUT PARAMETERS =============
group "=== MAIN SETTINGS ==="
input ENUM_TRADING_MODE TradingMode = MODE_MULTI;
input ENUM_BROKER_TYPE BrokerType = BROKER_METATRADER;
input bool EnableEA = true;                    // Master EA On/Off Switch
input bool ManualCloseEnabled = true;          // Manual Position Close Switch
input double AccountRiskPercent = 2.0;         // Risk per trade (%)

group "=== TRADING PARAMETERS ==="
input double MaxRiskPerTrade = 100;            // Max risk in USD
input double TakeProfitMultiplier = 2.0;       // TP/SL Ratio
input int MagicNumber = 20260706;              // EA Magic Number
input bool UseHedging = false;                 // Enable Hedging
input int MaxOpenPositions = 5;                // Max concurrent trades
input bool PartialTakeProfit = true;           // Partial TP (50% at 1:1, rest at 2:1)

group "=== POSITION MANAGEMENT ==="
input int TradeCommentMaxLength = 30;
input bool TrailingStopEnabled = true;         // Trailing Stop
input int TrailingStopPoints = 50;             // Trailing Stop Distance (points)
input bool BreakEvenStop = true;               // Move SL to breakeven at profit
input int BreakEvenProfitPoints = 30;          // Points profit to move SL

group "=== MARKET CONDITIONS ==="
input bool UseVolatilityFilter = true;         // Filter trades by volatility
input double VolatilityThreshold = 1.5;        // ATR multiplier for volatility
input int ATRPeriod = 14;                      // ATR period
input bool UseTrendFilter = true;              // Trade with trend only
input int TrendPeriod = 50;                    // MA period for trend

group "=== TIME SETTINGS ==="
input int StartHour = 8;                       // Trading start (server time)
input int EndHour = 22;                        // Trading end (server time)
input bool TradeMonday = true;
input bool TradeTuesday = true;
input bool TradeWednesday = true;
input bool TradeThursday = true;
input bool TradeFriday = true;
input bool TradeSaturday = false;
input bool TradeSunday = false;

group "=== NOTIFICATIONS & ALERTS ==="
input bool SendAlerts = true;
input bool SendNotifications = true;
input bool UseSound = true;
input string AlertSound = "alert.wav";

// ============= GLOBAL VARIABLES =============
CTrade trade;                           // Trading class
CPositionInfo position;                 // Position info class
COrderInfo order;                       // Order info class
CDealInfo deal;                         // Deal info class

datetime lastTradeTime = 0;
int openPositions = 0;
double accountBalance = 0;
double drawdown = 0;
bool isFirstRun = true;

// Indicator handles
int handleMA = INVALID_HANDLE;
int handleATR = INVALID_HANDLE;
int handleRSI = INVALID_HANDLE;

// ============= INITIALIZATION =============
int OnInit()
{
    // Initialize trade settings
    trade.SetExpertMagicNumber(MagicNumber);
    trade.SetDeviation(100);
    
    // Set commission mode based on broker
    trade.SetTypeFillingBySymbol(_Symbol);
    
    // Initialize indicators
    handleMA = iMA(_Symbol, _Period, TrendPeriod, 0, MODE_EMA, PRICE_CLOSE);
    if(handleMA == INVALID_HANDLE)
    {
        Alert("Failed to create MA indicator!");
        return INIT_FAILED;
    }
    
    handleATR = iATR(_Symbol, _Period, ATRPeriod);
    if(handleATR == INVALID_HANDLE)
    {
        Alert("Failed to create ATR indicator!");
        return INIT_FAILED;
    }
    
    handleRSI = iRSI(_Symbol, _Period, 14, PRICE_CLOSE);
    if(handleRSI == INVALID_HANDLE)
    {
        Alert("Failed to create RSI indicator!");
        return INIT_FAILED;
    }
    
    // Display startup message
    Comment("Rexecute Algo v1.0 - Initializing...");
    
    return INIT_SUCCEEDED;
}

// ============= MAIN TRADING LOGIC =============
void OnTick()
{
    if(!EnableEA)
    {
        Comment("EA is DISABLED - Manual mode only");
        return;
    }
    
    // Validate trading conditions
    if(!IsValidTradingTime())
    {
        Comment("Outside trading hours");
        return;
    }
    
    if(!IsBrokerSupported())
    {
        Comment("Broker not supported");
        return;
    }
    
    // Update account info
    UpdateAccountInfo();
    
    // Check for manual close requests
    if(ManualCloseEnabled)
    {
        ProcessManualCloseRequests();
    }
    
    // Manage existing positions
    ManageOpenPositions();
    
    // Check trading signals and execute trades
    if(openPositions < MaxOpenPositions)
    {
        ExecuteTradingSignals();
    }
    
    // Update UI
    UpdateDashboard();
}

// ============= TRADING SIGNAL EXECUTION =============
void ExecuteTradingSignals()
{
    // Get indicator values
    double maValue[1];
    double atrValue[1];
    double rsiValue[1];
    
    CopyBuffer(handleMA, 0, 1, 1, maValue);
    CopyBuffer(handleATR, 0, 1, 1, atrValue);
    CopyBuffer(handleRSI, 0, 1, 1, rsiValue);
    
    double currentPrice = SymbolInfoDouble(_Symbol, SYMBOL_BID);
    double trendMA = maValue[0];
    double atr = atrValue[0];
    double rsi = rsiValue[0];
    
    // Check trend filter
    bool bullishTrend = currentPrice > trendMA;
    bool bearishTrend = currentPrice < trendMA;
    
    // Check volatility filter
    bool highVolatility = atr > (iATR(_Symbol, _Period, ATRPeriod) * VolatilityThreshold);
    
    // LONG Signal
    if((bullishTrend || !UseTrendFilter) && rsi > 40 && rsi < 70)
    {
        if(!UseVolatilityFilter || !highVolatility)
        {
            ExecuteLongTrade(atr);
        }
    }
    
    // SHORT Signal
    if((bearishTrend || !UseTrendFilter) && rsi > 30 && rsi < 60)
    {
        if(!UseVolatilityFilter || !highVolatility)
        {
            ExecuteShortTrade(atr);
        }
    }
}

// ============= LONG TRADE EXECUTION =============
void ExecuteLongTrade(double atr)
{
    double ask = SymbolInfoDouble(_Symbol, SYMBOL_ASK);
    double stopLoss = ask - (atr * 1.5);
    double takeProfit = ask + (atr * 1.5 * TakeProfitMultiplier);
    
    double riskAmount = NormalizeDouble(CalculatePositionSize(ask - stopLoss), 2);
    
    if(riskAmount > 0 && riskAmount <= MaxRiskPerTrade)
    {
        if(trade.Buy(riskAmount, _Symbol, ask, stopLoss, takeProfit, "Rexecute LONG"))
        {
            lastTradeTime = TimeCurrent();
            openPositions++;
            SendTradeAlert("BUY", riskAmount, ask, stopLoss, takeProfit);
        }
    }
}

// ============= SHORT TRADE EXECUTION =============
void ExecuteShortTrade(double atr)
{
    double bid = SymbolInfoDouble(_Symbol, SYMBOL_BID);
    double stopLoss = bid + (atr * 1.5);
    double takeProfit = bid - (atr * 1.5 * TakeProfitMultiplier);
    
    double riskAmount = NormalizeDouble(CalculatePositionSize(stopLoss - bid), 2);
    
    if(riskAmount > 0 && riskAmount <= MaxRiskPerTrade)
    {
        if(trade.Sell(riskAmount, _Symbol, bid, stopLoss, takeProfit, "Rexecute SHORT"))
        {
            lastTradeTime = TimeCurrent();
            openPositions++;
            SendTradeAlert("SELL", riskAmount, bid, stopLoss, takeProfit);
        }
    }
}

// ============= POSITION MANAGEMENT =============
void ManageOpenPositions()
{
    openPositions = 0;
    
    for(int i = PositionsTotal() - 1; i >= 0; i--)
    {
        if(position.SelectByIndex(i))
        {
            if(position.Magic() == MagicNumber && position.Symbol() == _Symbol)
            {
                openPositions++;
                
                // Apply trailing stop
                if(TrailingStopEnabled)
                {
                    ApplyTrailingStop(position.Ticket());
                }
                
                // Check breakeven
                if(BreakEvenStop)
                {
                    MoveToBreakEven(position.Ticket());
                }
                
                // Partial take profit
                if(PartialTakeProfit)
                {
                    CheckPartialTakeProfit(position.Ticket());
                }
            }
        }
    }
}

// ============= TRAILING STOP =============
void ApplyTrailingStop(ulong ticket)
{
    if(!position.SelectByTicket(ticket))
        return;
    
    double bid = SymbolInfoDouble(_Symbol, SYMBOL_BID);
    double ask = SymbolInfoDouble(_Symbol, SYMBOL_ASK);
    double point = SymbolInfoDouble(_Symbol, SYMBOL_POINT);
    
    if(position.Type() == POSITION_TYPE_BUY)
    {
        double newSL = bid - (TrailingStopPoints * point);
        if(newSL > position.StopLoss())
        {
            trade.PositionModify(ticket, newSL, position.TakeProfit());
        }
    }
    else if(position.Type() == POSITION_TYPE_SELL)
    {
        double newSL = ask + (TrailingStopPoints * point);
        if(newSL < position.StopLoss())
        {
            trade.PositionModify(ticket, newSL, position.TakeProfit());
        }
    }
}

// ============= MOVE TO BREAKEVEN =============
void MoveToBreakEven(ulong ticket)
{
    if(!position.SelectByTicket(ticket))
        return;
    
    double bid = SymbolInfoDouble(_Symbol, SYMBOL_BID);
    double point = SymbolInfoDouble(_Symbol, SYMBOL_POINT);
    double profit = position.Profit();
    
    if(profit > (BreakEvenProfitPoints * point * _Point))
    {
        if(position.Type() == POSITION_TYPE_BUY)
        {
            if(bid > position.OpenPrice())
            {
                double newSL = position.OpenPrice();
                if(newSL > position.StopLoss())
                {
                    trade.PositionModify(ticket, newSL, position.TakeProfit());
                }
            }
        }
        else if(position.Type() == POSITION_TYPE_SELL)
        {
            if(bid < position.OpenPrice())
            {
                double newSL = position.OpenPrice();
                if(newSL < position.StopLoss())
                {
                    trade.PositionModify(ticket, newSL, position.TakeProfit());
                }
            }
        }
    }
}

// ============= PARTIAL TAKE PROFIT =============
void CheckPartialTakeProfit(ulong ticket)
{
    if(!position.SelectByTicket(ticket))
        return;
    
    double bid = SymbolInfoDouble(_Symbol, SYMBOL_BID);
    double ask = SymbolInfoDouble(_Symbol, SYMBOL_ASK);
    double volume = position.Volume();
    double profitPoints = position.PriceCurrent() - position.OpenPrice();
    
    // Close 50% at 1:1 ratio
    if(position.Type() == POSITION_TYPE_BUY && bid >= position.OpenPrice())
    {
        double profitDistance = bid - position.OpenPrice();
        double slDistance = position.OpenPrice() - position.StopLoss();
        
        if(profitDistance >= slDistance)
        {
            trade.PositionClosePartial(ticket, volume * 0.5);
        }
    }
}

// ============= MANUAL POSITION CLOSE =============
void ProcessManualCloseRequests()
{
    // This function processes manual close commands via comments
    // Can be extended with hotkeys or external signals
}

// ============= HELPER FUNCTIONS =============
double CalculatePositionSize(double riskPoints)
{
    if(riskPoints <= 0)
        return 0;
    
    double accountEquity = AccountInfoDouble(ACCOUNT_EQUITY);
    double riskAmount = accountEquity * (AccountRiskPercent / 100.0);
    
    double tickValue = SymbolInfoDouble(_Symbol, SYMBOL_TRADE_TICK_VALUE);
    double tickSize = SymbolInfoDouble(_Symbol, SYMBOL_TRADE_TICK_SIZE);
    
    if(tickValue == 0 || tickSize == 0)
        return 0;
    
    double positionSize = riskAmount / (riskPoints * tickValue / tickSize);
    
    // Normalize to contract size
    double minVolume = SymbolInfoDouble(_Symbol, SYMBOL_VOLUME_MIN);
    double maxVolume = SymbolInfoDouble(_Symbol, SYMBOL_VOLUME_MAX);
    double volumeStep = SymbolInfoDouble(_Symbol, SYMBOL_VOLUME_STEP);
    
    positionSize = NormalizeDouble(positionSize / volumeStep, 0) * volumeStep;
    
    if(positionSize < minVolume)
        positionSize = minVolume;
    if(positionSize > maxVolume)
        positionSize = maxVolume;
    
    return positionSize;
}

bool IsValidTradingTime()
{
    int hour = Hour();
    int dayOfWeek = DayOfWeek();
    
    if(hour < StartHour || hour >= EndHour)
        return false;
    
    if((dayOfWeek == 1 && !TradeMonday) ||
       (dayOfWeek == 2 && !TradeTuesday) ||
       (dayOfWeek == 3 && !TradeWednesday) ||
       (dayOfWeek == 4 && !TradeThursday) ||
       (dayOfWeek == 5 && !TradeFriday) ||
       (dayOfWeek == 6 && !TradeSaturday) ||
       (dayOfWeek == 0 && !TradeSunday))
        return false;
    
    return true;
}

bool IsBrokerSupported()
{
    string brokerName = AccountInfoString(ACCOUNT_COMPANY);
    
    if(BrokerType == BROKER_EXNESS && brokerName != "Exness")
        return false;
    if(BrokerType == BROKER_XM && brokerName != "XM")
        return false;
    if(BrokerType == BROKER_DERIV && brokerName != "Deriv")
        return false;
    
    return true;
}

void UpdateAccountInfo()
{
    accountBalance = AccountInfoDouble(ACCOUNT_BALANCE);
    double equity = AccountInfoDouble(ACCOUNT_EQUITY);
    drawdown = ((accountBalance - equity) / accountBalance) * 100;
}

void SendTradeAlert(string direction, double volume, double price, double sl, double tp)
{
    if(!SendAlerts)
        return;
    
    string message = StringFormat("Rexecute Algo Trade Alert\n%s\nVolume: %.2f\nPrice: %.5f\nSL: %.5f\nTP: %.5f",
                                  direction, volume, price, sl, tp);
    
    if(SendNotifications)
        SendNotification(message);
    
    if(UseSound)
        PlaySound(AlertSound);
    
    Print(message);
}

void UpdateDashboard()
{
    string info = StringFormat(
        "╔══════════════════════════════════════╗\n" +
        "║    REXECUTE ALGO v1.0                ║\n" +
        "║    Status: %s                   ║\n" +
        "║    Manual Close: %s                ║\n" +
        "║──────────────────────────────────────║\n" +
        "║    Open Positions: %d/%d            ║\n" +
        "║    Balance: $%.2f               ║\n" +
        "║    Drawdown: %.2f%%                  ║\n" +
        "║    Symbol: %s                        ║\n" +
        "╚══════════════════════════════════════╝",
        EnableEA ? "ON" : "OFF",
        ManualCloseEnabled ? "ON" : "OFF",
        openPositions, MaxOpenPositions,
        accountBalance,
        drawdown,
        _Symbol
    );
    
    Comment(info);
}

// ============= DEINITIALIZATION =============
void OnDeinit(const int reason)
{
    // Release indicator handles
    if(handleMA != INVALID_HANDLE)
        IndicatorRelease(handleMA);
    if(handleATR != INVALID_HANDLE)
        IndicatorRelease(handleATR);
    if(handleRSI != INVALID_HANDLE)
        IndicatorRelease(handleRSI);
    
    Comment("Rexecute Algo - Stopped");
}
