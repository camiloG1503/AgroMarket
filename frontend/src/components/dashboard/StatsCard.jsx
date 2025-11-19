import React from 'react'
import '../../styles/dashboard/dashboard-pages.css'

const StatsCard = ({ title, value, highlighted }) => {
  return (
    <div className={`am-stats-card ${highlighted ? 'highlighted' : ''}`}>
      <div className="am-stats-card-header">
        <span>{title}</span>
        <span className="am-stats-card-arrow">↗</span>
      </div>
      <div className="am-stats-card-value">{value}</div>
    </div>
  )
}

export default StatsCard
