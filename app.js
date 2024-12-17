// Kiểm tra mật khẩu và duy trì đăng nhập
function checkLogin() {
  const password = document.getElementById("password").value;

  if (password === "123456") {
    localStorage.setItem("loggedIn", "true");
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
    fetchCustomers();
  } else {
    document.getElementById("errorMessage").style.display = "block";
  }
}

function logout() {
  localStorage.removeItem("loggedIn");
  document.getElementById("loginContainer").style.display = "block";
  document.getElementById("mainContent").style.display = "none";
}

window.onload = () => {
  if (localStorage.getItem("loggedIn") === "true") {
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
    fetchCustomers();
  }
};

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCm...",
  authDomain: "customermanagement-a522e.firebaseapp.com",
  projectId: "customermanagement-a522e",
  storageBucket: "customermanagement-a522e.appspot.com",
  messagingSenderId: "401838053324",
  appId: "1:401838053324:web:0fa664db88a17510a9ef69"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Thêm dữ liệu khách hàng
document.getElementById("customerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = {
    date: document.getElementById("date").value,
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    product: document.getElementById("product").value,
    channel: document.getElementById("channel").value,
    approachDate: document.getElementById("approachDate").value,
    manager: document.getElementById("manager").value,
    interaction: document.getElementById("interaction").value,
    purchaseDate: document.getElementById("purchaseDate").value,
    notes: document.getElementById("notes").value,
  };

  await db.collection("customers").add(formData);
  fetchCustomers();
  document.getElementById("customerForm").reset();
});

// Hiển thị dữ liệu khách hàng
async function fetchCustomers() {
  const customerTableBody = document.getElementById("customerTableBody");
  customerTableBody.innerHTML = "";

  const snapshot = await db.collection("customers").get();
  snapshot.forEach((doc) => {
    const data = doc.data();
    customerTableBody.innerHTML += `
      <tr>
        <td>${data.date}</td>
        <td>${data.name}</td>
        <td>${data.phone}</td>
        <td>${data.address}</td>
        <td>${data.product}</td>
        <td>${data.channel}</td>
        <td>${data.approachDate}</td>
        <td>${data.manager}</td>
        <td>${data.interaction}</td>
        <td>${data.purchaseDate}</td>
        <td>${data.notes}</td>
        <td>
          <button onclick="deleteCustomer('${doc.id}')">Xóa</button>
        </td>
      </tr>
    `;
  });
}

// Xóa khách hàng
async function deleteCustomer(id) {
  await db.collection("customers").doc(id).delete();
  fetchCustomers();
}

