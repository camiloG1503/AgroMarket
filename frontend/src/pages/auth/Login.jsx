import React from 'react'
import { Link } from 'react-router-dom'
import LoginForm from '../../components/auth/LoginForm'
import 'bootstrap/dist/css/bootstrap.min.css'

function Login() {
    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <div style={{ maxWidth: 420, width: '100%' }}>
                <LoginForm />
                
                <div className="text-center mt-3">
                    <Link to="/">Ir a Home</Link>
                </div>
            </div>
        </div>
    )
}

export default Login