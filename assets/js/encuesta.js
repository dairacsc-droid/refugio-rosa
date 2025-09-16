// Array de preguntas
var Questions = [
  "¿Cuál es tu nombre?",
  "¿Cómo te gustaría que te llamemos?",
  "¿Qué edad tienes?",
  "¿De qué país eres?",
  "¿Qué tipo de contenido te gusta compartir o ver? (moda, consejos, estilo de vida, arte, etc.)",
  "¿Qué esperas encontrar al unirte?"
];

let i = 0;
let respuestas = [];

function Preguntas() {
  const input = document.getElementById("respuesta");
  document.getElementById("pregunta").innerHTML = Questions[i];
  input.value = "";
  if (i === 2) {
    input.type = "number";
    input.placeholder = "Escribe tu edad...";
  } else {
    input.type = "text";
    input.placeholder = "Escribe aquí...";
  }

}
 

function Mensaje() {
  const saludo = respuestas [1];
  const resultado = document.getElementById("resultado")
document.getElementById("mensaje").innerHTML = `¡Bienvenida a Refugio Rosa, ${saludo}!`;
document.getElementById("encuesta").style.display = "none";

}

const mensajeError = document.querySelector("#error")
const mensajeEdad = document.querySelector("#errorEdad")

Preguntas();

document.getElementById("btnSiguiente").addEventListener("click", function () {
  var valor = document.getElementById("respuesta").value.trim();

  if (valor === "") {
    mensajeError.textContent = "❌ No pusiste nada"
    return;
  } else {
    mensajeError.textContent = ""
  }

  if (i === 2) {
    let edad = parseInt(valor);
    if (isNaN(edad)) {
      mensajeEdad.textContent = "⚠️ Ingresa un número válido para la edad";
      return;
    } else {
      mensajeEdad.textContent = ""
    }

    if (edad < 10) {
      mensajeEdad.textContent = "🚫 Edad no permitida, debes tener al menos 10 años"
      return;
    }
  }
  respuestas.push(valor);
  i++;
 
  
  if (i < Questions.length) {
   Preguntas()
  } else {
    Mensaje();
  }
  });

