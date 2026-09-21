import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import StatsCard from '../../components/dashboard/StatsCard'
import '../../styles/dashboard/dashboard-pages.css'
import DashboardSidebar from '../../components/dashboard/layout/Sidebar'
import HeaderIcons from '../../components/common/HeaderIcons'
import { FaEdit, FaTrashAlt, FaExternalLinkAlt, FaStar } from 'react-icons/fa'
import { getAdminDashboard } from '../../services/shop.js'
import AddManufacturerModal from '../../components/dashboard/AddManufacturerModal'

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false)
  const [stats, setStats] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    getAdminDashboard().then(setStats).catch((e) => setError(e.message))
    function scrollToHash() {
      const hash = window.location.hash.replace('#', '')
      if (!hash) return
      const el = document.getElementById(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    // scroll on first mount if there's a hash
    scrollToHash()

    window.addEventListener('hashchange', scrollToHash)
    return () => window.removeEventListener('hashchange', scrollToHash)
  }, [])

  function handleOpenModal() { setShowModal(true) }
  function handleCloseModal() { setShowModal(false) }
  function handleSubmitManufacturer() {
    setShowModal(false)
    setError('La creación de fabricantes requiere definir los campos del contrato de marca.')
  }
  return (
    <div style={{ display: 'flex', gap: 20, padding: 20 }}>
      <DashboardSidebar />
      <main style={{ flex: 1 }}>
        <div className="profile-header d-flex justify-content-between align-items-center mb-3">
          <div>
            <h4 className="mb-0">Bienvenido, Camilo</h4>
            <small className="text-muted">Viernes, 25 diciembre 2025</small>
          </div>
          <div className="d-flex align-items-center gap-2">
            <HeaderIcons />
          </div>
        </div>

        <div style={{ marginTop: 12, marginBottom: 18 }}>
          <div className="am-dashboard-tabs mb-4">
            <NavLink to="/dashboard" className={({isActive}) => 'am-tab' + (isActive ? ' active' : '')}>Inicio</NavLink>
            <NavLink to="/dashboard/productos" className={({isActive}) => 'am-tab' + (isActive ? ' active' : '')}>Productos</NavLink>
            <NavLink to="/dashboard/ordenes" className={({isActive}) => 'am-tab' + (isActive ? ' active' : '')}>Ordenes</NavLink>
            <NavLink to="/dashboard/usuarios" className={({isActive}) => 'am-tab' + (isActive ? ' active' : '')}>Usuarios</NavLink>
          </div>
        </div>

        {error && <div className="alert alert-info" role="status">{error}</div>}
        <section id="inicio">
          <div className="row g-4 mb-4">
          <div className="col-12 col-md-6 col-lg-6">
            <StatsCard title="Total Vendido" value={`$${Number(stats?.totalVentas?.total_ventas || 0).toLocaleString('es-CO')}`} highlighted />
          </div>
          <div className="col-12 col-md-6 col-lg-6">
            <StatsCard title="Productos Disponibles" value={stats?.topProductos?.length ?? 0} />
          </div>
          <div className="col-12 col-md-6 col-lg-6">
            <StatsCard title="Usuarios Registrados" value={stats?.totalUsuarios?.total ?? 0} />
          </div>
          <div className="col-12 col-md-6 col-lg-6">
            <StatsCard title="Ordenes Pendientes" value={stats?.pedidosEstado?.find((item) => item.estado === 'pendiente')?.cantidad ?? 0} />
          </div>
          </div>
        </section>

        <section id="productos" style={{ marginBottom: 24 }}>
          {/* Placeholder para sección Productos */}
        </section>

        <section id="ordenes" style={{ marginBottom: 24 }}>
          {/* Placeholder para sección Ordenes */}
        </section>

        <section id="usuarios" style={{ marginBottom: 24 }}>
          {/* Placeholder para sección Usuarios */}
        </section>

        <div className="am-manufacturers card p-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>Fabricantes</h5>
            <button onClick={handleOpenModal} className="btn btn-success btn-sm">Agregar Fabricante +</button>
            <AddManufacturerModal show={showModal} onClose={handleCloseModal} onSubmit={handleSubmitManufacturer} />
          </div>

          <table className="table table-borderless">
            <thead>
              <tr>
                <th>Fabricante</th>
                <th>Calificación</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="d-flex align-items-center">
                  <div className="manufacturer-avatar" />
                  <div style={{ marginLeft: 12 }}>
                    <div className="fw-bold">STIHL</div>
                    <small className="text-muted">Colombia</small>
                  </div>
                </td>
                <td><FaStar style={{ color: '#f3b21a', marginRight: 6 }} /> 4.9</td>
                <td className="action-icons"><FaEdit style={{ marginRight: 10 }} /> <FaTrashAlt /></td>
              </tr>
              <tr>
                <td className="d-flex align-items-center">
                  <div className="manufacturer-avatar" />
                  <div style={{ marginLeft: 12 }}>
                    <div className="fw-bold">Endurex</div>
                    <small className="text-muted">Mexico</small>
                  </div>
                </td>
                <td><FaStar style={{ color: '#f3b21a', marginRight: 6 }} /> 4.9</td>
                <td className="action-icons"><FaEdit style={{ marginRight: 10 }} /> <FaTrashAlt /></td>
              </tr>
            </tbody>
          </table>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="text-success small">1 - 13 Páginas</div>
            <div className="pagination-controls">
              <button className="btn btn-light btn-sm">‹</button>
              <button className="btn btn-light btn-sm" style={{ marginLeft: 8 }}>›</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
