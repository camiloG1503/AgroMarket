import React, { useEffect, useState } from 'react'
import { createReview, getOrders } from '../../services/shop.js'
import '../../styles/profile/purchases.css'

export default function Purchases() {
  const [orders, setOrders] = useState([])
  const [error, setError] = useState('')
  const [reviewing, setReviewing] = useState(null)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  useEffect(() => { getOrders().then(setOrders).catch((e) => setError(e.message)) }, [])
  async function sendReview() {
    try { await createReview(reviewing.FK_id_producto, rating, comment); setReviewing(null); setError('Reseña enviada correctamente') }
    catch (e) { setError(e.message) }
  }
  return <div className="purchases-page"><div className="profile-card"><h3>Compras</h3>
    {error && <div className="alert alert-info" role="status">{error}</div>}
    <div className="table-responsive"><table className="purchases-table"><thead><tr><th>Pedido</th><th>Fecha</th><th>Total</th><th>Estado</th><th>Productos</th></tr></thead><tbody>
      {orders.map((order) => <tr key={order.id_pedido}><td>{order.codigo_transaccion || order.id_pedido}</td><td>{new Date(order.fecha_pedido).toLocaleDateString()}</td><td>{order.total}</td><td>{order.estado}</td><td>{(order.Detalle_pedidos || []).map((detail) => <button className="btn btn-link" key={detail.FK_id_producto} onClick={() => { setReviewing(detail); setRating(5); setComment('') }}>{detail.Producto?.nombre || `Producto ${detail.FK_id_producto}`}</button>)}</td></tr>)}
      {!orders.length && <tr><td colSpan="5" className="text-muted">No hay compras.</td></tr>}
    </tbody></table></div>
  </div>{reviewing && <div className="review-modal-backdrop"><div className="review-modal"><h4>Deja tu reseña</h4><textarea className="review-textarea" value={comment} onChange={(e) => setComment(e.target.value)} /><div className="review-stars">{[1,2,3,4,5].map((value) => <button className="btn" key={value} onClick={() => setRating(value)}>{value <= rating ? '★' : '☆'}</button>)}</div><button className="btn btn-success" onClick={sendReview}>Enviar reseña</button><button className="btn btn-link" onClick={() => setReviewing(null)}>Cancelar</button></div></div>}</div>
}
