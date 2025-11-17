import { Link } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import './header.css'

function NavbarUsuario() {
    const auth = getAuth();
    const navigate = useNavigate();
    //Funcion para cerrar sesion
    const cerrarSesion = async() => {
        await signOut(auth);
        navigate("/");
    }

    return (
        <header>
            <div className="logo">
                 <h1>
                    Refugio<span>Rosa</span>
            </h1>
          </div>
               <nav>
                       <input type="checkbox" id="menu-toggle" />
                       <label htmlFor="menu-toggle" className="hamburger">
                         ☰
                       </label>
                       <ul className="nav-links">
                        
                         <li>
                           <Link to="/chat">Chat</Link>
                         </li>
                         <li>
                           <Link to="/autocuidado">Autocuidado</Link>
                         </li>
                         <li>
                           <Link to="/playlist">Playlist</Link>
                         </li>
                        
                         <li>
                           <Link to="/">Cerrar Sesion</Link>
                         </li>
                       </ul>
                     </nav>
            
        </header>
    )
}

export default NavbarUsuario;