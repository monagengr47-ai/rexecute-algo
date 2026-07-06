import { Router, Request, Response } from 'express';
import { AccountService } from '../services/accountService';

export const accountRoutes = Router();
const accountService = new AccountService();

// Get account overview
accountRoutes.get('/overview', async (req: Request, res: Response) => {
  try {
    const overview = await accountService.getAccountOverview();
    res.json(overview);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Get account balance history
accountRoutes.get('/balance-history', async (req: Request, res: Response) => {
  try {
    const days = parseInt(req.query.days as string) || 30;
    const history = await accountService.getBalanceHistory(days);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Get equity curve
accountRoutes.get('/equity-curve', async (req: Request, res: Response) => {
  try {
    const curve = await accountService.getEquityCurve();
    res.json(curve);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Get drawdown analysis
accountRoutes.get('/drawdown', async (req: Request, res: Response) => {
  try {
    const drawdown = await accountService.getDrawdownAnalysis();
    res.json(drawdown);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});
