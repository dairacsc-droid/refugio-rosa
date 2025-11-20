import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { serverTimestamp } from "firebase/firestore";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import "./Chat.css";

function Chat() {
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const [usuarioActual, setUsuarioActual] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuarioActual(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "mensajes"), orderBy("hora"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const mensajesFirestore = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMensajes(mensajesFirestore);
    });

    return () => unsubscribe();
  }, []);

  const enviarMensaje = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      alert("Debes iniciar sesión para enviar mensajes.");
      return;
    }

    if (!mensaje.trim()) return;

    try {
      await addDoc(collection(db, "mensajes"), {
        texto: mensaje,
        autor: auth.currentUser.displayName || auth.currentUser.email,
        hora: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });

      setMensaje("");
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
    }

    setMensaje("");
  };
  const eliminarMensaje = async (id) => {
    await deleteDoc(doc(db, "mensajes", id));
  };

  return (
    <main className="chat-container">
      <section className="chat-box">
        <h2>💬 Chat de la Comunidad</h2>
        <p className="chat-descripcion">
          Un espacio seguro para compartir tus pensamientos, ideas y ánimos.
        </p>

        <div className="mensajes">
          {mensajes.length === 0 ? (
            <p className="sin-mensajes">
              Aún no hay mensajes. ¡Sé la primera en escribir algo bonito! 🌸
            </p>
          ) : (
            mensajes.map((msg) => (
              <div key={msg.id} className="mensaje">
                <div className="mensaje-header">
                  <span className="autor">{msg.autor}</span>
                  <span className="hora">
                    {typeof msg.hora === "string" ? msg.hora : ""}
                  </span>

                  {usuarioActual?.displayName === msg.autor && (
                    <button
                      className="btn-x"
                      onClick={() => eliminarMensaje(msg.id)}
                    >
                      ×
                    </button>
                  )}
                </div>

                <p className="texto">{msg.texto}</p>
              </div>
            ))
          )}
        </div>

        <form onSubmit={enviarMensaje} className="form-chat">
          <input
            type="text"
            placeholder="Escribe tu mensaje..."
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
          />
          <button type="submit" title="Enviar mensaje">
            💌
          </button>
        </form>
      </section>
    </main>
  );
}

export default Chat;
