const startBtn = document.getElementById("start-btn");
const waktu = document.getElementById("timer");
const aktivitas = document.getElementById("activity");
const runBtnArea = document.getElementById("running-btn-area");
const resetBtn = document.getElementById("reset-btn");
const pauseBtn = document.getElementById("pause-btn");

let fokus = true;
let banyakKerja = 0;
let totalDetik;
let intervalWaktu;
let paused = false;
let remainingTime = 0;

startBtn.addEventListener("click", pomodoroFunc);
resetBtn.addEventListener("click", resetPomodoro);
pauseBtn.addEventListener("click", togglePause);

function togglePause() {
  paused = !paused;
  if (paused) {
    clearInterval(intervalWaktu);
    pauseBtn.innerHTML = `<i class="fa-solid fa-hourglass-start"></i>`;
  } else {
    setWaktu(remainingTime);
    pauseBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
  }
}

function resetPomodoro() {
  toggleButtons();
  clearInterval(intervalWaktu);
  resetWaktu();
  paused = false;
  pauseBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
}

function resetWaktu() {
  waktu.textContent = formatWaktu(25 * 60);
  aktivitas.textContent = "Focus";
  banyakKerja = 0;
  fokus = true;
}

function toggleButtons() {
  startBtn.classList.toggle("hide-btn");
  runBtnArea.classList.toggle("hide-btn");
}

function pomodoroFunc() {
  toggleButtons();

  if (fokus) {
    banyakKerja++;
    aktivitas.textContent = "Focus";
    totalDetik = 25 * 60;
    setWaktu(totalDetik);
  } else {
    aktivitas.textContent = "Break";
    if (banyakKerja > 2) {
      totalDetik = 20 * 60;
      banyakKerja = 0;
    } else {
      totalDetik = 5 * 60;
    }
    setWaktu(totalDetik);
  }
}

function setWaktu(totalDetik) {
  remainingTime = totalDetik;
  waktu.textContent = formatWaktu(totalDetik);

  intervalWaktu = setInterval(() => {
    if (!paused) {
      remainingTime--;
      waktu.textContent = formatWaktu(remainingTime);

      if (remainingTime <= 0) {
        clearInterval(intervalWaktu);
        fokus = !fokus;
        pomodoroFunc();
      }
    }
  }, 1000);
}

function formatWaktu(totalDetik) {
  let menit = Math.floor(totalDetik / 60);
  let sisaDetik = totalDetik % 60;

  menit = menit < 10 ? "0" + menit : menit;
  sisaDetik = sisaDetik < 10 ? "0" + sisaDetik : sisaDetik;

  return `${menit}:${sisaDetik}`;
}
