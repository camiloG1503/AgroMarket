import React, { useState } from 'react'

export default function SecurityForm({ onSubmit, onCancel }) {
    const [form, setForm] = useState({ current: '', password: '', confirm: '' })

    function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    }

    function handleSubmit(e) {
    e.preventDefault()
    if (form.password !== form.confirm) {
        alert('Las contraseñas no coinciden')
        return
    }
    if (onSubmit) onSubmit(form)
    alert('Cambio de contraseña simulado')
    setForm({ current: '', password: '', confirm: '' })
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
        <button type="submit" className="btn btn-success me-2">Actualizar</button>
        <button type="button" onClick={handleCancel} className="btn btn-outline-secondary">Cancelar</button>
        </div>
    </form>
    )
}