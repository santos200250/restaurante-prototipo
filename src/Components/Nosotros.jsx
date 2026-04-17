import React from 'react';

export default function Nosotros() {
  const horarios = [
    { dia: "Lunes a Jueves", horas: "12:00 PM - 10:00 PM" },
    { dia: "Viernes y Sábado", horas: "12:00 PM - 11:30 PM" },
    { dia: "Domingo", horas: "12:00 PM - 9:00 PM" }
  ];

  return (
    <div className="bg-white min-h-screen font-sans">
      
      {/* 1. HERO SECTION DE LA HISTORIA */}
      <section className="relative h-[40vh] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1920&auto=format&fit=crop')" }}
        >
          <div className="absolute inset-0 bg-zinc-900 bg-opacity-70"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Nuestra Historia</h1>
          <div className="h-1 w-20 bg-red-600 mx-auto rounded"></div>
        </div>
      </section>

      {/* 2. TEXTO DE LA HISTORIA */}
      <section className="py-16 px-4 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#2A2A35] mb-6">Tradición en cada detalle</h2>
        <p className="text-lg text-[#6C6C75] leading-relaxed mb-6">
          Fundado en el corazón de Cusco, <strong>Sabores del Perú</strong> nació del sueño de rescatar las recetas culinarias de nuestras abuelas y llevarlas a un nivel contemporáneo. Empezamos con un pequeño local de 5 mesas y, gracias a la pasión por nuestros ingredientes locales y el apoyo de nuestros comensales, hemos crecido hasta convertirnos en un referente de la gastronomía de la región.
        </p>
        <p className="text-lg text-[#6C6C75] leading-relaxed">
          Hoy, nuestro equipo de chefs trabaja diariamente con agricultores locales para asegurar que cada plato que llega a tu mesa cuente una historia de frescura, tradición y amor por el Perú.
        </p>
      </section>

      {/* 3. GALERÍA DEL LOCAL */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2A2A35]">Conoce Nuestro Espacio</h2>
            <p className="text-[#6C6C75] mt-3">Un ambiente diseñado para tu comodidad y disfrute.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600" alt="Interior restaurante" className="w-full h-64 object-cover rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300" />
            <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=600" alt="Detalle mesa" className="w-full h-64 object-cover rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300" />
            <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600" alt="Cocina restaurante" className="w-full h-64 object-cover rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300" />
          </div>
        </div>
      </section>

      {/* 4. HORARIOS */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-2/5 bg-zinc-900 p-8 flex flex-col justify-center items-center text-center">
            <svg className="w-16 h-16 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <h3 className="text-2xl font-bold text-white mb-2">Horarios de Atención</h3>
            <p className="text-gray-400 text-sm">Te esperamos con las puertas abiertas.</p>
          </div>
          <div className="md:w-3/5 p-8 flex flex-col justify-center">
            <ul className="space-y-4">
              {horarios.map((item, index) => (
                <li key={index} className="flex justify-between items-center border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                  <span className="font-bold text-[#2A2A35]">{item.dia}</span>
                  <span className="text-red-600 font-medium bg-red-50 px-3 py-1 rounded-full text-sm">{item.horas}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
}