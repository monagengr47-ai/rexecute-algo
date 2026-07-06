import { Router, Request, Response } from 'express';
import { PositionService } from '../services/positionService';

export const positionRoutes = Router();
const positionService = new PositionService();

// Get open positions
positionRoutes.get('/open', async (req: Request, res: Response) => {
  try {
    const positions = await positionService.getOpenPositions();
    res.json(positions);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Get position by ticket
positionRoutes.get('/:ticket', async (req: Request, res: Response) => {
  try {
    const position = await positionService.getPositionByTicket(req.params.ticket);
    if (!position) {
      return res.status(404).json({ error: 'Position not found' });
    }
    res.json(position);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Close position
positionRoutes.post('/:ticket/close', async (req: Request, res: Response) => {
  try {
    const result = await positionService.closePosition(req.params.ticket);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Modify position
positionRoutes.put('/:ticket', async (req: Request, res: Response) => {
  try {
    const { stopLoss, takeProfit } = req.body;
    const result = await positionService.modifyPosition(req.params.ticket, stopLoss, takeProfit);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});
