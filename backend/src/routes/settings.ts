import { Router, Request, Response } from 'express';
import { SettingsService } from '../services/settingsService';

export const settingsRoutes = Router();
const settingsService = new SettingsService();

// Get all EA settings
settingsRoutes.get('/', async (req: Request, res: Response) => {
  try {
    const settings = await settingsService.getAllSettings();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Update EA settings
settingsRoutes.put('/', async (req: Request, res: Response) => {
  try {
    const result = await settingsService.updateSettings(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Get setting by key
settingsRoutes.get('/:key', async (req: Request, res: Response) => {
  try {
    const setting = await settingsService.getSetting(req.params.key);
    res.json(setting);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Update single setting
settingsRoutes.put('/:key', async (req: Request, res: Response) => {
  try {
    const result = await settingsService.updateSetting(req.params.key, req.body.value);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});
