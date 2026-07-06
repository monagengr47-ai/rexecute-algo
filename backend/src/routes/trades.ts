import { Router, Request, Response } from 'express';
import { TradeService } from '../services/tradeService';

export const tradeRoutes = Router();
const tradeService = new TradeService();

// Get trade history
tradeRoutes.get('/history', async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;
    
    const trades = await tradeService.getTradeHistory(limit, offset);
    res.json(trades);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Get trade statistics
tradeRoutes.get('/stats', async (req: Request, res: Response) => {
  try {
    const stats = await tradeService.getTradeStatistics();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Get daily performance
tradeRoutes.get('/performance/daily', async (req: Request, res: Response) => {
  try {
    const performance = await tradeService.getDailyPerformance();
    res.json(performance);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Get trade by ID
tradeRoutes.get('/:id', async (req: Request, res: Response) => {
  try {
    const trade = await tradeService.getTradeById(req.params.id);
    if (!trade) {
      return res.status(404).json({ error: 'Trade not found' });
    }
    res.json(trade);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});
