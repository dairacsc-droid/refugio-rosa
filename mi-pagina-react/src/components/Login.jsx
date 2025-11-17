import { useState } from "react"
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useNavigate } from "react-router-dom";

const provider = new GoogleAuthProvider();


function Login({onLogin, cambiarVista}) {
 const [email,setEmail] = useState ("");
 const [password, setPassword] = useState ("");

 const navigate = useNavigate();

 const iniciarSesion = async() => {const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("Se inicio sesion");
    onLogin(user);
    navigate("/");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Error al inciar sesion");
    console.log(error);
  });}

  const iniciarSesionGoogle = async () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log("Iniciaste sesion con Google");
      onLogin(user);
      navigate ("/");
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log("Error al iniciar con Google");
      console.log(error);
    });
  };

 

    return  (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-100 to-white p-6">
      <div className="bg-white/70 backdrop-blur-sm shadow-xl rounded-2xl p-8 w-full max-w-md border border-pink-200 space-y-4">
        <h1 className="text-3xl font-bold text-pink-600 text-center mb-6">Iniciar Sesión</h1>

        <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
        <input
          className="w-full p-3 border border-pink-300 rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none"
          type="email"
          placeholder="Escribe tu Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
        <input
          className="w-full p-3 border border-pink-300 rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none"
          type="password"
          placeholder="Escribe tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full mt-4 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-xl shadow-md transition duration-200"
          onClick={iniciarSesion}
        >
          Iniciar sesión
        </button>

        <button
          className="w-full mt-2 bg-white border border-pink-300 hover:bg-pink-50 text-pink-600 font-medium py-3 rounded-xl shadow-sm transition duration-200"
          onClick={iniciarSesionGoogle}
        >
          Iniciar sesión con Google
        </button>

        <div className="text-center mt-4">
          <p className="text-gray-600 text-sm">¿No tienes una cuenta?</p>
          <button
            className="text-pink-500 hover:underline font-semibold mt-1"
           
          >
            Crear cuenta
          </button>
        </div>
      </div>
    </div>
    )
}
export default Login