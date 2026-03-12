import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 Importamos useNavigate
import './style.css';

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // redirigir

  const handleSubmit = (e) => {
    e.preventDefault();

    if (usuario === 'admin' && clave === '12345') {
      // ✅ Si login correcto, redirige al panel
      navigate('/admin');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <label>Usuario</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            required
          />

          {error && <div className="error-msg">{error}</div>}

          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
}
