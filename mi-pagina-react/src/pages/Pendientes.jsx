import { useState, useEffect } from "react";

import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

function Pendientes() {
  const [Materia, setMateria] = useState("");
  const [Descripcion, setDescripcion] = useState("");

  const [tarea, setTareas] = useState([]);
  const [editandoID, setEditandoID] = useState(null);
  const [materiaEditado, setMateriaEditado] = useState("");
  const [descripcionEditada, setDescripcionEditada] = useState("");

  const AgregarUsuarios = async () => {
    if (!Materia || !Descripcion) return;
    try {
      const docRef = await addDoc(collection(db, "tareas"), {
        materia: Materia,
        descripcion: Descripcion,
        fecha: new Date(),
      });
      console.log("Usuario agregado ID: ", docRef.id);
      setMateria("");
      setDescripcion("");
    } catch (e) {
      console.error("Error agregando usuario: ", e);
    }
  };

  useEffect(() => {
    const ObtenerTareas = onSnapshot(collection(db, "tareas"), (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTareas(lista);
    });
    return ObtenerTareas;
  }, []);

  // --- Editar tarea ---
  const editarTarea = async (id) => {
    const tareaRef = doc(db, "tareas", id);
    await updateDoc(tareaRef, {
      materia: materiaEditado,
      descripcion: descripcionEditada,
    });
    setEditandoID(null);
  };

  // --- Eliminar tarea ---
  const eliminarTarea = async (id) => {
    const confirmar = window.confirm("¿Confirmar eliminación?");
    if (confirmar) {
      await deleteDoc(doc(db, "tareas", id));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {/* --- Formulario de agregar usuario --- */}
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-purple-200 mb-8">
        <h1 className="text-2xl font-semibold text-purple-700 text-center mb-6">
          Añadir Pendiente
        </h1>

        <input
          type="text"
          placeholder="Materia"
          value={Materia}
          onChange={(e) => setMateria(e.target.value)}
          className="w-full p-3 border border-purple-300 rounded-xl mb-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
        />
        <textarea
          placeholder="Describe tu pendientes"
          value={Descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full p-3 border border-purple-300 rounded-xl mb-3 h-20 resize-none focus:ring-2 focus:ring-purple-500 focus:outline-none"
        />

        <button
          onClick={AgregarUsuarios}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl shadow-md transition duration-200"
        >
          Agregar pendiente
        </button>
      </div>

      {/* --- Lista de tareas (editar y eliminar) --- */}
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-purple-200">
        <h2 className="text-2xl font-semibold text-purple-700 text-center mb-6">
          Lista de Tareas
        </h2>
        <ul className="list-disc marker:text-sky-400">
          {tarea.map((t) => (
            <li key={t.id} className="mb-3">
              {editandoID === t.id ? (
                <>
                  <input
                    type="text"
                    value={MateriaEditado}
                    onChange={(e) => setMateriaEditado(e.target.value)}
                    className="border border-purple-300 rounded-xl p-2 mr-2"
                  />
                  <input
                    type="text"
                    value={descripcionEditada}
                    onChange={(e) => setDescripcionEditada(e.target.value)}
                    className="border border-purple-300 rounded-xl p-2 mr-2"
                  />
                  <button
                    onClick={() => editarTarea(t.id)}
                    className="bg-purple-400 hover:bg-purple-600 text-white font-semibold py-1 px-3 rounded-xl mr-2"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditandoID(null)}
                    className="bg-gray-400 hover:bg-gray-600 text-white font-semibold py-1 px-3 rounded-xl"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <p>
                    <strong>{t.materia}</strong> - {t.descripcion}
                  </p>
                  <div className="flex space-x-2 mt-1">
                    <button
                      onClick={() => {
                        setEditandoID(t.id);
                        setMateriaEditado(t.materia);
                        setDescripcionEditada(t.descripcion);
                      }}
                      className="bg-purple-400 hover:bg-purple-600 text-white font-semibold py-1 px-3 rounded-xl"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => eliminarTarea(t.id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-xl"
                    >
                      Eliminar
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Pendientes;
