import React, { useState } from 'react';

export default function GestionReservas() {
  const [reservas, setReservas] = useState([
    {
      id: 1,
      fecha: '2026-02-03',
      hora: '19:00',
      cliente: 'Ana López',
      personas: 4,
      mesa: 2,
      estado: 'Pendiente',
      notas: 'Cumpleaños',
    },
  ]);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [reservaEditando, setReservaEditando] = useState(null);
  const [formData, setFormData] = useState({
    fecha: '',
    hora: '',
    cliente: '',
    personas: 1,
    mesa: '',
    estado: 'Pendiente',
    notas: '',
  });

  const abrirModal = (reserva = null) => {
    if (reserva) {
      setReservaEditando(reserva.id);
      setFormData({ ...reserva });
    } else {
      setReservaEditando(null);
      setFormData({
        fecha: '',
        hora: '',
        cliente: '',
        personas: 1,
        mesa: '',
        estado: 'Pendiente',
        notas: '',
      });
    }
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
  };

  const guardarReserva = () => {
    if (reservaEditando !== null) {
      setReservas(prev =>
        prev.map(r => (r.id === reservaEditando ? { ...formData, id: r.id } : r))
      );
    } else {
      setReservas(prev => [...prev, { ...formData, id: Date.now() }]);
    }
    cerrarModal();
  };

  const eliminarReserva = (id) => {
  if (window.confirm("¿Estás seguro de que deseas eliminar esta reserva?")) {
    setReservas(reservas.filter(reserva => reserva.id !== id));
  }
};

  const confirmarReserva = (id) => {
    setReservas(prev => prev.map(r => (r.id === id ? { ...r, estado: 'Confirmada' } : r)));
  };

 

  

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-zinc-800">Gestión de Reservas</h2>
        <button className="btn-guardar" onClick={() => abrirModal()}>➕ Nueva Reserva</button>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-zinc-900 text-white">
            <tr>
              <th className="p-3">Fecha</th>
              <th className="p-3">Hora</th>
              <th className="p-3">Cliente</th>
              <th className="p-3">Personas</th>
              <th className="p-3">Mesa</th>
              <th className="p-3">Estado</th>
              <th className="p-3">Notas</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((r) => (
              <tr key={r.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{r.fecha}</td>
                <td className="p-3">{r.hora}</td>
                <td className="p-3">{r.cliente}</td>
                <td className="p-3">{r.personas}</td>
                <td className="p-3">{r.mesa || '-'}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-white font-medium ${
                    r.estado === 'Pendiente' ? 'bg-yellow-500' :
                    r.estado === 'Confirmada' ? 'bg-blue-600' :
                    r.estado === 'Completada' ? 'bg-green-600' :
                    r.estado === 'Cancelada' ? 'bg-red-600' :
                    'bg-gray-500'
                  }`}>{r.estado}</span>
                </td>
                <td className="p-3">{r.notas || '-'}</td>
                <td className="p-3 space-x-1">
                  <button className="btn-guardar" onClick={() => abrirModal(r)}>Editar</button>
                  {r.estado === 'Pendiente' && (
                    <button className="btn-guardar" onClick={() => confirmarReserva(r.id)}>Confirmar</button>
                  )}
                  {r.estado !== 'Eliminar' && (
                    <button className="btn-cancelar" onClick={() => eliminarReserva(r.id)}>
                   Eliminar
              </button>


                  )}
                  
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalAbierto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">{reservaEditando !== null ? 'Editar Reserva' : 'Nueva Reserva'}</h3>
            <div className="space-y-3">
              <input type="date" className="w-full border px-3 py-2 rounded" value={formData.fecha} onChange={e => setFormData({ ...formData, fecha: e.target.value })} />
              <input type="time" className="w-full border px-3 py-2 rounded" value={formData.hora} onChange={e => setFormData({ ...formData, hora: e.target.value })} />
              <input type="text" placeholder="Cliente" className="w-full border px-3 py-2 rounded" value={formData.cliente} onChange={e => setFormData({ ...formData, cliente: e.target.value })} />
              <input type="number" min={1} placeholder="Número de personas" className="w-full border px-3 py-2 rounded" value={formData.personas} onChange={e => setFormData({ ...formData, personas: parseInt(e.target.value) || 1 })} />
              <input type="text" placeholder="Mesa (opcional)" className="w-full border px-3 py-2 rounded" value={formData.mesa} onChange={e => setFormData({ ...formData, mesa: e.target.value })} />
              <textarea placeholder="Notas (opcional)" className="w-full border px-3 py-2 rounded" value={formData.notas} onChange={e => setFormData({ ...formData, notas: e.target.value })}></textarea>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button className="btn-cancelar" onClick={cerrarModal}>Cancelar</button>
              <button className="btn-guardar" onClick={guardarReserva}>Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
