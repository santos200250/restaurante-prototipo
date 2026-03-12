// src/Components/PanelAdmin.jsx
import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import GestionMesas from './GestionMesas';
import GestionReservas from './GestionReservas';
import MisPlatillos from './MisPlatillos';
import Configuracion from './Configuracion';
import './style.css';

export default function PanelAdmin() {
  return (
    <div className="admin-panel" style={{ display: 'flex' }}>
      
      {/* Barra lateral */}
      <aside className="sidebar">
        <h2 className="sidebar-title">Panel de Administración</h2>
        <nav className="nav-links">
          <Link to="/admin"> Inicio</Link>
          <Link to="/admin/platillos"> Mis Platillos</Link>
          <Link to="/admin/reservas">Reservas</Link>
          <Link to="/admin/mesas">🪑 Mesas</Link>
          <Link to="/admin/configuracion"> Configuración</Link>
          <Link to="/" className="logout"> Cerrar sesión</Link>
        </nav>
      </aside>

   
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h1>Bienvenido</h1>
                <p>Desde este panel puedes gestionar todo lo relacionado con el restaurante.</p>
                <div className="card-container">
                  <div className="admin-card">
                    <h3> Mis Platillos</h3>
                    <p>Agrega, edita o elimina platos del menú.</p>
                  </div>
                  <div className="admin-card">
                    <h3> Reservas</h3>
                    <p>Controla las reservas realizadas por los clientes.</p>
                  </div>
                  <div className="admin-card">
                    <h3> Mesas</h3>
                    <p>Configura la disponibilidad y ubicación de las mesas.</p>
                  </div>
                  <div className="admin-card">
                    <h3> Configuración</h3>
                    <p>Ajustes generales del sistema.</p>
                  </div>
                </div>
              </div>
            }
          />
          <Route path="mesas" element={<GestionMesas />} />
          <Route path="reservas" element={<GestionReservas />} /> 
          <Route path="platillos" element={<MisPlatillos />} /> 
          <Route path="configuracion" element={<Configuracion />} /> 
        </Routes>
      </main>
    </div>
  );
}
