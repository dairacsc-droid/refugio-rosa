// Lista de cartas (cada una con su info)
const generos = [
  ["pop", "../img/pop.jpg", "Pop", "Ritmos alegres y pegajosos que nunca pasan de moda."],
  ["rock", "../img/rock.jpg", "Rock", "Potente, rebelde y lleno de energía."],
  ["lofi", "../img/lofi.jpg", "Lo-Fi", "Ideal para estudiar y relajarte, con beats suaves."],
  ["reggaeton", "../img/regueton.jpg", "Reggaetón", "Ritmos tropicales para bailar y disfrutar."],
  ["electronica", "../img/electronica.jpeg", "Electrónica", "Música vibrante con sintetizadores y beats electrizantes."],
  ["jazz", "../img/jazz.jpg", "Jazz", "Improvisación y melodías suaves, ideal para momentos tranquilos."],
  ["clasica", "../img/clasica.jpg", "Clásica", "La música más elegante, perfecta para relajarse y concentrarse."],
  ["indie", "../img/indie.jpg", "Indie", "Sonidos alternativos y auténticos para los más experimentales."]
];

// Dónde va todo
const contenedor = document.getElementById("contenedor");

// Crear cada carta
for (let i = 0; i < generos.length; i++) {
  let genero = generos[i];

  contenedor.innerHTML += `
    <a class="carta ${genero[0]}" href="#">
      <div class="imagen">
        <img src="${genero[1]}" alt="${genero[2]}">
      </div>
      <p class="gene">Género</p>
      <p class="name">${genero[2]}</p>
      <p class="description">${genero[3]}</p>
    </a>
  `;
}
