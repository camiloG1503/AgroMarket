import React from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { FaChartBar, FaHome, FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from '../../../contexts/AuthContext.jsx'

export default function DashboardSidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { logout } = useAuth()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <aside className="sidebar">
      <div className="brand">AgroMarket</div>

      <nav className="nav flex-column mt-2">
        <NavLink to="/" className="nav-link"><FaHome style={{ marginRight: 8 }} /> Home</NavLink>
        <NavLink to="/dashboard" className="nav-link"><FaChartBar style={{ marginRight: 8 }} /> Dashboard</NavLink>
        <div style={{ marginLeft: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <button
            className="nav-link"
            onClick={() => { navigate('/dashboard') }}
            style={{ paddingLeft: 8, background: 'transparent', border: 'none', textAlign: 'left' }}
          >Inicio</button>
          <button
            className="nav-link"
            onClick={() => { navigate('/dashboard/productos') }}
            style={{ paddingLeft: 8, background: 'transparent', border: 'none', textAlign: 'left' }}
          >Productos</button>
          <button
            className="nav-link"
            onClick={() => { navigate('/dashboard/ordenes') }}
            style={{ paddingLeft: 8, background: 'transparent', border: 'none', textAlign: 'left' }}
          >Ordenes</button>
          <button
            className="nav-link"
            onClick={() => { navigate('/dashboard/usuarios') }}
            style={{ paddingLeft: 8, background: 'transparent', border: 'none', textAlign: 'left' }}
          >Usuarios</button>
        </div>
      </nav>

      <div style={{ marginTop: 'auto' }}>
        <button onClick={handleLogout} className="btn btn-logout"><FaSignOutAlt style={{ marginRight: 8 }} /> Cerrar Sesión</button>
      </div>
    </aside>
  )
}
