import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Importamos los contextos (Platos y Reservas)
import { PlatosContext } from '../context/PlatosContext';
import { ReservasContext } from '../context/ReservasContext';

export default function PanelAdmin() {
  const navigate = useNavigate();
  const [seccionActiva, setSeccionActiva] = useState('reservas'); // Empezamos en reservas para probar

  const [idPlatoEditando, setIdPlatoEditando] = useState(null);
  
  // --- EXTRAEMOS PLATOS DE LA API ---
  const { platos, cargando, agregarPlato, eliminarPlato, editarPlato } = useContext(PlatosContext);
  
  // --- EXTRAEMOS RESERVAS DE LA API ---
  const { reservas, cargandoReservas, agregarReserva, eliminarReserva } = useContext(ReservasContext);

  // --- LÓGICA DE MESAS (Se calcula dinámicamente con la API) ---
  const mesas = Array.from({ length: 15 }, (_, i) => {
    const numeroMesa = (i + 1).toString().padStart(2, '0');
    // Buscamos en MockAPI si esta mesa ya tiene una reserva
    const reservaMesa = reservas.find(r => r.mesa === numeroMesa);
    
    return {
      id: i + 1,
      numero: numeroMesa,
      estado: reservaMesa ? 'ocupada' : 'disponible',
      cliente: reservaMesa ? reservaMesa.cliente : null
    };
  });

  // --- ESTADOS PARA MODALES ---
  const [mostrarModalPlato, setMostrarModalPlato] = useState(false);
  const [nuevoPlato, setNuevoPlato] = useState({ nombre: '', categoria: 'Entradas', precio: '', imagen: '' });
  
  const [mostrarModalReserva, setMostrarModalReserva] = useState(false);
  const [nuevaReserva, setNuevaReserva] = useState({ cliente: '', mesa: '01', personas: '2', fecha: '', hora: '' });

  // --- LÓGICA DE OPERACIONES CRUD (PLATOS) ---
  const handleAbrirNuevoPlato = () => {
    setNuevoPlato({ nombre: '', categoria: 'Entradas', precio: '', imagen: '' });
    setIdPlatoEditando(null); 
    setMostrarModalPlato(true);
  };

  const handleAbrirEditar = (plato) => {
    setNuevoPlato(plato); 
    setIdPlatoEditando(plato.id); 
    setMostrarModalPlato(true);
  };

  const handleGuardarPlato = (e) => {
    e.preventDefault();
    if (idPlatoEditando) {
      editarPlato(idPlatoEditando, { 
        ...nuevoPlato, 
        precio: parseFloat(nuevoPlato.precio) 
      });
    } else {
      const nuevoId = platos.length > 0 ? Math.max(...platos.map(p => Number(p.id))) + 1 : 1;
      agregarPlato({ 
        id: nuevoId.toString(), 
        ...nuevoPlato, 
        precio: parseFloat(nuevoPlato.precio) 
      });
    }
    setNuevoPlato({ nombre: '', categoria: 'Entradas', precio: '', imagen: '' });
    setIdPlatoEditando(null);
    setMostrarModalPlato(false);
  };

  // --- LÓGICA DE RESERVAS Y MESAS ACTUALIZADA ---
  const cancelarReserva = (id) => {
    if(window.confirm('¿Estás seguro de cancelar esta reserva? La mesa quedará libre.')) {
      eliminarReserva(id); // La borramos de MockAPI
    }
  };

  const handleAgregarReserva = (e) => {
    e.preventDefault();
    agregarReserva({ 
      cliente: nuevaReserva.cliente, 
      mesa: nuevaReserva.mesa, 
      personas: nuevaReserva.personas, 
      estado: "Pendiente", // Reservas manuales nacen "Pendientes"
      fecha: nuevaReserva.fecha, 
      hora: nuevaReserva.hora 
    });
    setNuevaReserva({ cliente: '', mesa: '01', personas: '2', fecha: '', hora: '' });
    setMostrarModalReserva(false);
  };

  const toggleMesa = (id) => {
    alert("Para ocupar o liberar mesas, por favor usa el botón de 'Nueva Reserva' o 'Cancelar' en la pestaña de Reservas. Así mantenemos la base de datos sincronizada.");
  };

  // AQUÍ COMIENZA EL return (
  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#1A1A1A] text-white flex flex-col shadow-2xl">
        <div className="p-6 border-b border-zinc-800 text-center">
          <h2 className="text-xl font-black text-white">SABORES <span className="text-red-500">ADMIN</span></h2>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {['inicio', 'platillos', 'reservas', 'mesas'].map((sec) => (
            <button 
              key={sec}
              onClick={() => setSeccionActiva(sec)} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all capitalize ${seccionActiva === sec ? 'bg-red-600 text-white font-bold' : 'text-gray-400 hover:bg-zinc-800'}`}
            >
              {sec === 'inicio' ? 'Dashboard' : sec}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <button onClick={() => navigate('/login')} className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-500 transition-colors">
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* ÁREA DE CONTENIDO */}
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* DASHBOARD */}
        {seccionActiva === 'inicio' && (
          <div className="animate-in fade-in duration-500">
            <h1 className="text-3xl font-bold text-[#2A2A35] mb-8">Resumen General</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <p className="text-gray-500 text-xs font-bold uppercase">Reservas Hoy</p>
                <h3 className="text-3xl font-black text-[#2A2A35]">{reservas.length}</h3>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <p className="text-gray-500 text-xs font-bold uppercase">Platos en Carta</p>
                <h3 className="text-3xl font-black text-[#2A2A35]">{platos.length}</h3>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <p className="text-gray-500 text-xs font-bold uppercase">Mesas Libres</p>
                <h3 className="text-3xl font-black text-green-600">{mesas.filter(m => m.estado === 'disponible').length}</h3>
              </div>
            </div>
          </div>
        )}

        {/* PLATILLOS (CONECTADO A LA API/CONTEXTO) */}
        {seccionActiva === 'platillos' && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-[#2A2A35]">Gestión de Platillos</h1>
                <p className="text-gray-500 mt-1">Datos obtenidos desde MockAPI.</p>
              </div>
              {/* Botón arreglado */}
              <button onClick={handleAbrirNuevoPlato} className="bg-[#2A2A35] text-white px-6 py-3 rounded-xl font-bold hover:bg-black transition-all shadow-md">
                + Nuevo Plato
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden max-h-[600px] overflow-y-auto">
              {cargando ? (
                 <div className="p-10 text-center text-gray-500 font-bold animate-pulse">Cargando platos desde la API...</div>
              ) : (
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-[#6C6C75] text-xs uppercase border-b border-gray-200 sticky top-0">
                    <tr>
                      <th className="px-6 py-4">Foto</th>
                      <th className="px-6 py-4">Nombre del Plato</th>
                      <th className="px-6 py-4">Categoría</th>
                      <th className="px-6 py-4">Precio</th>
                      <th className="px-6 py-4 text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {platos.map(plato => (
                      <tr key={plato.id} className="hover:bg-gray-50 transition-colors">
                        {/* Agregamos la columna de imagen en la tabla */}
                        <td className="px-6 py-4">
                          {plato.imagen ? (
                            <img src={plato.imagen} alt={plato.nombre} className="w-12 h-12 object-cover rounded-lg shadow-sm" />
                          ) : (
                            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-[10px] text-center">Sin foto</div>
                          )}
                        </td>
                        <td className="px-6 py-4 font-bold text-[#2A2A35]">{plato.nombre}</td>
                        <td className="px-6 py-4"><span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">{plato.categoria}</span></td>
                        <td className="px-6 py-4 font-black text-red-600">S/ {Number(plato.precio).toFixed(2)}</td>
                        <td className="px-6 py-4 text-center space-x-4">
                          {/* Botón Editar con su onClick asignado */}
                          <button onClick={() => handleAbrirEditar(plato)} className="text-blue-600 hover:text-blue-800 font-bold transition-colors">Editar</button>
                          <button onClick={() => { if(window.confirm('¿Eliminar platillo?')) eliminarPlato(plato.id) }} className="text-red-500 hover:text-red-700 font-bold transition-colors">Eliminar</button>
                        </td>
                      </tr>
                    ))}
                    {platos.length === 0 && (
                      <tr><td colSpan="5" className="px-6 py-10 text-center text-gray-500">No hay platillos en la API.</td></tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* RESERVAS */}
        {seccionActiva === 'reservas' && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-[#2A2A35]">Control de Reservas</h1>
              </div>
              <button onClick={() => setMostrarModalReserva(true)} className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition-all shadow-md">
                + Nueva Reserva
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-[#6C6C75] text-xs uppercase border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4">Cliente / Fecha</th>
                    <th className="px-6 py-4">Mesa</th>
                    <th className="px-6 py-4">Pax</th>
                    <th className="px-6 py-4">Estado</th>
                    <th className="px-6 py-4 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {reservas.map(res => (
                    <tr key={res.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <p className="font-bold text-[#2A2A35]">{res.cliente}</p>
                        <p className="text-xs text-gray-500">{res.fecha} a las {res.hora}</p>
                      </td>
                      <td className="px-6 py-4 font-bold text-[#2A2A35]">#{res.mesa}</td>
                      <td className="px-6 py-4 text-gray-600">{res.personas} pers.</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${res.estado === 'Confirmada' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {res.estado}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center space-x-3">
                        <button className="bg-gray-100 text-[#2A2A35] px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-200">Check-in</button>
                        <button onClick={() => cancelarReserva(res.id)} className="text-red-500 hover:text-red-700 text-xs font-bold">Cancelar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MESAS */}
        {seccionActiva === 'mesas' && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-3xl font-bold text-[#2A2A35] mb-2">Estado del Salón</h1>
            <p className="text-gray-500 mb-8 italic text-sm">Haz clic en una mesa vacía para asignarla, o en una ocupada para liberarla.</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {mesas.map(mesa => (
                <button
                  key={mesa.id}
                  onClick={() => toggleMesa(mesa.id)}
                  className={`h-24 rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${
                    mesa.estado === 'ocupada' 
                      ? 'bg-zinc-800 border-zinc-900 text-white shadow-inner' 
                      : 'bg-white border-gray-200 text-[#2A2A35] hover:border-red-500 hover:shadow-md'
                  }`}
                >
                  <span className="text-lg font-black">Mesa {mesa.numero}</span>
                  {mesa.estado === 'ocupada' ? (
                    <span className="text-[11px] font-medium text-red-400 mt-1 truncate w-full px-2">👤 {mesa.cliente}</span>
                  ) : (
                    <span className="text-[10px] uppercase font-bold tracking-widest mt-1 text-gray-400">○ Libre</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* ================= MODALES ================= */}
      {/* MODAL PLATO (CON IMAGEN) */}
      {mostrarModalPlato && (
        <div className="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in duration-300">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              {/* Título dinámico */}
              <h3 className="text-xl font-bold text-[#2A2A35]">{idPlatoEditando ? 'Editar Platillo' : 'Registrar Nuevo Plato'}</h3>
              <button onClick={() => setMostrarModalPlato(false)} className="text-gray-400 hover:text-gray-600 bg-white rounded-full p-2 shadow-sm">✕</button>
            </div>
            {/* Formulario arreglado apuntando a handleGuardarPlato */}
            <form onSubmit={handleGuardarPlato} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#2A2A35] uppercase mb-1">Nombre</label>
                <input type="text" required className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-red-500 outline-none" value={nuevoPlato.nombre} onChange={e => setNuevoPlato({...nuevoPlato, nombre: e.target.value})} />
              </div>

              {/* Campo para la foto URL */}
              <div>
                <label className="block text-xs font-bold text-[#2A2A35] uppercase mb-1">URL de la Imagen (Link)</label>
                <input 
                  type="url" 
                  placeholder="https://ejemplo.com/foto.jpg"
                  className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-red-500 outline-none" 
                  value={nuevoPlato.imagen} 
                  onChange={e => setNuevoPlato({...nuevoPlato, imagen: e.target.value})} 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2A2A35] uppercase mb-1">Categoría</label>
                  <select className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-red-500 outline-none" value={nuevoPlato.categoria} onChange={e => setNuevoPlato({...nuevoPlato, categoria: e.target.value})}>
                    <option value="Entradas">Entradas</option>
                    <option value="Platos Fuertes">Platos Fuertes</option>
                    <option value="Postres">Postres</option>
                    <option value="Bebidas">Bebidas</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2A2A35] uppercase mb-1">Precio (S/)</label>
                  <input type="number" step="0.01" required className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-red-500 outline-none" value={nuevoPlato.precio} onChange={e => setNuevoPlato({...nuevoPlato, precio: e.target.value})} />
                </div>
              </div>
              <button type="submit" className="w-full bg-[#1A1A1A] text-white font-bold py-3 rounded-xl hover:bg-black mt-4">Guardar Plato</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL RESERVA */}
      {mostrarModalReserva && (
        <div className="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in duration-300">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="text-xl font-bold text-[#2A2A35]">Registro Manual de Reserva</h3>
              <button onClick={() => setMostrarModalReserva(false)} className="text-gray-400 hover:text-gray-600 bg-white rounded-full p-2 shadow-sm">✕</button>
            </div>
            <form onSubmit={handleAgregarReserva} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#2A2A35] uppercase mb-1">Nombre del Cliente</label>
                <input type="text" required className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-red-500 outline-none" placeholder="Ej. Carlos Torres" value={nuevaReserva.cliente} onChange={e => setNuevaReserva({...nuevaReserva, cliente: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2A2A35] uppercase mb-1">Mesa N°</label>
                  <select 
                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-red-500 outline-none" 
                    value={nuevaReserva.mesa} 
                    onChange={e => setNuevaReserva({...nuevaReserva, mesa: e.target.value})}
                  >
                    {/* Agregamos una opción por defecto */}
                    <option value="" disabled>Elige mesa libre...</option>
                    
                    {/* Filtramos para mostrar SOLO las mesas que están disponibles */}
                    {mesas.filter(m => m.estado === 'disponible').map(m => (
                      <option key={m.id} value={m.numero}>Mesa {m.numero}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2A2A35] uppercase mb-1">Personas</label>
                  <input type="number" min="1" max="20" required className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-red-500 outline-none" value={nuevaReserva.personas} onChange={e => setNuevaReserva({...nuevaReserva, personas: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2A2A35] uppercase mb-1">Fecha</label>
                  <input type="date" required className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-red-500 outline-none" value={nuevaReserva.fecha} onChange={e => setNuevaReserva({...nuevaReserva, fecha: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2A2A35] uppercase mb-1">Hora</label>
                  <input type="time" required className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-red-500 outline-none" value={nuevaReserva.hora} onChange={e => setNuevaReserva({...nuevaReserva, hora: e.target.value})} />
                </div>
              </div>
              <button type="submit" className="w-full bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700 mt-4">Confirmar Reserva</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}