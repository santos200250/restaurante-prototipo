import React, { useState } from 'react';

export default function GestionMesas() {
  const [mesas, setMesas] = useState([
    { numero: 1, cliente: '', tiempo: '', fecha: '', estado: 'Disponible' },
    { numero: 2, cliente: 'Luis', tiempo: '12:30', fecha: '2026-07-02', estado: 'Ocupado' },
    { numero: 3, cliente: '', tiempo: '', fecha: '', estado: 'Reservada' },
  ]);

  const [editarMesa, setEditarMesa] = useState(null);
  const [formData, setFormData] = useState({ cliente: '', estado: 'Disponible', tiempo: '', fecha: '' });
  const [mostrarAgregar, setMostrarAgregar] = useState(false);

  const abrirModal = (mesa) => {
    setEditarMesa(mesa.numero);
    setFormData({
      cliente: mesa.cliente,
      estado: mesa.estado,
      tiempo: mesa.tiempo,
      fecha: mesa.fecha,
    });
  };

  const cerrarModal = () => {
    setEditarMesa(null);
    setFormData({ cliente: '', estado: 'Disponible', tiempo: '', fecha: '' });
    setMostrarAgregar(false);
  };

  const guardarCambios = () => {
    setMesas(prev => {
      if (editarMesa === 'nueva') {
        const nuevoNumero = prev.length > 0 ? Math.max(...prev.map(m => m.numero)) + 1 : 1;
        return [...prev, { numero: nuevoNumero, ...formData }];
      } else {
        return prev.map(m =>
          m.numero === editarMesa
            ? { ...m, ...formData }
            : m
        );
      }
    });
    cerrarModal();
  };

  const eliminarMesa = (numero) => {
    if (window.confirm('¿Seguro que deseas eliminar esta mesa?')) {
      setMesas(prev => prev.filter(m => m.numero !== numero));
    }
  };

  // Función para asignar colores a las etiquetas de estado
  const getEstadoBadge = (estado) => {
    switch (estado) {
      case 'Disponible':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Ocupado':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Reservada':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Gestión de Mesas</h2>
          <p className="text-sm text-gray-500 mt-1">Administra el estado y las reservas de las mesas del local.</p>
        </div>
        <button
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-sm"
          onClick={() => {
            setFormData({ cliente: '', estado: 'Disponible', tiempo: '', fecha: '' });
            setEditarMesa('nueva');
            setMostrarAgregar(true);
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          Agregar Mesa
        </button>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase text-xs font-semibold tracking-wider">
              <tr>
                <th className="px-6 py-4"># Mesa</th>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4">Hora</th>
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mesas.map((mesa) => (
                <tr key={mesa.numero} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-700">{mesa.numero}</td>
                  <td className="px-6 py-4 text-gray-600">{mesa.cliente || <span className="text-gray-400 italic">Sin asignar</span>}</td>
                  <td className="px-6 py-4 text-gray-600">{mesa.tiempo || '-'}</td>
                  <td className="px-6 py-4 text-gray-600">{mesa.fecha || '-'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getEstadoBadge(mesa.estado)}`}>
                      {mesa.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex justify-end gap-2">
                    <button
                      className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-md font-medium transition-colors"
                      onClick={() => abrirModal(mesa)}
                    >
                      Editar
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-md font-medium transition-colors"
                      onClick={() => eliminarMesa(mesa.numero)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {(editarMesa !== null || mostrarAgregar) && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md transform transition-all">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              {editarMesa === 'nueva' ? 'Registrar Nueva Mesa' : `Actualizar Mesa #${editarMesa}`}
            </h3>

            <div className="space-y-4 text-sm">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Nombre del Cliente</label>
                <input
                  type="text"
                  placeholder="Ej. Juan Pérez"
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  value={formData.cliente}
                  onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Hora</label>
                  <input
                    type="time"
                    className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    value={formData.tiempo}
                    onChange={(e) => setFormData({ ...formData, tiempo: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Fecha</label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    value={formData.fecha}
                    onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Estado de la Mesa</label>
                <select
                  className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white"
                  value={formData.estado}
                  onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                >
                  <option value="Disponible">🟢 Disponible</option>
                  <option value="Ocupado">🔴 Ocupado</option>
                  <option value="Reservada">🟠 Reservada</option>
                </select>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
                className="px-5 py-2.5 text-gray-700 font-medium bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                onClick={cerrarModal}
              >
                Cancelar
              </button>
              <button
                className="px-5 py-2.5 text-white font-medium bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors"
                onClick={guardarCambios}
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}