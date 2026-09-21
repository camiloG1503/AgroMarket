import React from 'react'
import { Link } from 'react-router-dom'
import LoginForm from '../../components/auth/LoginForm'
import AuthLayout from '../../layouts/AuthLayout'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../styles/auth/auth-pages.css'
import { login } from '../../services/auth.js'
import { useAuth } from '../../contexts/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Login() {
    const { setSession } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const handleSubmit = async ({ email, password }) => {
        try {
            setError('')
            const data = await login(email, password)
            setSession(data)
            navigate(data.user?.rol === 'admin' ? '/dashboard' : '/profile')
        } catch (requestError) {
            setError(requestError.message)
        }
    }
    return (
        <AuthLayout>
            <header className="am-auth-header d-flex align-items-center">
                <div className="container d-flex align-items-center justify-content-between">
                    <div className="am-auth-brand">AgroMarket</div>
                    <div className="d-flex align-items-center gap-3">
                        <nav className="d-none d-sm-flex align-items-center gap-3 me-2">
                            <Link to="/" className="am-auth-link">Home</Link>
                            <Link to="/Productos" className="am-auth-link">Productos</Link>
                        </nav>
                        <div className="d-flex align-items-center gap-2">
                            <Link to="/Login" className="btn btn-outline-secondary btn-sm">Iniciar Sesión</Link>
                            <Link to="/Register" className="btn btn-success btn-sm">Registrarse</Link>
                        </div>
                    </div>
                </div>
            </header>
            <div className="auth-card">
                <div className="row g-0">
                    <div className="col-12 col-md-6 auth-left-wrapper">
                        <div style={{ width: '100%', maxWidth: 480 }}>
                            <LoginForm onSubmit={handleSubmit} />
                            {error && <div className="alert alert-danger mt-3" role="alert">{error}</div>}

                            <div className="text-center mt-3">
                                <Link to="/">Ir a Home</Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 d-none d-md-block auth-right-column" aria-hidden="true">
                        <div className="auth-right-content" />
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}

export default Login