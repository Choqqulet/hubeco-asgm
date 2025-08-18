import { api } from './api.js';
import { el } from './ui.js';

const materials = ['paper','plastic','metal','glass','ewaste'];
const selected = new Set(materials);

function renderFilters() {
  const wrap = document.getElementById('filters');
  wrap.innerHTML = '';
  materials.forEach(m => {
    const btn = el('button', { class: 'nav-toggle', onclick: () => {
      if (selected.has(m)) selected.delete(m); else selected.add(m);
      btn.style.opacity = selected.has(m) ? '1' : '0.5';
      load();
    }}, m);
    wrap.appendChild(btn);
  });
}

async function load() {
  const query = encodeURIComponent(Array.from(selected).join(','));
  const points = await api(`/recycle.php?materials=${query}`);
  const list = document.getElementById('recycle-list');
  list.innerHTML = '';
  points.forEach(p => {
    list.appendChild(el('div', { class: 'card' }, [
      el('h3', {}, p.name),
      el('p', { class: 'muted' }, `${p.address}`),
      el('p', { class: 'muted' }, `Accepts: ${p.materials.join(', ')}`)
    ]));
  });

  const schedules = await api(`/pickups.php`);
  const sched = document.getElementById('pickup-schedules');
  sched.innerHTML = '';
  schedules.forEach(s => {
    sched.appendChild(el('div', { class: 'card' }, [
      el('strong', {}, `${s.area}`),
      el('p', { class: 'muted' }, `${s.day} ${s.time_range}`)
    ]));
  });
}

renderFilters();
load();
