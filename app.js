// Cấu hình Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCm...",
  authDomain: "customermanagement-a522e.firebaseapp.com",
  projectId: "customermanagement-a522e",
  storageBucket: "customermanagement-a522e.appspot.com",
  messagingSenderId: "401838053324",
  appId: "1:401838053324:web:0fa664db88a17510a9ef69"
};

// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Đăng nhập
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

// Đăng xuất
function logout() {
  localStorage.removeItem("loggedIn");
  document.getElementById("loginContainer").style.display = "block";
  document.getElementById("mainContent").style.display = "none";
}

// Duy trì đăng nhập
window.onload = () => {
  if (localStorage.getItem("loggedIn") === "true") {
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
    fetchCustomers();
  }
};

// Thêm khách hàng
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
    history: "Thêm mới khách hàng",
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
          <button onclick="editCustomer('${doc.id}', '${data.name}')">Sửa</button>
          <button onclick="deleteCustomer('${doc.id}')">Xóa</button>
        </td>
      </tr>
    `;
  });
}

// Xóa khách hàng
async function deleteCustomer(id) {
  const historyNote = prompt("Ghi chú lý do xóa:");
  if (historyNote) {
    await db.collection("customers").doc(id).update({ history: `Xóa: ${historyNote}` });
    await db.collection("customers").doc(id).delete();
    fetchCustomers();
  }
}

// Sửa khách hàng
async function editCustomer(id, name) {
  const newName = prompt("Nhập tên mới:", name);
  const historyNote = prompt("Ghi chú lý do sửa:");
  if (newName && historyNote) {
    await db.collection("customers").doc(id).update({
      name: newName,
      history: `Sửa: ${historyNote}`,
    });
    fetchCustomers();
  }
}
