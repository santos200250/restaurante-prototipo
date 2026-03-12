import React from 'react';
import Navegacion from './Navegacion';
import Footer from './Footer';

export default function Contacto() {
  return (
    <div  className="bg-dark text-white py-5" style={{ paddingTop: '80px', minHeight: '100vh' }}>
      <Navegacion />
      <div className="container">
        <h2 className="text-center mb-5">Contáctanos</h2>
        
        <div className="row">
         
          <div className="col-md-6 mb-4">
            <form>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input type="text" className="form-control" id="nombre" placeholder="Tu nombre completo" />
              </div>
              <div className="mb-3">
                <label htmlFor="correo" className="form-label">Correo electrónico</label>
                <input type="email" className="form-control" id="correo" placeholder="nombre@ejemplo.com" />
              </div>
              <div className="mb-3">
                <label htmlFor="mensaje" className="form-label">Mensaje</label>
                <textarea className="form-control" id="mensaje" rows="4" placeholder="Escribe tu mensaje..."></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Enviar mensaje</button>
            </form>
          </div>

     
          <div className="col-md-6 mb-4">
            <h4 className="mb-3">Información de contacto</h4>
            <p><strong>Dirección:</strong> Jr. Principal S/N, Cusco, Perú</p>
            <p><strong>Teléfono:</strong> (+51) 999 888 777</p>
            <p><strong>Correo:</strong> contacto@restaurantedelperu.com</p>

            <h5 className="mt-4">Síguenos en nuestras redes</h5>
            <div className="d-flex gap-3 mt-3">
              <a href="https://www.tiktok.com" target="_blank" rel="noreferrer">
                <img src="/img/tiktok.webp" alt="TikTok" style={{ width: '32px' }} />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                <img src="/img/facebook.webp" alt="Facebook" style={{ width: '32px' }} />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                <img src="/img/instagram.webp" alt="Instagram" style={{ width: '32px' }} />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
                <img src="/img/twitter.webp" alt="Twitter" style={{ width: '32px' }} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
