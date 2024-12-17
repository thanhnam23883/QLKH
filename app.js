// Cấu hình Firebase (dùng Firebase compat)
const firebaseConfig = {
  apiKey: "AIzaSyCmI0wn8bymGbSoAj5fdHwazY-80GePliY",
  authDomain: "customermanagement-a522e.firebaseapp.com",
  projectId: "customermanagement-a522e",
  storageBucket: "customermanagement-a522e.appspot.com",
  messagingSenderId: "401838053324",
  appId: "1:401838053324:web:0fa664db88a17510a9ef69",
};

// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Biến DOM
const customerForm = document.getElementById("customerForm");
const customerTableBody = document.getElementById("customerTableBody");

// Thêm dữ liệu vào Firestore
customerForm.addEventListener("submit", async (e) => {
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
  customerForm.reset();
  fetchCustomers();
});

// Lấy dữ liệu từ Firestore
async function fetchCustomers() {
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

// Xóa dữ liệu
async function deleteCustomer(id) {
  await db.collection("customers").doc(id).delete();
  fetchCustomers();
}

// Hiển thị dữ liệu khi load trang
fetchCustomers();
// Firebase Authentication
const auth = firebase.auth();

// Đăng nhập người dùng
document.getElementById("loginButton").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("Đăng nhập thành công!");
      toggleAuthUI(true);
      fetchCustomers();
    })
    .catch((error) => {
      alert("Lỗi đăng nhập: " + error.message);
    });
});

// Đăng xuất người dùng
document.getElementById("logoutButton").addEventListener("click", () => {
  auth.signOut()
    .then(() => {
      alert("Đã đăng xuất!");
      toggleAuthUI(false);
    });
});

// Kiểm tra trạng thái đăng nhập khi load trang
auth.onAuthStateChanged((user) => {
  if (user) {
    toggleAuthUI(true);
    fetchCustomers();
  } else {
    toggleAuthUI(false);
  }
});

// Hàm ẩn/hiện UI đăng nhập và đăng xuất
function toggleAuthUI(isLoggedIn) {
  document.getElementById("loginButton").style.display = isLoggedIn ? "none" : "inline-block";
  document.getElementById("logoutButton").style.display = isLoggedIn ? "inline-block" : "none";
  document.getElementById("customerForm").style.display = isLoggedIn ? "block" : "none";
}

