import React, { useEffect } from 'react'
import { useStore } from '../store/useStore'
import { X } from 'lucide-react'
import './Positions.css'

function Positions() {
  const { positions, fetchPositions } = useStore()

  useEffect(() => {
    fetchPositions()
  }, [])

  return (
    <div className="positions-page">
      <h1>Open Positions</h1>
      <div className="positions-grid">
        {positions?.map((pos: any) => (
          <div key={pos.ticket} className="position-card card">
            <div className="position-header">
              <span className="position-symbol">{pos.symbol}</span>
              <span className={`position-type ${pos.type.toLowerCase()}`}>{pos.type}</span>
              <button className="close-btn">
                <X size={18} />
              </button>
            </div>
            <div className="position-details">
              <div className="detail-row">
                <span className="label">Volume:</span>
                <span className="value">{pos.volume}</span>
              </div>
              <div className="detail-row">
                <span className="label">Open Price:</span>
                <span className="value">{pos.openPrice.toFixed(5)}</span>
              </div>
              <div className="detail-row">
                <span className="label">Current Price:</span>
                <span className="value">{pos.currentPrice.toFixed(5)}</span>
              </div>
              <div className="detail-row">
                <span className="label">Stop Loss:</span>
                <span className="value">{pos.stopLoss.toFixed(5)}</span>
              </div>
              <div className="detail-row">
                <span className="label">Take Profit:</span>
                <span className="value">{pos.takeProfit.toFixed(5)}</span>
              </div>
              <div className="detail-row profit">
                <span className="label">Profit:</span>
                <span className={`value ${pos.profit >= 0 ? 'positive' : 'negative'}`}>
                  ${pos.profit?.toFixed(2)} ({pos.profitPercent?.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Positions
