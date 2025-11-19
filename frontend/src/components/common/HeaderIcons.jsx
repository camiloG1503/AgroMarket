import React, { useEffect, useState } from 'react'
import { FaHome, FaBoxOpen, FaShoppingCart } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import '../../styles/common/header-icons.css'

export default function HeaderIcons() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [cartCount, setCartCount] = useState(0)
    const [hasNotifications, setHasNotifications] = useState(false)

    useEffect(() => {
    try {
        const raw = localStorage.getItem('user')
        if (raw) {
        const u = JSON.parse(raw)
        setUser(u)
        setCartCount(u?.profile?.cart ? u.profile.cart.length : 0)
        setHasNotifications(Array.isArray(u?.profile?.notifications) && u.profile.notifications.length > 0)
        } else {
        setUser(null)
        setCartCount(0)
        setHasNotifications(false)
        }
    } catch (e) {
        setUser(null)
    }
    }, [])

    function goHome() { navigate('/') }
    function goPurchases() {
        if (window.location.pathname === '/profile') {
            window.location.hash = '#comprados'
        } else {
            navigate('/profile#comprados')
        }
    }
  function goCart() {
        if (window.location.pathname === '/profile') {
            window.location.hash = '#carrito'
        } else {
            navigate('/profile#carrito')
        }
    }
    function goProfile() { navigate('/profile') }

    return (
    <div className="header-icons">
        <button className="hi-btn" aria-label="Home" onClick={goHome}>
        <FaHome className="hi-icon" />
        </button>

        <button className="hi-btn" aria-label="Comprados" onClick={goPurchases}>
        <FaBoxOpen className="hi-icon" />
        </button>

        <button className="hi-btn" aria-label="Carrito" onClick={goCart}>
        <FaShoppingCart className="hi-icon" />
        {cartCount > 0 ? (
            <span className="hi-badge hi-badge--count">{cartCount > 9 ? '9+' : cartCount}</span>
        ) : null}
        </button>

        <button className="hi-avatar-btn" aria-label="Perfil" onClick={goProfile}>
        {user?.profile?.avatar ? (
            <img src={user.profile.avatar} alt="avatar" className="hi-avatar" />
        ) : (
            <div className="hi-avatar hi-avatar--placeholder" aria-hidden />
        )}
        <span className="hi-avatar-dot" />
        </button>
    </div>
    )
}