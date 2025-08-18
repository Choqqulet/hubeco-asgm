import { api } from './api.js';
import { el } from './ui.js';

async function loadTips() {
  const tips = await api('/energy.php');
  const wrap = document.getElementById('tips');
  wrap.innerHTML = '';
  tips.forEach(t => {
    wrap.appendChild(el('div', { class: 'card' }, [
      el('strong', {}, t.title),
      el('p', { class: 'muted' }, t.body)
    ]));
  });
}

function calc() {
  const watt = +document.getElementById('watt').value || 0;
  const hours = +document.getElementById('hours').value || 0;
  const price = +document.getElementById('price').value || 0;
  const kwhMonth = (watt * hours * 30) / 1000;
  const rm = (kwhMonth * price).toFixed(2);
  document.getElementById('result').textContent = `Est. monthly: ${kwhMonth.toFixed(2)} kWh ≈ RM ${rm}`;
}

document.getElementById('calc').addEventListener('click', calc);
loadTips();
