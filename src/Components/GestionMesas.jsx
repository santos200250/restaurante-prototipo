import React, { useState } from 'react';

export default function GestionMesas() {
  const [mesas, setMesas] = useState([
    { numero: 1, cliente: '', tiempo: '', fecha: '', estado: 'Disponible' },
    { numero: 2, cliente: 'Luis', tiempo: '12:30', fecha: '2025-07-02', estado: 'Ocupado' },
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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
     
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-zinc-800">Gestión de Mesas</h2>
        <button
          className="btn-guardar"
          onClick={() => {
            setFormData({ cliente: '', estado: 'Disponible', tiempo: '', fecha: '' });
            setEditarMesa('nueva');
            setMostrarAgregar(true);
          }}
        >
          ➕ Agregar Mesa
        </button>
      </div>

     
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-zinc-900 text-white">
            <tr>
              <th className="p-3"># Mesa</th>
              <th className="p-3">Cliente</th>
              <th className="p-3">Hora</th>
              <th className="p-3">Fecha</th>
              <th className="p-3">Estado</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mesas.map((mesa) => (
              <tr key={mesa.numero} className="border-b hover:bg-gray-50">
                <td className="p-3 font-semibold text-zinc-700">{mesa.numero}</td>
                <td className="p-3">{mesa.cliente || '-'}</td>
                <td className="p-3">{mesa.tiempo || '-'}</td>
                <td className="p-3">{mesa.fecha || '-'}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-white font-medium ${
                    mesa.estado === 'Ocupado' ? 'bg-red-500' :
                    mesa.estado === 'Reservada' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}>
                    {mesa.estado}
                  </span>
                </td>
                <td className="p-3 space-x-2">
                  <button
                    className="btn-cancelar"
                    onClick={() => abrirModal(mesa)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-guardar"
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

      
      {(editarMesa !== null || mostrarAgregar) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {editarMesa === 'nueva' ? 'Agregar Nueva Mesa' : `Editar Mesa #${editarMesa}`}
            </h3>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Nombre del cliente"
                className="w-full border px-3 py-2 rounded"
                value={formData.cliente}
                onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
              />
              <input
                type="time"
                className="w-full border px-3 py-2 rounded"
                value={formData.tiempo}
                onChange={(e) => setFormData({ ...formData, tiempo: e.target.value })}
              />
              <input
                type="date"
                className="w-full border px-3 py-2 rounded"
                value={formData.fecha}
                onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
              />
              <select
                className="w-full border px-3 py-2 rounded"
                value={formData.estado}
                onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
              >
                <option value="Disponible">Disponible</option>
                <option value="Ocupado">Ocupado</option>
                <option value="Reservada">Reservada</option>
              </select>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                className="btn-cancelar"
                onClick={cerrarModal}
              >
                Cancelar
              </button>
              <button
                className="btn-guardar"
                onClick={guardarCambios}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
