const API = window.EDIBLE_FARMS_CONFIG.API_BASE;

const ADMIN_USER = "admin";
const ADMIN_PASS = "edible123"; // you can change this later

const loginBtn = document.getElementById("login-btn");
const loginResult = document.getElementById("login-result");
const adminPanel = document.getElementById("admin-panel");

loginBtn.addEventListener("click", () => {
  const user = document.getElementById("admin-user").value;
  const pass = document.getElementById("admin-pass").value;

  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    loginResult.textContent = "Login successful";
    loginResult.style.color = "green";

    adminPanel.style.display = "block";
    document.querySelector(".container").style.display = "none";
  } else {
    loginResult.textContent = "Wrong username or password";
    loginResult.style.color = "crimson";
  }
});

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

