import React, { useState, useContext } from 'react';
import { ReservasContext } from '../context/ReservasContext';

export default function Reserva() {
  // Extraemos las reservas y la función para agregar de la nube
  const { reservas, agregarReserva } = useContext(ReservasContext);

  
  const mesas = Array.from({ length: 15 }, (_, i) => {
    const numeroMesa = (i + 1).toString().padStart(2, '0');
    // Verificamos si esta mesa ya está en la lista de reservas de MockAPI
    const estaOcupada = reservas.some(r => r.mesa === numeroMesa);
    
    return {
      id: i + 1,
      numero: numeroMesa,
      capacidad: i % 3 === 0 ? 6 : (i % 2 === 0 ? 4 : 2),
      estado: estaOcupada ? 'ocupada' : 'disponible'
    };
  });

  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [estadoReserva, setEstadoReserva] = useState('ingresando_datos');
  const [datosCliente, setDatosCliente] = useState({ nombre: '', email: '', telefono: '' });

  const handleConfirmarReserva = async (e) => {
    e.preventDefault();
    setEstadoReserva('procesando');
    
    // Simulamos el tiempo de pago con tarjeta (2 segundos)
    setTimeout(async () => {
      // Guardamos la reserva en MockAPI
      const fechaHoy = new Date().toISOString().split('T')[0]; // Fecha actual
      
      await agregarReserva({
        cliente: datosCliente.nombre,
        mesa: mesaSeleccionada.numero,
        personas: mesaSeleccionada.capacidad,
        estado: 'Confirmada', // Pasa a confirmada porque pagó adelanto
        fecha: fechaHoy,
        hora: '19:00' // Hora por defecto para el prototipo
      });

      setEstadoReserva('exito');
    }, 2000);
  };

  const cerrarModalYReiniciar = () => {
    setMostrarModal(false);
    setMesaSeleccionada(null);
    setDatosCliente({ nombre: '', email: '', telefono: '' });
    setEstadoReserva('ingresando_datos');
  };

  return (
    <div className="py-12 bg-gray-100 min-h-screen font-sans pt-28">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-[#2A2A35] mb-4">Reserva tu Mesa</h2>
          <div className="h-1 w-20 bg-red-600 mx-auto rounded"></div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col lg:flex-row">
          
          {/* Lado Izquierdo: Plano del Salón */}
          <div className="lg:w-2/3 p-6 sm:p-10 border-r border-gray-200">
            <h2 className="text-2xl font-bold text-[#2A2A35] mb-2">Plano del Salón</h2>
            <p className="text-[#6C6C75] mb-8 italic">Las mesas grises ya han sido reservadas por otros clientes.</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {mesas.map(mesa => (
                <button
                  key={mesa.id}
                  disabled={mesa.estado === 'ocupada'}
                  onClick={() => setMesaSeleccionada(mesa)}
                  className={`h-20 rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-300 ${
                    mesa.estado === 'ocupada' 
                      ? 'bg-gray-100 border-gray-300 cursor-not-allowed opacity-60' 
                      : mesaSeleccionada?.id === mesa.id
                        ? 'bg-red-50 border-red-600 shadow-inner transform scale-95'
                        : 'bg-white border-gray-300 hover:border-[#2A2A35] hover:shadow-md'
                  }`}
                >
                  <span className={`text-sm font-bold ${mesa.estado === 'ocupada' ? 'text-gray-500' : mesaSeleccionada?.id === mesa.id ? 'text-red-600' : 'text-[#2A2A35]'}`}>
                    Mesa {mesa.numero}
                  </span>
                  <span className={`text-[11px] font-medium ${mesaSeleccionada?.id === mesa.id ? 'text-red-400' : 'text-gray-500'}`}>
                    Cap. {mesa.capacidad}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-xs font-bold uppercase tracking-wider text-[#2A2A35]">
              <div className="flex items-center gap-2"><div className="w-4 h-4 bg-white border-2 border-gray-400 rounded"></div> Disponible</div>
              <div className="flex items-center gap-2"><div className="w-4 h-4 bg-gray-300 rounded border border-gray-400"></div> Reservada</div>
              <div className="flex items-center gap-2"><div className="w-4 h-4 bg-red-600 rounded shadow-sm"></div> Tu selección</div>
            </div>
          </div>

          {/* Lado Derecho: Resumen */}
          <div className="lg:w-1/3 p-8 bg-gray-50 flex flex-col border-l border-white">
            <h3 className="text-xl font-bold text-[#2A2A35] mb-6">Resumen de Reserva</h3>
            {mesaSeleccionada ? (
              <div className="space-y-6 flex-grow flex flex-col">
                <div className="space-y-4 flex-grow">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#6C6C75] font-medium">Mesa seleccionada:</span>
                    <span className="font-bold text-[#2A2A35] bg-white px-3 py-1 rounded-lg border border-gray-200">#{mesaSeleccionada.numero}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#6C6C75] font-medium">Capacidad:</span>
                    <span className="font-bold text-[#2A2A35]">{mesaSeleccionada.capacidad} Personas</span>
                  </div>
                  <div className="flex justify-between items-center pt-6 mt-2 border-t border-gray-200">
                    <span className="text-[#6C6C75] font-bold">Adelanto requerido:</span>
                    <span className="font-black text-red-600 text-3xl tracking-tight"><span className="text-red-600 text-xl">S/ </span>20.00</span>
                  </div>
                </div>
                <div className="pt-4 mt-auto">
                  <p className="text-[12px] text-[#6C6C75] mb-4 text-center leading-relaxed">El adelanto será descontado de tu cuenta final en el restaurante.</p>
                  <button onClick={() => setMostrarModal(true)} className="w-full bg-red-600 text-white font-bold py-3.5 rounded-xl hover:bg-red-700 transition-all shadow-lg hover:shadow-red-600/30">
                    Proceder al Pago
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-20 opacity-60">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <p className="text-[#6C6C75] font-medium">Elige una mesa del plano para ver los detalles.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL DE PAGO */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            {estadoReserva === 'ingresando_datos' && (
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-[#2A2A35]">Completa tu Reserva</h3>
                  <button onClick={() => setMostrarModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
                </div>
                <p className="text-[15px] text-[#6C6C75] mb-6">Estás reservando la <span className="font-bold text-[#2A2A35]">Mesa #{mesaSeleccionada?.numero}</span>.</p>
                
                {/* --- FORMULARIO CORREGIDO CON LOS 3 CAMPOS --- */}
                <form onSubmit={handleConfirmarReserva} className="space-y-5">
                  <div>
                    <label className="block text-[12px] font-bold text-[#2A2A35] uppercase mb-1">Nombre Completo</label>
                    <input type="text" required className="w-full px-4 py-2.5 border border-red-500 rounded-lg focus:ring-1 focus:ring-red-500 outline-none text-[#2A2A35]" placeholder="Ej. Juan Pérez" value={datosCliente.nombre} onChange={e => setDatosCliente({...datosCliente, nombre: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-[#2A2A35] uppercase mb-1">Correo Electrónico</label>
                    <input type="email" required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-400 outline-none text-[#2A2A35]" placeholder="correo@ejemplo.com" value={datosCliente.email} onChange={e => setDatosCliente({...datosCliente, email: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-[#2A2A35] uppercase mb-1">Celular / WhatsApp</label>
                    <input type="tel" required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-400 outline-none text-[#2A2A35]" placeholder="999 888 777" value={datosCliente.telefono} onChange={e => setDatosCliente({...datosCliente, telefono: e.target.value})} />
                  </div>

                  <div className="pt-2 mt-4">
                    <button type="submit" className="w-full bg-[#1A1A1A] text-white font-bold py-3 rounded-xl hover:bg-black transition-all flex justify-center items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                      Pagar S/ 20.00
                    </button>
                  </div>
                </form>
                {/* --------------------------------------------- */}

              </div>
            )}
            {estadoReserva === 'procesando' && (
              <div className="p-16 flex flex-col items-center justify-center text-center">
                <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-[#1A1A1A] mb-6"></div>
                <p className="font-bold text-[#2A2A35]">Validando transacción y guardando reserva...</p>
              </div>
            )}
            {estadoReserva === 'exito' && (
              <div className="p-10 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-[#E8F8EB] rounded-full flex items-center justify-center mb-6">
                  <svg className="w-12 h-12 text-[#68C06C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-[26px] font-bold text-[#2A2A35] mb-3">¡Reserva Confirmada!</h3>
                <p className="text-[16px] text-[#6C6C75] mb-8">Gracias, <span className="font-bold text-[#2A2A35]">{datosCliente.nombre}</span>. Tu mesa te espera.</p>
                <button onClick={cerrarModalYReiniciar} className="w-full bg-[#68C06C] text-white font-bold py-3.5 rounded-xl hover:bg-[#58A55B]">Entendido</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}