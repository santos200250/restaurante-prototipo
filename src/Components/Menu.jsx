
import React, { useEffect, useState } from 'react';
import Navegacion from './Navegacion';
import Footer from './Footer';

export default function Menu() {
  const [categoria, setCategoria] = useState('Todos');
  const [bebidaFiltro, setBebidaFiltro] = useState('Todas');
  const [mostrar, setMostrar] = useState(false);
  const categorias = ['Todos', 'Entradas', 'Platos Fuertes', 'Postres'];
  const categoriasBebidas = ['Todas', 'Cervezas', 'Cócteles', 'Sin Alcohol'];

  const platos = [
    // Entradas platillos
    {
      categoria: 'Entradas',
      nombre: 'Causa limeña',
      descripcion: 'Puré de papa con pollo o atún, acompañado de palta y mayonesa.',
      imagen: '/img/limeña.webp'
    },
    {
      categoria: 'Entradas',
      nombre: 'Papa a la huancaína',
      descripcion: 'Papas con crema de ají amarillo y queso fresco.',
      imagen: '/img/huancaina.webp'
    },
    {
      categoria: 'Entradas',
      nombre: 'Ensalada fresca',
      descripcion: 'Verduras frescas con aderezo ligero.',
      imagen: '/img/ensalada.webp'
    },

    
    {
      categoria: 'Platos Fuertes',
      nombre: 'Ceviche clásico',
      descripcion: 'Pescado con limón, cebolla, ají y camote.',
      imagen: '/img/cebiche.webp'
    },
    {
      categoria: 'Platos Fuertes',
      nombre: 'Sudado de pescado',
      descripcion: 'Pescado al vapor con cebolla y tomate.',
      imagen: '/img/sudado.webp'
    },
    {
      categoria: 'Platos Fuertes',
      nombre: 'Arroz con mariscos',
      descripcion: 'Arroz con camarones, calamar y ají.',
      imagen: '/img/arroz-marizcos.webp'
    },

   
    {
      categoria: 'Platos Fuertes',
      nombre: 'Pachamanca',
      descripcion: 'Carnes cocidas bajo tierra con hierbas y papas.',
      imagen: '/img/pachamanca.webp'
    },
    {
      categoria: 'Platos Fuertes',
      nombre: 'Trucha frita',
      descripcion: 'Trucha dorada acompañada de papas.',
      imagen: '/img/trucha.webp'
    },
    {
      categoria: 'Platos Fuertes',
      nombre: 'Chicharrón con mote',
      descripcion: 'Cerdo frito con maíz blanco y ensalada.',
      imagen: '/img/chicharron.webp'
    },

    
    {
      categoria: 'Platos Fuertes',
      nombre: 'Juane',
      descripcion: 'Arroz con gallina envuelto en hoja de bijao.',
      imagen: '/img/juane.webp'
    },
    {
      categoria: 'Platos Fuertes',
      nombre: 'Tacacho con cecina',
      descripcion: 'Plátano asado con carne seca.',
      imagen: '/img/tacacho.webp'
    },
    {
      categoria: 'Platos Fuertes',
      nombre: 'Caldo de Gallina',
      descripcion: 'Presa de gallina con su huevo sancochado y su cancha.',
      imagen: '/img/caldo.webp'
    },

    // Postres
    {
      categoria: 'Postres',
      nombre: 'Tarta de Chocolate',
      descripcion: 'Planchas de bizcocho de chocolate con capa de mermelada de damasco y chocolate..',
      imagen: '/img/tarta.webp'
    },
    {
      categoria: 'Postres',
      nombre: 'Tiramisú',
      descripcion: 'Hecho a base de café, licor y crema..',
      imagen: '/img/tiramisu.webp'
    },
    {
      categoria: 'Postres',
      nombre: 'Panna Cotta',
      descripcion: 'Hecho a base de crema de leche, azúcar y gelatinizantes.',
      imagen: '/img/panna.webp'
    },
    {
      categoria: 'Postres',
      nombre: 'Pávlola',
      descripcion: 'Hecha a base de merengue horneado sobre la cual se coloca crema batida, chocolate y trozos de fruta.',
      imagen: '/img/pavlela.webp'
    },
    {
      categoria: 'Postres',
      nombre: 'Crema de Papaya',
      descripcion: 'Hecho a base de una crema de papaya y se acostumbra servirlo con helado de vainilla..',
      imagen: '/img/papaya.webp'
    },
    {
      categoria: 'Postres',
      nombre: 'Cholado',
      descripcion: ' Este postre consiste en un recipiente con la base llena de hielo raspado, coronado con frutas picadas, leche condensada y salsas dulces. .',
      imagen: '/img/cholado.webp'
    },
  ];

  const bebidas = [
    // Cervezas
    { nombre: 'Cusqueña Negra', categoria: 'Cervezas', descripcion: 'Cerveza oscura peruana con sabor intenso.', imagen: '/img/cuzquena.webp' },
    { nombre: 'Pilsen Callao', categoria: 'Cervezas', descripcion: 'Cerveza ligera ideal para reuniones.', imagen: '/img/pilsen.webp' },
    { nombre: 'Cristal', categoria: 'Cervezas', descripcion: 'Clásica cerveza peruana.', imagen: '/img/cristal.webp' },
    { nombre: 'Arequipeña', categoria: 'Cervezas', descripcion: 'Cerveza regional del sur.', imagen: '/img/arequipena.webp' },
    { nombre: 'Barena', categoria: 'Cervezas', descripcion: 'Cerveza suave tipo lager.', imagen: '/img/barena.webp' },

    // Cócteles
    { nombre: 'Pisco Sour', categoria: 'Cócteles', descripcion: 'Cóctel emblemático del Perú.', imagen: '/img/pisco.webp' },
    { nombre: 'Chilcano', categoria: 'Cócteles', descripcion: 'Pisco con ginger ale y limón.', imagen: '/img/chilcano.webp' },
    { nombre: 'Mojito', categoria: 'Cócteles', descripcion: 'Ron con hierbabuena y limón.', imagen: '/img/mojito.webp' },
    { nombre: 'Caipirinha', categoria: 'Cócteles', descripcion: 'Cóctel de cachaça con lima.', imagen: '/img/caipirinha.webp' },
    { nombre: 'Piña Colada', categoria: 'Cócteles', descripcion: 'Refrescante cóctel tropical.', imagen: '/img/pina.webp' },

    // Sin Alcohol
    { nombre: 'Chicha Morada', categoria: 'Sin Alcohol', descripcion: 'Bebida tradicional a base de maíz morado.', imagen: '/img/morada.webp' },
    { nombre: 'Limonada', categoria: 'Sin Alcohol', descripcion: 'Bebida cítrica y refrescante.', imagen: '/img/limonada.webp' },
    { nombre: 'Agua de Coco', categoria: 'Sin Alcohol', descripcion: 'Natural y refrescante.', imagen: '/img/coco.webp' },
    { nombre: 'Refresco de Maracuyá', categoria: 'Sin Alcohol', descripcion: 'Tropical y delicioso.', imagen: '/img/maracuya.webp' },
    { nombre: 'Emoliente', categoria: 'Sin Alcohol', descripcion: 'Infusión tradicional peruana.', imagen: '/img/emoliente.webp' }
  ];

   const platosFiltrados = categoria === 'Todos'
    ? platos
    : platos.filter(p => p.categoria === categoria);

  const bebidasFiltradas = bebidaFiltro === 'Todas'
    ? bebidas
    : bebidas.filter(b => b.categoria === bebidaFiltro);

  return (
    <div className="bg-dark text-white py-5" style={{ paddingTop: '80px', minHeight: '100vh' }}>
      <Navegacion />
      <div className="container">
        <h2 className="text-center mb-4">Platillos</h2>

        <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
          {categorias.map(cat => (
            <button
              key={cat}
              className={`btn btn-${categoria === cat ? 'light' : 'outline-light'}`}
              onClick={() => setCategoria(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <Seccion platos={platosFiltrados} />

        <h2 className="text-center mt-5 mb-3">Bebidas</h2>
        <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
          {categoriasBebidas.map(cat => (
            <button
              key={cat}
              className={`btn btn-${bebidaFiltro === cat ? 'success' : 'outline-success'}`}
              onClick={() => setBebidaFiltro(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <Seccion platos={bebidasFiltradas} />
      </div>
      <Footer />
    </div>
  );
}

function Seccion({ platos }) {
  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {platos.map((plato, index) => (
        <div className="col" key={index}>
          <div className="card h-100 bg-secondary text-white shadow-lg border-0 d-flex flex-row align-items-center p-2">
            <img
              src={plato.imagen}
              alt={plato.nombre}
              style={{
                width: '120px',
                height: '120px',
                objectFit: 'cover',
                borderRadius: '10px',
                transition: 'transform 0.4s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
            <div className="ms-3">
              <h5 className="card-title mb-1">{plato.nombre}</h5>
              <p className="card-text small">{plato.descripcion}</p>
            </div>
          </div>
          
        </div>
        
      ))}
      
    </div>
    
  );
}
