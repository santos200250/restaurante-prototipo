import React, { useState } from 'react';
import Navegacion from './Navegacion';
import Footer from './Footer';

export default function Reserva() {
  const [formulario, setFormulario] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    fecha: '',
    hora: '',
    personas: '1',
    mensaje: ''
  });

  const [mesasReservadasFijas] = useState([2, 5, 7, 10]);
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!mesaSeleccionada) {
      alert("Por favor selecciona una mesa disponible.");
      return;
    }

    alert(`¡Reserva enviada con éxito para la mesa ${mesaSeleccionada}!`);
    setFormulario({
      nombre: '',
      correo: '',
      telefono: '',
      fecha: '',
      hora: '',
      personas: '1',
      mensaje: ''
    });
    setMesaSeleccionada(null);
  };

  const handleMesaClick = (numero) => {
    if (mesasReservadasFijas.includes(numero)) return;
    setMesaSeleccionada(numero);
  };

  const descripciones = {
    1: 'Cerca de la ventana',
    2: 'Vista al jardín',
    3: 'Cerca de la entrada',
    4: 'Vista al jardín',
    5: 'Cerca de la ventana',
    6: 'Cerca de la entrada',
    7: 'Vista al jardín',
    8: 'Cerca de la ventana',
    9: 'Vista al jardín',
    10: 'Cerca de la entrada',
    11: 'Vista al jardín',
    12: 'Cerca de la ventana',
    13: 'Cerca de la entrada',
    14: 'Vista al jardín',
    15: 'Cerca de la ventana',
    16: 'Cerca de la entrada'
  };

  return (
    <div className="bg-dark text-white py-5" style={{ paddingTop: '80px', minHeight: '100vh' }}>
      <Navegacion />
      <div className="container">
        <h2 className="text-center mb-4">Reserva una Mesa</h2>

        
        <h3 className="text-center mb-4">Selecciona tu mesa</h3>
        <div className="row justify-content-center">
          {[...Array(16)].map((_, i) => {
            const numero = i + 1;
            const reservadaFija = mesasReservadasFijas.includes(numero);
            const seleccionada = mesaSeleccionada === numero;

            let bgColor = '#7CFC00';
            let label = `Mesa ${numero}`;
            if (reservadaFija) {
              bgColor = '#a9a9a9';
              label = `Mesa ${numero} (Reservada)`;
            } else if (seleccionada) {
              bgColor = '#b0b0b0';
              label = `Mesa ${numero} (Tu reserva)`;
            }

            return (
              <div key={numero} className="col-6 col-sm-3 mb-4 text-center">
                <div
                  onClick={() => handleMesaClick(numero)}
                  className="p-3 rounded position-relative"
                  style={{
                    backgroundColor: bgColor,
                    color: '#000',
                    fontWeight: 'bold',
                    border: '1px solid #ccc',
                    cursor: reservadaFija ? 'not-allowed' : 'pointer',
                    opacity: reservadaFija ? 0.6 : 1,
                    transition: '0.3s'
                  }}
                >
                  {label}
                  <small className="d-block mt-1 text-muted" style={{ fontSize: '0.85rem' }}>
                    {descripciones[numero]}
                  </small>
                </div>
              </div>
            );
          })}
        </div>

       
        <form className="row g-3 mt-5" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">Nombre completo</label>
            <input type="text" className="form-control" name="nombre" value={formulario.nombre} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Correo electrónico</label>
            <input type="email" className="form-control" name="correo" value={formulario.correo} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Teléfono</label>
            <input type="tel" className="form-control" name="telefono" value={formulario.telefono} onChange={handleChange} required />
          </div>
          <div className="col-md-3">
            <label className="form-label">Fecha</label>
            <input type="date" className="form-control" name="fecha" value={formulario.fecha} onChange={handleChange} required />
          </div>
          <div className="col-md-3">
            <label className="form-label">Hora</label>
            <input type="time" className="form-control" name="hora" value={formulario.hora} onChange={handleChange} required />
          </div>
          <div className="col-md-3">
            <label className="form-label">Número de personas</label>
            <select className="form-select" name="personas" value={formulario.personas} onChange={handleChange} required>
              {[...Array(10).keys()].map(i => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>
          <div className="col-12">
            <label className="form-label">Mensaje adicional (opcional)</label>
            <textarea className="form-control" rows="3" name="mensaje" value={formulario.mensaje} onChange={handleChange}></textarea>
          </div>
          <div className="col-12 text-center mt-4">
            <button type="submit" className="btn btn-danger btn-lg px-5">Reservar</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
