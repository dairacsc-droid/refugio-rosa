import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Inicio from "./pages/Inicio";
import Chat from "./pages/Chat";
import Autocuidado from "./pages/Autocuidado";
import Playlist from "./pages/Playlist";
import Perfil from "./pages/Perfil";
import RegistrarUsuario from "./components/RegistrarUsuario";
import Login from "./components/Login";

function App() {
  const [usuarioRegistrado, setUsuarioRegistrado] = useState(null);
  const [redirigido, setRedirigido] = useState(false);

  const auth = getAuth(); // <<<< DEFINIMOS AUTH
  const navigate = useNavigate(); // <<<< DEFINIMOS NAVIGATE

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuarioRegistrado(user);

      if (user && !redirigido) {
        navigate("/perfil");
        setRedirigido(true);
      }
    });

    return () => unsubscribe();
  }, [auth, navigate, redirigido]);

  return (
    <>
      <Header usuario={usuarioRegistrado} />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/chat" element={<Chat usuario={usuarioRegistrado} />} />
        <Route path="/autocuidado" element={<Autocuidado />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route
          path="/perfil"
          element={<Perfil usuarioData={usuarioRegistrado} />}
        />
        <Route
          path="/login"
          element={
            <Login OnLogin={(userData) => setUsuarioRegistrado(userData)} />
          }
        />
        <Route
          path="/registrarse"
          element={
            <RegistrarUsuario
              OnRegister={(userData) => setUsuarioRegistrado(userData)}
            />
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
