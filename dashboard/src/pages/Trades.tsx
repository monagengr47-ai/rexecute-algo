import React, { useEffect } from 'react'
import { useStore } from '../store/useStore'
import './Trades.css'

function Trades() {
  const { trades, fetchTrades } = useStore()

  useEffect(() => {
    fetchTrades()
  }, [])

  return (
    <div className="trades-page">
      <h1>Trade History</h1>
      <div className="card">
        <table className="trades-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Symbol</th>
              <th>Type</th>
              <th>Open Time</th>
              <th>Close Time</th>
              <th>Volume</th>
              <th>Open Price</th>
              <th>Close Price</th>
              <th>Profit</th>
              <th>%</th>
            </tr>
          </thead>
          <tbody>
            {trades?.map((trade: any) => (
              <tr key={trade.id}>
                <td>{trade.id}</td>
                <td className="symbol">{trade.symbol}</td>
                <td><span className={`type ${trade.type.toLowerCase()}`}>{trade.type}</span></td>
                <td>{new Date(trade.openTime).toLocaleString()}</td>
                <td>{trade.closeTime ? new Date(trade.closeTime).toLocaleString() : '-'}</td>
                <td>{trade.volume}</td>
                <td>{trade.openPrice.toFixed(5)}</td>
                <td>{trade.closePrice?.toFixed(5) || '-'}</td>
                <td className={trade.profit >= 0 ? 'positive' : 'negative'}>
                  ${trade.profit?.toFixed(2)}
                </td>
                <td className={trade.profitPercent >= 0 ? 'positive' : 'negative'}>
                  {trade.profitPercent?.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Trades
