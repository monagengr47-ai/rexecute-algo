export class SettingsService {
  private settings: Map<string, any> = new Map([
    ['enableEA', true],
    ['manualCloseEnabled', true],
    ['accountRiskPercent', 2.0],
    ['maxOpenPositions', 5],
    ['trailingStopEnabled', true],
    ['trailingStopPoints', 50],
    ['breakEvenStopEnabled', true],
    ['breakEvenProfitPoints', 30],
    ['useVolatilityFilter', true],
    ['useTrendFilter', true],
    ['startHour', 8],
    ['endHour', 22]
  ]);

  async getAllSettings() {
    const settings: any = {};
    this.settings.forEach((value, key) => {
      settings[key] = value;
    });
    return settings;
  }

  async updateSettings(newSettings: any) {
    Object.entries(newSettings).forEach(([key, value]) => {
      this.settings.set(key, value);
    });
    return { success: true, message: 'Settings updated' };
  }

  async getSetting(key: string) {
    return { [key]: this.settings.get(key) };
  }

  async updateSetting(key: string, value: any) {
    this.settings.set(key, value);
    return { success: true, message: `Setting ${key} updated` };
  }
}
