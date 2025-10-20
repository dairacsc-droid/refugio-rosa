import React from "react";
import Card from "../components/Card";
import "../pages/Autocuidado.css";

const tipsAutocuidado = [
  {
    name: "Cuida tu mente",
    description:
      "Escribe lo que sientes, haz pausas de redes y date permiso de descansar.",
    imgUrl: "../../assets",
  },
  {
    name: "Mantente saludable",
    description: "Duerme lo suficiente, hidrátate y mueve tu cuerpo día a día.",
    imgUrl: "../../assets/img/grupo.jpg",
  },
  {
    name: "Expresa tu creatividad",
    description:
      "Dibuja, pinta o cocina algo nuevo sin buscar que sea perfecto.",
    imgUrl: "/assets/img/pintar.jpeg",
  },
  {
    name: "Engríete",
    description:
      "Toma una ducha relajante, respira profundo y disfruta pequeños placeres.",
    imgUrl: "/assets/img/tomaunaducha.jpeg",
  },
  {
    name: "Desconéctate un rato",
    description: "Apaga el celular una hora y disfruta el momento presente.",
    imgUrl: "/assets/img/apagaelcel.jpeg",
  },
  {
    name: "Rutina de amor propio",
    description:
      "Cuida tu piel, ponte tu perfume favorito o arréglate solo para ti.",
    imgUrl: "/assets/img/rutina.jpeg",
  },
  {
    name: "Lee algo que te inspire",
    description: "Desde un libro hasta frases bonitas en Pinterest.",
    imgUrl: "/assets/img/leealgoqueteinspire.jpeg",
  },
  {
    name: "Conecta con la naturaleza",
    description: "Pasea, siéntate al sol o acaricia a tu mascota.",
    imgUrl: "/assets/img/naturaleza.jpeg",
  },
];
function Autocuidado() {
  return (
    <section className="autocuidado">
      <div >
        <h2 className=" m-6 text-5xl font-bold tips">
          <span>Tips para ti</span>
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
