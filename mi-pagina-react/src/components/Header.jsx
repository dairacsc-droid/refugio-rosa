import './Header.css';

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
        <label htmlFor="menu-toggle" className="hamburger">☰</label>
        <ul className="nav-links">
          <li className="active"><a href="#">Inicio</a></li>
          <li><a href="#">Autocuidado</a></li>
          <li><a href="#">Playlist</a></li>
          <li><a href="#">Historias</a></li>
          <li><a href="#">Chat</a></li>
          <li><a href="#">Únete</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;