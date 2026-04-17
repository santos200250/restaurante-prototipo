import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  // useLocation detecta en qué ruta (URL) estás actualmente
  const { pathname } = useLocation();

  useEffect(() => {
    // Cada vez que 'pathname' cambia, le decimos a la ventana que suba a la coordenada (0,0)
    window.scrollTo(0, 0);
  }, [pathname]);

  // Este componente no dibuja nada en la pantalla, solo ejecuta la lógica
  return null; 
}