const songs = [
  {
    title: "Despacito",
    artist: "Luis Fonci, Justin Bieber",
    file: "songs/Despacito.mp3"
  },
  {
    title: "Safari",
    artist: "Serena",
    file: "songs/safari.mp3"
  },
  {
    title: "Sapphire",
    artist: "Ed Sheeran",
    file: "songs/sapphire.mp3"
  }
];

const audioPlayer = document.getElementById("audioPlayer");
const songList = document.getElementById("songList");
const footerTitle = document.getElementById("footerTitle");
const footerArtist = document.getElementById("footerArtist");
const footerPlayPause = document.getElementById("footerPlayPause");

let currentSong = null;
let isPlaying = false;

// Render song list
songs.forEach((song, index) => {
  const item = document.createElement("div");
  item.classList.add("song-item");

  const details = document.createElement("div");
  details.classList.add("song-details");

  const title = document.createElement("div");
  title.classList.add("song-title");
  title.textContent = song.title;

  const artist = document.createElement("div");
  artist.classList.add("song-artist");
  artist.textContent = song.artist;

  details.appendChild(title);
  details.appendChild(artist);

  const playBtn = document.createElement("button");
  playBtn.textContent = "▶ Play";
  playBtn.addEventListener("click", () => {
    playSong(song);
  });

  item.appendChild(details);
  item.appendChild(playBtn);
  songList.appendChild(item);
});

function playSong(song) {
  currentSong = song;
  audioPlayer.src = song.file;
  audioPlayer.play();
  isPlaying = true;

  footerTitle.textContent = song.title;
  footerArtist.textContent = song.artist;
  footerPlayPause.textContent = "⏸";
}

footerPlayPause.addEventListener("click", () => {
  if (!currentSong) return;

  if (isPlaying) {
    audioPlayer.pause();
    footerPlayPause.textContent = "▶";
    isPlaying = false;
  } else {
    audioPlayer.play();
    footerPlayPause.textContent = "⏸";
    isPlaying = true;
  }
});

const progressBar = document.getElementById("progressBar");
const volumeControl = document.getElementById("volumeControl");

// Update progress bar as song plays
audioPlayer.addEventListener("timeupdate", () => {
  progressBar.max = audioPlayer.duration;
  progressBar.value = audioPlayer.currentTime;
});

// Seek song when progress bar changes
progressBar.addEventListener("input", () => {
  audioPlayer.currentTime = progressBar.value;
});

// Volume control
volumeControl.addEventListener("input", () => {
  audioPlayer.volume = volumeControl.value;
});

const volumeIcon = document.getElementById("volumeIcon");

volumeControl.addEventListener("input", () => {
  audioPlayer.volume = volumeControl.value;

  if (audioPlayer.volume === 0) {
    volumeIcon.className = "fa-solid fa-volume-xmark";
  } else if (audioPlayer.volume < 0.5) {
    volumeIcon.className = "fa-solid fa-volume-low";
  } else {
    volumeIcon.className = "fa-solid fa-volume-high";
  }
});
