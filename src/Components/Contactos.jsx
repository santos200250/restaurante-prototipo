import React, { useState } from 'react';

export default function Contactos() {
  const [formData, setFormData] = useState({ nombre: '', email: '', asunto: '', mensaje: '' });
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí irá la lógica para enviar el correo (ej. usando EmailJS o tu propia API)
    console.log("Mensaje a enviar:", formData);
    
    // Simulamos el envío exitoso
    setEnviado(true);
    setFormData({ nombre: '', email: '', asunto: '', mensaje: '' }); // Limpiamos el formulario
    
    setTimeout(() => {
      setEnviado(false);
    }, 4000);
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen font-sans pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#2A2A35] mb-4">Ponte en Contacto</h2>
          <div className="h-1 w-20 bg-red-600 mx-auto rounded"></div>
          <p className="text-[#6C6C75] mt-6 max-w-2xl mx-auto text-lg">
            ¿Tienes alguna consulta especial, quieres organizar un evento o simplemente dejarnos tus comentarios? Estamos aquí para escucharte.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Lado Izquierdo: Formulario */}
          <div className="lg:w-1/2 bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-[#2A2A35] mb-6">Envíanos un mensaje</h3>
            
            {enviado ? (
              <div className="bg-[#E8F8EB] border border-[#68C06C] rounded-2xl p-8 text-center h-full flex flex-col justify-center items-center">
                <svg className="w-16 h-16 text-[#68C06C] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <h4 className="text-xl font-bold text-[#2A2A35] mb-2">¡Mensaje Enviado!</h4>
                <p className="text-[#6C6C75]">Gracias por escribirnos. Nos pondremos en contacto contigo lo más pronto posible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[12px] font-bold text-[#2A2A35] uppercase tracking-wide mb-1">Nombre</label>
                    <input type="text" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none text-[#2A2A35]" placeholder="Tu nombre" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-[#2A2A35] uppercase tracking-wide mb-1">Email</label>
                    <input type="email" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none text-[#2A2A35]" placeholder="tu@email.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#2A2A35] uppercase tracking-wide mb-1">Asunto</label>
                  <input type="text" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none text-[#2A2A35]" placeholder="¿En qué podemos ayudarte?" value={formData.asunto} onChange={e => setFormData({...formData, asunto: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#2A2A35] uppercase tracking-wide mb-1">Mensaje</label>
                  <textarea required rows="4" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none text-[#2A2A35] resize-none" placeholder="Escribe tu mensaje aquí..." value={formData.mensaje} onChange={e => setFormData({...formData, mensaje: e.target.value})}></textarea>
                </div>
                <button type="submit" className="w-full bg-red-600 text-white font-bold py-4 rounded-xl hover:bg-red-700 transition-all shadow-md">
                  Enviar Mensaje
                </button>
              </form>
            )}
          </div>

          {/* Lado Derecho: Información y Mapa */}
          <div className="lg:w-1/2 flex flex-col space-y-8">
            
            {/* Tarjetas de Información */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start space-x-4">
                <div className="bg-red-50 p-3 rounded-full text-red-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-[#2A2A35]">Ubicación</h4>
                  <p className="text-sm text-[#6C6C75] mt-1">Jr. Infancia<br/>Cusco, Perú</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start space-x-4">
                <div className="bg-red-50 p-3 rounded-full text-red-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-[#2A2A35]">Llámanos</h4>
                  <p className="text-sm text-[#6C6C75] mt-1">(+51) 999 888 777<br/>Reservas y delivery</p>
                </div>
              </div>
            </div>

            {/* Mapa de Google */}
            <div className="bg-white p-2 rounded-3xl shadow-md border border-gray-100 flex-grow h-64 lg:h-auto overflow-hidden relative">
              {/* Aquí insertas el iframe real de Google Maps. Este es uno de ejemplo centrado en Cusco */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.6309146576786!662!2d-71.98606401660155!3d-13.528148900000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x916dd5d826598431%3A0x2aa996cc2318315d!2sPlaza%20de%20Armas%20del%20Cusco!5e0!3m2!1ses-419!2spe!4v1700000000000!5m2!1ses-419!2spe" 
                className="absolute inset-0 w-full h-full rounded-2xl"
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de Ubicación"
              ></iframe>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}