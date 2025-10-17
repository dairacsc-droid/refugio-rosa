import './Inicio.css'

function Inicio() {
    
  return (
    <>
    <main>
      <section className="slider">
        <div className="slides">
          <div className="slide active">
            <img
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800"
              alt="Cupcake 1"
            />
            <div className="text">
              <h2>We Implement Your Delicious Dreams...</h2>
            </div>
          </div>
          <div className="slide">
            <img
              src="https://images.unsplash.com/photo-1565958011705-44e211f0464a?w=800"
              alt="Cupcake 2"
            />
            <div className="text">
              <h2>Made For You With Love </h2>
            </div>
          </div>
          <div className="slide">
            <img
              src="https://images.unsplash.com/photo-1606313564200-1f6a6ec96741?w=800"
              alt="Cupcake 3"
            />
            <div class="text">
              <h2>Sweet Moments, Sweet Memories</h2>
            </div>
          </div>
        </div>
        <button className="prev">&#10094;</button>
        <button className="next">&#10095;</button>
      </section>
      <section className="caracteristicas">
        <h3 className="objetivos-container">Objetivos</h3>

        <div className="grid-cards">
         <div className="caracteristica">
          <h6>✦ Espacio para desahogarse</h6>
          <p>Expresar lo que sentimos, lo bueno, lo malo, lo raro, todo vale.</p>
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
          <span>{"Un refugio digital hecho por y para chicas " }</span>
        </h3>
        <div className="cards">
          <div className="card">
            <h3>🌸Visión</h3>
            <p>
              Queremos construir un espacio digital donde cada chica pueda
              sentirse segura, escuchada y acompañada. Soñamos con una comunidad
              que inspire confianza y empatía, donde compartir emociones, ideas
              y experiencias sea natural, y donde el apoyo mutuo nos recuerde
              que juntas podemos crecer, aprender y brillar sin miedo a ser
              quienes somos.
            </p>
          </div>
          <div className="card">
            <h3>💡Misión</h3>
            <p>
              Nuestra misión es ofrecer un lugar cercano y accesible, pensado
              para adolescentes y jóvenes que buscan un refugio en medio del día
              a día. Aquí podrás desahogarte, encontrar tips de autocuidado,
              descubrir historias motivadoras y conectar con otras chicas que te
              entienden. Queremos recordarte que no estás sola, que tu voz
              importa y que siempre habrá alguien dispuesto a escucharte y
              acompañarte en tu camino.
            </p>
          </div>
        </div>
      </section>
    </main>
    <section className="team">
      <h3>¿Quiénes somos?</h3>
      <div className="members">
        <div className="member">
          <img src="./assets/img/yei.jpeg" alt="" />
          <h4>YEIMI ORTIZ</h4>
          <p>Diseñadora</p>
        </div>
        <div className="member">
          <img src="./assets/img/mar.jpeg" alt="" />
          <h4>MARINA SANTANA</h4>
          <p>Programadora</p>
        </div>
      </div>
    </section>
    </>
  );
}

export default Inicio;