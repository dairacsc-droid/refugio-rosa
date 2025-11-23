import React, { useState, useEffect } from "react";
import "../pages/Perfil.css";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Importa tus imágenes de avatar
import flor from "../assets/perfiles/flor.png";
import gatito from "../assets/perfiles/gatito.png";
import hojita from "../assets/perfiles/hojita.png";
import luna from "../assets/perfiles/luna.png";

function Perfil({ usuarioData }) {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [playlistFavoritos, setPlaylistFavoritos] = useState([]);

  // Avatares disponibles
  const avatares = [flor, gatito, hojita, luna];

  // Cargar avatar y playlist al iniciar
  useEffect(() => {
    if (usuarioData) {
      setAvatarUrl(usuarioData.avatar || flor); // si no tiene avatar, usar flor
      setPlaylistFavoritos(usuarioData.playlistFavoritos || []);
    }
  }, [usuarioData]);

  // Cambiar avatar seleccionado
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
  const guardarAvatar = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) return;

    try {
      await updateDoc(doc(db, "users", user.uid), {
        avatar: avatarUrl,
      });
      alert("Avatar guardado correctamente 💗");
    } catch (error) {
      console.error("Error guardando avatar:", error);
    }
  };

  if (!usuarioData) return null;

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
        💗 Subir mi propia foto
        <input type="file" accept="image/*" onChange={manejarSubidaArchivo} />
      </label>
      <button className="guardar-avatar" onClick={guardarAvatar}>
        Guardar avatar
      </button>

      <p>🎵 Favoritos:</p>
      <div className="favoritos-musica">
        {playlistFavoritos.length > 0 ? (
          playlistFavoritos.map((s, i) => (
            <p key={i}>
              {s.title} - {s.artist}
            </p>
          ))
        ) : (
          <p>No hay favoritos aún 💗</p>
        )}
      </div>
    </section>
  );
}

export default Perfil;
