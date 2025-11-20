import React, { useState, useEffect } from 'react'
import { Star } from 'lucide-react'

/**
 * Componente ReviewsSection
 * Muestra una lista de testimonios y valoraciones de clientes.
 */
export default function ReviewsSection() {
  const [reviews, setReviews] = useState([])

  // Mock data adaptado
  useEffect(() => {
    // Simulación de carga de datos
    setReviews([
      {
        id: '1',
        author: 'Camilo Torres',
        rating: 5,
        text: 'Excelentes productos. Calidad y buen precio.',
        avatar: 'https://placehold.co/100x100/0D5E2A/FFFFFF?text=CT',
      },
      {
        id: '2',
        author: 'Ramón Murillo',
        rating: 5,
        text: 'Entrega rápida y buen soporte.',
        avatar: 'https://placehold.co/100x100/14532D/FFFFFF?text=RM',
      },
      {
        id: '3',
        author: 'Laura Patiño',
        rating: 4,
        text: 'Buena herramienta, tardó un poco el envío.',
        avatar: 'https://placehold.co/100x100/1F6F3A/FFFFFF?text=LP',
      },
    ])
  }, [])

  return (
    <section className="py-14 bg-white rounded-3xl my-12 bg-circles">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">¿Qué Opinan Sobre Nosotros?</h2>
        <p className="text-gray-600 text-sm">Clientes satisfechos</p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 px-4 max-w-4xl mx-auto">
        {reviews.map(r => (
          <div key={r.id} className="bg-white/90 backdrop-blur rounded-2xl p-8 shadow-md border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={r.avatar}
                alt={r.author}
                className="w-12 h-12 rounded-full object-cover border"
                onError={e => {
                  e.target.onerror = null
                  e.target.src = 'https://placehold.co/100x100/CCCCCC/000000?text=USER'
                }}
              />
              <div>
                <h4 className="font-semibold text-gray-800 text-sm">{r.author}</h4>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < r.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-700 text-sm italic">&quot;{r.text}&quot;</p>
          </div>
        ))}
      </div>
    </section>
  )
}