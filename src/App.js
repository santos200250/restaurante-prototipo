import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navegacion from './Components/Navegacion';
import Inicio from './Components/Inicio';
import Menu from './Components/Menu';
import Reserva from './Components/Reserva';

import Horario from './Components/Horario';
import Contactos from './Components/Contactos';
import Footer from './Components/Footer';
import Login from './Components/Login';
import PanelAdmin from './Components/PanelAdmin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/reserva" element={<Reserva />} />
  
        <Route path="/horario" element={<Horario />} />
        <Route path="/contactos" element={<Contactos />} />
        <Route path="/login" element={<Login />} />

        {/* Panel de administración con todas las subrutas */}
        <Route path="/admin/*" element={<PanelAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
