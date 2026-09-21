import React, { useEffect, useState } from 'react'
import { FaHeart, FaShoppingCart } from 'react-icons/fa'
import { addToCart, getFavorites, removeFavorite } from '../../services/shop.js'
import '../../styles/profile/favorites.css'

export default function Favorites() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getFavorites().then(setItems).catch((e) => setError(e.message)).finally(() => setLoading(false))
  }, [])

  async function handleRemove(id) {
    try { await removeFavorite(id); setItems((current) => current.filter((item) => item.FK_id_producto !== id)) }
    catch (e) { setError(e.message) }
  }

  async function handleAdd(item) {
    try { await addToCart(item.FK_id_producto); setError('Producto agregado al carrito') }
    catch (e) { setError(e.message) }
  }

  if (loading) return <div className="p-3">Cargando favoritos...</div>
  return <div className="favorites-page" style={{ padding: 20 }}>
    <div className="profile-card">
      <h3>Favoritos</h3>
      {error && <div className="alert alert-info" role="status">{error}</div>}
      <div className="favorites-list">
        {items.map((item) => <div className="favorite-row" key={item.id_favorito}>
          <div className="favorite-left"><div className="product-thumb" aria-hidden /><div>
            <div style={{ fontWeight: 700 }}>{item.Producto?.nombre}</div>
            <div className="text-muted">Stock: {item.Producto?.stock ?? 0}</div>
          </div></div>
          <div className="favorite-middle">{item.Producto?.precio}</div>
          <div className="favorite-actions">
            <button className="btn btn-outline-secondary" onClick={() => handleAdd(item)} title="Agregar al carrito"><FaShoppingCart /></button>
            <button className="btn" onClick={() => handleRemove(item.FK_id_producto)} title="Quitar de favoritos"><FaHeart /></button>
          </div>
        </div>)}
        {!items.length && <div className="text-muted p-3">No tienes favoritos guardados.</div>}
      </div>
    </div>
  </div>
}
