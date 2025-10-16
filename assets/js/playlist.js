// => Datos de ejemplo: canciones (URLs públicas de ejemplo para demo)
const tracks = [
  {
    name: "Addict",
    author: "silva hound",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    thumb: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200",
  },
  {
    name: "Mon Amour",
    author: "@jjhn",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    thumb: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
  },
  {
    name: "Inspira",
    author: "@jjhn",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    thumb: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=200",
  },
  {
    name: "English..",
    author: "@jjhn",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    thumb: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=200",
  },
];

// referencias DOM
const audio = document.getElementById("audio");
const playlistEl = document.getElementById("playlist");
const trackTitle = document.getElementById("trackTitle");
const trackDesc = document.getElementById("trackDesc");
const vinyl = document.getElementById("vinyl");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");

let currentIndex = 0;
let isPlaying = false;

// Generar lista
function renderPlaylist(list) {
  playlistEl.innerHTML = "";
  list.forEach((t, i) => {
    const item = document.createElement("div");
    item.className = "track-item" + (i === currentIndex ? " active" : "");
    item.dataset.index = i;
    item.innerHTML = `
      <div class="thumb" style="background-image:url('${t.thumb}')"></div>
      <div class="track-meta">
        <div class="track-name">${t.name}</div>
        <div class="track-sub">creado por ${t.author}</div>
      </div>
    `;
    item.addEventListener("click", () => {
      loadTrack(i);
      playAudio();
    });
    playlistEl.appendChild(item);
  });
}

// Cargar pista
function loadTrack(index) {
  if (index < 0) index = tracks.length - 1;
  if (index >= tracks.length) index = 0;
  currentIndex = index;
  audio.src = tracks[currentIndex].src;
  trackTitle.textContent = tracks[currentIndex].name;
  // descripción de ejemplo (puedes personalizar)
  trackDesc.textContent = `Reproduciendo "${tracks[currentIndex].name}" — creado por ${tracks[currentIndex].author}. Una pista para acompañar tu mood.`;
  updateActiveInList();
}

// play / pause
function playAudio() {
  audio
    .play()
    .then(() => {
      isPlaying = true;
      vinyl.classList.add("spinning");
      playBtn.classList.add("hidden");
      pauseBtn.classList.remove("hidden");
    })
    .catch((err) => console.warn(err));
}
function pauseAudio() {
  audio.pause();
  isPlaying = false;
  vinyl.classList.remove("spinning");
  playBtn.classList.remove("hidden");
  pauseBtn.classList.add("hidden");
}

// update playlist UI
function updateActiveInList() {
  document
    .querySelectorAll(".track-item")
    .forEach((el) => el.classList.remove("active"));
  const sel = document.querySelector(
    `.track-item[data-index="${currentIndex}"]`
  );
  if (sel) sel.classList.add("active");
}

// controls
playBtn.addEventListener("click", () => {
  if (!audio.src) loadTrack(currentIndex);
  playAudio();
});
pauseBtn.addEventListener("click", pauseAudio);
prevBtn.addEventListener("click", () => {
  loadTrack(currentIndex - 1);
  playAudio();
});
nextBtn.addEventListener("click", () => {
  loadTrack(currentIndex + 1);
  playAudio();
});

// cuando termina la pista -> siguiente
audio.addEventListener("ended", () => {
  loadTrack(currentIndex + 1);
  playAudio();
});

// search filter
function filterTracks(query) {
  const q = query.trim().toLowerCase();
  const filtered = tracks.filter((t) =>
    (t.name + " " + t.author).toLowerCase().includes(q)
  );
  renderPlaylist(filtered);
  // si se filtró y hay resultados, vincular indices: en este demo, al tocar una pista filtrada intentará usar su índice original
  // Para simplicidad visual, si filtras y tocas, buscamos por nombre en el array original
  document.querySelectorAll(".track-item").forEach((el) => {
    el.addEventListener("click", () => {
      const name = el.querySelector(".track-name").textContent;
      const idx = tracks.findIndex((x) => x.name === name);
      if (idx >= 0) {
        loadTrack(idx);
        playAudio();
      }
    });
  });
}

searchInput.addEventListener("input", (e) => {
  filterTracks(e.target.value);
});
clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  renderPlaylist(tracks);
});

// init
renderPlaylist(tracks);
loadTrack(0);
