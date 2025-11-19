import React, { useEffect, useState } from 'react'
import ProfileTabs from '../../components/profile/ProfileTabs'
import Sidebar from '../../components/profile/layout/Sidebar'
import PersonalData from './PersonalData'
import Favorites from './Favorites'
import ShoppingCart from './ShoppingCart'
import Purchases from './Purchases'
import HeaderIcons from '../../components/common/HeaderIcons'

export default function Profile() {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)
	const [tab, setTab] = useState('personal')

	// Sincronizar pestaña con fragmento (hash) de la URL
	useEffect(() => {
		function hashToTab(hash) {
			if (!hash) return 'personal'
			const h = hash.replace('#', '').toLowerCase()
			if (h === 'favoritos' || h === 'favorites') return 'favorites'
			if (h === 'carrito' || h === 'cart') return 'cart'
			if (h === 'comprados' || h === 'purchases') return 'purchases'
			return 'personal'
		}

		setTab(hashToTab(window.location.hash))

		function onHashChange() {
			setTab(hashToTab(window.location.hash))
		}

		window.addEventListener('hashchange', onHashChange)
		return () => window.removeEventListener('hashchange', onHashChange)
	}, [])

	useEffect(() => {
		// Carga un usuario mock desde localStorage si existe. En integración real,
		// reemplazar por `AuthContext` o llamada a API para obtener `user`/`profile`.
		try {
			const raw = localStorage.getItem('user')
			if (raw) setUser(JSON.parse(raw))
		} catch (e) {
			// ignore parse error
		} finally {
			setLoading(false)
		}
	}, [])

	function handleSubmit(profileData) {
		// Simula actualización local del perfil (sin backend)
		const updated = { ...(user || {}), profile: profileData }
		setUser(updated)
		try {
			localStorage.setItem('user', JSON.stringify(updated))
		} catch (e) {
			console.error('no se pudo guardar user en localStorage', e)
		}
		alert('Perfil actualizado (simulado)')
	}

	function handleCancel() {
		// Restaurar desde storage o estado inicial
		try {
			const raw = localStorage.getItem('user')
			if (raw) setUser(JSON.parse(raw))
			else setUser(null)
		} catch (e) {
			setUser(null)
		}
	}

	if (loading) return <div>Cargando perfil...</div>

	return (
		<div style={{ display: 'flex', gap: 20, padding: 20 }}>
			<Sidebar />
			<main style={{ flex: 1 }}>
				<div className="profile-header d-flex justify-content-between align-items-center mb-3">
					<div>
						<h4 className="mb-0">Bienvenido, {user?.profile?.firstName || 'Usuario'}</h4>
						<small className="text-muted">Viernes, 25 diciembre 2025</small>
					</div>
						<div className="d-flex align-items-center gap-2">
							<HeaderIcons />
						</div>
				</div>

				<div style={{ marginTop: 12, marginBottom: 18 }}>
					<ProfileTabs active={tab} onChange={setTab} />
				</div>

				{tab === 'personal' && <PersonalData />}

				{tab === 'favorites' && <Favorites />}

				{tab === 'cart' && <ShoppingCart />}

				{tab === 'purchases' && <Purchases />}
			</main>
		</div>
	)
}