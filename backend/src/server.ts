import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import WebSocket from 'ws';
import http from 'http';
import dotenv from 'dotenv';

import { initializeRoutes } from './routes/index';
import { initializeWebSocket } from './services/websocket';
import { TradeService } from './services/tradeService';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Initialize routes
initializeRoutes(app);

// Create HTTP server for WebSocket
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Initialize WebSocket
initializeWebSocket(wss);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// Start server
server.listen(port, () => {
  console.log(`🚀 Rexecute Algo Backend running on port ${port}`);
  console.log(`📊 Dashboard API: http://localhost:${port}`);
  console.log(`🔌 WebSocket: ws://localhost:${port}`);
});

export default app;
