import React from 'react'
import HeroBannner from '../../components/home/HeroBannner'
import FeaturedSection from '../../components/home/FeaturedSection'
import RecentProducts from '../../components/home/RecentProducts'
import ReviewsSection from '../../components/home/ReviewsSection'

/**
 * Página principal de AgroMarket
 * Muestra hero banner, productos destacados, recientes y testimonios
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroBannner />
      <div className="max-w-7xl mx-auto px-4 space-y-14 py-10">
        <FeaturedSection />
        <RecentProducts />
        <ReviewsSection />
      </div>
    </div>
  )
}

