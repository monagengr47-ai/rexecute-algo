import React from 'react'
import './StatCard.css'

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string | number
  change?: string
}

function StatCard({ icon, label, value, change }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-header">
        <span className="stat-icon">{icon}</span>
      </div>
      <div className="stat-content">
        <p className="stat-label">{label}</p>
        <p className="stat-value">{value}</p>
        {change && <p className="stat-change">{change}</p>}
      </div>
    </div>
  )
}

export default StatCard
