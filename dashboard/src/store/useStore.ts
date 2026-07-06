import { create } from 'zustand';

interface StoreState {
  accountData: any;
  positions: any[];
  trades: any[];
  stats: any;
  settings: any;
  fetchAccountOverview: () => void;
  fetchPositions: () => void;
  fetchTrades: (limit?: number, offset?: number) => void;
  fetchStats: () => void;
  fetchSettings: () => void;
  updateSettings: (settings: any) => void;
}

export const useStore = create<StoreState>((set) => ({
  accountData: null,
  positions: [],
  trades: [],
  stats: null,
  settings: null,

  fetchAccountOverview: async () => {
    try {
      const response = await fetch('/api/account/overview');
      const data = await response.json();
      set({ accountData: data });
    } catch (error) {
      console.error('Error fetching account overview:', error);
    }
  },

  fetchPositions: async () => {
    try {
      const response = await fetch('/api/positions/open');
      const data = await response.json();
      set({ positions: data.positions || [] });
    } catch (error) {
      console.error('Error fetching positions:', error);
    }
  },

  fetchTrades: async (limit = 50, offset = 0) => {
    try {
      const response = await fetch(`/api/trades/history?limit=${limit}&offset=${offset}`);
      const data = await response.json();
      set({ trades: data.trades || [] });
    } catch (error) {
      console.error('Error fetching trades:', error);
    }
  },

  fetchStats: async () => {
    try {
      const response = await fetch('/api/trades/stats');
      const data = await response.json();
      set({ stats: data });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  },

  fetchSettings: async () => {
    try {
      const response = await fetch('/api/settings');
      const data = await response.json();
      set({ settings: data });
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  },

  updateSettings: async (settings: any) => {
    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      const data = await response.json();
      set({ settings: data });
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  }
}));
