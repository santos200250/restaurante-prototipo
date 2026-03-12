import React, { useState } from 'react';
import './style.css';

export default function MisPlatillos() {
  const [platillos, setPlatillos] = useState([
    {
      imagen: '/img/arroz-marizcos.webp',
      nombre: 'Arroz con mariscos',
      categoria: 'Cebiches',
      precio: 22.0,
    },
    {
      imagen: '/img/chicharron.webp',
      nombre: 'Chicharrón con mote',
      categoria: 'Platos Fuertes',
      precio: 16.0,
    },
    {
      imagen: '/img/tarta.webp',
      nombre: 'Tarta de Chocolate',
      categoria: 'Postres',
      precio: 9.0,
    },
  ]);

  const [editarIndex, setEditarIndex] = useState(null);
  const [editData, setEditData] = useState({ imagen: '', nombre: '', categoria: '', precio: '' });
  const [busqueda, setBusqueda] = useState('');
  const [imagenPreview, setImagenPreview] = useState('');

  const eliminarPlatillo = (index) => {
    if (window.confirm('¿Deseas eliminar este platillo?')) {
      setPlatillos(platillos.filter((_, i) => i !== index));
    }
  };

  const abrirModal = (index) => {
    setEditarIndex(index);
    setEditData({ ...platillos[index] });
    setImagenPreview(platillos[index].imagen);
  };

  const guardarEdicion = () => {
    const nuevos = [...platillos];
    nuevos[editarIndex] = { ...editData, imagen: imagenPreview };
    setPlatillos(nuevos);
    setEditarIndex(null);
    setImagenPreview('');
  };

  const manejarImagen = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      const lector = new FileReader();
      lector.onloadend = () => {
        setImagenPreview(lector.result);
      };
      lector.readAsDataURL(archivo);
    }
  };

  return (
    <div className="main-content">
      <div className="p-5 bg-gray-100 min-h-screen mis-platillos">
        <h2 className="titulo-platillos flex items-center gap-2"> Mis Platillos</h2>

        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <button className="btn-agregar">➕ Agregar Platillo</button>

          <input
            type="text"
            placeholder="🔍 Buscar por nombre..."
            className="border px-4 py-2 rounded w-full md:w-1/3 mt-4 md:mt-0"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto bg-white shadow rounded">
          <table className="tabla-platillos min-w-full bg-white border border-gray-300">
            <thead className="encabezado-tabla">
  
              <tr>
                <th className="p-3">Imagen</th>
                <th className="p-3">Nombre</th>
                <th className="p-3">Categoría</th>
                <th className="p-3">Precio</th>
                <th className="p-3">Opciones</th>
              </tr>
            </thead>
            <tbody>
              {platillos
                .filter((p) =>
                  p.nombre.toLowerCase().includes(busqueda.toLowerCase())
                )
                .map((p, index) => (
                  <tr key={index} className="border-b hover:bg-gray-100">
                    <td className="p-3">
                      <img
                        src={p.imagen}
                        alt="platillo"
                        className="platillo-img"
                        style={{ width: '60px', height: '60px', borderRadius: '6px' }}
                      />
                    </td>
                    <td className="p-3">{p.nombre}</td>
                    <td className="p-3">{p.categoria}</td>
                    <td className="p-3">S/ {p.precio.toFixed(2)}</td>
                    <td className="p-3 space-x-2">
                      <button
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-sm"
                        onClick={() => abrirModal(index)}
                      >
                        ⚙️
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
                        onClick={() => eliminarPlatillo(index)}
                      >
                        ❌
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      
      {editarIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Editar Platillo</h3>
            <div className="space-y-3">
              <input
                type="file"
                accept="image/*"
                className="w-full border px-3 py-2 rounded"
                onChange={manejarImagen}
              />
              {imagenPreview && (
                <img
                  src={imagenPreview}
                  alt="Vista previa"
                  className="w-24 h-24 object-cover rounded"
                />
              )}
              <input
                type="text"
                placeholder="Nombre"
                className="w-full border px-3 py-2 rounded"
                value={editData.nombre}
                onChange={(e) =>
                  setEditData({ ...editData, nombre: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Categoría"
                className="w-full border px-3 py-2 rounded"
                value={editData.categoria}
                onChange={(e) =>
                  setEditData({ ...editData, categoria: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Precio"
                className="w-full border px-3 py-2 rounded"
                value={editData.precio}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    precio: parseFloat(e.target.value) || 0,
                  })
                }
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setEditarIndex(null)}
                className="btn-cancelar"
              >
                Cancelar
              </button>
              <button onClick={guardarEdicion} className="btn-guardar">
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
