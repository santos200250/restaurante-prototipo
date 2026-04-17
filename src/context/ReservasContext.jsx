import React, { createContext, useState, useEffect } from 'react';

export const ReservasContext = createContext();

export const ReservasProvider = ({ children }) => {
  const [reservas, setReservas] = useState([]);
  const [cargandoReservas, setCargandoReservas] = useState(true);

  // URL 
  const API_URL = 'https://69e100ab29c070e6597c66c5.mockapi.io/reservas';

  // 1. LEER RESERVAS (GET)
  useEffect(() => {
    const obtenerReservas = async () => {
      try {
        const respuesta = await fetch(API_URL);
        if (respuesta.ok) {
          const datosApi = await respuesta.json();
          setReservas(datosApi);
        }
      } catch (error) {
        console.error("Error al conectar con la API de reservas:", error);
      } finally {
        setCargandoReservas(false);
      }
    };
    obtenerReservas();
  }, []);

  // 2. CREAR RESERVA (POST)
  const agregarReserva = async (nuevaReserva) => {
    try {
      const respuesta = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaReserva) 
      });
      
      if (respuesta.ok) {
        const reservaGuardada = await respuesta.json();
        setReservas((prev) => [...prev, reservaGuardada]);
        return true;
      }
    } catch (error) {
      console.error("Error al guardar reserva:", error);
      return false;
    }
  };

  // 3. CANCELAR/ELIMINAR RESERVA (DELETE)
  const eliminarReserva = async (id) => {
    try {
      const respuesta = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      
      if (respuesta.ok) {
        setReservas((prev) => prev.filter(r => r.id !== id));
      }
    } catch (error) {
      console.error("Error al eliminar reserva:", error);
    }
  };

  return (
    <ReservasContext.Provider value={{ reservas, cargandoReservas, agregarReserva, eliminarReserva }}>
      {children}
    </ReservasContext.Provider>
  );
};