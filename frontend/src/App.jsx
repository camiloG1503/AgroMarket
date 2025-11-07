import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/auth/Login'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />} />
    </Routes>
  )
}

export default App