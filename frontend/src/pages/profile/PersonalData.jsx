import React, { useEffect, useState } from 'react'
import ProfileAvatar from '../../components/profile/ProfileAvatar'
import PersonalDataForm from '../../components/profile/PersonalDataForm'
import SecurityForm from '../../components/profile/SecurityForm'
import { changePassword, getProfile, updateProfile, uploadProfilePicture } from '../../services/shop.js'

export default function PersonalData() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const [error, setError] = useState('')
    useEffect(() => {
        getProfile().then(setUser).catch((requestError) => setError(requestError.message)).finally(() => setLoading(false))
    }, [])

    async function handleSubmit(profileData) {
    const updated = await updateProfile({ nombre: profileData.firstName, apellido: profileData.lastName })
    setUser((current) => ({ ...current, nombre: profileData.firstName, apellido: profileData.lastName, ...updated }))
    }

    async function handleAvatarUpload(file) {
        try {
            const result = await uploadProfilePicture(file)
            setUser((current) => ({ ...current, foto_perfil: result.foto_perfil }))
        } catch (requestError) {
            setError(requestError.message)
        }
    }

    function handleCancel() {
        getProfile().then(setUser).catch((requestError) => setError(requestError.message))
    }

    if (loading) return <div>Cargando datos...</div>

    return (
    <div className="profile-page">
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <div className="profile-card">
        <div className="profile-card-header">
            <h3>Información Perfil</h3>
        </div>

        <div className="profile-card-body" style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
            <div className="profile-avatar-wrapper d-flex justify-content-center" style={{ minWidth: 180 }}>
            <ProfileAvatar src={user?.foto_perfil ? `${import.meta.env.VITE_API_URL?.replace(/\/api$/, '') || `${window.location.protocol}//${window.location.hostname}:5000`}/uploads/usuarios/${user.foto_perfil}` : null} onUpload={handleAvatarUpload} />
            </div>

            <div className="profile-forms" style={{ flex: 1 }}>
            <PersonalDataForm profile={{ firstName: user?.nombre, lastName: user?.apellido, email: user?.correo }} onSubmit={handleSubmit} onCancel={handleCancel} />
            </div>
        </div>
        </div>

        <div style={{ marginTop: 20 }} className="profile-security">
        <div className="profile-card">
            <div className="profile-card-header">
            <h3>Seguridad</h3>
            </div>
            <div className="profile-card-body">
            <SecurityForm onSubmit={({ current, password, confirm }) => changePassword({
                contrasena_actual: current,
                nueva_contrasena: password,
                confirmar_contrasena: confirm,
            })} />
            </div>
        </div>
        </div>
    </div>
    )
}