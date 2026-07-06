import { Express } from 'express';
import { tradeRoutes } from './trades';
import { accountRoutes } from './account';
import { positionRoutes } from './positions';
import { settingsRoutes } from './settings';

export function initializeRoutes(app: Express) {
  app.use('/api/trades', tradeRoutes);
  app.use('/api/account', accountRoutes);
  app.use('/api/positions', positionRoutes);
  app.use('/api/settings', settingsRoutes);
}
