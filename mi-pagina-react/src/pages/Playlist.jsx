import React, { useState, useRef, useEffect } from "react";
import "../pages/Playlist.css";

const Playlist = () => {
  // Lista de canciones 🎶
  const tracks = [
    {
      title: "Addict",
      artist: "Silva Hound",
      description:
        "ADDICT™ es una canción compuesta por Silva Hound e interpretada por Michael Kovach (Angel Dust) y Kelly 'Chi-Chi' Boyer (Cherri Bomb).",
      src: "/music/addict.mp3", // 🔊 cambia esta ruta a la tuya
    },
    {
      title: "Pink Venom",
      artist: "BLACKPINK",
      description: "El veneno rosa que conquista con ritmo y fuerza femenina.",
      src: "/music/pinkvenom.mp3",
    },
    {
      title: "Electric Love",
      artist: "BØRNS",
      description: "Una explosión eléctrica de deseo, dulce y brillante.",
      src: "/music/electriclove.mp3",
    },
  ];

  // Estados
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Canción actual
  const currentTrack = tracks[currentIndex];

  // Efecto: cuando cambia la canción
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentIndex]);

  // Controles
  const handlePlayPause = () => setIsPlaying(!isPlaying);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? tracks.length - 1 : prev - 1));
    setIsPlaying(true);
  };

  const handleEnd = () => handleNext();

  return (
    <div className="player-wrap">
      <section className="player-body">
        {/* 🎵 Izquierda: disco */}
        <div className="left-col">
          <div className="vinyl-wrap">
            <div id="vinyl" className={`vinyl ${isPlaying ? "spin" : ""}`}>
              <div className="label">
                <div className="label-text">{currentTrack.title}</div>
              </div>
            </div>

            <div className="controls">
              <button onClick={handlePrev} className="ctl small">
                ⟨
              </button>
              <button onClick={handlePlayPause} className="ctl play">
                {isPlaying ? "❚❚" : "►"}
              </button>
              <button onClick={handleNext} className="ctl small">
                ⟩
              </button>
            </div>
          </div>
        </div>

        {/* 💿 Centro: info */}
        <div className="center-col">
          <h1 className="track-title">{currentTrack.title}</h1>
          <p className="artist">{currentTrack.artist}</p>
          <div className="description">{currentTrack.description}</div>
          <a href="#" className="read-more">
            leer más..
          </a>
        </div>

        {/* 📜 Derecha: playlist */}
        <aside className="right-col">
          <h3 className="playlist-title">Playlist</h3>
          <div className="playlist">
            {tracks.map((track, index) => (
              <div
                key={index}
                className={`track-item ${
                  index === currentIndex ? "active" : ""
                }`}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsPlaying(true);
                }}
              >
                <p className="track-name">{track.title}</p>
                <p className="track-artist">{track.artist}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>

      {/* 🔍 Barra de búsqueda */}
      <div className="search-bar">
        <input
          placeholder="🔍 presiona para buscar una canción"
          onChange={(e) => console.log(e.target.value)}
        />
        <button className="xbtn">✕</button>
      </div>

      {/* 🎶 Reproductor real */}
      <audio ref={audioRef} src={currentTrack.src} onEnded={handleEnd} />
    </div>
  );
};

export default Playlist;
