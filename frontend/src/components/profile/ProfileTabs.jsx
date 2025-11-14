import React from 'react'
import { FaUser, FaHeart, FaShoppingCart, FaBoxOpen } from 'react-icons/fa'

export default function ProfileTabs({ active = 'personal', onChange }) {
    const tabs = [
    { id: 'personal', label: 'Datos Personales', icon: <FaUser style={{ marginRight: 8 }} /> },
    { id: 'favorites', label: 'Favoritos', icon: <FaHeart style={{ marginRight: 8 }} /> },
    { id: 'cart', label: 'Carrito de Compras', icon: <FaShoppingCart style={{ marginRight: 8 }} /> },
    { id: 'purchases', label: 'Comprados', icon: <FaBoxOpen style={{ marginRight: 8 }} /> }
    ]

    return (
    <div className="profile-tabs">
        <div className="nav nav-pills">
        {tabs.map(t => (
            <button
            key={t.id}
            onClick={() => onChange && onChange(t.id)}
            className={`nav-link ${t.id === active ? 'active' : ''}`}
            style={{ marginRight: 8, display: 'inline-flex', alignItems: 'center' }}
            >
            {t.icon}
            {t.label}
            </button>
        ))}
        </div>
    </div>
    )
}