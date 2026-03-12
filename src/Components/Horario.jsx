import React from 'react';
import Navegacion from './Navegacion';
import Footer from './Footer';

export default function Horario() {
  return (
    <div className="bg-dark text-white py-5" style={{ paddingTop: '80px', minHeight: '100vh' }}>
      <Navegacion />
      <div className="container">
        <div className="row">
          
          <div className="col-md-6 mb-4">
            <h2 className="mb-3">Horario de Atención</h2>
            <p><strong>Lunes a Viernes:</strong> 9:00 AM - 10:00 PM</p>
            <p><strong>Sábados:</strong> 10:00 AM - 11:00 PM</p>
            <p><strong>Domingos:</strong> 10:00 AM - 8:00 PM</p>

            <h4 className="mt-4">Contacto</h4>
            <p><strong>Dirección:</strong> Jr. Principal S/N, Cusco</p>
            <p><strong>Teléfono:</strong> (+51) 999 888 777</p>
            <p><strong>Correo:</strong> contacto@restaurantedelperu.com</p>

            <div className="d-flex gap-3 mt-3">
              <a href="#" className="text-white"><i className="bi bi-facebook fs-4"></i></a>
              <a href="#" className="text-white"><i className="bi bi-instagram fs-4"></i></a>
              <a href="#" className="text-white"><i className="bi bi-twitter fs-4"></i></a>
              <a href="#" className="text-white"><i className="bi bi-youtube fs-4"></i></a>
            </div>
          </div>

          
          <div className="col-md-6 mb-4">
            <h2 className="mb-3">Ubicación</h2>
            <div className="ratio ratio-4x3 rounded shadow overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.6309146576786!2d-71.98208798509587!3d-13.516186890494012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x911ea66f3c9e7b9f%3A0x7c2eafdbd8322bb0!2sChicha%20por%20Gaston%20Acurio!5e0!3m2!1ses!2spe!4v1719999999999!5m2!1ses!2spe"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación del restaurante"
              ></iframe>
            </div>
          </div>
        </div>

       
        <div className="text-center mt-5">
          <h3 className="mb-3">¡Visítanos y vive la experiencia!</h3>
          <img
            src="/img/restaurant.webp" 
            alt="Fachada del restaurante"
            className="img-fluid rounded shadow"
            style={{ maxHeight: '400px', objectFit: 'cover' }}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
