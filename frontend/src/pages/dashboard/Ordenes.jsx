import React, { useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import '../../styles/dashboard/ordenes.css'
import '../../styles/dashboard/dashboard-pages.css'
import DashboardSidebar from '../../components/dashboard/layout/Sidebar'
import HeaderIcons from '../../components/common/HeaderIcons'
import { FaEye, FaCheck, FaTimes } from 'react-icons/fa'

const MOCK = [
  { id: 1, user: 'Camila Torres', role: 'Agricultor', total: '$350.000', status: 'Pendiente' },
  { id: 2, user: 'Camila Torres', role: 'Agricultor', total: '$350.000', status: 'Enviado' },
  { id: 3, user: 'Camila Torres', role: 'Agricultor', total: '$350.000', status: 'Enviado' },
  { id: 4, user: 'Camila Torres', role: 'Agricultor', total: '$350.000', status: 'Pendiente' },
  { id: 5, user: 'Camila Torres', role: 'Agricultor', total: '$350.000', status: 'Pendiente' },
  { id: 6, user: 'Camila Torres', role: 'Agricultor', total: '$350.000', status: 'Rechazado' },
]

export default function Ordenes() {
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState('Todos')
  const [sortBy, setSortBy] = useState('popular')

  const filtered = useMemo(() => {
    return MOCK.filter(o => {
      if (filter !== 'Todos' && o.status !== filter) return false
      if (q && !(o.user.toLowerCase().includes(q.toLowerCase()) || o.total.includes(q))) return false
      return true
    })
  }, [q, filter])

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
                <div className="orden-row d-flex align-items-center" key={row.id}>
                  <div className="col usuario d-flex align-items-center">
                    <div className="avatar" />
                    <div style={{ marginLeft: 10 }}>
                      <div className="fw-bold">{row.user}</div>
                      <small className="text-muted">{row.role}</small>
                    </div>
                  </div>
                  <div className="col total">{row.total}</div>
                  <div className="col estado">
                    <span className={`badge ${row.status === 'Pendiente' ? 'badge-yellow' : row.status === 'Enviado' ? 'badge-green' : 'badge-red'}`}>{row.status}</span>
                  </div>
                  <div className="col accion">
                    <button className="icon-btn"><FaEye /></button>
                    <button className="icon-btn"><FaCheck /></button>
                    <button className="icon-btn"><FaTimes /></button>
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
