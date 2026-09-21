import React, { useEffect, useState } from 'react'
import { checkout, getCart, removeCartItem, updateCartItem } from '../../services/shop.js'
import '../../styles/profile/shoppingCart.css'

export default function ShoppingCart() {
  const [cart, setCart] = useState({ items: [], totals: { total: 0 } })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const refresh = () => getCart().then(setCart).catch((e) => setError(e.message)).finally(() => setLoading(false))
  useEffect(refresh, [])
  async function change(productId, quantity) {
    try { await updateCartItem(productId, Number(quantity)); refresh() } catch (e) { setError(e.message) }
  }
  async function remove(productId) {
    try { await removeCartItem(productId); refresh() } catch (e) { setError(e.message) }
  }
  async function buy() {
    try { await checkout(); setError('Pedido creado correctamente'); refresh() } catch (e) { setError(e.message) }
  }
  if (loading) return <div className="p-3">Cargando carrito...</div>
  return <div className="cart-page"><div className="profile-card">
    <div className="toolbar"><div><h3>Carrito de Compras</h3><small className="text-muted">Productos del carrito activo</small></div>
      <button className="buy-btn" onClick={buy} disabled={!cart.items?.length}>Comprar ${Number(cart.totals?.total || 0).toFixed(2)}</button></div>
    {error && <div className="alert alert-info" role="status">{error}</div>}
    <div className="table-responsive"><table className="cart-table"><thead><tr><th>Producto</th><th>Precio</th><th>Unidades</th><th>Acción</th></tr></thead><tbody>
      {(cart.items || []).map((item) => <tr key={item.FK_id_producto}><td>{item.Producto?.nombre}</td><td>{item.Producto?.precio}</td><td><input className="qty-input" type="number" min="1" max={item.Producto?.stock} value={item.cantidad} onChange={(e) => change(item.FK_id_producto, e.target.value)} /></td><td><button className="btn btn-outline-danger" onClick={() => remove(item.FK_id_producto)}>Eliminar</button></td></tr>)}
      {!cart.items?.length && <tr><td colSpan="4" className="text-muted">Tu carrito está vacío.</td></tr>}
    </tbody></table></div>
  </div></div>
}
