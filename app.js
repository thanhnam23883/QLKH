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

// Hàm kiểm tra mật khẩu đăng nhập
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

// Hàm đăng xuất
function logout() {
  localStorage.removeItem("loggedIn");
  document.getElementById("loginContainer").style.display = "block";
  document.getElementById("mainContent").style.display = "none";
}

// Duy trì trạng thái đăng nhập khi load lại trang
window.onload = () => {
  if (localStorage.getItem("loggedIn") === "true") {
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
    fetchCustomers();
  }
};

// Thêm dữ liệu khách hàng
document.getElementById("customerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;

  if (name && phone) {
    await db.collection("customers").add({ name, phone });
    fetchCustomers();
    document.getElementById("customerForm").reset();
  } else {
    alert("Vui lòng nhập đầy đủ thông tin!");
  }
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
        <td>${data.name}</td>
        <td>${data.phone}</td>
        <td>
          <button onclick="deleteCustomer('${doc.id}')">Xóa</button>
        </td>
      </tr>
    `;
  });
}

// Xóa khách hàng
async function deleteCustomer(id) {
  if (confirm("Bạn có chắc chắn muốn xóa khách hàng này không?")) {
    await db.collection("customers").doc(id).delete();
    fetchCustomers();
  }
}

