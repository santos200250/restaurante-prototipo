import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Inicio() {
  const navigate = useNavigate();
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [personas, setPersonas] = useState('2 Personas');

  const handleBuscarMesa = () => {
    navigate('/reserva');
  };

  // Datos para los Platos Destacados
  const platosDestacados = [
    { id: 1, nombre: 'Ceviche Clásico', descripcion: 'Pesca del día con limón sutil, ají limo y cebolla.', imagen: '/img/cebiche.webp', precio: 'S/ 38' },
    { id: 2, nombre: 'Lomo Saltado', descripcion: 'Trozos de lomo fino flameados al wok con verduras.', imagen: '/img/pachamanca.webp', precio: 'S/ 45' },
    { id: 3, nombre: 'Causa Limeña', descripcion: 'Puré de papa amarilla con ají, rellena de pollo o atún.', imagen: '/img/limeña.webp', precio: 'S/ 25' }
  ];

  return (
    <div className="min-h-screen font-sans bg-gray-50 ">
      
      {/* 1. HERO SECTION (Portada) */}
      <section className="relative h-[80vh] flex flex-col justify-center items-center text-center">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1920&auto=format&fit=crop')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>

        <div className="relative z-10 px-4 max-w-4xl mx-auto w-full mt-10">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            El auténtico sabor <br className="hidden md:block"/> de nuestra tradición
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10">
            Descubre la pasión de la alta cocina peruana. Ingredientes frescos, recetas milenarias y una experiencia inolvidable.
          </p>

          {/* Barra de Reserva Rápida */}
          <div className="bg-white p-3 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-3 max-w-3xl mx-auto border border-gray-100">
            <input 
              type="date" 
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="border-gray-200 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none w-full text-gray-700" 
            />
            <input 
              type="time" 
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              className="border-gray-200 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none w-full text-gray-700" 
            />
            <select 
              value={personas}
              onChange={(e) => setPersonas(e.target.value)}
              className="border-gray-200 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none w-full text-gray-700"
            >
              <option>2 Personas</option>
              <option>3 Personas</option>
              <option>4 Personas</option>
              <option>5+ Personas</option>
            </select>
            
            <button 
              onClick={handleBuscarMesa}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-xl transition duration-300 w-full md:w-auto whitespace-nowrap shadow-md"
            >
              Buscar Mesa
            </button>
          </div>
        </div>
      </section>

      {/* 2. NUESTRAS ESPECIALIDADES */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#2A2A35] mb-4">Nuestras Especialidades</h2>
          <div className="h-1 w-20 bg-red-600 mx-auto rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {platosDestacados.map(plato => (
            <div key={plato.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="h-64 overflow-hidden relative">
                <img src={plato.imagen} alt={plato.nombre} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-1.5 rounded-xl font-black text-red-600 shadow-sm">
                  {plato.precio}
                </div>
              </div>
              <div className="p-8 text-center flex flex-col items-center">
                <h3 className="text-xl font-bold text-[#2A2A35] mb-3">{plato.nombre}</h3>
                <p className="text-[#6C6C75] text-sm mb-6 flex-grow">{plato.descripcion}</p>
                <Link to="/menu" className="inline-block border-2 border-gray-200 text-[#2A2A35] hover:border-red-600 hover:text-red-600 font-bold py-2.5 px-8 rounded-xl transition-colors">
                  Ver Menú Completo
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SOBRE NOSOTROS */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 rounded-3xl overflow-hidden shadow-2xl relative">
            <img src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800" alt="Experiencia en restaurante" className="w-full h-auto object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2A2A35] mb-6 leading-tight">
              Más que comida, <br/><span className="text-red-600">una experiencia.</span>
            </h2>
            <p className="text-[17px] text-[#6C6C75] mb-6 leading-relaxed">
              Fundado con la visión de llevar la gastronomía local al siguiente nivel. En <strong className="text-[#2A2A35]">Sabores del Perú</strong> no solo servimos platos, contamos historias a través de nuestros ingredientes.
            </p>
            <p className="text-[17px] text-[#6C6C75] mb-10 leading-relaxed">
              Nuestro compromiso es brindarte un ambiente acogedor, atención de primera y un viaje culinario que querrás repetir.
            </p>
            <Link to="/nosotros" className="inline-block bg-[#1A1A1A] hover:bg-black text-white font-bold py-4 px-10 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              Conoce Nuestra Historia
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}