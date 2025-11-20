import React, { useEffect, useState } from 'react'
import ProductCard from '../shared/ProductCard.jsx'
import { RefreshCw } from 'lucide-react'

const mockProducts = [
	{
		id: 'r1',
		name: 'Tractor Cortacésped Deluxe',
		price: 8900000, // Precio en pesos colombianos o similar
		originalPrice: 9500000,
		image: 'https://placehold.co/300x300/e0f2f1/004d40?text=Tractor',
		brand: 'AgriTech',           // <-- quitar el punto
		brandLogo: 'https://placehold.co/60x40/f0f4c3/000?text=AT',
		rating: 4.5,
		reviews: 89,
		sold: 234,
	},
	{
		id: 'r2',
		name: 'Bomba de Agua Sumergible',
		price: 320000,
		image: 'https://placehold.co/300x300/e3f2fd/0d47a1?text=Bomba',
		brand: 'AquaFlow',
		brandLogo: 'https://placehold.co/60x40/bbdefb/000?text=AF',
		rating: 4.7,
		reviews: 156,
		sold: 456,
	},
	{
		id: 'r3',
		name: 'Fertilizante Orgánico (20kg)',
		price: 195000,
		image: 'https://placehold.co/300x300/fff3e0/ff6f00?text=Fertilizante',
		brand: 'EcoGrow',
		brandLogo: 'https://placehold.co/60x40/fce4ec/000?text=EG',
		rating: 4.3,
		reviews: 67,
		sold: 189,
	},
]

/**
 * Componente RelatedProducts
 * Muestra una sección de productos relacionados que podrían interesarle al usuario.
 * @param {object} props
 * @param {string} props.currentProductId - ID del producto actual para excluirlo de la lista.
 */
export default function RelatedProducts({ currentProductId = 'p001' }) {
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setLoading(true)
		// Simulación de una llamada a la API para obtener productos relacionados
		const t = setTimeout(() => {
			console.log(
				`[RelatedProducts] Simulación de carga para productos relacionados con ID: ${currentProductId}`
			)

			// Filtramos el mock para simular la exclusión del producto actual
			const related = mockProducts.filter(p => p.id !== currentProductId)
			setProducts(related.length ? related : mockProducts)
			setLoading(false)
		}, 600)

		return () => clearTimeout(t)
	}, [currentProductId])

	if (loading) {
		return (
			<div className="related-track">
				{[...Array(3)].map((_, i) => (
					<div
						key={i}
						className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 animate-pulse h-[320px] flex flex-col justify-between"
					>
						<div className="h-40 bg-gray-200 rounded-xl" />
						<div className="h-4 bg-gray-200 rounded w-3/4 mt-4" />
						<div className="h-4 bg-gray-200 rounded w-1/2" />
						<div className="h-10 bg-gray-200 rounded mt-4" />
					</div>
				))}
			</div>
		)
	}

	return (
		<div className="related-track">
			{products.map(p => (
				<div key={p.id}>
					<ProductCard product={p} compact />
				</div>
			))}
		</div>
	)
}