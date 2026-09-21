import React, { useEffect, useState } from 'react'
import ProfileTabs from '../../components/profile/ProfileTabs'
import Sidebar from '../../components/profile/layout/Sidebar'
import PersonalData from './PersonalData'
import Favorites from './Favorites'
import ShoppingCart from './ShoppingCart'
import Purchases from './Purchases'
import HeaderIcons from '../../components/common/HeaderIcons'
import { useAuth } from '../../contexts/AuthContext.jsx'

export default function Profile() {
	const [tab, setTab] = useState('personal')
	const { user } = useAuth()

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

	return (
		<div style={{ display: 'flex', gap: 20, padding: 20 }}>
			<Sidebar />
			<main style={{ flex: 1 }}>
				<div className="profile-header d-flex justify-content-between align-items-center mb-3">
					<div>
						<h4 className="mb-0">Bienvenido, {user?.nombre || 'Usuario'}</h4>
						<small className="text-muted">{user?.correo}</small>
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