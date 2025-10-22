import { useState, useEffect } from "react";
import "./Inicio.css";
import mood1 from "../assets/moodboard/mood1.jpg"
import mood2 from "../assets/moodboard/mood2.jpg"
import mood3 from "../assets/moodboard/mood3.jpg"
import yei from "../assets/nosotras/yei.jpg";
import mari from "../assets/nosotras/mari.jpg";

function Inicio() {
  const slidesData = [
    {
      img: mood1 ,
      
    },
    {
      img: mood2 ,
      
    },
    {
      img: mood3,
    
    },
  ];

  const [current, setCurrent] = useState(0);
  const totalSlides = slidesData.length;

  // Funciones para Next y Prev
  const nextSlide = () => setCurrent((prev) => (prev + 1) % totalSlides);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides);

  // Auto-slide cada 4 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(interval); // Limpieza al desmontar
  }, [totalSlides]);

  return (
    <>
      <main>
        <section className="slider">
          <div
            className="slides"
            style={{
              transform: `translateX(-${current * 100}%)`,
              transition: "transform 0.5s ease-in-out",
            }}
          >
            {slidesData.map((slide, index) => (
              <div
                key={index}
                className={`slide ${index === current ? "active" : ""}`}
              >
                <img src={slide.img} alt={`Cupcake ${index + 1}`} />
                <div className="text">
                  <h2>{slide.text}</h2>
                </div>
              </div>
            ))}
          </div>

          <button className="prev" onClick={prevSlide}>
            &#10094;
          </button>
          <button className="next" onClick={nextSlide}>
            &#10095;
          </button>
        </section>
        <section className="caracteristicas">
          <h3 className="objetivos-container">Objetivos</h3>

          <div className="grid-cards">
            <div className="caracteristica">
              <h6>✦ Espacio para desahogarse</h6>
              <p>
                Expresar lo que sentimos, lo bueno, lo malo, lo raro, todo vale.
              </p>
            </div>

            <div className="caracteristica">
              <h6>✦ Conectar de verdad</h6>
              <p>Aquí puedes hacer amigas que te entiendan sin juzgarte.</p>
            </div>

            <div className="caracteristica">
              <h6>✦ Tips para todas</h6>
              <p>Consejitos sobre estudio, autocuidado, paz mental y más.</p>
            </div>

            <div className="caracteristica">
              <h6>✦ Crecemos juntas</h6>
              <p>Un mal día jamás te define.</p>
            </div>
          </div>
        </section>

        <section className="services">
          <h3>
            Visión & Misión <br />
            <span>{"Un refugio digital hecho por y para chicas "}</span>
          </h3>
          <div className="cards">
            <div className="card">
              <h3>🌸Visión</h3>
              <p>
                Queremos construir un espacio digital donde cada chica pueda
                sentirse segura, escuchada y acompañada. Soñamos con una
                comunidad que inspire confianza y empatía, donde compartir
                emociones, ideas y experiencias sea natural, y donde el apoyo
                mutuo nos recuerde que juntas podemos crecer, aprender y brillar
                sin miedo a ser quienes somos.
              </p>
            </div>
            <div className="card">
              <h3>💡Misión</h3>
              <p>
                Nuestra misión es ofrecer un lugar cercano y accesible, pensado
                para adolescentes y jóvenes que buscan un refugio en medio del
                día a día. Aquí podrás desahogarte, encontrar tips de
                autocuidado, descubrir historias motivadoras y conectar con
                otras chicas que te entienden. Queremos recordarte que no estás
                sola, que tu voz importa y que siempre habrá alguien dispuesto a
                escucharte y acompañarte en tu camino.
              </p>
            </div>
          </div>
        </section>
      </main>
      <section className="team">
        <h3>¿Quiénes somos?</h3>
        <div className="members">
          <div className="member">
            <img src={yei} alt="" />
            <h4>YEIMI ORTIZ</h4>
            <p>Diseñadora</p>
          </div>
          <div className="member">
            <img src={mari} alt="" />
            <h4>MARINA SANTANA</h4>
            <p>Programadora</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Inicio;
