# Rexecute Algo - Installation Guide

## Prerequisites

- MetaTrader 4 or MetaTrader 5
- Windows OS (for MT4/MT5)
- Node.js 16+ (for dashboard)
- npm or yarn package manager
- Supported Broker Account (Exness, XM, Deriv)

## Installation Steps

### 1. Install MetaTrader EA

#### MT5 Installation:
```bash
# Download RexecuteAlgo.mq5
# Copy to: C:\Users\[YourUsername]\AppData\Roaming\MetaQuotes\Terminal\[TerminalID]\MQL5\Experts\
# Or use MT5 File > Open Data Folder
```

#### MT4 Installation:
```bash
# Download RexecuteAlgo.mq4
# Copy to: C:\Program Files\[Broker]\experts\
# Or use MT4 File > Open Data Folder
```

### 2. Reload EA in MetaTrader

1. Open MetaTrader terminal
2. Right-click on chart
3. Expert Advisors > Reload

### 3. Attach EA to Chart

1. Right-click on chart
2. Expert Advisors > Rexecute Algo
3. Configure parameters
4. Click OK
5. Allow live trading permission when prompted

### 4. Install Dashboard Backend

```bash
cd backend
npm install
cp .env.example .env
npm start
```

### 5. Install Dashboard Frontend

```bash
cd dashboard
npm install
npm run dev
```

## Configuration

### EA Parameters

Key settings to configure:

- **EnableEA**: true/false - Master on/off switch
- **AccountRiskPercent**: 1-3% - Risk per trade
- **MaxOpenPositions**: 1-10 - Maximum concurrent trades
- **TrailingStopEnabled**: true/false - Auto trailing stop
- **UseTrendFilter**: true/false - Trade with trend only

### Dashboard Configuration

Backend runs on `http://localhost:3001`
Frontend runs on `http://localhost:5173`

Access dashboard at: `http://localhost:5173`

## Troubleshooting

### EA Not Loading
- Check file is in correct Experts folder
- Verify MQL5/MQL4 syntax is correct
- Check MetaTrader compilation log

### Dashboard Not Connecting
- Verify backend is running: `http://localhost:3001/health`
- Check firewall settings
- Ensure ports 3001 and 5173 are available

### EA Not Trading
- Enable EA: Set `EnableEA = true`
- Check trading hours
- Verify account balance is sufficient
- Check broker connection status

## Next Steps

1. Test on **demo account** for 2 weeks minimum
2. Start with small amounts on live account
3. Monitor EA daily for first month
4. Review performance metrics regularly
5. Adjust settings as needed

## Support

For issues, refer to TROUBLESHOOTING.md or check GitHub issues.
