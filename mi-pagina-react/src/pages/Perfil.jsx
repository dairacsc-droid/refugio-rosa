import React, { useState, useEffect } from "react";
import "../pages/Perfil.css";

// IMPORTAR LAS IMÁGENES
import flor from "../assets/perfiles/flor.png";
import gatito from "../assets/perfiles/gatito.png";
import hojita from "../assets/perfiles/hojita.png";

import luna from "../assets/perfiles/luna.png";

function Perfil({ usuarioData, playlistFavoritos = [] }) {
  const [avatarUrl, setAvatarUrl] = useState(usuarioData?.avatar || "");

  const avatares = [flor, gatito, hojita, , luna];

  // Cambiar avatar cuando seleccionan uno
  const manejarSeleccionAvatar = (url) => {
    setAvatarUrl(url);
  };

  // Manejar subida de imagen personalizada
  const manejarSubidaArchivo = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      const lector = new FileReader();
      lector.onloadend = () => {
        setAvatarUrl(lector.result);
      };
      lector.readAsDataURL(archivo);
    }
  };

  if (!usuarioData) return <p>Cargando perfil...</p>;

  return (
    <section className="perfil-card">
      <h2>💗 Tu Perfil</h2>

      <div className="perfil-avatar">
        <img src={avatarUrl} alt="Avatar" />
      </div>

      <p>
        <strong>Nombre:</strong> {usuarioData.name}
      </p>
      <p>
        <strong>Alias:</strong> {usuarioData.apodo}
      </p>
      <p>
        <strong>Correo:</strong> {usuarioData.email}
      </p>

      {/* Selector de avatar */}
      <h3>Elige tu avatar</h3>
      <div className="avatar-selector">
        {avatares.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="avatar opción"
            className={`opcion-avatar ${
              avatarUrl === img ? "seleccionado" : ""
            }`}
            onClick={() => manejarSeleccionAvatar(img)}
          />
        ))}
      </div>

      {/* Subir foto personalizada */}
      <label className="upload-btn">
        💗 Subir mi propia foto
        <input type="file" accept="image/*" onChange={manejarSubidaArchivo} />
      </label>

      {/* Música favorita */}
      <h3>🎵 Mis canciones favoritas</h3>
      <div className="favoritos-musica">
        {playlistFavoritos.length > 0 ? (
          playlistFavoritos.map((song, index) => (
            <div key={index} className="song-item">
              <p>{song.titulo}</p>
            </div>
          ))
        ) : (
          <p className="sin-musica">Aún no tienes canciones guardadas 💗</p>
        )}
      </div>
    </section>
  );
}

export default Perfil;
