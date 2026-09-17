const display=document.querySelector('#display');
const keys=document.querySelector('#keys');
let expr='';
const buttons=['7','8','9','/','4','5','6','*','1','2','3','-','0','.','%','+','C','='];
keys.innerHTML=buttons.map(v=>`<button type="button" data-v="${v}">${v}</button>`).join('');

function precedence(op){return op==='+'||op==='-'?1:2;}
function calculate(input){
  const tokens=input.match(/\d*\.?\d+|[+\-*/%]/g);
  if(!tokens||tokens.join('')!==input.replace(/\s+/g,''))throw Error('Invalid expression');
  const values=[],ops=[];
  const apply=()=>{const op=ops.pop(),b=values.pop(),a=values.pop();if(a===undefined||b===undefined)throw Error('Invalid expression');if(op==='/'&&b===0)throw Error('Cannot divide by zero');values.push(op==='+'?a+b:op==='-'?a-b:op==='*'?a*b:op==='/'?a/b:a%b);};
  for(const token of tokens){if(/^\d/.test(token)||token.startsWith('.'))values.push(Number(token));else{while(ops.length&&precedence(ops.at(-1))>=precedence(token))apply();ops.push(token);}}
  while(ops.length)apply();
  if(values.length!==1||!Number.isFinite(values[0]))throw Error('Invalid expression');
  return values[0];
}
function render(){display.value=expr||'0';}
keys.addEventListener('click',e=>{const button=e.target.closest('button');if(!button)return;const v=button.dataset.v;if(v==='C')expr='';else if(v==='='){try{expr=String(calculate(expr));}catch{expr='Error';}}else{if(expr==='Error')expr='';expr+=v;}render();});
document.addEventListener('keydown',e=>{if(/^[0-9+\-*/%.]$/.test(e.key)){expr=expr==='Error'?'':expr+e.key;render();}else if(e.key==='Enter')keys.querySelector('[data-v="="]')?.click();else if(e.key==='Escape'){expr='';render();}});
render();
