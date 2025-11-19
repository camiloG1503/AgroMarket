import React, { useState } from 'react'
import '../../styles/dashboard/dashboard-pages.css'

export default function AddManufacturerModal({ show, onClose, onSubmit }) {
  const [photo, setPhoto] = useState(null)
  const [name, setName] = useState('')
  const [nationality, setNationality] = useState('')
  const [description, setDescription] = useState('')

  if (!show) return null

  function handleFile(e) {
    const f = e.target.files && e.target.files[0]
    if (f) setPhoto(URL.createObjectURL(f))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const payload = { name, nationality, description, photo }
    if (onSubmit) onSubmit(payload)
    // reset local state
    setPhoto(null)
    setName('')
    setNationality('')
    setDescription('')
  }

  return (
    <div className="am-modal-overlay" role="dialog" aria-modal="true">
      <div className="am-modal">
        <div className="am-modal-header">
          <h5>Agrega a un nuevo fabricante</h5>
          <button className="am-modal-close" onClick={onClose}>✕</button>
        </div>
        <p className="text-muted small">¡Recuerda agregar una descripción!</p>

        <form onSubmit={handleSubmit}>
          <div className="am-modal-body">
            <div className="am-upload-row">
              <div className="am-upload-preview">
                {photo ? <img src={photo} alt="preview" /> : <div className="am-upload-empty">🖼</div>}
              </div>
              <div>
                <label className="btn btn-light">
                  Agregar foto <input type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
                </label>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label">Nombre</label>
                <input className="form-control" value={name} onChange={e => setName(e.target.value)} placeholder="Ingrese el nombre" />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label">Nacionalidad</label>
                <input className="form-control" value={nationality} onChange={e => setNationality(e.target.value)} placeholder="Ingrese la nacionalidad" />
              </div>
              <div className="col-12">
                <label className="form-label">Descripción</label>
                <textarea className="form-control" rows={5} value={description} onChange={e => setDescription(e.target.value)} placeholder="Ingrese la descripción" />
              </div>
            </div>
          </div>

          <div className="am-modal-footer">
            <button type="submit" className="btn btn-success w-100">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
