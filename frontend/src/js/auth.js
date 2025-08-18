import { api } from './api.js';

document.getElementById('login').addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  try {
    const res = await api('/auth.php', { method:'POST', body: JSON.stringify({ email, password }) });
    document.getElementById('msg').textContent = res.ok ? 'Logged in' : 'Failed';
  } catch (e) {
    document.getElementById('msg').textContent = 'Login error';
  }
});
