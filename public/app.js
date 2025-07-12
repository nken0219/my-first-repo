document.getElementById('load').addEventListener('click', async () => {
  const tbody = document.querySelector('#holdings-table tbody');
  const errorEl = document.getElementById('error');
  tbody.innerHTML = '';
  errorEl.textContent = '';

  try {
    const res = await fetch('/api/holdings');
    if (!res.ok) throw new Error('API request failed');
    const data = await res.json();
    if (!Array.isArray(data)) throw new Error('Unexpected API response');

    data.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${item.name}</td><td>${item.quantity}</td><td>${item.price}</td>`;
      tbody.appendChild(tr);
    });
  } catch (err) {
    errorEl.textContent = err.message;
  }
});
