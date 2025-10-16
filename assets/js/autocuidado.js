let tipsAutocuidado = [
  {
    name: "Cuida tu mente",
    description: "Escribe lo que sientes, haz pausas de redes y date permiso de descansar.",
    description: "Escribe lo que sientes, haz pausas de redes y date permiso de descansar.",
    imgUrl: "../img/escribeloquesiento.jpeg",
  },
  {
    name: "Mantente saludable",
    description: "Duerme lo suficiente, hidrátate y mueve tu cuerpo día a día.",
    imgUrl: "../img/grupo.jpg  ",
  },
  {
    name: "Expresa tu creatividad",
    description: "Dibuja, pinta o cocina algo nuevo sin buscar que sea perfecto.",
    description:
      "Dibuja, pinta o cocina algo nuevo sin buscar que sea perfecto.",
    imgUrl: "../img/pintar.jpeg",
  },
  {
    name: "Engríete",
    description:
      "Toma una ducha relajante, respira profundo y disfruta pequeños placeres.",
    imgUrl: "../img/tomaunaducha.jpeg",
  },
  {
    name: "Desconéctate un rato",
    description: "Apaga el celular una hora y disfruta el momento presente.",
    imgUrl: "../img/apagaelcel.jpeg",
  },
  {
    name: "Rutina de amor propio",
    description:
      "Cuida tu piel, ponte tu perfume favorito o arréglate solo para ti.",
    imgUrl: "../img/rutina.jpeg",
  },
  {
    name: "Lee algo que te inspire",
    description: "Desde un libro hasta frases bonitas en Pinterest.",
    imgUrl: "../img/leealgoqueteinspire.jpeg",
  },
  {
    name: "Conecta con la naturaleza",
    description: "Pasea, siéntate al sol o acaricia a tu mascota.",
    imgUrl: "../img/naturaleza.jpeg",
  },
];

let contenedor = document.getElementById("tarjetas-container");

for (let i = 0; i < tipsAutocuidado.length; i++) {
  contenedor.innerHTML += `
    <div class="card col-12 col-md-6 col-lg-3">
      <div class="card-body p-3">
        <h5 class="card-title text-center">${tipsAutocuidado[i].name}</h5>
        <p class="card-text">${tipsAutocuidado[i].description}</p>
      </div>
      <img src="${tipsAutocuidado[i].imgUrl}" class="card-img-bottom" alt="${tipsAutocuidado[i].name}" />
    </div>
  `;
}
