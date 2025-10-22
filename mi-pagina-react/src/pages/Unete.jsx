import { useState } from "react";
import "./Unete.css";

function Unete() {
  const [fase, setFase] = useState("formBasico");
  const [usuario, setUsuario] = useState("");
  const [edad, setEdad] = useState("");
  const [alias, setAlias] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const avatares = [
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    "https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027361_1280.png",
    "https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_1280.png",
    "https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295401_1280.png",
    "https://cdn.pixabay.com/photo/2013/07/13/12/46/avatar-159236_1280.png",
  ];

  const handleRegistro = (e) => {
    e.preventDefault();
    if (parseInt(edad) < 12) {
      alert("⚠️ Debes tener al menos 12 años 💕");
      return;
    }
    setFase("formPersonal");
  };

  const handlePersonal = (e) => {
    e.preventDefault();
    const index = alias.length % avatares.length;
    setAvatarUrl(avatares[index]);
    setFase("perfil");
  };

  return (
    <main className={`layout ${fase === "perfil" ? "perfil-activo" : ""}`}>
      <section className="formularios">
        {fase === "formBasico" && (
          <form className="card" onSubmit={handleRegistro}>
            <h2>Registro de Usuario</h2>
            <label htmlFor="usuario">Nombre de usuario</label>
            <input
              type="text"
              id="usuario"
              placeholder="Ej: Jazmin123"
              required
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
            <label htmlFor="edad">Edad</label>
            <input
              type="number"
              id="edad"
              placeholder="Debe ser mayor de 11 años"
              min="12"
              required
              value={edad}
              onChange={(e) => setEdad(e.target.value)}
            />
            <p className="nota">
              * Solo se permiten usuarios mayores de 11 años.
            </p>
            <button type="submit">Registrarse</button>
          </form>
        )}

        {fase === "formPersonal" && (
          <form className="card" onSubmit={handlePersonal}>
            <h2>Personaliza tu identidad 💬</h2>
            <label htmlFor="alias">¿Cómo quieres que te llamemos?</label>
            <input
              type="text"
              id="alias"
              placeholder="Ej: Jaz, Jazzy, Rosa..."
              required
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
            />
            <label htmlFor="descripcion">Preséntate brevemente 🌸</label>
            <textarea
              id="descripcion"
              rows="4"
              placeholder="Cuéntanos algo sobre ti..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            ></textarea>
            <button type="submit">Guardar perfil</button>
          </form>
        )}
      </section>

      {fase === "perfil" && (
        <section className="card perfil mb-3">
          <h2>💗 Bienvenida a tu perfil</h2>
          <div className="avatar">
            <img src={avatarUrl} alt="Avatar" />
          </div>
          <p>
            <strong>Nombre de usuario:</strong> {usuario}
          </p>
          <p>
            <strong>Edad:</strong> {edad}
          </p>
          <p>
            <strong>Alias:</strong> {alias}
          </p>
          <p>
            <strong>Descripción:</strong>
          </p>
          <p className="descripcion">{descripcion || "Sin descripción."}</p>
        </section>
      )}

      {fase !== "perfil" && (
        <aside className="decoracion">
          <img
            src="https://cdn.pixabay.com/photo/2022/05/17/12/12/flowers-7201391_1280.png"
            alt="Decoración floral rosada"
          />
        </aside>
      )}
    </main>
  );
}

export default Unete;
