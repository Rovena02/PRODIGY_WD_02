let timer;
let startTime;
let elapsedTime = 0;
let running = false;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

function updateTime() {
  const now = Date.now();
  const diff = now - startTime + elapsedTime;

  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  display.textContent = 
    `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(unit) {
  return unit.toString().padStart(2, "0");
}

function startStopwatch() {
  if (!running) {
    startTime = Date.now();
    timer = setInterval(updateTime, 1000);
    running = true;
  }
}

function pauseStopwatch() {
  if (running) {
    clearInterval(timer);
    elapsedTime += Date.now() - startTime;
    running = false;
  }
}

function resetStopwatch() {
  clearInterval(timer);
  elapsedTime = 0;
  running = false;
  display.textContent = "00:00:00";
  laps.innerHTML = "";
}

function recordLap() {
  if (running) {
    const lapTime = display.textContent;
    const li = document.createElement("li");
    li.textContent = `Lap: ${lapTime}`;
    laps.appendChild(li);
  }
}
