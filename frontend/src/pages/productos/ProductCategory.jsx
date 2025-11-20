import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import SidebarFilters from '../../components/productos/SidebarFilters'
import SortSelector from '../../components/productos/SortSelector'
import TagFilter from '../../components/productos/TagFilter'
import ProductCard from '../../components/shared/ProductCard'

const mockProducts = [
  { id: '1', name: 'Motosierra Profesional 20"', price: 850000, originalPrice: 1000000, image: 'https://placehold.co/300x300/047857/FFFFFF?text=Motosierra', brand: 'Grombell', brandLogo: 'https://placehold.co/80x30/10b981/FFFFFF?text=GB', rating: 4.8, reviews: 234, sold: 1250, isBestSeller: true, categoryColor: '#006446' },
  { id: '2', name: 'Rastrillo Triple 18 Púas', price: 125000, image: 'https://placehold.co/300x300/8b5cf6/FFFFFF?text=Rastrillo', brand: 'AgriTools', brandLogo: 'https://placehold.co/80x30/a78bfa/FFFFFF?text=AT', rating: 4.5, reviews: 89, sold: 567, categoryColor: '#6D48D9' },
  { id: '3', name: 'Bomba de Agua 3HP', price: 650000, image: 'https://placehold.co/300x300/3b82f6/FFFFFF?text=Bomba', brand: 'AquaPro', brandLogo: 'https://placehold.co/80x30/60a5fa/FFFFFF?text=AP', rating: 4.7, reviews: 145, sold: 890, isBestSeller: true, categoryColor: '#115BB6' },
  { id: '4', name: 'Pala Reforzada Industrial', price: 95000, originalPrice: 120000, image: 'https://placehold.co/300x300/ef4444/FFFFFF?text=Pala', brand: 'BuildPro', brandLogo: 'https://placehold.co/80x30/f87171/FFFFFF?text=BP', rating: 4.6, reviews: 178, sold: 1020, categoryColor: '#C53333' },
  { id: '5', name: 'Machete Agrícola 24"', price: 78000, image: 'https://placehold.co/300x300/f59e0b/FFFFFF?text=Machete', brand: 'CutMaster', brandLogo: 'https://placehold.co/80x30/fbbf24/FFFFFF?text=CM', rating: 4.4, reviews: 92, sold: 450, categoryColor: '#D77B07' },
  { id: '6', name: 'Guadaña Eléctrica 1200W', price: 420000, image: 'https://placehold.co/300x300/14b8a6/FFFFFF?text=Guadaña', brand: 'PowerCut', brandLogo: 'https://placehold.co/80x30/2dd4bf/FFFFFF?text=PC', rating: 4.7, reviews: 203, sold: 780, isBestSeller: true, categoryColor: '#0A867A' },
]

export default function ProductCategory() {
  const [products, setProducts] = useState([])
  const [filters, setFilters] = useState({})
  const [sortBy, setSortBy] = useState('popular')
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => {
      // Aquí podrías aplicar filtros y orden
      setProducts(mockProducts)
      setLoading(false)
    }, 600)
    return () => clearTimeout(t)
  }, [filters, sortBy, tags])

  // const view='row'
  const view = 'row' // usa la variante horizontal

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <ol className="flex items-center text-sm">
            <li><Link to="/" className="text-green-600 hover:text-green-700 font-medium">Inicio</Link></li>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            <li className="text-gray-600 font-semibold">Los Mejores Herramientas Manuales - Herramientas Motorizadas</li>
          </ol>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-72 flex-shrink-0">
            <SidebarFilters onFilterChange={setFilters} />
          </aside>

          <div className="flex-1">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border border-gray-100">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Productos Agrícolas</h1>
                <p className="text-sm text-gray-600 mt-1">{products.length} productos encontrados</p>
              </div>
              <SortSelector onSortChange={setSortBy} />
            </div>

            {/* Tag filter box */}
            <div className="mb-8">
              <TagFilter tags={tags} onTagChange={setTags} />
            </div>

            {/* List */}
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl border h-52 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {products.map(p => (
                  <ProductCard key={p.id} product={p} view="row" />
                ))}
              </div>
            )}

            {/* Paginación */}
            <div className="flex justify-center items-center gap-2 mt-10">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:border-green-600 transition">Anterior</button>
              <button className="px-4 py-2 bg-green-600 text-white font-bold rounded-lg">1</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:border-green-600 transition">2</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:border-green-600 transition">3</button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:border-green-600 transition">Siguiente</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}