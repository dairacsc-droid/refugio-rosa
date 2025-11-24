import { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const provider = new GoogleAuthProvider();

function Login({ OnLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const iniciarSesion = async () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        OnLogin(user);
        navigate("/"); 
      })
      .catch((error) => {
        console.log("Error al iniciar sesión");
        console.log(error);
      });
  };

  const iniciarSesionGoogle = async () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        OnLogin(user);
        navigate("/");
      })
      .catch((error) => {
        console.log("Error al iniciar con Google");
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white/70 backdrop-blur-sm shadow-xl rounded-2xl p-8 w-full max-w-md border border-pink-200 space-y-4">
        <h1 className="text-3xl font-bold text-pink-600 text-center mb-6">
          Iniciar Sesión
        </h1>
        <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electronico</label>
        <input
          type="email"
          placeholder="Escribe tu email"
          className="w-full p-3 border rounded-xl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

         <label className="block text-sm font-medium text-gray-700 mb-1"> Contraseña</label>
        <input
          type="password"
          placeholder="Escribe tu contraseña"
          className="w-full p-3 border rounded-xl"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full mt-4 bg-pink-500 text-white rounded-xl p-3"
          onClick={iniciarSesion}
        >
          Iniciar sesión
        </button>

        <button
          className="w-full mt-2 border border-pink-500 rounded-xl p-3"
          onClick={iniciarSesionGoogle}
        >
          Iniciar sesión con Google
        </button>

        <p className="text-center mt-4 text-gray-600 text-sm">
          ¿No tienes una cuenta?
        </p>
        <button
          className="w-full text-pink-600 hover:underline font-semibold "
          onClick={() => navigate("/registrarse")}
        >
          Crear cuenta
        </button>
      </div>
    </div>
  );
}

export default Login;
