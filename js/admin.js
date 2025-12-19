const API = "https://edible-farms-fullstack.onrender.com";

const ADMIN_USER = "admin";
const ADMIN_PASS = "edible123";

const loginBtn = document.getElementById("login-btn");
const loginResult = document.getElementById("login-result");
const adminPanel = document.getElementById("admin-panel");
const loginBox = document.getElementById("login-box");

loginBtn.addEventListener("click", async () => {
  const user = document.getElementById("admin-user").value.trim();
  const pass = document.getElementById("admin-pass").value.trim();

  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    loginResult.textContent = "Login successful";
    loginResult.style.color = "green";

    loginBox.style.display = "none";
    adminPanel.style.display = "block";

    loadOrders();
    loadInquiries();
  } else {
    loginResult.textContent = "Wrong username or password";
    loginResult.style.color = "crimson";
  }
});

async function loadOrders() {
  const tbody = document.querySelector("#orders-table tbody");
  tbody.innerHTML = "<tr><td colspan='5'>Loading...</td></tr>";

  try {
    const res = await fetch(`${API}/api/orders`);
    const data = await res.json();

    tbody.innerHTML = "";
    data.forEach(o => {
      tbody.innerHTML += `
        <tr>
          <td>${o.name}</td>
          <td>${o.phone}</td>
          <td>${o.type}</td>
          <td>${o.qty}</td>
          <td>${o.address}</td>
        </tr>`;
    });
  } catch {
    tbody.innerHTML = "<tr><td colspan='5'>No orders yet</td></tr>";
  }
}

async function loadInquiries() {
  const tbody = document.querySelector("#inq-table tbody");
  tbody.innerHTML = "<tr><td colspan='3'>Loading...</td></tr>";

  try {
    const res = await fetch(`${API}/api/inquiries`);
    const data = await res.json();

    tbody.innerHTML = "";
    data.forEach(i => {
      tbody.innerHTML += `
        <tr>
          <td>${i.name}</td>
          <td>${i.email}</td>
          <td>${i.message}</td>
        </tr>`;
    });
  } catch {
    tbody.innerHTML = "<tr><td colspan='3'>No inquiries yet</td></tr>";
  }
}
