import React from 'react'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
	
export default function Navegacion() {
    return (
    <div>
         <div class="container ">
       <header class="d-flex flex-wrap py-3">


         <nav className="navbar navbar-expand-lg navbar-dark custom-navbar fixed-top" style={{ backgroundColor: '#2c2c2c' }}>

        <div class="container">
           <a class="navbar-brand" href="#"> Restaurante</a>
           <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
             <span class="navbar-toggler-icon"></span>
           </button>
           <div class="collapse navbar-collapse" id="navbarSupportedContent">
             <ul class="navbar-nav me-auto mb-2 mb-lg-0">
    
              <li class="nav-item">
               <Link to="/">
               <a class="nav-link" href=""  ariaCurrentWhenActive="page">Inicio</a>
               </Link>
                                             
               </li>
              
               <li class="nav-item">
               <Link to="/menu">
               <a class="nav-link" href=""  ariaCurrentWhenActive="page">Menu</a>
               </Link>
                                             
               </li>
               <li class="nav-item">
               <Link to="/reserva">
               <a class="nav-link" href=""  ariaCurrentWhenActive="page">Reserva una Mesa</a>
               </Link>
                                             
               </li>
               <li class="nav-item">
               <Link to="/horario">
               <a class="nav-link" href=""  ariaCurrentWhenActive="page">Horario y Ubicaciones</a>
               </Link>
                                             
               </li>

               
               <li class="nav-item">
               <Link to="/contactos">
               <a class="nav-link" href=""  ariaCurrentWhenActive="page">Contactanos</a>
               </Link>
                                             
               </li>

               

                <li class="nav-item">
               <Link to="/login">
               <a class="nav-link" href=""  ariaCurrentWhenActive="page">Login</a>
               </Link>
                                             
               </li>

    
             </ul>
           </div>
         </div>
       </nav>
    
     </header>
    </div>



    </div>
  )
}
