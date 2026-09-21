import React, { useState } from 'react'

export default function SecurityForm({ onSubmit, onCancel }) {
    const [form, setForm] = useState({ current: '', password: '', confirm: '' })

    function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    }

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')
    if (form.password !== form.confirm) {
        setError('Las contraseñas no coinciden')
        return
    }
    try {
        if (onSubmit) await onSubmit(form)
        setSuccess('Contraseña actualizada correctamente')
        setForm({ current: '', password: '', confirm: '' })
    } catch (requestError) {
        setError(requestError.message)
    }
    }

    function handleCancel() {
    setForm({ current: '', password: '', confirm: '' })
    if (onCancel) onCancel()
    }

    return (
    <form onSubmit={handleSubmit} className="profile-security-form" style={{ maxWidth: 900 }}>
        <div className="row g-3">
        <div className="col-md-4">
            <label className="form-label">Contraseña Actual</label>
            <input type="password" name="current" value={form.current} onChange={handleChange} className="form-control" />
        </div>
        <div className="col-md-4">
            <label className="form-label">Nueva Contraseña</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} className="form-control" />
        </div>
        <div className="col-md-4">
            <label className="form-label">Confirmar Contraseña</label>
            <input type="password" name="confirm" value={form.confirm} onChange={handleChange} className="form-control" />
        </div>
        </div>

        <div className="mt-3">
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        {success && <div className="alert alert-success" role="alert">{success}</div>}
        <button type="submit" className="btn btn-success me-2">Actualizar</button>
        <button type="button" onClick={handleCancel} className="btn btn-outline-secondary">Cancelar</button>
        </div>
    </form>
    )
}