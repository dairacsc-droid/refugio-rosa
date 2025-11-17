import { Routes, Route } from "react-router-dom";
import app from './firebase'
import { getAuth, signOut } from 'firebase/auth'
import Footer from "./components/Footer";
import Header from "./components/Header";
import Inicio from "./pages/Inicio";
import Chat from "./pages/Chat";
import Autocuidado from "./pages/Autocuidado";
import Playlist from "./pages/Playlist";
import Unete from "./pages/Unete";
import RegistrarUsuario from "./components/RegistrarUsuario";
import Login from "./components/Login"
function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/autocuidado" element={<Autocuidado />} />
        <Route path="/playlist" element={<Playlist />} />
         <Route path="/prueba" element={
              <>
                <Login />
                <RegistrarUsuario />
              </>
            } />
         
        <Route path="/login" element={<Login />} />
        <Route path="/registrarse" element={<RegistrarUsuario />} />
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
