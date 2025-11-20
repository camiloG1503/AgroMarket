import React from 'react';
import { ArrowUpDown } from 'lucide-react';

function SortSelector({ onSortChange }) {
  const sortOptions = [
    { value: 'popular', label: 'Popularidad' },
    { value: 'price-asc', label: 'Menor Precio' },
    { value: 'price-desc', label: 'Mayor Precio' },
    { value: 'most-sold', label: 'Más Vendido' },
    { value: 'newest', label: 'Más Nuevo' },
    { value: 'rating', label: 'Mejor Calificado' },
  ];

  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      <ArrowUpDown className="w-5 h-5 text-gray-500" aria-hidden="true" />
      <select
        onChange={(e) => onSortChange(e.target.value)}
        defaultValue="popular"
        className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition cursor-pointer"
        aria-label="Ordenar productos por"
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortSelector;
export { SortSelector };