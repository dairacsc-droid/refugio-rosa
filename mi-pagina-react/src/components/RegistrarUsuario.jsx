import { useState } from "react"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function RegistrarUsuario({OnRegister, cambiarVista}){
 const [email,setEmail] = useState ("");
 const [password, setPassword] = useState ("");
 const [name, setName] = useState ("");
 const [apodo, setApodo] = useState ("");

 const registrar = async() => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log("Cuenta creada con exito");
    OnRegister(user)
    
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Error al registrar el usuario");
    console.log(error)
    
  });
 }
const [usuarioRegistrado, setUsuarioRegistrado] = useState(null);

<RegistrarUsuario OnRegister={(user) => {
  setUsuarioRegistrado({
    name: name, 
    apodo: apodo,
    email: user.email,
    descripcion: "", // opcional, luego puedes agregar textarea
  });
}} />

{usuarioRegistrado && <PerfilUsuario usuarioData={usuarioRegistrado} />}

    return  (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-100 to-white p-6">
    <div className="bg-white/70 backdrop-blur-sm shadow-xl rounded-2xl p-8 w-full max-w-md border border-pink-200 space-y-4 mt-0">
      <h1 className="text-3xl font-bold text-pink-600 text-center mb-6">
        Registrar Usuario
      </h1>
      <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
       <input
        className="w-full p-3 border border-pink-300 rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none"
        type="name"
        placeholder="Escribe tu nombre completo"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label className="block text-sm font-medium text-gray-700 mb-1">Alias</label>
      <input
        className="w-full p-3 border border-pink-300 rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none"
        type="name"
        placeholder="Escribe como quieres que te llamemos"
        value={apodo}
        onChange={(e) => setApodo(e.target.value)}
      />
      <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electronico</label>
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
        onClick={registrar}
      >
        Registrarse
      </button>

      <div className="text-center mt-4">
        <p className="text-gray-600 text-sm">¿Ya tienes una cuenta?</p>
        <button
          className="text-white hover:underline font-semibold mt-1"
        
        >
          Iniciar sesión
        </button>
      </div>
    </div>
  </div>
    )
}
export default RegistrarUsuario