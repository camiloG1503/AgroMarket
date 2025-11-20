import React, { useState } from 'react'
import { Package, FileText, Tag, Star } from 'lucide-react'

/**
 * Mock de datos para demostrar el componente en acción.
 * En una aplicación real, estos datos vendrían de las props.
 */
const MOCK_DATA = {
  description: 'Motosierra profesional de alta calidad con motor de 2 tiempos. Ideal para trabajos forestales y agrícolas exigentes. Diseñada para brindar máxima potencia y durabilidad.',
  specifications: {
    'Cilindrada': '20cc',
    'Tipo de Motor': '2 Tiempos',
    'Peso Neto': '4.5 kg',
    'Capacidad del Tanque': '0.45 L',
    'Largo de la Guía': '45 cm',
    'Potencia': '0.6 kW',
  },
  tags: ['Uso Pesado', 'Motor 2 Tiempos', 'Profesional', 'Alta Durabilidad'],
  reviews: [
    { id: '1', author: 'Juan Pérez', rating: 5, text: 'Excelente producto, muy potente y fácil de usar.', date: '2025-01-10' },
    { id: '2', author: 'María García', rating: 4, text: 'Buena calidad, aunque un poco pesada.', date: '2025-01-05' },
    { id: '3', author: 'Carlos López', rating: 5, text: 'Perfecta para trabajos pesados. La recomiendo.', date: '2024-12-28' },
  ]
}

function ProductTabs({ description, specifications, tags, reviews }) {
  const [activeTab, setActiveTab] = useState('description')

  const desc = description || MOCK_DATA.description
  const specs = specifications || MOCK_DATA.specifications
  const productTags = tags || MOCK_DATA.tags
  const productReviews = reviews || MOCK_DATA.reviews

  const tabs = [
    { id: 'description', label: 'Descripción', icon: FileText },
    { id: 'specifications', label: 'Especificaciones', icon: Package },
    { id: 'tags', label: 'Características', icon: Tag },
    { id: 'reviews', label: 'Reseñas', icon: Star },
  ]

  return (
    <div>
      <div className="border-b border-gray-200 mb-6">
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 font-medium text-sm border-b-2 transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-green-600 text-green-700'
                    : 'border-transparent text-gray-600 hover:text-green-600'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="min-h-[200px]">
        {activeTab === 'description' && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Descripción del Producto</h3>
            <p className="text-gray-700 leading-relaxed">{desc}</p>
          </div>
        )}

        {activeTab === 'specifications' && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Especificaciones Técnicas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(specs).map(([key, value]) => (
                <div key={key} className="flex justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-gray-700">{key}:</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'tags' && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Características Principales</h3>
            <div className="flex flex-wrap gap-3">
              {productTags.map((tag, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium border border-green-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Reseñas de Clientes</h3>
            <div className="space-y-4">
              {productReviews.map(review => (
                <div key={review.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">{review.author}</span>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductTabs
export { ProductTabs }