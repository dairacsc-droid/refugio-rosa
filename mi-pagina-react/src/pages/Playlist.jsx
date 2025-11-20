import React, { useState, useRef, useEffect } from "react";
import "../pages/Playlist.css";

const Playlist = () => {
  // Lista editable
  const [tracks, setTracks] = useState([
    {
      title: "Addict",
      artist: "Silva Hound",
      description: "ADDICT™ es una canción compuesta por Silva Hound...",
      src: "/music/addict.mp3",
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
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Refs para el formulario de nuevas canciones
  const titleRef = useRef();
  const artistRef = useRef();
  const srcRef = useRef();

  const currentTrack = tracks[currentIndex];

  // Actualiza audio al cambiar canción
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.play();
    else audioRef.current.pause();
  }, [isPlaying, currentIndex]);

  // Funciones control
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

  // Agregar canción
  const addTrack = () => {
    const newTrack = {
      title: titleRef.current.value.trim(),
      artist: artistRef.current.value.trim(),
      description: "—",
      src: srcRef.current.value.trim(),
    };

    if (!newTrack.title || !newTrack.artist || !newTrack.src) return;

    setTracks((prev) => [...prev, newTrack]);

    titleRef.current.value = "";
    artistRef.current.value = "";
    srcRef.current.value = "";
  };

  // Eliminar canción
  const removeTrack = (index) => {
    setTracks((prev) => prev.filter((_, i) => i !== index));

    // Si eliminas la que está sonando, reajustamos
    if (index === currentIndex) {
      setCurrentIndex(0);
      setIsPlaying(false);
    }
  };

  return (
    <div className="player-wrap">
      <section className="player-body">
        {/* Disco */}
        <div className="left-col">
          <div className="vinyl-wrap">
            <div id="vinyl" className={`vinyl ${isPlaying ? "spin" : ""}`}>
              <div className="label">
                <div className="label-text">{currentTrack?.title}</div>
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

        {/* Info */}
        <div className="center-col">
          <h1 className="track-title">{currentTrack?.title}</h1>
          <p className="artist">{currentTrack?.artist}</p>
          <div className="description">{currentTrack?.description}</div>
        </div>

        {/* Playlist */}
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
                <div className="track-meta">
                  <p className="track-name">{track.title}</p>
                  <p className="track-sub">{track.artist}</p>
                </div>

                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTrack(index);
                  }}
                >
                  🗑
                </button>
              </div>
            ))}
          </div>
        </aside>
      </section>

      {/* Barra de búsqueda */}
      <div className="search-bar">
        <input placeholder="🔍 presiona para buscar una canción" />
        <button className="xbtn">✕</button>
      </div>

      {/* Formulario para añadir canciones */}
      <div className="add-form">
        <input ref={titleRef} placeholder="Título" />
        <input ref={artistRef} placeholder="Artista" />
        <input ref={srcRef} placeholder="URL del MP3" />
        <button className="add-btn" onClick={addTrack}>
          ➕ Añadir
        </button>
      </div>

      <audio ref={audioRef} src={currentTrack?.src} onEnded={handleEnd} />
    </div>
  );
};

export default Playlist;
