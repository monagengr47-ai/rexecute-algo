import React from 'react'
import { Link } from 'react-router-dom'
import { BarChart3, Zap, TrendingUp, Settings, Activity } from 'lucide-react'
import './Sidebar.css'

interface SidebarProps {
  isOpen: boolean
}

function Sidebar({ isOpen }: SidebarProps) {
  const menuItems = [
    { icon: Activity, label: 'Dashboard', path: '/' },
    { icon: Zap, label: 'Open Positions', path: '/positions' },
    { icon: TrendingUp, label: 'Trade History', path: '/trades' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ]

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="sidebar-link"
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
