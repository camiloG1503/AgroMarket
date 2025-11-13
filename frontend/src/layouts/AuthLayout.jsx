import React from 'react'

const AuthLayout = ({ children }) => {
	return (
		<div className="container-fluid p-0 am-auth">
			{children}
		</div>
	)
}

export default AuthLayout