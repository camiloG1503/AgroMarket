import React from 'react'
import ForgotPasswordForm from '../../components/auth/ForgotPassword'
import 'bootstrap/dist/css/bootstrap.min.css'

function ForgotPassword() {
    return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <div style={{ maxWidth: 480, width: '100%' }}>
        <ForgotPasswordForm />
        </div>
    </div>
    )
}

export default ForgotPassword