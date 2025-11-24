import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Inicio from "./pages/Inicio";
import Chat from "./pages/Chat";
import Autocuidado from "./pages/Autocuidado";
import Playlist from "./pages/Playlist";
import RegistrarUsuario from "./components/RegistrarUsuario";
import Login from "./components/Login";
import Pendientes from "./pages/Pendientes";

function App() {
  const [usuarioRegistrado, setUsuarioRegistrado] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  // ⬅ Redirección automática si ya hay usuario logueado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuarioRegistrado(user);
      } else {
        setUsuarioRegistrado(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <>
      <Header usuario={usuarioRegistrado} />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/chat" element={<Chat usuario={usuarioRegistrado} />} />
        <Route path="/autocuidado" element={<Autocuidado />} />
        <Route
          path="/pendiente"
          element={
            <Pendientes
              usuarioData={usuarioRegistrado}
              actualizarUsuario={setUsuarioRegistrado}
            />
          }
        />
        <Route path="/playlist" element={<Playlist />} />

        {/* Login */}
        <Route
          path="/login"
          element={
            <Login
              OnLogin={(userData) => {
                setUsuarioRegistrado(userData);
                navigate("/"); // Redirige automáticamente después de login
              }}
            />
          }
        />

        {/* Registro */}
        <Route
          path="/registrarse"
          element={
            <RegistrarUsuario
              OnRegister={(userData) => {
                setUsuarioRegistrado(userData);
                navigate("/"); // Redirige automáticamente después de registro
              }}
            />
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
