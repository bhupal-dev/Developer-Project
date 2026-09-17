let seconds = 25 * 60;
let running = false;
let id = null;
const time = document.querySelector('#time');
const toggle = document.querySelector('#toggle');
const reset = document.querySelector('#reset');

function render() {
  time.textContent = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  toggle.textContent = running ? 'Pause' : 'Start';
}

function stop() {
  clearInterval(id);
  id = null;
  running = false;
  render();
}

toggle.addEventListener('click', () => {
  if (running) {
    stop();
    return;
  }
  running = true;
  id = setInterval(() => {
    if (seconds > 0) {
      seconds -= 1;
      render();
    } else {
      stop();
    }
  }, 1000);
  render();
});

reset.addEventListener('click', () => {
  stop();
  seconds = 25 * 60;
  render();
});

render();
