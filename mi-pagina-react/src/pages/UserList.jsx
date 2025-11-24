import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import "../index.css";

function UserList() {
  const [usuario, setUsuarios] = useState([]);

  const [editandoID, setEditandoID] = useState(null);
  const [nombreEditado, setNombreEditado] = useState("");
  const [descripcionEditada, setDescripcionEditada] = useState("");
  const [correoEditado, setCorreoEditado] = useState("");
  const [celularEditado, setCelularEditado] = useState("");

  const editarUsuario = async (id) => {
    const UsuarioRef = doc(db, "usuarios", id);
    await updateDoc(UsuarioRef, {
      nombre: nombreEditado,
      descripcion: descripcionEditada,
      correo: correoEditado,
      celular: celularEditado,
    });
    setEditandoID(null);
  };

  useEffect(() => {
    const ObtenerUsuarios = onSnapshot(
      collection(db, "usuarios"),
      (snapshot) => {
        const lista = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsuarios(lista);
      }
    );
    return ObtenerUsuarios;
  }, []);

  const eliminarUsuario = async (id) => {
    const confirmar = window.confirm("confirmar?");
    if (confirmar) {
      await deleteDoc(doc(db, "usuarios", id));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  from-purple-100 via-pink-100 to-white p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl border border-purple-200">
        <h2 className="text-3xl font-semibold text-purple-700 text-center mb-8">
          Lista de Usuarios
        </h2>
        <ul className="space-y-6">
          {usuario.map((usuario) => (
            <li
              key={usuario.id}
              className="bg-purple-50 border border-purple-200 rounded-xl p-4 shadow-sm hover:shadow-md transition duration-200"
            >
              {editandoID === usuario.id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Nombre"
                    value={nombreEditado}
                    onChange={(e) => setNombreEditado(e.target.value)}
                    className="w-full p-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                  <textarea
                    type="text"
                    placeholder="Descripción"
                    value={descripcionEditada}
                    onChange={(e) => setDescripcionEditada(e.target.value)}
                    className="w-full p-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Correo"
                    value={correoEditado}
                    onChange={(e) => setCorreoEditado(e.target.value)}
                    className="w-full p-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Celular"
                    value={celularEditado}
                    onChange={(e) => setCelularEditado(e.target.value)}
                    className="w-full p-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                  <div className="flex justify-end space-x-3">
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition"
                      onClick={() => editarUsuario(usuario.id)}
                    >
                      Guardar
                    </button>
                    <button
                      className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition"
                      onClick={() => setEditandoID(null)}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-lg font-semibold text-purple-700">
                    {usuario.nombre}
                  </p>
                  <p className="text-gray-600">{usuario.descripcion}</p>
                  <p className="text-sm text-gray-500">{usuario.correo}</p>
                  <p className="text-sm text-gray-500 mb-3">
                    {usuario.celular}
                  </p>
                  <div className="flex justify-end space-x-3">
                    <button
                      className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition"
                      onClick={() => {
                        setEditandoID(usuario.id);
                        setNombreEditado(usuario.nombre);
                        setDescripcionEditada(usuario.descripcion);
                        setCorreoEditado(usuario.correo);
                        setCelularEditado(usuario.celular);
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
                      onClick={() => eliminarUsuario(usuario.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserList;
