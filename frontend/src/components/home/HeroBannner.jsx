import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function HeroBanner() {
    const navigate = useNavigate()
    const goToProducts = () => navigate('/productos')
    const goToFeatured = () => navigate('/productos?filter=destacados')

    // Placeholder (sin imagen real)
    const bgUrl = 'https://placehold.co/1920x600/0a4c17/ffffff?text=AGROMARKET+BANNER'

    return (
        <section
            className="hero-banner hero-offset mb-12"
            style={{ backgroundImage: `url(${bgUrl})` }}
        >
            <div className="container mx-auto">
                <div className="hero-banner__content">
                    <h1 className="hero-title">
                        Conoce los <span style={{ color: '#22c55e' }}>MEJORES</span><br />productos para tu campo
                    </h1>
                    <p className="hero-sub">
                        Encuentra herramientas, maquinaria y equipos agrícolas de calidad.
                    </p>
                    <div className="hero-actions">
                        <button onClick={goToProducts} className="hero-btn">
                            Saber más
                        </button>
                        <button onClick={goToFeatured} className="hero-btn alt">
                            Productos Destacados
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}