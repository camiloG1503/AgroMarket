import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

// URL de placeholder genérico para manejar errores de carga de imagen
const PLACEHOLDER_URL = "https://placehold.co/800x800/eeeeee/333333?text=AGROMARKET";

/**
 * Componente ImageGallery
 * Muestra la imagen principal de un producto con miniaturas navegables.
 *
 * @param {object} props
 * @param {string[]} props.images - Array de URLs de imágenes del producto.
 * @param {string} props.productName - Nombre del producto para el texto alternativo.
 */
export default function ImageGallery({ images, productName }) {
    const [selectedImage, setSelectedImage] = useState(0)
    const [isFullscreen, setIsFullscreen] = useState(false)

    const imageList = images && images.length > 0 ? images : ['/placeholder.svg']

    const handleNext = () => {
        setSelectedImage(prev => (prev + 1) % imageList.length);
    };

    const handlePrev = () => {
        setSelectedImage(prev => (prev - 1 + imageList.length) % imageList.length);
    };

    // Función que maneja el cambio de estado de pantalla completa (simulación de modal)
    const handleFullscreenToggle = () => {
        // En una aplicación real, esto abriría un modal/lightbox con la imagen.
        setIsFullscreen(!isFullscreen);
        console.log(`[Galeria] Modo pantalla completa: ${!isFullscreen ? 'Activado' : 'Desactivado'}`);
    };

    return (
        <div className="space-y-4">
            <div className="relative bg-gray-100 rounded-xl overflow-hidden aspect-square shadow-lg">
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span className="text-gray-400 text-sm">[Aquí va imagen principal del producto]</span>
                </div>

                <button
                    onClick={handleFullscreenToggle}
                    className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition hover:scale-110 z-10"
                >
                    <Maximize2 className="w-5 h-5" />
                </button>

                {imageList.length > 1 && (
                    <>
                        <button onClick={handlePrev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition z-10">
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition z-10">
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </>
                )}
            </div>

            {imageList.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                    {imageList.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-3 transition-all ${selectedImage === index ? 'border-4 border-green-600 ring-2 ring-green-300' : 'border-gray-300'
                                }`}
                        >
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <span className="text-xs text-gray-400">[Mini {index + 1}]</span>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}