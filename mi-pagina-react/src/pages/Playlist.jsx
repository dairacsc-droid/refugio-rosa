import React, { useState, useRef, useEffect } from "react";
import "../pages/Playlist.css";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const Playlist = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const [tracks, setTracks] = useState([]);
  const [search, setSearch] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);
  const titleRef = useRef();
  const artistRef = useRef();
  const srcRef = useRef();

  // Cargar canciones desde Firestore
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "songs"), (snapshot) => {
      const musicList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTracks(musicList);
    });
    return () => unsub();
  }, []);

  const currentTrack = tracks[currentIndex];

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.play();
    else audioRef.current.pause();
  }, [isPlaying, currentIndex]);

  const handlePlayPause = () => setIsPlaying(!isPlaying);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? tracks.length - 1 : prev - 1));
    setIsPlaying(true);
  };

  const addTrack = async () => {
    const newTrack = {
      title: titleRef.current.value.trim(),
      artist: artistRef.current.value.trim(),
      src: srcRef.current.value.trim(),
      favorite: [],
    };

    if (!newTrack.title || !newTrack.artist || !newTrack.src) return;

    await addDoc(collection(db, "songs"), newTrack);

    titleRef.current.value = "";
    artistRef.current.value = "";
    srcRef.current.value = "";
  };

  const toggleFavorite = async (song) => {
    const songRef = doc(db, "songs", song.id);

    if (song.favorite?.includes(user.uid)) {
      await updateDoc(songRef, { favorite: arrayRemove(user.uid) });
    } else {
      await updateDoc(songRef, { favorite: arrayUnion(user.uid) });
    }
  };

  const filteredTracks = tracks.filter(
    (track) =>
      track.title.toLowerCase().includes(search.toLowerCase()) ||
      track.artist.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="player-wrap">
      <section className="player-body">
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

        <aside className="right-col">
          <h3 className="playlist-title">Playlist</h3>

          <div className="playlist">
            {filteredTracks.map((track, index) => (
              <div
                key={track.id}
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
                  className="fav-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(track);
                  }}
                >
                  {track.favorite?.includes(user.uid) ? "⭐" : "☆"}
                </button>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <div className="search-bar">
        <input
          placeholder="🔍 busca por título o artista"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="xbtn" onClick={() => setSearch("")}>
          ✕
        </button>
      </div>

      <div className="add-form">
        <input ref={titleRef} placeholder="Título" />
        <input ref={artistRef} placeholder="Artista" />
        <input ref={srcRef} placeholder="URL del MP3" />
        <button className="add-btn" onClick={addTrack}>
          ➕ Añadir
        </button>
      </div>

      <audio ref={audioRef} src={currentTrack?.src} onEnded={handleNext} />
    </div>
  );
};

export default Playlist;
