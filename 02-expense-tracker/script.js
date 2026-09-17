const form = document.querySelector('#form');
const list = document.querySelector('#list');
const total = document.querySelector('#total');
let items = JSON.parse(localStorage.getItem('expenses') || '[]');

function render() {
  list.replaceChildren();
  let sum = 0;
  items.forEach((item, index) => {
    sum += item.amount;
    const li = document.createElement('li');
    const label = document.createElement('span');
    label.textContent = `${item.name} — ₹${item.amount.toFixed(2)}`;
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Delete';
    button.dataset.index = index;
    li.append(label, button);
    list.append(li);
  });
  total.textContent = `Total: ₹${sum.toFixed(2)}`;
  localStorage.setItem('expenses', JSON.stringify(items));
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.querySelector('#name').value.trim();
  const amount = Number(document.querySelector('#amount').value);
  if (!name || !Number.isFinite(amount) || amount <= 0) return;
  items.push({ name, amount });
  form.reset();
  render();
});

list.addEventListener('click', (event) => {
  const index = event.target.dataset.index;
  if (index !== undefined) {
    items.splice(Number(index), 1);
    render();
  }
});

render();
