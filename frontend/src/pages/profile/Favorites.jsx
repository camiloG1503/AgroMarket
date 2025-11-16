import React, { useEffect, useMemo, useState } from 'react'
import '../../styles/profile/favorites.css'
import { FaHeart, FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const MOCK = [
	{ id: 1, name: 'Pala De Madera', price: '$350.000', units: 350, category: 'Herramienta Manuales' },
	{ id: 2, name: 'Taladro Industrial', price: '$1.200.000', units: 12, category: 'Maquinaria Motorizada' },
	{ id: 3, name: 'Arado Animal', price: '$800.000', units: 5, category: 'Tracción Animal' },
	{ id: 4, name: 'Machete', price: '$45.000', units: 120, category: 'Herramienta Manuales' },
	{ id: 5, name: 'Carretilla', price: '$120.000', units: 40, category: 'Herramienta Manuales' }
]

export default function Favorites() {
	const [items, setItems] = useState([])
	const [q, setQ] = useState('')
	const [category, setCategory] = useState('Todos')

	useEffect(() => {
		// Intentar cargar favoritos desde localStorage (user.profile.favorites), si no, usar MOCK
		try {
			const raw = localStorage.getItem('user')
			if (raw) {
				const user = JSON.parse(raw)
				const favs = user?.profile?.favorites
				if (Array.isArray(favs) && favs.length) {
					setItems(favs)
					return
				}
			}
		} catch (e) {
			// ignore
		}
		setItems(MOCK)
	}, [])

	useEffect(() => {
		// Persistir cambios simples en localStorage (si existe user)
		try {
			const raw = localStorage.getItem('user')
			if (raw) {
				const user = JSON.parse(raw)
				user.profile = user.profile || {}
				user.profile.favorites = items
				localStorage.setItem('user', JSON.stringify(user))
			}
		} catch (e) {}
	}, [items])

	const categories = ['Todos', 'Herramienta Manuales', 'Maquinaria Motorizada', 'Tracción Animal']

	const filtered = useMemo(() => {
		return items.filter(i => {
			if (category !== 'Todos' && i.category !== category) return false
			if (q && !(`${i.name} ${i.category}`.toLowerCase().includes(q.toLowerCase()))) return false
			return true
		})
	}, [items, q, category])

	function handleRemove(id) {
		setItems(prev => prev.filter(p => p.id !== id))
	}

	function handleAddToCart(item) {
		console.log('Añadir al carrito', item)
		alert(`${item.name} añadido al carrito (simulado)`)
	}

	return (
		<div className="favorites-page" style={{ padding: 20 }}>
			<div className="profile-card">
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
					<div>
						<h3 style={{ margin: 0 }}>Favoritos</h3>
						<small className="text-muted">Lista de productos que has marcado como favoritos</small>
					</div>

					<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
						<input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar" className="form-control" style={{ width: 220 }} />
						<Link to="/Productos" className="btn btn-success">Productos</Link>
					</div>
				</div>

				<div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center', flexWrap: 'wrap' }}>
					{categories.map(c => (
						<button key={c} onClick={() => setCategory(c)} className={`category-btn ${category === c ? 'active' : ''}`}>
							{c}
						</button>
					))}
				</div>

				{/* header similar to table header in Figma */}
				<div className="favorites-header" role="row">
					<div className="header-col header-product">Producto</div>
					<div className="header-col header-price">Precio</div>
					<div className="header-col header-units">Unidades</div>
					<div className="header-col header-action">Acción</div>
				</div>

				<div className="favorites-list">
					{filtered.map(p => (
						<div className="favorite-row" key={p.id}>
							<div className="favorite-left" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
								<div className="product-thumb" aria-hidden />
								<div>
									<div style={{ fontWeight: 700 }}>{p.name}</div>
									<div className="text-muted" style={{ fontSize: 12 }}>{p.category}</div>
								</div>
							</div>

							<div className="favorite-middle text-center" style={{ minWidth: 120 }}>
								<div style={{ fontWeight: 700 }}>{p.price}</div>
							</div>

							<div className="favorite-units text-center" style={{ minWidth: 120 }}>
								<div>{p.units}</div>
							</div>

							<div className="favorite-actions" style={{ display: 'flex', gap: 8 }}>
								<button className="btn btn-outline-secondary action-btn" onClick={() => handleAddToCart(p)} title="Agregar al carrito"><FaShoppingCart /></button>
								<button className="btn action-btn" onClick={() => handleRemove(p.id)} title="Quitar de favoritos" style={{ color: '#e53935' }}><FaHeart /></button>
							</div>
						</div>
					))}

					{filtered.length === 0 && (
						<div className="text-center text-muted" style={{ padding: 18 }}>No hay productos que coincidan.</div>
					)}
				</div>

				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<div className="text-muted">1 - {filtered.length} Páginas</div>
					<div>
						<button className="btn btn-light me-2">&lt;</button>
						<button className="btn btn-light">&gt;</button>
					</div>
				</div>
			</div>
		</div>
	)
}