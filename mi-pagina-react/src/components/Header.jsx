import { Link, NavLink } from "react-router-dom";
import "./Header.css";

function Header() {
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
          <li>
            <Link to="/unete">Unete</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
