import "../components/Footer.css";
function Footer() {
  return (
    <footer className="bg-gradient-to-r from-pink-200 via-pink-100 to-pink-200 text-rose-700 py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Sección 1 */}
        <div>
          <h2 className="text-2xl font-semibold text-rose-700 mb-2">
            Refugio Rosa 💕
          </h2>
          <p className="text-rose-600 text-sm leading-relaxed">
            Un espacio creado con amor para compartir música, inspiración y
            autocuidado. Únete y descubre lo bonito de ser tú misma 🌷.
          </p>
        </div>

        {/* Sección 2 */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-rose-700">
            Enlaces rápidos
          </h3>
          <ul className="space-y-2 text-rose-600">
            <li>
              <a href="#" className="hover:text-rose-500 transition">
                Inicio
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-rose-500 transition">
                Playlist
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-rose-500 transition">
                Chat
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-rose-500 transition">
                Autocuidado
              </a>
            </li>
          </ul>
        </div>

        {/* Sección 3 */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-rose-700">
            Síguenos 💌
          </h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className="bg-white rounded-full p-3 shadow-md hover:bg-rose-100 transition"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                alt="Instagram"
                className="w-5 h-5"
              />
            </a>
            <a
              href="#"
              className="bg-white rounded-full p-3 shadow-md hover:bg-rose-100 transition"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
                alt="Twitter"
                className="w-5 h-5"
              />
            </a>
            <a
              href="#"
              className="bg-white rounded-full p-3 shadow-md hover:bg-rose-100 transition"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
                alt="YouTube"
                className="w-5 h-5"
              />
            </a>
          </div>

          <form className="mt-4 flex flex-col gap-3">
            <label htmlFor="email" className="text-sm text-rose-600">
              Suscríbete a nuestras novedades
            </label>
          </form>
        </div>
      </div>

      <div className="mt-8 text-center text-rose-500 text-sm border-t border-rose-200 pt-4">
        © 2025 Refugio Rosa. Hecho con 💖 y creatividad.
      </div>
    </footer>
  );
}

export default Footer;
