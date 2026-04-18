import React, { useContext, useState } from 'react';
import { PlatosContext } from '../context/PlatosContext';
import { useNavigate } from 'react-router-dom';
// --- APLICAMOS  REACT.MEMO protege contra re-renderizados innecesarios ---

const PlatoCard = React.memo(({ plato }) => {
  // Inicializamos el navegador para poder cambiar de página
  const navigate = useNavigate(); 

  return (
<div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 group flex flex-col">      {/* Imagen del Plato */}
      <div className="h-56 overflow-hidden relative bg-gray-200">
        {plato.imagen ? (
          <img 
            src={plato.imagen} 
            alt={plato.nombre} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800'; }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-200">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-1.5 rounded-xl font-black text-red-600 shadow-sm">
          S/ {Number(plato.precio).toFixed(2)}
        </div>
      </div>

      {/* Detalles del Plato */}
      <div className="p-6 flex flex-col flex-grow text-center">
        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">{plato.categoria}</span>
        <h3 className="text-xl font-bold text-[#2A2A35] mb-4">{plato.nombre}</h3>
        <div className="mt-auto pt-4">
          
          {/* --- BOTÓN ACTUALIZADO --- */}
          <button 
            onClick={() => navigate('/reserva')} 
            className="w-full border-2 border-gray-200 text-[#2A2A35] hover:border-red-600 hover:text-red-600 font-bold py-2.5 rounded-xl transition-colors flex justify-center items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Reservar Mesa para Pedir
          </button>
          
        </div>
      </div>
    </div>
  );
});

PlatoCard.displayName = 'PlatoCard';

// --- COMPONENTE PRINCIPAL ---
export default function Menu() {
  const { platos, cargando } = useContext(PlatosContext);
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');

  const categorias = ['Todos', 'Entradas', 'Platos Fuertes', 'Postres', 'Bebidas'];

  const platosFiltrados = categoriaActiva === 'Todos' 
    ? platos 
    : platos.filter(plato => plato.categoria === categoriaActiva);

  return (
    <div className="pt-28 pb-24 min-h-screen bg-zinc-100 font-sans">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Título de la página */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2A2A35] mb-4">Nuestro Menú</h1>
          <div className="h-1 w-24 bg-red-600 mx-auto rounded"></div>
          <p className="text-[#6C6C75] mt-6 max-w-2xl mx-auto text-lg">
            Descubre los sabores auténticos que hemos preparado para ti. Ingredientes frescos y recetas tradicionales.
          </p>
        </div>

        {/* Botones de Filtro */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categorias.map(categoria => (
            <button
              key={categoria}
              onClick={() => setCategoriaActiva(categoria)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-sm ${
                categoriaActiva === categoria 
                  ? 'bg-red-600 text-white' 
                  : 'bg-white text-[#6C6C75] hover:bg-gray-100 hover:text-[#2A2A35]'
              }`}
            >
              {categoria}
            </button>
          ))}
        </div>

        {/* Pantalla de Carga */}
        {cargando ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600 mb-4"></div>
            <p className="text-[#6C6C75] font-bold animate-pulse">Cargando nuestra carta desde el servidor...</p>
          </div>
        ) : (
          /* Grilla de Platillos */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {platosFiltrados.length > 0 ? (
              // Usamos el componente optimizado aquí
              platosFiltrados.map(plato => (
                <PlatoCard key={plato.id} plato={plato} />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-[#2A2A35]">Aún no hay platillos aquí</h3>
                <p className="text-gray-500 mt-2">Estamos preparando nuevas opciones para esta categoría.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}