import React, { useEffect, useState, useRef } from 'react'
import ProductCard from '../shared/ProductCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const mock = [...Array(8)].map((_, i) => ({
  id: String(i + 1),
  name: ['Bomba Eléctrica', 'Pico Triple', 'Motosierra 52cc', 'Guadaña 1200W', 'Pala Reforzada', 'Machete 24"', 'Arado Pesado', 'Llave Ajustable'][i],
  price: [420000, 95000, 250000, 310000, 85000, 65000, 480000, 56000][i],
  originalPrice: i === 2 ? 300000 : undefined,
  brand: 'MarcaX',
  rating: 4.5,
  reviews: 120,
  sold: 300,
  image: `https://placehold.co/300x300/0d5e2a/ffffff?text=${encodeURIComponent('IMG ' + (i + 1))}`
}))

export default function RecentProducts() {
  const [items, setItems] = useState([])
  const trackRef = useRef(null)

  useEffect(() => { const t = setTimeout(() => setItems(mock), 500); return () => clearTimeout(t) }, [])

  const scroll = (dir) => {
    if (!trackRef.current) return
    trackRef.current.scrollBy({ left: dir * 280, behavior: 'smooth' })
  }

  return (
    <section className="recent-section recent-wrapper">
      <div className="recent-header-row">
        <h2 className="recent-header">Agregados recientemente</h2>
        <button onClick={() => scroll(1)} className="recent-more">Ver más →</button>
      </div>
      <div className="relative">
        <button
          onClick={() => scroll(-1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center hover:bg-green-50 transition"
        >
          ←
        </button>
        <button
          onClick={() => scroll(1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center hover:bg-green-50 transition"
        >
          →
        </button>
        <div ref={trackRef} className="recent-track overflow-hidden relative z-10">
          {items.map(p => (
            <div key={p.id} style={{ flex: '0 0 250px' }}>
              <ProductCard product={p} compact />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}