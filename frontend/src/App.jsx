import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import Footer from './components/common/Footer'
import Profile from './pages/profile/Profile'
import AuthLayout from './layouts/AuthLayout'
import Dashboard from './pages/dashboard/Dashboard'
import Ordenes from './pages/dashboard/Ordenes'
import Users from './pages/dashboard/Users'

function App() {
  return (
  <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
      <Route path="/profile" element={<AuthLayout protectedRoute><Profile /></AuthLayout>} />
      <Route path="/dashboard" element={<AuthLayout protectedRoute><Dashboard /></AuthLayout>} />
      <Route path="/dashboard/ordenes" element={<AuthLayout protectedRoute><Ordenes /></AuthLayout>} />
      <Route path="/dashboard/usuarios" element={<AuthLayout protectedRoute><Users /></AuthLayout>} />
    </Routes>
    <Footer />
  </>
  )
}

export default App