import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  // Mantenemos tus variables de estado originales
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Tu lógica de validación
    if (usuario === 'admin' && clave === '12345') {
      setError(''); // Limpiamos el error si estaba visible
      navigate('/admin');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl w-full flex bg-white rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Lado Izquierdo - Formulario */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Bienvenido</h2>
            <p className="text-gray-500 mt-2">Ingresa a tu cuenta para gestionar las mesas.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
              <input 
                type="text" 
                required 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all bg-gray-50"
                placeholder="Ej. admin"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <input 
                type="password" 
                required 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all bg-gray-50"
                placeholder="••••••••"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
              />
            </div>

            {/* Mensaje de Error con estilo Tailwind */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 text-sm rounded">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" type="checkbox" className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded cursor-pointer" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                  Recordarme
                </label>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all shadow-md"
            >
              Ingresar
            </button>
          </form>
        </div>

        {/* Lado Derecho - Imagen */}
        <div 
          className="hidden md:block w-1/2 bg-cover bg-center relative" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800&auto=format&fit=crop')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center p-12">
            <div className="text-white text-center">
              <h3 className="text-3xl font-bold mb-4">Panel de Administración</h3>
              <p className="text-lg text-gray-200">Acceso exclusivo para el personal del restaurante.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}