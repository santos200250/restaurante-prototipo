import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importante para que funcionen las rutas


export default function Navegacion() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <nav className="bg-zinc-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center cursor-pointer">
            <span className="font-bold text-2xl tracking-wider uppercase text-red-500">
              Sabores<span className="text-white">DelPerú</span>
            </span>
          </Link>

          {/* Enlaces (Escritorio) - Deben coincidir con los path de App.js */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="hover:text-red-500 transition-colors px-3 py-2 text-sm font-medium">Inicio</Link>
            <Link to="/menu" className="hover:text-red-500 transition-colors px-3 py-2 text-sm font-medium">Menú</Link>
            <Link to="/nosotros" className="hover:text-red-500 transition-colors px-3 py-2 text-sm font-medium">Nosotros</Link>
            <Link to="/reserva" className="hover:text-red-500 transition-colors px-3 py-2 text-sm font-medium">Reservar Mesa</Link>
            <Link to="/contactos" className="hover:text-red-500 transition-colors px-3 py-2 text-sm font-medium">Contacto</Link>
            
            <Link 
              to="/login" 
              className="ml-4 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg text-sm font-bold transition-colors shadow-md"
            >
              Iniciar Sesión
            </Link>
          </div>

          {/* Botón Móvil */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMenuAbierto(!menuAbierto)} className="text-gray-300 hover:text-white">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuAbierto ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil */}
      {menuAbierto && (
        <div className="md:hidden bg-zinc-800 border-t border-zinc-700">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link to="/" onClick={() => setMenuAbierto(false)} className="block px-3 py-3 rounded-md text-base font-medium hover:bg-zinc-700">Inicio</Link>
            <Link to="/menu" onClick={() => setMenuAbierto(false)} className="block px-3 py-3 rounded-md text-base font-medium hover:bg-zinc-700">Menú</Link>
            <Link to="/reserva" onClick={() => setMenuAbierto(false)} className="block px-3 py-3 rounded-md text-base font-medium hover:bg-zinc-700">Reservar Mesa</Link>
            <Link to="/nosotros" onClick={() => setMenuAbierto(false)} className="block px-3 py-3 rounded-md text-base font-medium hover:bg-zinc-700">Nosotros</Link>
            <Link to="/contactos" onClick={() => setMenuAbierto(false)} className="block px-3 py-3 rounded-md text-base font-medium hover:bg-zinc-700">Contacto</Link>
            <Link to="/login" onClick={() => setMenuAbierto(false)} className="block mt-4 text-center px-3 py-3 rounded-md text-base font-bold bg-red-600 text-white">Iniciar Sesión</Link>
          </div>
        </div>
      )}
    </nav>
  );
}