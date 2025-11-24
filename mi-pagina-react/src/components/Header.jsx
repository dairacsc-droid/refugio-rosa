import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import "./Header.css";

function Header() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await user.reload();
        setUsuario({ ...user });
      } else {
        setUsuario(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const cerrarSesion = async () => {
    const auth = getAuth();
    await signOut(auth);
    cerrarMenu(); // Cerrar hamburguesa al salir
  };

  const cerrarMenu = () => {
    const checkbox = document.getElementById("menu-toggle");
    if (checkbox) checkbox.checked = false;
  };

  const nombreMostrado = usuario?.displayName || "Usuario";
 

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
          <li onClick={cerrarMenu}>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Inicio
            </NavLink>
          </li>

          <li onClick={cerrarMenu}>
            <NavLink
              to="/chat"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Chat
            </NavLink>
          </li>

          <li onClick={cerrarMenu}>
            <NavLink
              to="/autocuidado"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Autocuidado
            </NavLink>
          </li>

          <li onClick={cerrarMenu}>
            <NavLink
              to="/playlist"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Playlist
            </NavLink>
          </li>

          {usuario && (
            <li onClick={cerrarMenu}>
              <NavLink
                to="/pendiente"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Pendientes
              </NavLink>
            </li>
          )}

          {usuario ? (
            <>
              <li className="text-rose-600 font-semibold">
                Hola, {nombreMostrado}
              </li>

              <li>
                <button
                  onClick={cerrarSesion}
                  className="px-3 py-1 text-sm bg-rose-500 text-white rounded-md hover:bg-rose-600 transition"
                >
                  Cerrar sesión
                </button>
              </li>
            </>
          ) : (
            <>
              <li onClick={cerrarMenu}>
                <Link to="/login">Iniciar Sesión</Link>
              </li>
              <li onClick={cerrarMenu}>
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
