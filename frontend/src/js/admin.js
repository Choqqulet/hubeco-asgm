import { api } from './api.js';
import { el } from './ui.js';

async function load() {
  const panels = el('div', { class: 'grid cards' }, []);
  document.getElementById('admin-panels').replaceChildren(panels);

  // Example: recycling points table (read-only for starter)
  const points = await api('/recycle.php');
  const list = el('div', { class:'card' }, [el('h3', {}, 'Recycling Points')]);
  points.forEach(p => list.appendChild(el('p', { class:'muted' }, `${p.name} – ${p.address}`)));
  panels.appendChild(list);

  const tips = await api('/energy.php');
  const tipCard = el('div', { class:'card' }, [el('h3', {}, 'Energy Tips')]);
  tips.forEach(t => tipCard.appendChild(el('p', { class:'muted' }, t.title)));
  panels.appendChild(tipCard);
}

load();
