let datos =[
    {
    nombre:"Pop",
    descripcion :"Ritmos alegres y pegajosos que nunca pasan de moda "
    },
    {
        nombre:"Rock",
        descripcion:"Potente, rebelde y lleno de energía."
    },
    {
       
        nombre:"Lofi",
        descripcion:"Ideal para estudiar y relajarte, con beats suaves."
    },
    {
         
        nombre:"Reggaeton",
        descripcion:"Ritmos tropicales para bailar y disfrutar."
    },
    {
        
        nombre:"Electronica",
        descripcion:" Música vibrante con sintetizadores y beats electrizantes.",
    },
    {
        
        nombre:"Jazz",
        descripcion:" Improvisación y melodías suaves, ideal para momentos tranquilos.",
    },
     {
       
        nombre:"Clasica",
        descripcion:"La música más elegante, perfecta para relajarse y concentrarse.",
    }, {
        
        nombre:"Indie",
        descripcion:" Sonidos alternativos y auténticos para los más experimentales.",
    },
]

var contenedor = document.getElementById("contenedor");

// Bucle for clásico
for (let i = 0; i < datos.length; i++) {

  contenedor.innerHTML += `
    <a class="carta" href="#">
      <div class="imagen">
        <img src="../img/${datos[i].nombre.toLowerCase()}.jpg" alt="${datos[i].nombre}">
      </div>
      <p class="gene">Género</p>
      <p class="name">${datos[i].nombre}</p>
      <p class="description">${datos[i].descripcion}</p>
    </a>
  `;
}