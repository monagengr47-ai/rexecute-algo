import React from 'react'
import { Menu, Bell, Settings } from 'lucide-react'
import './Navbar.css'

interface NavbarProps {
  onMenuClick: () => void
}

function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-btn" onClick={onMenuClick}>
          <Menu size={24} />
        </button>
        <div className="logo">
          <h1>🚀 Rexecute Algo</h1>
          <p>Professional Trading EA Dashboard</p>
        </div>
      </div>
      <div className="navbar-right">
        <button className="icon-btn">
          <Bell size={20} />
        </button>
        <button className="icon-btn">
          <Settings size={20} />
        </button>
        <div className="user-profile">
          <div className="avatar">RA</div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
