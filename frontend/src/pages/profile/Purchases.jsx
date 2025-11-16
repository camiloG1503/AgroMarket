import React, { useEffect, useMemo, useState } from 'react'
import '../../styles/profile/purchases.css'

const MOCK = [
  { id: 11, name: 'Pala De Madera', price: '$350.000', units: 1, category: 'Herramienta Manuales' },
  { id: 12, name: 'Taladro Industrial', price: '$1.200.000', units: 12, category: 'Maquinaria Motorizada' },
  { id: 13, name: 'Arado Animal', price: '$800.000', units: 5, category: 'Tracción Animal' }
]

export default function Purchases() {
  const [items, setItems] = useState([])
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('Todos')

  useEffect(() => {
    try {
      const raw = localStorage.getItem('user')
      if (raw) {
        const user = JSON.parse(raw)
        const purchases = user?.profile?.purchases
        if (Array.isArray(purchases) && purchases.length) {
          setItems(purchases)
          return
        }
      }
    } catch (e) {}
    setItems(MOCK)
  }, [])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('user')
      if (raw) {
        const user = JSON.parse(raw)
        user.profile = user.profile || {}
        user.profile.purchases = items
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

  // Review modal state
  const [reviewOpen, setReviewOpen] = useState(false)
  const [reviewing, setReviewing] = useState(null)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')

  function openReview(item) {
    setReviewing(item)
    setRating(5)
    setComment('')
    setReviewOpen(true)
  }

  function closeReview() {
    setReviewOpen(false)
    setReviewing(null)
  }

  function sendReview() {
    try {
      const raw = localStorage.getItem('user')
      const user = raw ? JSON.parse(raw) : {}
      user.profile = user.profile || {}
      user.profile.reviews = user.profile.reviews || []
      user.profile.reviews.push({ productId: reviewing.id, rating, comment, date: new Date().toISOString() })
      localStorage.setItem('user', JSON.stringify(user))
      // also update local state for immediate feedback
      setItems(prev => prev.map(p => p.id === reviewing.id ? { ...p, reviewed: true } : p))
      alert('Reseña guardada (simulado)')
    } catch (e) {
      console.error(e)
    } finally {
      closeReview()
    }
  }

  return (
    <div className="purchases-page">
      <div className="profile-card">
        <div className="toolbar">
          <div>
            <h3 style={{ margin: 0 }}>Comprados</h3>
            <small className="text-muted">Historial de compras y reservas</small>
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input className="form-control search-input" value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar" />
          </div>
        </div>

        <div className="categories">
          {categories.map(c => (
            <button key={c} onClick={() => setCategory(c)} className={`category-btn ${category === c ? 'active' : ''}`}>{c}</button>
          ))}
        </div>

        <div className="table-responsive">
          <table className="purchases-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th className="price-col">Precio</th>
                <th className="units-col">Unidades</th>
                <th className="action-col">Acción</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td>
                    <div className="product-cell">
                      <div className="thumb" aria-hidden />
                      <div>
                        <div className="product-name">{p.name}</div>
                        <div className="product-category">{p.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="price-col">{p.price}</td>
                  <td className="units-col" style={{ textAlign: 'center' }}>{p.units}</td>
                  <td className="action-col">
                    <button className="reserve-btn" onClick={() => openReview(p)}>{p.reviewed ? 'Reseñado' : 'Reseñar'}</button>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-muted">No hay compras.</td>
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
      {reviewOpen && (
        <div className="review-modal-backdrop">
          <div className="review-modal">
            <h4>¡Deja tu reseña!</h4>
            <div className="review-product">
              <div className="thumb" aria-hidden />
              <div>
                <div style={{ fontWeight: 700 }}>{reviewing?.name}</div>
                <div className="text-muted" style={{ fontSize: 12 }}>{reviewing?.category}</div>
              </div>
            </div>

            <textarea className="review-textarea" placeholder="Escribe aquí tu comentario..." value={comment} onChange={e => setComment(e.target.value)} />

            <div className="review-stars">
              {[1,2,3,4,5].map(s => (
                <span key={s} className="star" onClick={() => setRating(s)}>{s <= rating ? '★' : '☆'}</span>
              ))}
              <div style={{ marginLeft: 8 }} className="text-muted">{rating}.0 / 5</div>
            </div>

            <div className="review-actions">
              <button className="btn-cancel" onClick={closeReview}>✕</button>
              <button className="btn-send" onClick={sendReview}>Enviar reseña</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}