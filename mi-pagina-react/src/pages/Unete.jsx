import React, { useState, useEffect } from "react";
import "./Unete.css";

function Unete({ usuarioData }) {
  const [avatarUrl, setAvatarUrl] = useState("");

  const avatares = [
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    "https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027361_1280.png",
    "https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_1280.png",
    "https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295401_1280.png",
    "https://cdn.pixabay.com/photo/2013/07/13/12/46/avatar-159236_1280.png",
  ];

  useEffect(() => {
    if (usuarioData?.apodo) {
      const index = usuarioData.apodo.length % avatares.length;
      setAvatarUrl(avatares[index]);
    }
  }, [usuarioData]);

  if (!usuarioData) return <p>Cargando perfil...</p>;

  return (
    <section className="card perfil">
      <h2>💗 Bienvenido a tu perfil</h2>
      <div className="avatar">
        <img src={avatarUrl} alt="Avatar" />
      </div>
      <p>
        <strong>Nombre completo:</strong> {usuarioData.name}
      </p>
      <p>
        <strong>Alias:</strong> {usuarioData.apodo}
      </p>
      <p>
        <strong>Correo:</strong> {usuarioData.email}
      </p>
      {usuarioData.descripcion && (
        <>
          <p>
            <strong>Descripción:</strong>
          </p>
          <p className="descripcion">{usuarioData.descripcion}</p>
        </>
      )}
    </section>
  );
}

export default Unete;
