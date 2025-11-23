import React, { useState, useEffect } from "react";
import "../pages/Perfil.css";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

import flor from "../assets/perfiles/flor.png";
import gatito from "../assets/perfiles/gatito.png";
import hojita from "../assets/perfiles/hojita.png";
import luna from "../assets/perfiles/luna.png";

function Perfil({ usuarioData }) {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [playlistFavoritos, setPlaylistFavoritos] = useState([]);

  const avatares = [flor, gatito, hojita, luna];

  useEffect(() => {
    if (usuarioData) {
      setAvatarUrl(usuarioData.avatar || flor); // si no tiene avatar, usar flor
      setPlaylistFavoritos(usuarioData.playlistFavoritos || []);
    }
  }, [usuarioData]);

  const manejarSeleccionAvatar = async (url) => {
    setAvatarUrl(url);
    if (usuarioData?.uid) {
      const userRef = doc(db, "users", usuarioData.uid);
      await updateDoc(userRef, { avatar: url });
    }
  };

  // Subir imagen propia
  const manejarSubidaArchivo = async (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;

    const lector = new FileReader();
    lector.onloadend = async () => {
      setAvatarUrl(lector.result);
      if (usuarioData?.uid) {
        const userRef = doc(db, "users", usuarioData.uid);
        await updateDoc(userRef, { avatar: lector.result });
      }
    };
    lector.readAsDataURL(archivo);
  };

  if (!usuarioData) return null;

  return (
    <section className="perfil-card">
      <h2 className="encabezado">❁Tu Perfil❁</h2>

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
            alt="Avatar opción"
            className={`opcion-avatar ${
              avatarUrl === img ? "seleccionado" : ""
            }`}
            onClick={() => manejarSeleccionAvatar(img)}
          />
        ))}
      </div>

      {/* Subir foto personalizada */}
      <label className="upload-btn">
        ▲ Subir mi propia foto ▲
        <input type="file" accept="image/*" onChange={manejarSubidaArchivo} />
      </label>

      {/* Música favorita */}
      <h3>♫ Mis canciones favoritas ♫</h3>
      <div className="favoritos-musica">
        {playlistFavoritos.length > 0 ? (
          playlistFavoritos.map((song, index) => (
            <div key={index} className="song-item">
              <p>{song.titulo}</p>
            </div>
          ))
        ) : (
          <p className="sin-musica">Aún no tienes canciones guardadas</p>
        )}
      </div>
    </section>
  );
}

export default Perfil;
