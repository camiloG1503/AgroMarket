import React from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { FaHome, FaUser, FaHeart, FaShoppingCart, FaBoxOpen, FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from '../../../contexts/AuthContext.jsx'

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { logout } = useAuth()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <aside className="sidebar">
      <div className="brand"><FaUser style={{ marginRight: 8 }} /> AgroMarket</div>

      <nav className="nav flex-column mt-2">
        <NavLink to="/" className="nav-link"><FaHome style={{ marginRight: 8 }} /> Home</NavLink>
        <NavLink to="/profile" className="nav-link"><FaUser style={{ marginRight: 8 }} /> Mi Perfil</NavLink>
        <NavLink
          to="/profile#favoritos"
          className="nav-link"
          onClick={(e) => {
            if (location.pathname === '/profile') {
              e.preventDefault()
              window.location.hash = '#favoritos'
            }
          }}
        ><FaHeart style={{ marginRight: 8 }} /> Favoritos</NavLink>

        <NavLink
          to="/profile#carrito"
          className="nav-link"
          onClick={(e) => {
            if (location.pathname === '/profile') {
              e.preventDefault()
              window.location.hash = '#carrito'
            }
          }}
        ><FaShoppingCart style={{ marginRight: 8 }} /> Carrito de Compras</NavLink>

        <NavLink
          to="/profile#comprados"
          className="nav-link"
          onClick={(e) => {
            if (location.pathname === '/profile') {
              e.preventDefault()
              window.location.hash = '#comprados'
            }
          }}
        ><FaBoxOpen style={{ marginRight: 8 }} /> Comprados</NavLink>
      </nav>

      <div style={{ marginTop: 'auto' }}>
        <button onClick={handleLogout} className="btn btn-logout"><FaSignOutAlt style={{ marginRight: 8 }} /> Cerrar Sesión</button>
      </div>
    </aside>
  )
}