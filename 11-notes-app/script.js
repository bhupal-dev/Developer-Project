const title = document.querySelector('#title');
const body = document.querySelector('#body');
const notes = document.querySelector('#notes');
let data = JSON.parse(localStorage.getItem('notes') || '[]');

function save() {
  localStorage.setItem('notes', JSON.stringify(data));
  render();
}

function render() {
  notes.replaceChildren();
  data.forEach((note, index) => {
    const article = document.createElement('article');
    article.className = 'note';
    const heading = document.createElement('strong');
    heading.textContent = note.title;
    const text = document.createElement('p');
    text.textContent = note.body;
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Delete';
    button.dataset.index = index;
    article.append(heading, text, button);
    notes.append(article);
  });
}

document.querySelector('#form').addEventListener('submit', (event) => {
  event.preventDefault();
  if (!title.value.trim() || !body.value.trim()) return;
  data.unshift({ title: title.value.trim(), body: body.value.trim() });
  title.value = '';
  body.value = '';
  save();
});

notes.addEventListener('click', (event) => {
  const index = event.target.dataset.index;
  if (index !== undefined) {
    data.splice(Number(index), 1);
    save();
  }
});

render();
