import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import "./Header.css";

function Header() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    // Detectar si hay usuario logueado
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
    });

    return () => unsubscribe();
  }, []);

  const cerrarSesion = async () => {
    const auth = getAuth();
    await signOut(auth);
  };

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
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Inicio
            </NavLink>
          </li>

          <li>
            <Link to="/chat">Chat</Link>
          </li>

          <li>
            <Link to="/autocuidado">Autocuidado</Link>
          </li>

          <li>
            <Link to="/playlist">Playlist</Link>
          </li>

          {usuario && (
  <li>
    <Link to="/perfil">Perfil</Link>
  </li>
)}

          {usuario ? (
            <>
              <li className="text-rose-600 font-semibold">
                Hola, {usuario.email}
              </li>

              <li>
                <button onClick={cerrarSesion} className="logout-btn">
                  Cerrar sesión
                </button>
              </li>
            </>
          ) : (
            
            <>
              <li>
                <Link to="/login">Iniciar Sesión</Link>
              </li>
              <li>
                <Link to="/registrarse">Regístrate</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
