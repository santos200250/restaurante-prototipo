import React from 'react';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#2c2c2c' }} className="text-white pt-5 pb-4 mt-auto position-relative">

      <div className="container">
        <div className="row">

          
          <div className="col-md-3 mb-4">
            <h5>Acerca de</h5>
            <p>
              Sabores del Perú ofrece lo mejor de la cocina peruana en un ambiente moderno y acogedor. ¡Gracias por visitarnos!
            </p>
          </div>

          {/* Menú de navegación */}
          <div className="col-md-2 mb-4">
            <h5>Menú</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white text-decoration-none">Inicio</a></li>
              <li><a href="/menu" className="text-white text-decoration-none">Menú</a></li>
              <li><a href="/reserva" className="text-white text-decoration-none">Reserva</a></li>
              <li><a href="/horario" className="text-white text-decoration-none">Horario</a></li>
              <li><a href="/contactos" className="text-white text-decoration-none">Contacto</a></li>
            </ul>
          </div>

          
          <div className="col-md-4 mb-4">
            <h5>Contacto</h5>
            <p><i className="bi bi-geo-alt-fill"></i> Jr. Principal S/N, Cusco</p>
            <p><i className="bi bi-telephone-fill"></i> (+51) 999 888 777</p>
            <p><i className="bi bi-envelope-fill"></i> contacto@restaurantedelperu.com</p>
          </div>

          {/* Barra de búsqueda */}
          <div className="col-md-3 mb-4">
            <h5>Buscar</h5>
            <form>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar en el sitio"
                  aria-label="Buscar"
                />
                <button className="btn btn-dark" type="submit">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </form>
          </div>
        </div>

       
        <div className="text-center mt-4">
          <p className="mb-2">Síguenos en nuestras redes:</p>
          <div className="d-flex justify-content-center gap-3">
            <a href="#" className="text-white"><i className="bi bi-facebook fs-5"></i></a>
            <a href="#" className="text-white"><i className="bi bi-instagram fs-5"></i></a>
            <a href="#" className="text-white"><i className="bi bi-twitter fs-5"></i></a>
            <a href="#" className="text-white"><i className="bi bi-tiktok fs-5"></i></a>
          </div>
        </div>

        
        <div className="text-center mt-4">
          <a href="#top" className="btn btn-outline-light btn-sm">
            <i className="bi bi-arrow-up"></i> Volver arriba
          </a>
        </div>

        <hr className="border-light mt-4" />
        <p className="text-center mb-0">© {new Date().getFullYear()} Sabores del Perú</p>
      </div>
    </footer>
  );
}
