import React, { useEffect, useState } from 'react'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp, DollarSign, Activity, AlertCircle } from 'lucide-react'
import { useStore } from '../store/useStore'
import StatCard from '../components/StatCard'
import './Dashboard.css'

function Dashboard() {
  const { accountData, fetchAccountOverview, positions } = useStore()
  const [equityCurve, setEquityCurve] = useState([])

  useEffect(() => {
    fetchAccountOverview()
    // Simulate equity curve data
    const data = []
    let equity = 10000
    for (let i = 0; i < 30; i++) {
      equity += (Math.random() - 0.48) * 100
      data.push({
        date: new Date(Date.now() - (30 - i) * 86400000).toLocaleDateString(),
        equity: Math.max(equity, 9800)
      })
    }
    setEquityCurve(data)
  }, [])

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="stats-grid">
        <StatCard
          icon={<DollarSign size={24} />}
          label="Account Balance"
          value={`$${accountData?.balance?.toFixed(2) || '0.00'}`}
          change="+2.5%"
        />
        <StatCard
          icon={<TrendingUp size={24} />}
          label="Current Equity"
          value={`$${accountData?.equity?.toFixed(2) || '0.00'}`}
          change="+1.2%"
        />
        <StatCard
          icon={<Activity size={24} />}
          label="Open Positions"
          value={positions?.length || 0}
          change="Stable"
        />
        <StatCard
          icon={<AlertCircle size={24} />}
          label="Drawdown"
          value={`${accountData?.drawdownPercent?.toFixed(2) || '0.00'}%`}
          change="-0.5%"
        />
      </div>

      {/* Equity Curve */}
      <div className="card equity-section">
        <h2>Equity Curve (30 Days)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={equityCurve}>
            <defs>
              <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="date" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{ background: '#1e293b', border: '1px solid #334155' }}
              labelStyle={{ color: '#e2e8f0' }}
            />
            <Area type="monotone" dataKey="equity" stroke="#3b82f6" fillOpacity={1} fill="url(#colorEquity)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Open Positions Preview */}
      <div className="card positions-preview">
        <h2>Open Positions</h2>
        <div className="positions-list">
          {positions && positions.length > 0 ? (
            positions.slice(0, 3).map((pos: any) => (
              <div key={pos.ticket} className="position-item">
                <div className="position-info">
                  <span className="symbol">{pos.symbol}</span>
                  <span className={`type ${pos.type.toLowerCase()}`}>{pos.type}</span>
                </div>
                <div className="position-profit">
                  <span className={pos.profit >= 0 ? 'positive' : 'negative'}>
                    {pos.profit >= 0 ? '+' : ''}{pos.profit?.toFixed(2)} ({pos.profitPercent?.toFixed(2)}%)
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="empty">No open positions</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
