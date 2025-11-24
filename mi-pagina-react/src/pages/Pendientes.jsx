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
import "../pages/Pendientes.css";


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
  <>
  <h3 className="titulo"> ⚜ Mi Agenda Personal ⚜<br />
          </h3>            
          <div className="subt">{"Guarda aquí los pendientes que no quieres olvidar."}</div>
  <div className="min-h-screen w-full flex items-center justify-center py-10 px-4 fondo-pendientes">
    <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">

      {/* --- Formulario --- */}
      <div className="contenedor-formulario p-8 rounded-2xl shadow-lg">
        <h1 className="titulo-principal text-center mb-6">Añadir Pendiente</h1>

        <input
          type="text"
          placeholder="Materia"
          value={Materia}
          onChange={(e) => setMateria(e.target.value)}
          className="input-estilos w-full p-3 rounded-xl mb-3"
        />

        <textarea
          placeholder="Describe tu pendiente"
          value={Descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="input-estilos w-full p-3 rounded-xl mb-3 h-24 resize-none"
        />

        <button
          onClick={AgregarUsuarios}
          className="btn-agregar w-full py-3 rounded-xl"
        >
          Agregar pendiente
        </button>
      </div>

      {/* --- Lista --- */}
      <div className="contenedor-lista p-8 rounded-2xl shadow-lg">
        <h2 className="titulo-principal text-center mb-6">Lista de Tareas</h2>

        <ul>
          {tarea.map((t) => (
            <li key={t.id} className="tarea-item p-4 rounded-xl mb-6">

              {/* MODO EDICIÓN */}
              {editandoID === t.id ? (
                <>
                  <input
                    type="text"
                    value={materiaEditado}
                    onChange={(e) => setMateriaEditado(e.target.value)}
                    className="input-estilos w-full p-2 rounded-xl mb-2"
                  />

                  <textarea
                    value={descripcionEditada}
                    onChange={(e) => setDescripcionEditada(e.target.value)}
                    className="input-estilos w-full p-2 rounded-xl mb-2 h-20 resize-none"
                  />

                  <div className="flex gap-3">
                    <button
                      onClick={() => editarTarea(t.id)}
                      className="btn-guardar py-2 px-4 rounded-xl"
                    >
                      Guardar
                    </button>

                    <button
                      onClick={() => setEditandoID(null)}
                      className="btn-cancelar py-2 px-4 rounded-xl"
                    >
                      Cancelar
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="tarea-materia">{t.materia}</p>
                  <p className="tarea-descripcion">{t.descripcion}</p>

                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => {
                        setEditandoID(t.id);
                        setMateriaEditado(t.materia);
                        setDescripcionEditada(t.descripcion);
                      }}
                      className="btn-editar py-1 px-3 rounded-xl"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => eliminarTarea(t.id)}
                      className="btn-eliminar py-1 px-3 rounded-xl"
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
  </div>
  </>
);


}

export default Pendientes;
