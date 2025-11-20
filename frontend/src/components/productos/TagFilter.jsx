import React, { useCallback } from 'react';
import { X } from 'lucide-react';

function TagFilter({ tags, onTagChange }) {
  const availableTags = [
    'Bajo Consumo',
    'Uso Pesado',
    'Motor 2 Tiempos',
    'Eléctrico',
    'Profesional',
    'Principiante',
    'Alta Eficiencia',
    'Inalámbrico',
  ];

  const toggleTag = useCallback((tag) => {
    const newTags = tags.includes(tag)
      ? tags.filter(t => t !== tag)
      : [...tags, tag];
      
    onTagChange(newTags);
  }, [tags, onTagChange]);

  return (
    <div className="flex flex-wrap gap-3 p-4 bg-white rounded-xl shadow-md border border-gray-100">
        <span className="text-sm font-semibold text-gray-700 w-full mb-1">Filtrar por Característica:</span>
        <div className="flex flex-wrap gap-2">
            {availableTags.map(tag => {
                const isSelected = tags.includes(tag);
                return (
                    <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`
                            flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-medium transition
                            ${isSelected
                                ? 'bg-green-600 text-white shadow hover:bg-green-700'
                                : 'bg-white text-gray-700 border border-gray-300 hover:border-green-500 hover:text-green-700'}
                        `}
                    >
                        {tag}
                        {isSelected && <X className="w-3 h-3 ml-1" />}
                    </button>
                );
            })}
        </div>
    </div>
  );
}

export default TagFilter
export { TagFilter }