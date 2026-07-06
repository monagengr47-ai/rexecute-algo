# Rexecute Algo API Documentation

## Base URL

```
http://localhost:3001/api
```

## Authentication

Currently, no authentication is required. For production, implement API key or JWT authentication.

## Endpoints

### Account Endpoints

#### Get Account Overview
```
GET /api/account/overview
```

Response:
```json
{
  "accountNumber": "MT5-123456",
  "balance": 10000.00,
  "equity": 10125.50,
  "availableMargin": 9875.50,
  "usedMargin": 250.00,
  "marginLevel": 4050.20,
  "currency": "USD",
  "leverage": 100,
  "totalProfit": 125.50,
  "drawdownPercent": 2.50,
  "status": "ACTIVE"
}
```

#### Get Balance History
```
GET /api/account/balance-history?days=30
```

### Position Endpoints

#### Get Open Positions
```
GET /api/positions/open
```

Response:
```json
{
  "positions": [
    {
      "ticket": 101,
      "symbol": "EURUSD",
      "type": "BUY",
      "volume": 1.0,
      "openPrice": 1.0850,
      "currentPrice": 1.0875,
      "stopLoss": 1.0820,
      "takeProfit": 1.0920,
      "profit": 25.00,
      "profitPercent": 0.23
    }
  ],
  "total": 1
}
```

#### Close Position
```
POST /api/positions/:ticket/close
```

#### Modify Position
```
PUT /api/positions/:ticket

Body:
{
  "stopLoss": 1.0810,
  "takeProfit": 1.0950
}
```

### Trade Endpoints

#### Get Trade History
```
GET /api/trades/history?limit=50&offset=0
```

#### Get Trade Statistics
```
GET /api/trades/stats
```

Response:
```json
{
  "totalTrades": 125,
  "winTrades": 75,
  "lossTrades": 50,
  "winRate": 60.0,
  "profitFactor": 1.85,
  "averageWin": 45.50,
  "averageLoss": -38.25,
  "sharpeRatio": 1.45,
  "totalProfit": 1850.00
}
```

### Settings Endpoints

#### Get All Settings
```
GET /api/settings
```

#### Update Settings
```
PUT /api/settings

Body:
{
  "enableEA": true,
  "accountRiskPercent": 2.0,
  "maxOpenPositions": 5
}
```

#### Update Single Setting
```
PUT /api/settings/:key

Body:
{
  "value": true
}
```

## WebSocket

Real-time data streaming available at `ws://localhost:3001`

### Connection
```javascript
const ws = new WebSocket('ws://localhost:3001');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Real-time update:', data);
};
```

### Message Types
- `CONNECTED`: Connection established
- `UPDATE`: Real-time data update
- `POSITION_OPEN`: New position opened
- `POSITION_CLOSED`: Position closed
- `TRADE_EXECUTED`: Trade executed

## Error Handling

All endpoints return standard HTTP status codes:

- `200`: Success
- `400`: Bad Request
- `404`: Not Found
- `500`: Server Error

Error Response:
```json
{
  "error": "Error message",
  "message": "Detailed error description"
}
```

## Rate Limiting

Currently no rate limiting. For production, implement rate limiting (e.g., 100 requests per minute per IP).

## Example Usage

### Fetch Account Overview
```javascript
const response = await fetch('http://localhost:3001/api/account/overview');
const data = await response.json();
console.log(`Balance: $${data.balance}`);
```

### Update EA Settings
```javascript
const response = await fetch('http://localhost:3001/api/settings', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    enableEA: true,
    accountRiskPercent: 2.5,
    maxOpenPositions: 6
  })
});
```
