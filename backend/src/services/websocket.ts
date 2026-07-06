import WebSocket from 'ws';

export function initializeWebSocket(wss: WebSocket.Server) {
  wss.on('connection', (ws: WebSocket) => {
    console.log('🔌 WebSocket client connected');

    // Send initial data
    ws.send(JSON.stringify({
      type: 'CONNECTED',
      timestamp: new Date().toISOString()
    }));

    // Simulate real-time updates
    const interval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
          type: 'UPDATE',
          data: {
            timestamp: new Date().toISOString(),
            balance: 10000 + Math.random() * 500 - 250,
            equity: 10000 + Math.random() * 500 - 200,
            openPositions: Math.floor(Math.random() * 5),
            pipsProfit: Math.random() * 100 - 50
          }
        }));
      }
    }, 1000);

    ws.on('message', (message: string) => {
      try {
        const data = JSON.parse(message);
        console.log('📨 WebSocket message:', data);
        
        // Echo response
        ws.send(JSON.stringify({
          type: 'RESPONSE',
          received: data
        }));
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    });

    ws.on('close', () => {
      console.log('🔌 WebSocket client disconnected');
      clearInterval(interval);
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  });
}
