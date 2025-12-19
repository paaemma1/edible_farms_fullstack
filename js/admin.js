const API = window.EDIBLE_FARMS_CONFIG.API_BASE;

// Load orders
async function loadOrders() {
  try {
    const res = await fetch(`${API}/api/admin/orders`);
    const data = await res.json();
    const tbody = document.querySelector('#orders-table tbody');
    tbody.innerHTML = "";

    data.forEach(o => {
      const row = `<tr>
        <td>${o.name}</td>
        <td>${o.phone}</td>
        <td>${o.type}</td>
        <td>${o.qty}</td>
        <td>${o.address}</td>
        <td>${new Date(o.createdAt).toLocaleString()}</td>
      </tr>`;
      tbody.insertAdjacentHTML("beforeend", row);
    });
  } catch (err) {
    console.error("Orders error:", err);
  }
}

// Load messages
async function loadMessages() {
  try {
    const res = await fetch(`${API}/api/admin/messages`);
    const data = await res.json();
    const tbody = document.querySelector('#messages-table tbody');
    tbody.innerHTML = "";

    data.forEach(m => {
      const row = `<tr>
        <td>${m.name}</td>
        <td>${m.email}</td>
        <td>${m.message}</td>
        <td>${new Date(m.createdAt).toLocaleString()}</td>
      </tr>`;
      tbody.insertAdjacentHTML("beforeend", row);
    });
  } catch (err) {
    console.error("Messages error:", err);
  }
}

loadOrders();
loadMessages();
