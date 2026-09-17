const display = document.querySelector('#display');
const keys = document.querySelector('.keys');
let expression = '';

function precedence(op) {
  return op === '+' || op === '-' ? 1 : 2;
}

function calculate(input) {
  const tokens = input.match(/\d*\.?\d+|[+\-*/%]/g);
  if (!tokens || tokens.join('') !== input.replace(/\s+/g, '')) throw new Error('Invalid expression');

  const values = [];
  const operators = [];
  const apply = () => {
    const op = operators.pop();
    const b = values.pop();
    const a = values.pop();
    if (a === undefined || b === undefined) throw new Error('Invalid expression');
    if (op === '/' && b === 0) throw new Error('Cannot divide by zero');
    values.push(op === '+' ? a + b : op === '-' ? a - b : op === '*' ? a * b : op === '/' ? a / b : a % b);
  };

  for (const token of tokens) {
    if (/^\d/.test(token) || token.startsWith('.')) values.push(Number(token));
    else {
      while (operators.length && precedence(operators.at(-1)) >= precedence(token)) apply();
      operators.push(token);
    }
  }
  while (operators.length) apply();
  if (values.length !== 1 || !Number.isFinite(values[0])) throw new Error('Invalid expression');
  return values[0];
}

keys.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;
  const value = button.dataset.v;

  if (value === 'C') expression = '';
  else if (value === '=') {
    try { expression = String(calculate(expression)); }
    catch { expression = 'Error'; }
  } else {
    if (expression === 'Error') expression = '';
    expression += value;
  }
  display.value = expression;
});

document.addEventListener('keydown', (event) => {
  if (/^[0-9+\-*/%.()]$/.test(event.key)) {
    event.preventDefault();
    expression += event.key;
    display.value = expression;
  } else if (event.key === 'Enter') {
    event.preventDefault();
    keys.querySelector('[data-v="="]')?.click();
  } else if (event.key === 'Escape') {
    expression = '';
    display.value = '';
  }
});
