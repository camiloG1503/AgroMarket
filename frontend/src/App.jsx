import { Routes, Route } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Footer from './components/common/Footer'
import './components/shared/product-card.css'
import 'bootstrap/dist/css/bootstrap.min.css';

// Páginas públicas
import Home from './pages/home/Home'
import ProductCategory from './pages/productos/ProductCategory'
import ProductoDetail from './pages/producto/[id]/ProductoDetail'

// Auth
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'

// Perfil / Usuario
import Profile from './pages/profile/Profile'
import Favorites from './pages/profile/Favorites'
import Purchases from './pages/profile/Purchases'
import ShoppingCart from './pages/profile/ShoppingCart'
import PersonalData from './pages/profile/PersonalData'

// Dashboard
import Dashboard from './pages/dashboard/Dashboard'
import Ordenes from './pages/dashboard/Ordenes'
import Users from './pages/dashboard/Users'

// Checkout
import Cart from './pages/cart/Cart'
import CheckoutPage from './pages/checkout/CheckoutPage'; // Asegúrate de que esta línea esté presente

// Layout / Contextos
import AuthLayout from './layouts/AuthLayout'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './components/context/CartContext'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Navbar />
        <Routes>
          {/* Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<ProductCategory />} />
          {/* detalle producto */}
          <Route path="/producto/:id" element={<ProductoDetail />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Perfil (protegidas) */}
          <Route path="/profile" element={<AuthLayout><Profile /></AuthLayout>} />
          <Route path="/profile/favorites" element={<AuthLayout><Favorites /></AuthLayout>} />
          <Route path="/profile/purchases" element={<AuthLayout><Purchases /></AuthLayout>} />
          <Route path="/profile/cart" element={<AuthLayout><ShoppingCart /></AuthLayout>} />
          <Route path="/profile/data" element={<AuthLayout><PersonalData /></AuthLayout>} />

          {/* Checkout */}
          <Route path="/checkout" element={<AuthLayout><CheckoutPage /></AuthLayout>} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<AuthLayout><Dashboard /></AuthLayout>} />
          <Route path="/dashboard/ordenes" element={<AuthLayout><Ordenes /></AuthLayout>} />
          <Route path="/dashboard/usuarios" element={<AuthLayout><Users /></AuthLayout>} />
        </Routes>
        <Footer />
      </CartProvider>
    </AuthProvider>
  )
}

export default App