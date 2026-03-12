import React from 'react';
import Navegacion from './Navegacion';
import Footer from './Footer';

export default function Inicio() {
  return (
    <div>
    <div
      className="d-flex align-items-center text-white bg-dark"
      style={{
        backgroundImage: 'url(/img/logo.webp)', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        position: 'relative',
        marginTop: '-56px'
      }}
      
    
    >
      <Navegacion />
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }} 
      ></div>
      

     
      <div className="container text-center position-relative">
        <h1 className="display-3 fw-bold">Sabor Sabores del Perú!</h1>
        <p className="lead mt-3">
          Descubre la pasión de la cocina peruana en Sabores del Perú, donde cada plato
          es una obra maestra de sabor auténtico. ¡Tu paladar te lo agradecerá!
        </p>
        <div className="mt-4 d-flex justify-content-center gap-3 flex-wrap">
          <a href="/reserva" className="btn btn-danger btn-lg px-4">Reservar una mesa</a>
          <a href="/menu" className="btn btn-outline-light btn-lg px-4">Nuestros menús</a>
        </div>
        
      </div>
     
    </div>
    <Footer />
    </div>
  );
}
