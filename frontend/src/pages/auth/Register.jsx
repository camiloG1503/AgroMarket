import React from 'react'
import { Link } from 'react-router-dom'
import RegisterForm from '../../components/auth/RegisterForm'
import 'bootstrap/dist/css/bootstrap.min.css'

function Register() {
	return (
		<div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
			<div style={{ maxWidth: 480, width: '100%' }}>
				<RegisterForm />

				<div className="text-center mt-3">
					<Link to="/">Ir a Home</Link>
				</div>
			</div>
		</div>
	)
}

export default Register