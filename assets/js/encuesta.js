// Array de preguntas
var Questions = [
  "¿Cuál es tu nombre?",
  "¿Cómo te gustaría que te llamemos?",
  "¿Qué edad tienes?",
  "¿De qué país eres?",
  "¿Qué tipo de contenido te gusta compartir o ver? (moda, consejos, estilo de vida, arte, etc.)",
  "¿Qué esperas encontrar al unirte?",
];

let i = 0;
let respuestas = [];

function Preguntas() {
  document.getElementById("pregunta").innerHTML = Questions[i];
  document.getElementById("respuesta").value = "";
}

Preguntas();

document.getElementById("btnSiguiente").addEventListener("click", function () {
  var valor = document.getElementById("respuesta").value.trim();

  if (valor === "") {
    alert("Por favor escribe tu respuesta");
    return;
  }

  respuestas.push(valor);
  i++;

  if (i < Questions.length) {
    Preguntas(); // muestra la siguiente pregunta
  } else {
  }
});
