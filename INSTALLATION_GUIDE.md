# Rexecute Algo - Complete Installation Guide

## System Requirements

✅ **Minimum:**
- Windows 7 or higher
- 2GB RAM
- MetaTrader 4 or MetaTrader 5
- Active internet connection
- Broker account (Demo or Live)

✅ **Recommended:**
- Windows 10/11
- 4GB+ RAM
- SSD hard drive
- Stable internet (dedicated line preferred)
- VPS for 24/7 trading

---

## Step-by-Step Installation

### Step 1: Download MetaTrader

**For MetaTrader 5:**
1. Visit [MetaQuotes official website](https://www.metatrader5.com)
2. Download MetaTrader 5
3. Run installer and follow prompts
4. Install to default location

**For MetaTrader 4:**
1. Visit your broker's website
2. Download MetaTrader 4 client
3. Install following broker instructions
4. Complete account setup

### Step 2: Open MetaTrader Terminal

1. Launch MetaTrader application
2. Log in with broker credentials
3. Wait for data synchronization (5-10 minutes)
4. Verify connection status (bottom right corner)

### Step 3: Locate Expert Advisors Folder

**MetaTrader 5:**
```
C:\Users\[YourUsername]\AppData\Roaming\MetaQuotes\Terminal\[TerminalID]\MQL5\Experts\
```

**Alternative (MT5):**
1. Open MetaTrader 5
2. Click "File" → "Open Data Folder"
3. Navigate to MQL5 → Experts

**MetaTrader 4:**
```
C:\Program Files\[BrokerName]\experts\
```

**Alternative (MT4):**
1. Open MetaTrader 4
2. Click "File" → "Open Data Folder"
3. Navigate to experts folder

### Step 4: Download Rexecute Algo

1. Visit this repository
2. Download `RexecuteAlgo.mq5` file
3. Save to your computer

### Step 5: Copy EA File

1. Open file explorer
2. Navigate to Experts folder (from Step 3)
3. Copy `RexecuteAlgo.mq5` into Experts folder
4. Paste file

**Verification:** File should appear in Expert Advisors list

### Step 6: Compile (If Using Source Code)

**For MT5:**
1. Open MetaTrader 5
2. Click "Tools" → "MetaEditor" (or Ctrl+E)
3. Click "File" → "Open"
4. Select `RexecuteAlgo.mq5`
5. Click "Compile" (F5 or toolbar button)
6. Check "Experts" tab for compilation success
7. Close MetaEditor

**For MT4:**
1. Open MetaTrader 4
2. Click "Tools" → "MetaEditor" (or F4)
3. Click "File" → "Open"
4. Select `RexecuteAlgo.mq4`
5. Click "Compile" (F5)
6. Verify no errors
7. Close MetaEditor

### Step 7: Reload Expert Advisors

1. In MetaTrader, right-click chart
2. Click "Expert Advisors" → "Reload"
3. Wait for refresh
4. "Rexecute Algo" should now appear in list

### Step 8: Apply EA to Chart

1. Open chart for desired symbol (e.g., EURUSD)
2. Right-click on chart
3. Select "Expert Advisors" → "Rexecute Algo"
4. Settings dialog opens

### Step 9: Configure Settings

**Basic Configuration:**

```
[MAIN SETTINGS]
EnableEA: true (turn ON)
ManualCloseEnabled: true (enable manual close)
AccountRiskPercent: 2.0 (2% risk per trade)
BrokerType: Select your broker
TradingMode: MODE_MULTI (or choose specific)

[TRADING PARAMETERS]
MaxOpenPositions: 5 (or adjust for your account)
MaxRiskPerTrade: 100 (maximum USD risk)
TakeProfitMultiplier: 2.0

[TIME SETTINGS]
StartHour: 8 (server time)
EndHour: 22 (server time)
```

### Step 10: Accept Permissions

1. Dialog box appears: "EA requires the following permissions"
2. Check: ✅ Allow live trading
3. Check: ✅ Allow external signals (if needed)
4. Click "OK"

### Step 11: Verify EA is Running

✅ **Success Indicators:**
- EA name appears in chart title
- Dashboard displays on chart
- Status shows "ON" or "OFF"
- No error messages

❌ **Troubleshooting Indicators:**
- EA name in title with red X
- Message: "EA not allowed"
- Dashboard not visible
- Error messages in Terminal

---

## Troubleshooting Common Issues

### Issue: "EA Not Allowed" Error

**Solution:**
1. Right-click chart → Expert Advisors → Properties
2. Go to "Common" tab
3. ✅ Check "Allow live trading"
4. ✅ Check "Allow DLL imports" (if needed)
5. Click OK

### Issue: Expert Advisors Folder Not Found

**Solution:**
1. Open MetaTrader
2. Click Tools → Options → File Paths
3. Note the "Data folder" path
4. Open File Explorer and navigate there
5. Create MQL5\Experts folder if missing

### Issue: EA Not Appearing in List

**Solution:**
1. Verify file is in correct Experts folder
2. Check file name: `RexecuteAlgo.mq5`
3. Restart MetaTrader completely
4. Right-click chart → Expert Advisors → Reload
5. Recompile EA if using source

### Issue: "Not Enough Money" Error

**Solution:**
1. Ensure account has minimum balance
2. Reduce `AccountRiskPercent` (try 1%)
3. Reduce `MaxOpenPositions` to 1-2
4. Start with demo account
5. Check position size calculator

### Issue: Compilation Errors

**Solution:**
1. Verify MT version (4 vs 5)
2. Check file encoding: UTF-8
3. Update MetaTerminal to latest version
4. Check for special characters in code
5. Redownload EA file

### Issue: No Trades Executed

**Solution:**
1. Verify `EnableEA = true`
2. Check trading hours (StartHour/EndHour)
3. Check day filters (TradeMonday, etc.)
4. Verify sufficient account balance
5. Check broker supports the symbol
6. Disable filters: `UseVolatilityFilter = false`

### Issue: High Slippage or Rejection

**Solution:**
1. Reduce position size
2. Increase `trade.SetDeviation(300)` for more slippage tolerance
3. Check broker connection
4. Trade during high liquidity hours
5. Choose major pairs (EURUSD, GBPUSD)

---

## Demo Account Setup (Recommended First Step)

### For Exness Demo:
1. Visit https://www.exness.com
2. Click "Open Demo Account"
3. Fill registration form
4. Confirm email
5. Receive credentials
6. Open MetaTrader and log in

### For XM Demo:
1. Visit https://www.xm.com
2. Click "Trading" → "Demo Account"
3. Select account type (Micro or Standard)
4. Fill details
5. Receive login credentials
6. Open MT4/MT5

### For Deriv Demo:
1. Visit https://deriv.com
2. Sign up account
3. Choose "Demo" mode
4. Get MT5 credentials
5. Open MT5 terminal

---

## VPS Setup for 24/7 Trading

### Why VPS?
- Run EA continuously
- Faster execution
- Reduced latency
- Professional setup

### Popular VPS Providers:
- **ForexVPS**
- **Hostinger**
- **DigitalOcean**
- **AWS (Amazon Web Services)**

### Basic VPS Setup:
1. Purchase VPS subscription
2. Receive login credentials (RDP)
3. Remote into VPS
4. Install MetaTrader on VPS
5. Copy EA file
6. Configure and run EA

---

## Security Best Practices

⚠️ **IMPORTANT:**

1. **Broker Credentials**
   - Never share login details
   - Use strong passwords
   - Enable 2FA if available

2. **Files**
   - Keep backups of settings
   - Don't download from untrusted sources
   - Verify file integrity

3. **Money**
   - Start with small amounts
   - Use stop losses
   - Never risk more than you can lose

4. **System**
   - Keep Windows updated
   - Use antivirus software
   - Regular backups

---

## Testing Checklist

- [ ] EA installed in correct folder
- [ ] EA appears in Expert Advisors list
- [ ] EA compiles without errors
- [ ] EA attached to chart successfully
- [ ] Dashboard displays correctly
- [ ] EnableEA = true setting confirmed
- [ ] Broker is supported
- [ ] Demo account has minimum balance ($100+)
- [ ] Trading hours settings are correct
- [ ] First test trade executed on demo
- [ ] Manual close feature works
- [ ] Alerts functioning correctly

---

## Next Steps

1. ✅ Start on DEMO account for 2 weeks
2. ✅ Test on 1 symbol first (EURUSD)
3. ✅ Use Conservative settings initially
4. ✅ Monitor daily results
5. ✅ Adjust parameters gradually
6. ✅ Move to LIVE account (small amounts)
7. ✅ Continue monitoring and optimization

---

**Installation Complete!** Your Rexecute Algo EA is ready to trade.

**Need Help?** Review troubleshooting section above or consult broker support.

**Last Updated**: July 6, 2026