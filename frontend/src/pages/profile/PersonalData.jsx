import React, { useEffect, useState } from 'react'
import ProfileAvatar from '../../components/profile/ProfileAvatar'
import PersonalDataForm from '../../components/profile/PersonalDataForm'
import SecurityForm from '../../components/profile/SecurityForm'

export default function PersonalData() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
    try {
        const raw = localStorage.getItem('user')
        if (raw) setUser(JSON.parse(raw))
    } catch (e) {
    } finally {
        setLoading(false)
    }
    }, [])

    function handleSubmit(profileData) {
    const updated = { ...(user || {}), profile: profileData }
    setUser(updated)
    try {
        localStorage.setItem('user', JSON.stringify(updated))
    } catch (e) {
        console.error('no se pudo guardar user en localStorage', e)
    }
    alert('Perfil actualizado (simulado)')
    }

    function handleAvatarUpload(dataUrl) {
    const updated = { ...(user || {}), profile: { ...(user?.profile || {}), avatar: dataUrl } }
    setUser(updated)
    try {
        localStorage.setItem('user', JSON.stringify(updated))
    } catch (e) {
        console.error('no se pudo guardar avatar en localStorage', e)
    }
    }

    function handleCancel() {
    try {
        const raw = localStorage.getItem('user')
        if (raw) setUser(JSON.parse(raw))
        else setUser(null)
    } catch (e) {
        setUser(null)
    }
    }

    if (loading) return <div>Cargando datos...</div>

    return (
    <div className="profile-page">
        <div className="profile-card">
        <div className="profile-card-header">
            <h3>Información Perfil</h3>
        </div>

        <div className="profile-card-body" style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
            <div className="profile-avatar-wrapper d-flex justify-content-center" style={{ minWidth: 180 }}>
            <ProfileAvatar src={user?.profile?.avatar || null} onUpload={handleAvatarUpload} />
            </div>

            <div className="profile-forms" style={{ flex: 1 }}>
            <PersonalDataForm profile={user?.profile || null} onSubmit={handleSubmit} onCancel={handleCancel} />
            </div>
        </div>
        </div>

        <div style={{ marginTop: 20 }} className="profile-security">
        <div className="profile-card">
            <div className="profile-card-header">
            <h3>Seguridad</h3>
            </div>
            <div className="profile-card-body">
            <SecurityForm onSubmit={() => alert('Cambio de contraseña simulado')} />
            </div>
        </div>
        </div>
    </div>
    )
}