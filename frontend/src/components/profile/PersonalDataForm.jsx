import React, { useEffect, useState } from 'react'

export default function PersonalDataForm({ profile = null, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    role: '',
    address: '',
    city: ''
  })

  const [dirty, setDirty] = useState(false)

  useEffect(() => {
    if (profile) {
      setForm({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        phone: profile.phone || '',
        email: profile.email || '',
        role: profile.role || '',
        address: profile.address || '',
        city: profile.city || ''
      })
    } else {
      setForm({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        role: '',
        address: '',
        city: ''
      })
    }
    setDirty(false)
  }, [profile])

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setDirty(true)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (onSubmit) onSubmit(form)
    setDirty(false)
  }

  function handleCancel() {
    if (onCancel) onCancel()
    if (profile) {
      setForm({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        phone: profile.phone || '',
        email: profile.email || '',
        role: profile.role || '',
        address: profile.address || '',
        city: profile.city || ''
      })
    } else {
      setForm({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        role: '',
        address: '',
        city: ''
      })
    }
    setDirty(false)
  }

  return (
    <form onSubmit={handleSubmit} className="profile-forms" style={{ maxWidth: 900 }}>
      <h3 className="mb-3">Información Perfil</h3>
      <div className="row g-3">
        <div className="col-md-4">
          <label className="form-label">Nombre</label>
          <input name="firstName" value={form.firstName} onChange={handleChange} className="form-control" />
        </div>
        <div className="col-md-4">
          <label className="form-label">Apellidos</label>
          <input name="lastName" value={form.lastName} onChange={handleChange} className="form-control" />
        </div>
        <div className="col-md-4">
          <label className="form-label">Teléfono</label>
          <input name="phone" value={form.phone} onChange={handleChange} className="form-control" />
        </div>

        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input name="email" value={form.email} onChange={handleChange} className="form-control" />
        </div>
        <div className="col-md-3">
          <label className="form-label">Rol</label>
          <input name="role" value={form.role} onChange={handleChange} className="form-control" />
        </div>
        <div className="col-md-3">
          <label className="form-label">Ciudad</label>
          <input name="city" value={form.city} onChange={handleChange} className="form-control" />
        </div>

        <div className="col-12">
          <label className="form-label">Dirección</label>
          <input name="address" value={form.address} onChange={handleChange} className="form-control" />
        </div>
      </div>

      <div className="mt-3">
        <button type="submit" disabled={!dirty} className="btn btn-success me-2">Actualizar</button>
        <button type="button" onClick={handleCancel} className="btn btn-outline-secondary">Cancelar</button>
      </div>
    </form>
  )
}