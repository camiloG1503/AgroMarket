import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const RegisterForm = ({ onSubmit }) => {
    const [active, setActive] = useState('usuario')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [role, setRole] = useState('')
        const [password, setPassword] = useState('')
        const [confirm, setConfirm] = useState('')
        const [showPassword, setShowPassword] = useState(false)
        const [showConfirm, setShowConfirm] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = (e) => {
    e.preventDefault()
    setError(null)
    if (password !== confirm) return setError('Las contraseñas no coinciden')

    const payload = {
        role: active,
        firstName,
        lastName,
        email,
        phone,
        roleSelection: role || active,
        password,
    }

    if (onSubmit) {
        onSubmit(payload)
    }

    }

    useEffect(() => {
        if (active === 'personal') {
            setRole('personal')
        } else {
            if (role === 'personal') setRole('')
        }
    }, [active])

    return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh', padding: '2rem' }}>
        <div className="card shadow-sm" style={{ width: 420, borderRadius: 12 }}>
        <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex align-items-center">
                <h5 className="mb-0">AgroMarket</h5>
            </div>
            <Link to="/login" className="btn btn-success btn-sm">Iniciar Sesión</Link>
            </div>

            <div className="mb-3">
            <div className="nav nav-pills p-2 rounded d-flex justify-content-between" style={{ background: '#f0f0f0' }}>
                <button
                type="button"
                className={`btn btn-sm d-flex align-items-center ${active === 'usuario' ? 'btn-success text-white' : 'btn-light'}`}
                style={{ borderRadius: 20 }}
                onClick={() => setActive('usuario')}
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill me-2" viewBox="0 0 16 16" aria-hidden>
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3z"/>
                    <path fillRule="evenodd" d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                </svg>
                Usuario
                </button>
                <button
                type="button"
                className={`btn btn-sm d-flex align-items-center ${active === 'personal' ? 'btn-success text-white' : 'btn-light'}`}
                style={{ borderRadius: 20 }}
                onClick={() => setActive('personal')}
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-briefcase-fill me-2" viewBox="0 0 16 16" aria-hidden>
                    <path d="M0 4a2 2 0 0 1 2-2h3.5A1.5 1.5 0 0 1 7 3.5V4h2v-.5A1.5 1.5 0 0 1 10.5 2H14a2 2 0 0 1 2 2v1H0V4z"/>
                    <path d="M0 7v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7H0z"/>
                </svg>
                Personal
                </button>
            </div>
            </div>

            <form onSubmit={handleSubmit}>
            <div className="row g-2 mb-3">
                <div className="col">
                <label className="form-label">Nombre</label>
                <input type="text" className="form-control" placeholder="Ingrese su nombre" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </div>
                <div className="col">
                <label className="form-label">Apellidos</label>
                <input type="text" className="form-control" placeholder="Ingrese sus apellidos" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" placeholder="Ingrese su correo" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="row g-2 mb-3">
                <div className="col-12 col-md-6">
                    <label className="form-label">Telefono</label>
                    <input type="tel" className="form-control" placeholder="Ingrese su telefono" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>

                <div className="col-12 col-md-6">
                    <label className="form-label">Rol</label>
                    {active === 'usuario' ? (
                        <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="">Ingrese su rol</option>
                            <option value="comprador">Comprador</option>
                            <option value="vendedor">Vendedor</option>
                        </select>
                    ) : (
                        <input type="text" className="form-control" value="Personal" disabled />
                    )}
                </div>
            </div>

                        <div className="mb-3">
                            <label className="form-label">Contraseña</label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-control"
                                    placeholder="Ingrese su contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => setShowPassword((s) => !s)}
                                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" aria-hidden>
                                            <g fill="currentColor">
                                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8z" />
                                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z" />
                                            </g>
                                            <path d="M1 1 L15 15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16" aria-hidden>
                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8z"/>
                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"/>
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Confirma Contraseña</label>
                            <div className="input-group">
                                <input
                                    type={showConfirm ? 'text' : 'password'}
                                    className="form-control"
                                    placeholder="Ingrese su contraseña"
                                    value={confirm}
                                    onChange={(e) => setConfirm(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => setShowConfirm((s) => !s)}
                                    aria-label={showConfirm ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                >
                                    {showConfirm ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" aria-hidden>
                                            <g fill="currentColor">
                                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8z" />
                                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z" />
                                            </g>
                                            <path d="M1 1 L15 15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16" aria-hidden>
                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8z"/>
                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"/>
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

            {error && <div className="alert alert-danger" role="alert">{error}</div>}

            <button type="submit" className="btn btn-success w-100">Registrarse</button>
            </form>
        </div>
        </div>
    </div>
    )
}

export default RegisterForm