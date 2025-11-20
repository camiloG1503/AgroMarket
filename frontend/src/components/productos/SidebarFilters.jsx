import React, { useState, useCallback } from 'react'
import { ChevronDown } from 'lucide-react'

/**
 * Componente SidebarFilters
 * Muestra las opciones de filtrado para una página de catálogo.
 * NOTA: Componente adaptado de TypeScript a JavaScript/React.
 * @param {object} props
 * @param {function} props.onFilterChange - Callback para aplicar los filtros.
 */
function SidebarFilters({ onFilterChange }) {
  // Estado para controlar qué sección del filtro está expandida
  const [expandedSection, setExpandedSection] = useState('categories')
  
  // Estado para almacenar los filtros seleccionados
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    brands: [],
    priceRange: [0, 500000], // Rango de precios inicial
    tags: [],
  })

  // --- Mock Data para los filtros ---
  const categories = [
    { id: 'herramientas-manuales', name: 'Herramientas Manuales', count: 342 },
    { id: 'maquinaria-motorizada', name: 'Maquinaria Motorizada', count: 156 },
    { id: 'traccion-animal', name: 'Tracción Animal', count: 89 },
  ]

  const brands = [
    { id: 'grombell', name: 'Grombell', count: 45 },
    { id: 'strongtool', name: 'StrongTool', count: 38 },
    { id: 'proequip', name: 'ProEquip', count: 52 },
    { id: 'aquapro', name: 'AquaPro', count: 28 },
  ]

  const tags = [
    { id: 'bajo-consumo', name: 'Bajo Consumo' },
    { id: 'uso-pesado', name: 'Uso Pesado' },
    { id: 'motor-2t', name: 'Motor 2 Tiempos' },
    { id: 'electrico', name: 'Eléctrico' },
  ]

  // --- Lógica de Manejo de Filtros ---

  const handleCategoryChange = useCallback((categoryId) => {
    setSelectedFilters(prev => {
      const isSelected = prev.categories.includes(categoryId)
      const newCategories = isSelected
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId]
      
      const newFilters = { ...prev, categories: newCategories }
      onFilterChange(newFilters) // Notifica al componente padre
      return newFilters
    })
  }, [onFilterChange])

  const handleBrandChange = useCallback((brandId) => {
    setSelectedFilters(prev => {
        const isSelected = prev.brands.includes(brandId);
        const newBrands = isSelected
            ? prev.brands.filter(id => id !== brandId)
            : [...prev.brands, brandId];
        
        const newFilters = { ...prev, brands: newBrands };
        onFilterChange(newFilters);
        return newFilters;
    });
  }, [onFilterChange]);
  
  const handlePriceChange = useCallback((value) => {
      const upperValue = parseInt(value);
      setSelectedFilters(prev => {
          const newFilters = { ...prev, priceRange: [0, upperValue] };
          onFilterChange(newFilters);
          return newFilters;
      });
  }, [onFilterChange]);

  const handleTagChange = useCallback((tagId) => {
    setSelectedFilters(prev => {
        const isSelected = prev.tags.includes(tagId);
        const newTags = isSelected
            ? prev.tags.filter(id => id !== tagId)
            : [...prev.tags, tagId];
        
        const newFilters = { ...prev, tags: newTags };
        onFilterChange(newFilters);
        return newFilters;
    });
  }, [onFilterChange]);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  // --- Renderizado del Componente ---
  return (
    <aside className="w-full md:w-64 bg-white rounded-xl shadow-lg p-6 h-fit sticky top-28 border border-gray-100">
      <h3 className="font-bold text-xl text-gray-900 mb-6 border-b pb-2">Filtrar Productos</h3>

      {/* Categories */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('categories')}
          className="flex items-center justify-between w-full font-bold text-gray-800 mb-4 text-sm hover:text-green-600 transition"
        >
          Categorías
          <ChevronDown
            className={`w-4 h-4 text-green-600 transition ${expandedSection === 'categories' ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSection === 'categories' && (
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
            {categories.map(cat => (
              <label key={cat.id} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedFilters.categories.includes(cat.id)}
                  onChange={() => handleCategoryChange(cat.id)}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="text-sm text-gray-700 group-hover:text-green-700">{cat.name}</span>
                <span className="ml-auto text-xs text-gray-500">({cat.count})</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Brands */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('brands')}
          className="flex items-center justify-between w-full font-bold text-gray-800 mb-4 text-sm hover:text-green-600 transition"
        >
          Marcas
          <ChevronDown
            className={`w-4 h-4 text-green-600 transition ${expandedSection === 'brands' ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSection === 'brands' && (
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
            {brands.map(brand => (
              <label key={brand.id} className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={selectedFilters.brands.includes(brand.id)}
                  onChange={() => handleBrandChange(brand.id)}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" 
                />
                <span className="text-sm text-gray-700 group-hover:text-green-700">{brand.name}</span>
                <span className="ml-auto text-xs text-gray-500">({brand.count})</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full font-bold text-gray-800 mb-4 text-sm hover:text-green-600 transition"
        >
          Rango de Precio
          <ChevronDown
            className={`w-4 h-4 text-green-600 transition ${expandedSection === 'price' ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSection === 'price' && (
          <div className="space-y-3">
            <input
              type="range"
              min="0"
              max="500000"
              step="10000"
              value={selectedFilters.priceRange[1]}
              onChange={(e) => handlePriceChange(e.target.value)}
              // Clases para estilo del slider (depende del navegador, usamos clases básicas)
              className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer range-lg [&::-webkit-slider-thumb]:bg-green-600 [&::-moz-range-thumb]:bg-green-600"
            />
            <div className="flex justify-between text-sm font-medium text-gray-800">
              <span>Mínimo: ${selectedFilters.priceRange[0].toLocaleString('es-CO')}</span>
              <span className="text-green-600">Máximo: ${selectedFilters.priceRange[1].toLocaleString('es-CO')}</span>
            </div>
          </div>
        )}
      </div>

      {/* Tags */}
      <div>
        <button
          onClick={() => toggleSection('tags')}
          className="flex items-center justify-between w-full font-bold text-gray-800 mb-4 text-sm hover:text-green-600 transition"
        >
          Características
          <ChevronDown
            className={`w-4 h-4 text-green-600 transition ${expandedSection === 'tags' ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSection === 'tags' && (
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
            {tags.map(tag => (
              <label key={tag.id} className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={selectedFilters.tags.includes(tag.id)}
                  onChange={() => handleTagChange(tag.id)}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" 
                />
                <span className="text-sm text-gray-700 group-hover:text-green-700">{tag.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Botón de Aplicar (se puede usar para recargar o refinar la búsqueda) */}
      <button 
        className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-base font-semibold shadow-md hover:shadow-lg transition transform hover:scale-[1.01]"
        onClick={() => onFilterChange(selectedFilters)}
      >
        Aplicar Filtros
      </button>
    </aside>
  )
}

export default SidebarFilters
export { SidebarFilters }