import React, { useState } from 'react'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './product-card.css';

export default function ProductCard(props) {
    const p = props.product || props
    const {
        id,
        name,
        price = 0,
        originalPrice,
        image,
        imageUrl,
        brand,
        brandLogo,
        rating = 0,
        reviews = 0,
        sold = 0,
        isBestSeller = false,
    } = p

    const img = image || imageUrl || `https://placehold.co/400x400/22c55e/FFFFFF?text=${encodeURIComponent(name?.substring(0, 20) || 'Producto')}`
    const ratingValue = Number.isFinite(rating) ? rating : 0
    const reviewsValue = Number.isFinite(reviews) ? reviews : 0
    const discountPct = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0
    const discount = discountPct
    const categoryColor = p.categoryColor

    const { addToCart } = useCart()
    const [isFavorite, setIsFavorite] = useState(false)
    const compact = props.compact
    const row = props.view === 'row'
    console.log('🔍 ProductCard view:', props.view, 'row:', row)

    if (row) {
        const fmt = v => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(v)
        return (
            <div className="w-full flex gap-6 p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition">
                <Link
                    to={`/producto/${id}`}
                    className="relative w-[200px] h-[200px] rounded-xl overflow-hidden flex items-center justify-center shrink-0 bg-gray-100"
                >
                    <img
                        src={img}
                        alt={name}
                        className="w-full h-full object-cover"
                        onError={e => { e.currentTarget.src = 'https://placehold.co/200x200/d1d5db/4b5563?text=Sin+Imagen' }}
                    />
                    {discountPct > 0 && (
                        <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                            -{discountPct}%
                        </span>
                    )}
                </Link>

                <div className="flex flex-col flex-1 min-w-0">
                    <Link to={`/producto/${id}`} className="mb-1">
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{name}</h3>
                    </Link>

                    <div className="flex items-center gap-2 text-xs">
                        {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < Math.round(ratingValue) ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                        ))}
                        <span className="font-semibold text-gray-700">{ratingValue.toFixed(1)}</span>
                        <span className="text-gray-500">({reviewsValue})</span>
                    </div>

                    <div className="mt-2 flex items-baseline gap-3 flex-wrap">
                        <span className="text-xl font-bold text-green-700">{fmt(price)}</span>
                        {originalPrice && originalPrice > price && (
                            <span className="text-sm line-through text-gray-400">{fmt(originalPrice)}</span>
                        )}
                    </div>

                    <div className="mt-2 flex items-center gap-3 text-xs text-gray-600 flex-wrap">
                        {sold > 0 && <span>{sold} vendidos</span>}
                        {brand && <span className="px-2 py-1 rounded-full bg-gray-100 font-medium">{brand}</span>}
                    </div>

                    <div className="mt-auto flex gap-3 pt-4">
                        <button
                            onClick={() => addToCart({ id, name, price, image: img })}
                            className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            Añadir
                        </button>
                        <button
                            onClick={() => setIsFavorite(!isFavorite)}
                            className="h-12 w-12 rounded-xl border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition"
                            aria-label="Favorito"
                        >
                            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={`bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col ${compact ? 'min-h-[320px]' : ''}`}>
            {/* Image Container */}
            <div className="relative aspect-square bg-gray-50 overflow-hidden group">
                <Link to={`/producto/${id}`}>
                    <img
                        src={img}
                        alt={name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                            e.target.onerror = null
                            e.target.src = 'https://placehold.co/400x400/d1d5db/4b5563?text=Sin+Imagen'
                        }}
                    />
                </Link>

                {/* Badges */}
                {isBestSeller && (
                    <span className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg uppercase tracking-wide">
                        Más Vendido
                    </span>
                )}
                {discount > 0 && (
                    <span className="absolute top-3 right-3 bg-red-600 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
                        -{discount}%
                    </span>
                )}

                {/* Favorite Button */}
                <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="absolute bottom-3 right-3 bg-white hover:bg-red-50 p-2.5 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
                >
                    <Heart
                        className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                    />
                </button>
            </div>

            {/* Content */}
            <div className="p-4 flex-1 flex flex-column">
                {/* Brand Logo */}
                {brandLogo && (
                    <img
                        src={brandLogo}
                        alt={brand}
                        className="h-6 object-contain mb-3"
                        onError={(e) => {
                            e.target.style.display = 'none'
                        }}
                    />
                )}

                {/* Product Name */}
                <Link to={`/producto/${id}`} className="block mb-3">
                    <h3 className="font-bold text-gray-900 text-base line-clamp-2 hover:text-green-700 transition">
                        {name}
                    </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(ratingValue) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                            />
                        ))}
                    </div>
                    <span className="text-sm text-gray-600 font-medium">
                        {ratingValue.toFixed(1)} <span className="text-gray-400">({reviewsValue})</span>
                    </span>
                </div>

                {/* Price */}
                <div className="mb-4">
                    <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-2xl font-bold text-green-700">${price.toLocaleString('es-CO')}</span>
                        {originalPrice && (
                            <span className="text-sm text-gray-500 line-through">${originalPrice.toLocaleString('es-CO')}</span>
                        )}
                    </div>
                    {sold > 0 && (
                        <p className="text-xs text-gray-500 mt-1">{sold} vendidos</p>
                    )}
                </div>

                {/* Add to Cart Button */}
                <button
                    onClick={() => addToCart({ id, name, price, image: img, brandId: brand })}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg mt-auto"
                >
                    <ShoppingCart className="w-5 h-5" />
                    Agregar al Carrito
                </button>
            </div>
        </div>
    )
}

// helper simple
function shade(hex) {
    try {
        const c = hex.replace('#', '')
        const r = parseInt(c.substring(0, 2), 16)
        const g = parseInt(c.substring(2, 4), 16)
        const b = parseInt(c.substring(4, 6), 16)
        const f = (x) => Math.max(0, Math.min(255, Math.round(x * 0.78)))
        return `#${[f(r), f(g), f(b)].map(n => n.toString(16).padStart(2, '0')).join('')}`
    } catch { return hex }
}