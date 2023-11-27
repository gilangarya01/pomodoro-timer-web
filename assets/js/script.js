const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const timer = document.getElementById("timer");
const activity = document.getElementById("activity");

let focus = true;
let banyakKerja = 0;
let intervalWaktu;

startBtn.addEventListener("click", () => pomodoroFunc());
stopBtn.addEventListener("click", () => {
  toggleClass();
  clearInterval(intervalWaktu);
  banyakKerja = 0;
});

function toggleClass() {
  startBtn.classList.toggle("hide-btn");
  stopBtn.classList.toggle("hide-btn");
}

function pomodoroFunc() {
  toggleClass();

  if (focus) {
    banyakKerja++;
    activity.textContent = "Focus";
    setTimer(1500);
  } else {
    activity.textContent = "Break";
    if (banyakKerja > 2) {
      setTimer(1200);
      banyakKerja = 0;
    } else {
      setTimer(300);
    }
  }
}

function setTimer(banyakDetik) {
  let detik = banyakDetik;
  intervalWaktu = setInterval(() => {
    let menit = Math.floor(detik / 60);
    let sisaDetik = detik % 60;

    menit = menit < 10 ? "0" + menit : menit;
    sisaDetik = sisaDetik < 10 ? "0" + sisaDetik : sisaDetik;

    timer.textContent = `${menit}:${sisaDetik}`;

    if (--detik < 0) {
      clearInterval(intervalWaktu);
      activity.textContent == "Focus" ? (focus = false) : (focus = true);
      pomodoroFunc();
    }
  }, 1000);
}
