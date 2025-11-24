import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

function RegistrarUsuario({ OnRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [apodo, setApodo] = useState("");

  const navigate = useNavigate();

  const registrar = async () => {
    const auth = getAuth();

    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await updateProfile(user, {
        displayName: apodo,
      });

      await user.reload();

      console.log("Cuenta creada con éxito");
      console.log("DisplayName guardado:", user.displayName);

      OnRegister(auth.currentUser);
      navigate("/"); 
    } catch (error) {
      console.log("Error al registrar");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-100 to-white p-6">
      <div className="bg-white/70 backdrop-blur-sm shadow-xl rounded-2xl p-8 w-full max-w-md border border-pink-200 space-y-4 mt-0">
        <h1 className="text-3xl font-bold text-pink-600 text-center mb-6">
          Registrar Usuario
        </h1>

        <input
          className="w-full p-3 border border-pink-300 rounded-xl"
          type="text"
          placeholder="Escribe tu nombre completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full p-3 border border-pink-300 rounded-xl"
          type="text"
          placeholder="Escribe como quieres que te llamemos"
          value={apodo}
          onChange={(e) => setApodo(e.target.value)}
        />

        <input
          className="w-full p-3 border border-pink-300 rounded-xl"
          type="email"
          placeholder="Escribe tu Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-3 border border-pink-300 rounded-xl"
          type="password"
          placeholder="Escribe tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full mt-4 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-xl"
          onClick={registrar}
        >
          Registrarse
        </button>

        <div className="text-center mt-4">
          <p className="text-gray-600 text-sm">¿Ya tienes una cuenta?</p>
          <button
            className="text-pink-500 hover:underline font-semibold mt-1"
            onClick={() => navigate("/login")}
          >
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegistrarUsuario;
