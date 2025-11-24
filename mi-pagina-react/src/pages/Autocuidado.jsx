import React from "react";
import Card from "../components/Card";
import "../pages/Autocuidado.css";
import escribe from "../assets/tips/escribe.jpg";
import saludable from "../assets/tips/saludable.jpg";
import dibuja from "../assets/tips/dibuja.jpg";
import engriete from "../assets/tips/engriete.jpg";
import desconectate from "../assets/tips/desconectate.jpg";
import rutina from "../assets/tips/rutina.jpg";
import lee from "../assets/tips/lee.jpg";
import naturaleza from "../assets/tips/naturaleza.jpg";

const tipsAutocuidado = [
  {
    name: "Cuida tu mente",
    description:
      "Escribe lo que sientes, haz pausas de redes y date permiso de descansar.",
    imgUrl: escribe,
  },
  {
    name: "Mantente saludable",
    description: "Duerme lo suficiente, hidrátate y mueve tu cuerpo día a día.",
    imgUrl: saludable,
  },
  {
    name: "Expresa tu creatividad",
    description:
      "Dibuja, pinta o cocina algo nuevo sin buscar que sea perfecto.",
    imgUrl: dibuja,
  },
  {
    name: "Engríete",
    description:
      "Toma una ducha relajante, respira profundo y disfruta pequeños placeres.",
    imgUrl: engriete,
  },
  {
    name: "Desconéctate un rato",
    description: "Apaga el celular una hora y disfruta el momento presente.",
    imgUrl: desconectate,
  },
  {
    name: "Rutina de amor propio",
    description:
      "Cuida tu piel, ponte tu perfume favorito o arréglate solo para ti.",
    imgUrl: rutina,
  },
  {
    name: "Lee algo que te inspire",
    description: "Desde un libro hasta frases bonitas en Pinterest.",
    imgUrl: lee,
  },
  {
    name: "Conecta con la naturaleza",
    description: "Pasea, siéntate al sol o acaricia a tu mascota.",
    imgUrl: naturaleza,
  },
];
function Autocuidado() {
  return (
    <section className="autocuidado">
      <div >
        <h2 className=" m-6 text-4xl ips titulo">
          <>♔Tips para ti♔</>
        </h2>

        <div className="row" id="tarjetas-container">
          {tipsAutocuidado.map((tip, index) => (
            <Card
              key={index}
              name={tip.name}
              description={tip.description}
              imgUrl={tip.imgUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Autocuidado;
