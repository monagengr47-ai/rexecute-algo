import React, { useEffect } from 'react'
import { useStore } from '../store/useStore'
import { Save } from 'lucide-react'
import './Settings.css'

function Settings() {
  const { settings, fetchSettings, updateSettings } = useStore()
  const [formData, setFormData] = React.useState(settings)

  useEffect(() => {
    fetchSettings()
  }, [])

  useEffect(() => {
    setFormData(settings)
  }, [settings])

  const handleChange = (key: string, value: any) => {
    setFormData({ ...formData, [key]: value })
  }

  const handleSave = () => {
    updateSettings(formData)
  }

  return (
    <div className="settings-page">
      <h1>EA Settings</h1>
      
      <div className="settings-container">
        {/* Main Settings */}
        <div className="card settings-section">
          <h2>Main Settings</h2>
          <div className="setting-group">
            <label>Enable EA</label>
            <input
              type="checkbox"
              checked={formData?.enableEA}
              onChange={(e) => handleChange('enableEA', e.target.checked)}
            />
          </div>
          <div className="setting-group">
            <label>Account Risk (%)</label>
            <input
              type="number"
              value={formData?.accountRiskPercent}
              onChange={(e) => handleChange('accountRiskPercent', parseFloat(e.target.value))}
              min="1"
              max="3"
              step="0.1"
            />
          </div>
          <div className="setting-group">
            <label>Max Open Positions</label>
            <input
              type="number"
              value={formData?.maxOpenPositions}
              onChange={(e) => handleChange('maxOpenPositions', parseInt(e.target.value))}
              min="1"
              max="10"
            />
          </div>
        </div>

        {/* Position Management */}
        <div className="card settings-section">
          <h2>Position Management</h2>
          <div className="setting-group">
            <label>Enable Trailing Stop</label>
            <input
              type="checkbox"
              checked={formData?.trailingStopEnabled}
              onChange={(e) => handleChange('trailingStopEnabled', e.target.checked)}
            />
          </div>
          <div className="setting-group">
            <label>Trailing Stop Points</label>
            <input
              type="number"
              value={formData?.trailingStopPoints}
              onChange={(e) => handleChange('trailingStopPoints', parseInt(e.target.value))}
            />
          </div>
          <div className="setting-group">
            <label>Enable Breakeven Stop</label>
            <input
              type="checkbox"
              checked={formData?.breakEvenStopEnabled}
              onChange={(e) => handleChange('breakEvenStopEnabled', e.target.checked)}
            />
          </div>
          <div className="setting-group">
            <label>Breakeven Profit Points</label>
            <input
              type="number"
              value={formData?.breakEvenProfitPoints}
              onChange={(e) => handleChange('breakEvenProfitPoints', parseInt(e.target.value))}
            />
          </div>
        </div>

        {/* Market Filters */}
        <div className="card settings-section">
          <h2>Market Filters</h2>
          <div className="setting-group">
            <label>Use Volatility Filter</label>
            <input
              type="checkbox"
              checked={formData?.useVolatilityFilter}
              onChange={(e) => handleChange('useVolatilityFilter', e.target.checked)}
            />
          </div>
          <div className="setting-group">
            <label>Use Trend Filter</label>
            <input
              type="checkbox"
              checked={formData?.useTrendFilter}
              onChange={(e) => handleChange('useTrendFilter', e.target.checked)}
            />
          </div>
          <div className="setting-group">
            <label>Trading Start Hour</label>
            <input
              type="number"
              value={formData?.startHour}
              onChange={(e) => handleChange('startHour', parseInt(e.target.value))}
              min="0"
              max="23"
            />
          </div>
          <div className="setting-group">
            <label>Trading End Hour</label>
            <input
              type="number"
              value={formData?.endHour}
              onChange={(e) => handleChange('endHour', parseInt(e.target.value))}
              min="0"
              max="23"
            />
          </div>
        </div>
      </div>

      <button className="btn btn-primary save-btn" onClick={handleSave}>
        <Save size={20} />
        Save Settings
      </button>
    </div>
  )
}

export default Settings
