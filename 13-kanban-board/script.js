const board = document.querySelector('#board');
const form = document.querySelector('#form');
let tasks = JSON.parse(localStorage.getItem('kanban') || '[]');

function escapeHtml(value) {
  return value.replace(/[&<>\"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

function save() {
  localStorage.setItem('kanban', JSON.stringify(tasks));
  render();
}

function render() {
  board.innerHTML = ['todo', 'doing', 'done'].map((status) => `
    <section class="column" data-status="${status}">
      <h2>${status[0].toUpperCase() + status.slice(1)}</h2>
      ${tasks.filter((task) => task.status === status).map((task) => `
        <div class="task" draggable="true" data-id="${task.id}">
          ${escapeHtml(task.text)}
          <button type="button" data-delete="${task.id}" aria-label="Delete task">×</button>
        </div>`).join('')}
    </section>`).join('');
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = document.querySelector('#task');
  const text = input.value.trim();
  if (!text) return;
  tasks.push({ id: crypto.randomUUID(), text, status: 'todo' });
  input.value = '';
  save();
});

board.addEventListener('click', (event) => {
  const id = event.target.dataset.delete;
  if (id) {
    tasks = tasks.filter((task) => task.id !== id);
    save();
  }
});

board.addEventListener('dragstart', (event) => {
  const task = event.target.closest('.task');
  if (task) event.dataTransfer.setData('text/plain', task.dataset.id);
});

board.addEventListener('dragover', (event) => event.preventDefault());
board.addEventListener('drop', (event) => {
  const column = event.target.closest('.column');
  const id = event.dataTransfer.getData('text/plain');
  if (!column || !id) return;
  const task = tasks.find((item) => item.id === id);
  if (task) {
    task.status = column.dataset.status;
    save();
  }
});

render();
