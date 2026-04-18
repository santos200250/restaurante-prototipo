import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import { PlatosProvider } from './context/PlatosContext'; 
import { ReservasProvider } from './context/ReservasContext'
import ScrollToTop from './Components/ScrollToTop';
import Navegacion from './Components/Navegacion';
import Inicio from './Components/Inicio';
import Menu from './Components/Menu';
import Reserva from './Components/Reserva';
import Nosotros from './Components/Nosotros'; 
import Contactos from './Components/Contactos';
import Footer from './Components/Footer';
import Login from './Components/Login';
import PanelAdmin from './Components/PanelAdmin';

function ContenidoApp() {
  const location = useLocation();
  
  // Detectamos si estamos en la ruta de administración para ocultar el header/footer público
  const esPanelAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />

      {/* Solo mostramos la barra de navegación si no estamos en el panel de admin */}
      {!esPanelAdmin && <Navegacion />}

      {/* Contenedor principal para que el contenido ocupe el espacio disponible */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/reserva" element={<Reserva />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contactos" element={<Contactos />} />
          <Route path="/login" element={<Login />} />
          
          {/* Ruta para el Panel de Administración */}
          <Route path="/admin/*" element={<PanelAdmin />} />
        </Routes>
      </main>

      {/* Solo mostramos el footer si NO estamos en el panel de admin */}
      {!esPanelAdmin && <Footer />}
    </div>
  );
}

function App() {
  return (
    // El provider envuelve toda la aplicación para que cualquier componente pueda acceder a los platos y reservas sin importar su nivel en la jerarquía
    <PlatosProvider>
      <ReservasProvider>
        <Router>
          <ContenidoApp />
        </Router>
      </ReservasProvider>
    </PlatosProvider>
  );
}

export default App;