const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const waktu = document.getElementById("timer");
const aktivitas = document.getElementById("activity");

let fokus = true;
let banyakKerja = 0;
let intervalWaktu;

startBtn.addEventListener("click", pomodoroFunc);
resetBtn.addEventListener("click", resetPomodoro);

function resetPomodoro() {
  toggleButtons();
  clearInterval(intervalWaktu);
  resetWaktu();
}

function resetWaktu() {
  waktu.textContent = formatWaktu(25 * 60);
  aktivitas.textContent = "Focus";
  banyakKerja = 0;
  fokus = true;
}

function toggleButtons() {
  startBtn.classList.toggle("hide-btn");
  resetBtn.classList.toggle("hide-btn");
}

function pomodoroFunc() {
  toggleButtons();

  if (fokus) {
    banyakKerja++;
    aktivitas.textContent = "Focus";
    setWaktu(25 * 60);
  } else {
    aktivitas.textContent = "Break";
    if (banyakKerja > 2) {
      setWaktu(20 * 60);
      banyakKerja = 0;
    } else {
      setWaktu(5 * 60);
    }
  }
}

function setWaktu(totalDetik) {
  let detik = totalDetik;
  intervalWaktu = setInterval(() => {
    waktu.textContent = formatWaktu(detik);

    if (detik-- <= 0) {
      clearInterval(intervalWaktu);
      fokus = !fokus;
      pomodoroFunc();
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
