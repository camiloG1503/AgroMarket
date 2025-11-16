import React, { useEffect, useMemo, useState } from 'react'
import { FaEye, FaTrash } from 'react-icons/fa'
import '../../styles/profile/shoppingCart.css'

const MOCK = [
    { id: 1, name: 'Pala De Madera', price: '$350.000', units: 1, category: 'Herramienta Manuales' },
    { id: 2, name: 'Taladro Industrial', price: '$1.200.000', units: 2, category: 'Maquinaria Motorizada' },
    { id: 3, name: 'Machete', price: '$45.000', units: 1, category: 'Herramienta Manuales' }
]

export default function ShoppingCart() {
    const [items, setItems] = useState([])
    const [q, setQ] = useState('')
    const [category, setCategory] = useState('Todos')

    useEffect(() => {
        try {
            const raw = localStorage.getItem('user')
            if (raw) {
                const user = JSON.parse(raw)
                const cart = user?.profile?.cart
                if (Array.isArray(cart) && cart.length) {
                    setItems(cart)
                    return
                }
            }
        } catch (e) {}
        setItems(MOCK)
    }, [])

    useEffect(() => {
        // persistir cambios en localStorage si existe user
        try {
            const raw = localStorage.getItem('user')
            if (raw) {
                const user = JSON.parse(raw)
                user.profile = user.profile || {}
                user.profile.cart = items
                localStorage.setItem('user', JSON.stringify(user))
            }
        } catch (e) {}
    }, [items])

    const categories = ['Todos', 'Herramienta Manuales', 'Maquinaria Motorizada', 'Tracción Animal']

    const filtered = useMemo(() => items.filter(i => {
        if (category !== 'Todos' && i.category !== category) return false
        if (q && !(`${i.name} ${i.category}`.toLowerCase().includes(q.toLowerCase()))) return false
        return true
    }), [items, q, category])

    function handleQtyChange(id, nextQty) {
        if (nextQty < 1) return
        setItems(prev => prev.map(p => p.id === id ? { ...p, units: nextQty } : p))
    }

    function handleRemove(id) {
        setItems(prev => prev.filter(p => p.id !== id))
    }

    function handleView(item) {
        alert(`Ver producto: ${item.name} (simulado)`)
    }

    function handlePurchase() {
        alert('Compra realizada (simulado)')
        // vaciar carrito local
        setItems([])
    }

    return (
        <div className="cart-page">
            <div className="profile-card">
                <div className="toolbar">
                    <div>
                        <h3 style={{ margin: 0 }}>Carrito de Compras</h3>
                        <small className="text-muted">Revisa y confirma los productos antes de comprar</small>
                    </div>

                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <input className="form-control search-input" value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar" />
                        <button className="buy-btn" onClick={handlePurchase}>Comprar $</button>
                    </div>
                </div>

                <div className="categories">
                    {categories.map(c => (
                        <button key={c} onClick={() => setCategory(c)} className={`category-btn ${category === c ? 'active' : ''}`}>{c}</button>
                    ))}
                </div>

                <div className="table-responsive">
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Unidades</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(p => (
                                <tr key={p.id}>
                                    <td>
                                        <div className="product-cell">
                                            <div className="cart-thumb" aria-hidden />
                                            <div>
                                                <div className="product-name">{p.name}</div>
                                                <div className="product-category">{p.category}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ fontWeight: 700 }}>{p.price}</div>
                                    </td>
                                    <td>
                                        <input className="qty-input" type="number" value={p.units} onChange={e => handleQtyChange(p.id, Number(e.target.value))} min={1} />
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            <button className="action-btn view" onClick={() => handleView(p)} title="Ver"><FaEye /></button>
                                            <button className="action-btn remove" onClick={() => handleRemove(p.id)} title="Eliminar"><FaTrash /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="text-muted">Tu carrito está vacío.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="footer">
                    <div className="pagination-info">1 - {filtered.length} Páginas</div>
                    <div className="pagination">
                        <button className="btn btn-light">&lt;</button>
                        <button className="btn btn-light">&gt;</button>
                    </div>
                </div>
            </div>
        </div>
    )
}