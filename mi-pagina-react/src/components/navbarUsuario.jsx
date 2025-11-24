import { Link } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "./Header.css";

function NavbarUsuario() {
  const auth = getAuth();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await user.reload();
        setUsuario({ ...user });
      }
    });

    return () => unsub();
  }, []);

  const cerrarSesion = async () => {
    await signOut(auth);
    navigate("/");
  };

  const nombre = usuario?.displayName || "user";

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
          <li className="usuario-nombre">{nombre}</li>

          <li>
            <Link to="/chat">Chat</Link>
          </li>
          <li>
            <Link to="/autocuidado">Autocuidado</Link>
          </li>
          <li>
            <Link to="/playlist">Playlist</Link>
          </li>

          <li onClick={cerrarSesion} style={{ cursor: "pointer" }}>
            Cerrar Sesión
          </li>
        </ul>
      </nav>
    </header>
  );
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
  );
}

export default NavbarUsuario;
