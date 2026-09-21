import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'

const AuthLayout = ({ children, protectedRoute = false }) => {
	const { user } = useAuth()
	if (protectedRoute && !user) return <Navigate to="/Login" replace />
	return (
		<div className="container-fluid p-0 am-auth">
			{children}
		</div>
	)
}

export default AuthLayout