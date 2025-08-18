import { api } from './api.js';
import { el } from './ui.js';

async function load() {
  const items = await api('/swap.php');
  const wrap = document.getElementById('swap-list');
  wrap.innerHTML = '';
  items.forEach(i => {
    wrap.appendChild(el('div', { class:'card' }, [
      el('strong', {}, i.title),
      el('p', { class:'muted' }, i.description || ''),
      el('p', { class:'muted' }, `Category: ${i.category} · Status: ${i.status}`),
    ]));
  });
}

document.getElementById('add').addEventListener('click', async () => {
  const title = prompt('Item title?');
  if (!title) return;
  await api('/swap.php', { method:'POST', body: JSON.stringify({ title, category:'other' }) });
  load();
});

load();
