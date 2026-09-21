import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("agromarket_user") || "null");
    } catch {
      return null;
    }
  });

  const value = useMemo(() => ({
    user,
    setSession: ({ token, user: nextUser }) => {
      localStorage.setItem("agromarket_token", token);
      localStorage.setItem("agromarket_user", JSON.stringify(nextUser));
      localStorage.setItem("user", JSON.stringify({
        profile: {
          firstName: nextUser.nombre,
          lastName: nextUser.apellido || "",
          email: nextUser.correo,
          role: nextUser.rol,
        },
      }));
      setUser(nextUser);
    },
    logout: () => {
      localStorage.removeItem("agromarket_token");
      localStorage.removeItem("agromarket_user");
      localStorage.removeItem("user");
      setUser(null);
    },
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
}