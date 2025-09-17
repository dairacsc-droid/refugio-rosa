let tipsAutocuidado = [
  {
    name: "Cuida tu mente",
    description: "Escribe lo que sientes, haz pausas de redes y date permiso de descansar.",
    imgUrl: "blob:https://web.whatsapp.com/e0129cd7-1dd3-4248-a642-3ebb67817a0d"
  },
  {
    name: "Mantente saludable",
    description: "Duerme lo suficiente, hidrátate y mueve tu cuerpo día a día.",
    imgUrl: "../img/grupo.jpg  "
  },
  {
    name: "Expresa tu creatividad",
    description: "Dibuja, pinta o cocina algo nuevo sin buscar que sea perfecto.",
    imgUrl: "https://web.whatsapp.com/0d647603-48d5-4d5c-91d6-3aef21a1bc5d"
  },
  {
    name: "Engríete",
    description: "Toma una ducha relajante, respira profundo y disfruta pequeños placeres.",
    imgUrl: "blob:https://web.whatsapp.com/2c7346c8-7a3b-4ab9-af1e-dcdb4261074a"
  },
  {
    name: "Desconéctate un rato",
    description: "Apaga el celular una hora y disfruta el momento presente.",
    imgUrl: "blob:https://web.whatsapp.com/c2b17c16-d275-451c-bcbb-c3f1aefa4488"
  },
  {
    name: "Rutina de amor propio",
    description: "Cuida tu piel, ponte tu perfume favorito o arréglate solo para ti.",
    imgUrl: "blob:https://web.whatsapp.com/638569ab-ccf9-460d-bbe2-28d4f12f819b"
  },
  {
    name: "Lee algo que te inspire",
    description: "Desde un libro hasta frases bonitas en Pinterest.",
    imgUrl: "blob:https://web.whatsapp.com/0f78326e-c84a-4d9c-bcb1-da8bda4102c0"
  },
  {
    name: "Conecta con la naturaleza",
    description: "Pasea, siéntate al sol o acaricia a tu mascota.",
    imgUrl: "blob:https://web.whatsapp.com/555b3972-d0da-4ac6-a8f5-e8ea9b4ee905"
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
