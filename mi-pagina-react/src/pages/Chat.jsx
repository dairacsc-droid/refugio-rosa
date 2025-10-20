import { useState } from "react";
import "./Chat.css";

function Chat() {
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);

  const enviarMensaje = (e) => {
    e.preventDefault();
    if (!mensaje.trim()) return;

    const nuevoMensaje = {
      id: Date.now(),
      texto: mensaje,
      autor: "Anónima 🌷",
      hora: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMensajes([...mensajes, nuevoMensaje]);
    setMensaje("");
  };

  return (
    <main className="chat-container">
      <section className="chat-box">
        <h2>💬 Chat de la Comunidad</h2>
        <p className="chat-descripcion">
          Un espacio seguro para compartir tus pensamientos, ideas y ánimos 💖
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
                  <span className="hora">{msg.hora}</span>
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
