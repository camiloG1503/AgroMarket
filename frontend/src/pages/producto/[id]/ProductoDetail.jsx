import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ImageGallery from '../../../components/producto/ImageGallery'
import ProductTabs from '../../../components/producto/ProductTabs'
import RelatedProducts from '../../../components/producto/RelatedProducts'
import { Heart, ShoppingCart, Share2, Star, Award } from 'lucide-react'
import { useCart } from '../../../components/context/CartContext'

export default function ProductoDetail() {
    const { id } = useParams()
    const { addToCart } = useCart()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products/${id}`)
                const data = await response.json()
                setProduct(data.product)
            } catch {
                setProduct({
                    id: 'p001',
                    name: 'Ejemplo',
                    price: 250000,
                    originalPrice: 300000,
                    images: [
                        '/placeholder.svg?height=400&width=400',
                        '/placeholder.svg?height=400&width=400',
                        '/placeholder.svg?height=400&width=400',
                    ],
                    brand: 'Grombell',
                    brandLogo: '/grombell-logo.jpg',
                    rating: 4.6,
                    reviewsCount: 234, // antes: reviews: 234 (duplicado)
                    sold: 1230,
                    description: 'Motosierra profesional con motor de 20cc...',
                    specifications: {
                        'Cilindrada': '20cc',
                        'Tipo de Motor': '2 Tiempos',
                        'Peso Neto': '4.5 kg',
                        'Capacidad del Tanque': '0.45 L',
                        'Largo de la Guía': '45 cm',
                        'Potencia': '0.6 kW',
                    },
                    tags: ['Uso Pesado', 'Motor 2 Tiempos', 'Profesional'],
                    reviews: [
                        { id: '1', author: 'Juan Pérez', rating: 5, text: 'Excelente producto.', date: '2025-01-10' },
                        { id: '2', author: 'María García', rating: 4, text: 'Buena calidad.', date: '2025-01-05' }
                    ]
                })
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [id])

    if (loading || !product) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4" />
                    <p className="text-gray-600">Cargando producto...</p>
                </div>
            </div>
        )
    }

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0

    return (
        <main className="bg-white">
            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-gray-600">
                <a href="/" className="hover:text-green-600">Inicio</a>
                <span className="mx-2">/</span>
                <a href="/productos" className="hover:text-green-600">Productos</a>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">{product.name}</span>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Gallery */}
                    <div>
                        <ImageGallery images={product.images} productName={product.name} />
                    </div>

                    {/* Product Info */}
                    <div>
                        {/* Category & Date (REQF042) */}
                        <div className="mb-4">
                            <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium mb-2">
                                Herramienta de Mano
                            </span>
                            <p className="text-xs text-gray-600">Publicado: 15 de Enero, 2025</p>
                        </div>

                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

                        {/* Brand Logo (existing) */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-20 h-12 bg-gray-100 rounded flex items-center justify-center border">
                                <span className="text-xs text-gray-400">[Logo {product.brand}]</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Marca</p>
                                <p className="font-semibold text-gray-900">{product.brand}</p>
                            </div>
                        </div>

                        {/* Rating & Reviews (REQF040) */}
                        <div className="flex items-center gap-4 mb-6 pb-6 border-b">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-gray-600">({product.reviewsCount || product.reviews?.length || 0} reseñas)</span>
                            <span className="text-sm text-gray-600">|</span>
                            <span className="text-sm text-gray-600">Vendidos: {product.sold}</span>
                        </div>

                        {/* Price */}
                        <div className="mb-6">
                            <div className="flex items-baseline gap-4 mb-2">
                                <p className="text-4xl font-bold text-green-700">
                                    ${product.price.toLocaleString('es-CO')} COP
                                </p>
                                {product.originalPrice && (
                                    <p className="text-lg text-gray-500 line-through">
                                        ${product.originalPrice.toLocaleString('es-CO')} COP
                                    </p>
                                )}
                                {discount > 0 && (
                                    <span className="bg-red-500 text-white px-3 py-1 rounded text-sm font-bold">
                                        -{discount}%
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Specifications Preview (REQF046) */}
                        <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                            {Object.entries(product.specifications).slice(0, 4).map(([key, value]) => (
                                <div key={key}>
                                    <p className="text-xs text-gray-600 mb-1">{key}</p>
                                    <p className="font-medium text-gray-900 text-sm">{value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Action Buttons (REQF041, REQF043, REQF044) */}
                        <div className="space-y-3 mb-6">
                            <button
                                onClick={() => addToCart({
                                    id: product.id,
                                    name: product.name,
                                    price: product.price,
                                    image: product.images[0],
                                    brandId: product.brand,
                                })}
                                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold transition flex items-center justify-center gap-2"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Agregar al Carrito
                            </button>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setIsFavorite(!isFavorite)}
                                    className={`flex-1 py-3 rounded-lg font-medium transition border-2 flex items-center justify-center gap-2 ${isFavorite
                                        ? 'bg-red-50 border-red-500 text-red-600'
                                        : 'bg-white border-gray-300 text-gray-600 hover:border-red-500'
                                        }`}
                                >
                                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                                    {isFavorite ? 'Favorito' : 'Me Gusta'}
                                </button>
                                <button className="flex-1 py-3 rounded-lg font-medium transition border-2 border-gray-300 hover:border-blue-500 text-gray-600 hover:text-blue-600 flex items-center justify-center gap-2">
                                    <Share2 className="w-5 h-5" />
                                    Compartir
                                </button>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-3 gap-4 p-4 bg-blue-50 rounded-lg">
                            <div className="text-center">
                                <p className="text-2xl mb-1">✓</p>
                                <p className="text-xs text-gray-600">Envío Garantizado</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl mb-1">↩</p>
                                <p className="text-xs text-gray-600">30 días Garantía</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl mb-1">🔒</p>
                                <p className="text-xs text-gray-600">100% Seguro</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* NUEVA: Tarjeta de Marca (REQF050) */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-8 border-2 border-green-200">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center border-2 border-green-300 shadow-md">
                            <span className="text-gray-400 text-sm">[Logo {product.brand}]</span>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                                <Award className="w-6 h-6 text-green-600" />
                                <h3 className="text-2xl font-bold text-gray-900">{product.brand}</h3>
                            </div>
                            <p className="text-gray-700 mb-3">
                                Marca reconocida en el sector agrícola con más de 20 años de experiencia.
                                Productos de alta calidad y durabilidad garantizada.
                            </p>
                            <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-600 font-medium">4.8 calificación promedio</span>
                            </div>
                            <button
                                onClick={() => addToCart({
                                    id: product.id,
                                    name: product.name,
                                    price: product.price,
                                    image: product.images[0],
                                    brandId: product.brand,
                                })}
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-bold transition inline-flex items-center gap-2"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Comprar Este Producto
                            </button>
                        </div>
                    </div>
                </div>

                {/* Product Tabs */}
                <div className="bg-white rounded-lg p-6 mb-8">
                    <div className="detail-tags">
                        {product.tags.map(t => (
                            <span key={t}>{t}</span>
                        ))}
                    </div>
                    <ProductTabs
                        description={product.description}
                        specifications={product.specifications}
                        tags={product.tags}
                        reviews={product.reviews}
                    />
                </div>

                {/* Related horizontal */}
                <div className="bg-white rounded-xl p-6 mb-12">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      Productos Relacionados
                    </h2>
                    <button className="text-sm font-semibold text-green-700 hover:text-green-800">
                      Descubre Más →
                    </button>
                  </div>
                  <RelatedProducts currentProductId={product.id} />
                </div>
            </div>
        </main>
    )
}