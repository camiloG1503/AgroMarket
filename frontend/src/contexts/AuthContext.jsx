import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    // ejemplo carga inicial
    useEffect(() => {
        // fetch perfil si hay token
    }, [])

    const login = async (email, password) => {
        setLoading(true)
        // llamada API...
        setUser({ id: 1, email })
        setLoading(false)
    }

    const logout = () => {
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)