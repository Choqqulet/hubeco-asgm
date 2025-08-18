import { api } from './api.js';
import { el } from './ui.js';

async function load() {
  const data = await api('/garden.php');
  const wrap = document.getElementById('gardens');
  wrap.innerHTML = '';
  data.forEach(g => {
    const available = (g.total_plots - g.taken_plots);
    const btn = el('a', { class:'btn', href:'#', onclick: async (e)=>{
      e.preventDefault();
      await api('/garden.php', { method:'POST', body: JSON.stringify({ garden_id:g.id, action:'join' }) });
      load();
    }}, available>0 ? 'Join' : 'Full');
    wrap.appendChild(el('div', { class: 'card' }, [
      el('h3', {}, g.name),
      el('p', { class: 'muted' }, g.location),
      el('p', { class: 'muted' }, `Plots: ${g.taken_plots}/${g.total_plots}`),
      btn
    ]));
  });
}

load();
