const form = document.querySelector('#form');
const input = document.querySelector('#input');
const messages = document.querySelector('#messages');

function add(text, className = '') {
  const message = document.createElement('div');
  message.className = `msg ${className}`.trim();
  message.textContent = text;
  messages.append(message);
  messages.scrollTop = messages.scrollHeight;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  add(text, 'user');
  input.value = '';
  setTimeout(() => {
    add('This is a frontend chat demo. Connect a secure server-side AI endpoint to make responses dynamic.');
  }, 400);
});

add('Hello. This is a frontend AI chat interface demo.');
