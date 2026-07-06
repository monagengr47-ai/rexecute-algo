import React, { useEffect, useState } from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useStore } from '../store/useStore'
import './Analytics.css'

function Analytics() {
  const { stats, fetchStats } = useStore()
  const [dailyData, setDailyData] = useState([])

  useEffect(() => {
    fetchStats()
    // Generate mock daily performance data
    const data = []
    for (let i = 29; i >= 0; i--) {
      data.push({
        date: new Date(Date.now() - i * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        profit: Math.random() * 200 - 50,
        trades: Math.floor(Math.random() * 8) + 1
      })
    }
    setDailyData(data)
  }, [])

  return (
    <div className="analytics-page">
      <h1>Performance Analytics</h1>
      
      {/* Stats Grid */}
      <div className="analytics-stats">
        <div className="stat-box">
          <p className="label">Total Trades</p>
          <p className="value">{stats?.totalTrades || 0}</p>
        </div>
        <div className="stat-box">
          <p className="label">Win Rate</p>
          <p className="value">{stats?.winRate?.toFixed(1) || 0}%</p>
        </div>
        <div className="stat-box">
          <p className="label">Profit Factor</p>
          <p className="value">{stats?.profitFactor?.toFixed(2) || 0}</p>
        </div>
        <div className="stat-box">
          <p className="label">Sharpe Ratio</p>
          <p className="value">{stats?.sharpeRatio?.toFixed(2) || 0}</p>
        </div>
      </div>

      {/* Daily Performance */}
      <div className="card analytics-chart">
        <h2>Daily Performance</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="date" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{ background: '#1e293b', border: '1px solid #334155' }}
              labelStyle={{ color: '#e2e8f0' }}
            />
            <Bar dataKey="profit" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Stats */}
      <div className="analytics-detailed">
        <div className="card">
          <h3>Trade Statistics</h3>
          <div className="stat-list">
            <div className="stat-item">
              <span>Winning Trades:</span>
              <span className="positive">{stats?.winTrades || 0}</span>
            </div>
            <div className="stat-item">
              <span>Losing Trades:</span>
              <span className="negative">{stats?.lossTrades || 0}</span>
            </div>
            <div className="stat-item">
              <span>Average Win:</span>
              <span>${stats?.averageWin?.toFixed(2) || 0}</span>
            </div>
            <div className="stat-item">
              <span>Average Loss:</span>
              <span>${stats?.averageLoss?.toFixed(2) || 0}</span>
            </div>
            <div className="stat-item">
              <span>Risk/Reward Ratio:</span>
              <span>{stats?.riskRewardRatio?.toFixed(2) || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
