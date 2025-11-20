'use client'

import { Heart, ShoppingCart, Search, User, Menu } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { getTotalItems } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <nav className="agro-navbar">
      <div className="container agro-navbar-inner">
        <Link to="/" className="agro-logo">
          <div className="agro-logo-circle">A</div>
          <span className="agro-logo-text">AgroMarket</span>
        </Link>

        <div className="nav-search-wrap hidden md:block relative">
          <input className="nav-search" placeholder="Buscar productos, marcas o categorías..." />
          <button className="nav-search-btn">
            <Search className="w-4 h-4" />
          </button>
        </div>

        <div className="nav-links hidden md:flex">
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/productos" className="nav-link">Productos</Link>
        </div>

        <div className="nav-icons hidden md:flex">
          <Link to="/favoritos" className="icon-btn">
            <Heart className="w-6 h-6" />
          </Link>
          <Link to="/carrito" className="icon-btn">
            <ShoppingCart className="w-6 h-6" />
            {getTotalItems() > 0 && <span className="cart-badge">{getTotalItems()}</span>}
          </Link>
          <Link to="/Login" className="icon-btn">
            <User className="w-6 h-6" />
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-3">
            <button onClick={()=>setSearchOpen(!searchOpen)} className="icon-btn">
              <Search className="w-6 h-6" />
            </button>
            <Link to="/carrito" className="icon-btn">
              <ShoppingCart className="w-6 h-6" />
              {getTotalItems() > 0 && <span className="cart-badge">{getTotalItems()}</span>}
            </Link>
            <button onClick={()=>setMobileOpen(!mobileOpen)} className="icon-btn">
              <Menu className="w-7 h-7" />
            </button>
        </div>
      </div>

      {searchOpen && (
        <div className="container pb-3 md:hidden">
          <input className="nav-search" placeholder="Buscar..." />
        </div>
      )}

      {mobileOpen && (
        <div className="container pb-4 md:hidden">
          <Link to="/" className="nav-link block py-2">Inicio</Link>
          <Link to="/productos" className="nav-link block py-2">Productos</Link>
          <Link to="/favoritos" className="nav-link block py-2">Favoritos</Link>
          <Link to="/Login" className="nav-link block py-2">Mi Cuenta</Link>
        </div>
      )}
    </nav>
  )
}