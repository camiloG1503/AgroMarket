import React, { useEffect, useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import '../../styles/dashboard/ordenes.css'
import '../../styles/dashboard/dashboard-pages.css'
import DashboardSidebar from '../../components/dashboard/layout/Sidebar'
import HeaderIcons from '../../components/common/HeaderIcons'
import { FaEye, FaCheck, FaTimes } from 'react-icons/fa'
import { changeOrderStatus, getAllOrders } from '../../services/shop.js'

export default function Ordenes() {
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState('Todos')
  const [sortBy, setSortBy] = useState('popular')
  const [orders, setOrders] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { getAllOrders().then(setOrders).catch((e) => setError(e.message)) }, [])

  const filtered = useMemo(() => {
    return orders.filter(o => {
      if (filter !== 'Todos' && o.estado !== filter.toLowerCase().replace('s', '')) return false
      if (q && !(`${o.Usuario?.nombre || ''} ${o.Usuario?.apellido || ''} ${o.total}`.toLowerCase().includes(q.toLowerCase()))) return false
      return true
    })
  }, [orders, q, filter])

  async function updateStatus(id, status) {
    try { const result = await changeOrderStatus(id, status); setOrders((current) => current.map((order) => order.id_pedido === id ? result.order : order)) }
    catch (e) { setError(e.message) }
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
            <NavLink to="/dashboard" className={({isActive}) => 'am-tab' + (isActive ? ' active' : '')}>Datos Personales</NavLink>
            <NavLink to="/dashboard/productos" className={({isActive}) => 'am-tab' + (isActive ? ' active' : '')}>Productos</NavLink>
            <NavLink to="/dashboard/ordenes" className={({isActive}) => 'am-tab' + (isActive ? ' active' : '')}>Ordenes</NavLink>
            <NavLink to="/dashboard/usuarios" className={({isActive}) => 'am-tab' + (isActive ? ' active' : '')}>Usuarios</NavLink>
          </div>
        </div>

        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <section className="ordenes-wrap">
          <div className="ordenes-controls mb-3">
            <div className="ordenes-search">
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar" />
            </div>
            <div className="ordenes-sort">
              <label>Ordenar Por</label>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="popular">Popular</option>
                <option value="recent">Recientes</option>
              </select>
            </div>
          </div>

          <div className="ordenes-filters mb-3">
            {['Todos', 'Pendientes', 'Enviados', 'Rechazados'].map(f => (
              <button key={f} className={`ordenes-pill ${filter===f? 'active':''}`} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>

          <div className="ordenes-table card">
            <div className="ordenes-table-header d-flex">
              <div className="col usuario">Usuario</div>
              <div className="col total">Total</div>
              <div className="col estado">Estado</div>
              <div className="col accion">Acción</div>
            </div>
            <div className="ordenes-table-body">
              {filtered.map(row => (
                <div className="orden-row d-flex align-items-center" key={row.id_pedido}>
                  <div className="col usuario d-flex align-items-center">
                    <div className="avatar" />
                    <div style={{ marginLeft: 10 }}>
                      <div className="fw-bold">{row.Usuario?.nombre} {row.Usuario?.apellido}</div>
                      <small className="text-muted">{row.Usuario?.correo}</small>
                    </div>
                  </div>
                  <div className="col total">${Number(row.total || 0).toLocaleString('es-CO')}</div>
                  <div className="col estado">
                    <span className="badge badge-yellow">{row.estado}</span>
                  </div>
                  <div className="col accion">
                    <button className="icon-btn"><FaEye /></button>
                    <button className="icon-btn" onClick={() => updateStatus(row.id_pedido, 'procesando')}><FaCheck /></button>
                    <button className="icon-btn" onClick={() => updateStatus(row.id_pedido, 'cancelado')}><FaTimes /></button>
                  </div>
                </div>
              ))}
            </div>

            <div className="ordenes-footer d-flex justify-content-between align-items-center mt-3">
              <div className="text-success small">1 - 13 Páginas</div>
              <div className="pagination-controls">
                <button className="btn btn-light btn-sm">‹</button>
                <button className="btn btn-light btn-sm" style={{ marginLeft: 8 }}>›</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
