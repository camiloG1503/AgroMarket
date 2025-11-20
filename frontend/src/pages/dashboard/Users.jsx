import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import '../../styles/dashboard/users.css'
import DashboardSidebar from '../../components/dashboard/layout/Sidebar'
import HeaderIcons from '../../components/common/HeaderIcons'
import { FaTrashAlt } from 'react-icons/fa'

const USERS = [
  { id: 1, name: 'Camila Torres', role: 'Agricultor', email: 'CamilaT@gmail.com' },
  { id: 2, name: 'Daniela Murillo', role: 'Particular', email: 'DanielaMurillo@gmail.com' },
  { id: 3, name: 'Pablo Mosquera', role: 'Agricultor', email: 'MosqueraP@gmail.com' },
  { id: 4, name: 'Juan Sanchez', role: 'Negocio Agrícola', email: 'JuanS23@gmail.com' },
  { id: 5, name: 'Valentina Murillo', role: 'Particular', email: 'ValentinaM10@gmail.com' },
]

export default function Users() {
  const [q, setQ] = useState('')
  const [tab, setTab] = useState('usuarios')

  const list = USERS.filter(u => !q || u.name.toLowerCase().includes(q.toLowerCase()) || u.email.toLowerCase().includes(q.toLowerCase()))

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
            <NavLink to="/dashboard" className={({ isActive }) => 'am-tab' + (isActive ? ' active' : '')}>Datos Personales</NavLink>
            <NavLink to="/dashboard/productos" className={({ isActive }) => 'am-tab' + (isActive ? ' active' : '')}>Productos</NavLink>
            <NavLink to="/dashboard/ordenes" className={({ isActive }) => 'am-tab' + (isActive ? ' active' : '')}>Ordenes</NavLink>
            <NavLink to="/dashboard/usuarios" className={({ isActive }) => 'am-tab' + (isActive ? ' active' : '')}>Usuarios</NavLink>
          </div>
        </div>

        <section className="users-wrap">
          <div className="users-search mb-3">
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar" />
          </div>

          <div className="users-tabs mb-3">
            <button className={`users-pill ${tab === 'usuarios' ? 'active' : ''}`} onClick={() => setTab('usuarios')}>Usuarios</button>
            <button className={`users-pill ${tab === 'empleados' ? 'active' : ''}`} onClick={() => setTab('empleados')}>Empleados</button>
          </div>

          <div className="users-table card">
            <div className="users-table-header d-flex">
              <div className="col usuario">Usuario</div>
              <div className="col correo">Correo</div>
              <div className="col accion">Acción</div>
            </div>
            <div className="users-table-body">
              {list.map(u => (
                <div key={u.id} className="users-row d-flex align-items-center">
                  <div className="col usuario d-flex align-items-center">
                    <div className="avatar" />
                    <div style={{ marginLeft: 10 }}>
                      <div className="fw-bold">{u.name}</div>
                      <small className="text-muted">{u.role}</small>
                    </div>
                  </div>
                  <div className="col correo">{u.email}</div>
                  <div className="col accion">
                    <button className="icon-btn"><FaTrashAlt /></button>
                  </div>
                </div>
              ))}
            </div>

            <div className="users-footer d-flex justify-content-between align-items-center mt-3">
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
