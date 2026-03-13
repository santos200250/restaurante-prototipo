import React, { useState } from 'react';

export default function Configuracion() {
  const [info, setInfo] = useState({
    nombre: 'Mi Restaurante',
    direccion: '',
    telefono: '',
    email: '',
  });

  const [ajustesReserva, setAjustesReserva] = useState({
    duracion: 90,
    antelacion: 1,
    maxPersonas: 50,
  });

  const [preferencias, setPreferencias] = useState({
    idioma: 'es',
    zonaHoraria: 'GMT-5',
  });

  return (
    <div className="p-6 min-h-screen" style={{ backgroundColor: '#FFF1E6' }}>

      <h2 className="text-3xl font-bold mb-6 text-zinc-800"> Configuración General</h2>

      {/* INFO básica */}
      <section className="bg-white p-5 rounded shadow mb-6">
        <h3 className="text-xl font-semibold mb-4 text-emerald-700"> Información del Restaurante</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <input className="border px-3 py-2 rounded" placeholder="Nombre" value={info.nombre} onChange={e => setInfo({ ...info, nombre: e.target.value })} />
          <input className="border px-3 py-2 rounded" placeholder="Dirección" value={info.direccion} onChange={e => setInfo({ ...info, direccion: e.target.value })} />
          <input className="border px-3 py-2 rounded" placeholder="Teléfono" value={info.telefono} onChange={e => setInfo({ ...info, telefono: e.target.value })} />
          <input className="border px-3 py-2 rounded" placeholder="Correo electrónico" value={info.email} onChange={e => setInfo({ ...info, email: e.target.value })} />
        </div>
      </section>

     
       
      

      {/* PREFERENCIAS */}
      <section className="bg-white p-5 rounded shadow mb-6">
        <h3 className="text-xl font-semibold mb-4 text-blue-700"> Preferencias del Sistema</h3>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <label className="w-full md:w-1/3 text-sm font-medium"> Idioma del sistema</label>
            <select
              className="border px-3 py-2 rounded w-full md:w-2/3"
              value={preferencias.idioma}
              onChange={e => setPreferencias({ ...preferencias, idioma: e.target.value })}
            >
              <option value="es">Español</option>
              <option value="en">Inglés</option>
            </select>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <label className="w-full md:w-1/3 text-sm font-medium"> Zona horaria</label>
            <select
              className="border px-3 py-2 rounded w-full md:w-2/3"
              value={preferencias.zonaHoraria}
              onChange={e => setPreferencias({ ...preferencias, zonaHoraria: e.target.value })}
            >
              <option value="GMT-5">Perú (GMT-5)</option>
              <option value="GMT-6">México (GMT-6)</option>
              <option value="GMT-3">Argentina (GMT-3)</option>
            </select>
          </div>
        </div>
      </section>

      
      <div className="flex justify-end gap-3">
        <button className="btn-cancelar">Cancelar</button>
        <button className="btn-guardar">Guardar Cambios</button>
      </div>
    </div>
  );
}
