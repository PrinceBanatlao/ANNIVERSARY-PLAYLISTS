const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const nextBtn = document.getElementById("next");
const backBtn = document.getElementById("back");
const cover = document.getElementById("cover");
const title = document.getElementById("music-title");
const songList = document.getElementById("song-list");
const shuffleBtn = document.getElementById("shuffle");
const durationDisplay = document.getElementById("duration");
const bgBlur = document.getElementById("bg-blur");

let currentSong = 0;
const songs = [
  { title: "Mateo - Lalim", file: "music/music1.mp3", image: "image/image1.png" },
  { title: "Ben Ben - Araw-Araw", file: "music/music2.mp3", image: "image/image2.png" },
  { title: "Arthur Miguel - Lihim", file: "music/music3.mp3", image: "image/image3.png" },
  { title: "Can't Help Falling In Love - Daniel Padilla", file: "music/music4.mp3", image: "image/image4.png" },
  { title: "Dionela - Musika", file: "music/music5.mp3", image: "image/image5.png" },
  { title: "Kusapiling - Anthony Menesses", file: "music/music6.mp3", image: "image/image6.png" },
  { title: "Rob Deniel - Ang Pagibig", file: "music/music7.mp3", image: "image/image7.png" },
  { title: "Rob Deniel - Sinta", file: "music/music8.mp3", image: "image/image8.png" },
  { title: "TJ Monterde - Mahika", file: "music/music9.mp3", image: "image/image9.png" },
  { title: "Stephen Sanchez - Until I Found You", file: "music/music10.mp3", image: "image/image10.png" }
];

function loadSong(index) {
  const song = songs[index];
  audio.src = song.file;
  cover.src = song.image;
  title.textContent = song.title;
  bgBlur.style.backgroundImage = `url('${song.image}')`;
}

function playSong() {
  audio.play();
  playBtn.style.display = "none";
  pauseBtn.style.display = "inline-block";
}

function pauseSong() {
  audio.pause();
  pauseBtn.style.display = "none";
  playBtn.style.display = "inline-block";
}

function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  playSong();
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  playSong();
}

function shuffleSong() {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * songs.length);
  } while (randomIndex === currentSong);
  currentSong = randomIndex;
  loadSong(currentSong);
  playSong();
}

audio.addEventListener("timeupdate", () => {
  const remaining = audio.duration - audio.currentTime;
  if (!isNaN(remaining)) {
    const minutes = Math.floor(remaining / 60);
    const seconds = Math.floor(remaining % 60).toString().padStart(2, "0");
    durationDisplay.textContent = `⏳ ${minutes}:${seconds}`;
  }
});

songs.forEach((song, i) => {
  const li = document.createElement("li");
  li.textContent = song.title;
  li.addEventListener("click", () => {
    currentSong = i;
    loadSong(currentSong);
    playSong();
  });
  songList.appendChild(li);
});

playBtn.addEventListener("click", playSong);
pauseBtn.addEventListener("click", pauseSong);
nextBtn.addEventListener("click", nextSong);
backBtn.addEventListener("click", prevSong);
shuffleBtn.addEventListener("click", shuffleSong);

loadSong(currentSong);
