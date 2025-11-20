import React, { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const data = [
  {
    id:'traccion',
    title:'Equipos de Tracción y Carga',
    desc:'Tractores y remolques',
    bg:'https://placehold.co/600x400/064e3b/ffffff?text=Tracción'
  },
  {
    id:'insumos',
    title:'Insumos, Semillas y Abonos',
    desc:'Fertilizantes orgánicos y semillas',
    bg:'https://placehold.co/600x400/14532D/ffffff?text=Insumos'
  },
  {
    id:'herramientas',
    title:'Herramientas Manuales Esenciales',
    desc:'Palas, machetes, rastrillos y más',
    bg:'https://placehold.co/600x400/0d5e2a/ffffff?text=Herramientas'
  },
]

export default function FeaturedSection(){
  const navigate = useNavigate()
  const [idx,setIdx]=useState(0)

  const next = useCallback(()=> setIdx(i=> (i+1)%data.length),[])
  const prev = useCallback(()=> setIdx(i=> (i-1+data.length)%data.length),[])

  useEffect(()=>{
    const t=setInterval(next,6000)
    return ()=>clearInterval(t)
  },[next])

  // Rotar
  const visible = [
    data[idx],
    ...data.slice(idx+1),
    ...data.slice(0,idx)
  ].slice(0,3)

  return (
    <div className="featured-wrapper">
      <h2 className="featured-header">Nuestros Destacados</h2>
      <div className="featured-track">
        {visible.map(card=>(
          <button
            key={card.id}
            onClick={()=>navigate(`/productos?category=${card.id}`)}
            className="featured-card2"
            style={{backgroundImage:`url(${card.bg})`}}
          >
            <span className="featured-badge">DESTACADO</span>
            <h3 className="featured-title">{card.title}</h3>
            <p className="featured-desc">{card.desc}</p>
            <span style={{
              position:'absolute',inset:0,display:'flex',
              alignItems:'center',justifyContent:'center',
              fontSize:'11px',fontWeight:600,opacity:.12
            }}>[Aquí va imagen]</span>
          </button>
        ))}
      </div>
      <div className="featured-arrows">
        <button onClick={prev} className="featured-btn-arrow" aria-label="Anterior">
          <ChevronLeft className="w-5 h-5"/>
        </button>
        <button onClick={next} className="featured-btn-arrow" aria-label="Siguiente">
          <ChevronRight className="w-5 h-5"/>
        </button>
      </div>
    </div>
  )
}