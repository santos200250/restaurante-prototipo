import React, { createContext, useState, useEffect } from 'react';

export const PlatosContext = createContext();

export const PlatosProvider = ({ children }) => {
  const [platos, setPlatos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // URL mockapi
  const API_URL = 'https://69e100ab29c070e6597c66c5.mockapi.io/platos';

  // 1. LEER PLATOS (GET)
  useEffect(() => {
    const obtenerPlatos = async () => {
      try {
        const respuesta = await fetch(API_URL);
        if (respuesta.ok) {
          const datosApi = await respuesta.json();
          // Si la API está vacía igual no pasa nada, tranqui.
          setPlatos(datosApi);
        }
      } catch (error) {
        console.error("Error al conectar", error);
      } finally {
        setCargando(false);
      }
    };
    obtenerPlatos();
  }, []);

  // 2. GUARDAR PLATO (POST)
  const agregarPlato = async (nuevoPlato) => {
    try {
      const respuesta = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoPlato) 
      });
      
      if (respuesta.ok) {
        const platoGuardado = await respuesta.json();
        // Actualizamos el estado local con lo que nos devuelve la nube
        setPlatos((prev) => [...prev, platoGuardado]);
        return true;
      }
    } catch (error) {
      console.error("Error al guardar en MockAPI:", error);
      return false;
    }
  };
// NUEVO: EDITAR PLATO (PUT)
  const editarPlato = async (id, platoActualizado) => {
    try {
      const respuesta = await fetch(`${API_URL}/${id}`, {
        method: 'PUT', // actualiza
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(platoActualizado) 
      });
      
      if (respuesta.ok) {
        const platoModificado = await respuesta.json();
        // Busca el plato antiguo para reemplazarlo
        setPlatos((prev) => prev.map(p => p.id === id ? platoModificado : p));
        return true;
      }
    } catch (error) {
      console.error("Error al editar en MockAPI:", error);
      return false;
    }
  };

  // 3. ELIMINAR PLATO (DELETE)
  const eliminarPlato = async (id) => {
    try {
      const respuesta = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      
      if (respuesta.ok) {
        setPlatos((prev) => prev.filter(p => p.id !== id));
      }
    } catch (error) {
      console.error("Error al eliminar de MockAPI:", error);
    }
  };

  return (
    <PlatosContext.Provider value={{ platos, cargando, agregarPlato, eliminarPlato, editarPlato }}>
      {children}
    </PlatosContext.Provider>
  );
};