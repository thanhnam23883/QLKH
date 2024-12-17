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

// Thêm khách hàng vào Firestore
document.getElementById("customerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Lấy tất cả giá trị từ form
  const formData = {
    date: document.getElementById("date").value || "", // Ngày
    name: document.getElementById("name").value || "", // Tên Khách Hàng
    phone: document.getElementById("phone").value || "", // Số Điện Thoại
    address: document.getElementById("address").value || "", // Địa Chỉ
    product: document.getElementById("product").value || "", // Sản Phẩm Quan Tâm
    channel: document.getElementById("channel").value || "", // Thông Qua Kênh
    approachDate: document.getElementById("approachDate").value || "", // Ngày Tiếp Cận
    manager: document.getElementById("manager").value || "", // Người Phụ Trách
    interaction: document.getElementById("interaction").value || "", // Kết Quả Tương Tác
    purchaseDate: document.getElementById("purchaseDate").value || "", // Ngày Mua Dự Kiến
    notes: document.getElementById("notes").value || "", // Ghi Chú
    history: "Thêm mới khách hàng", // Ghi chú lịch sử
  };

  try {
    // Ghi dữ liệu vào Firestore
    await db.collection("customers").add(formData);
    fetchCustomers(); // Hiển thị lại danh sách khách hàng
    document.getElementById("customerForm").reset(); // Reset form
  } catch (error) {
    console.error("Lỗi khi thêm khách hàng:", error);
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
  const reason = prompt("Ghi chú lý do xóa khách hàng:");
  if (reason) {
    await db.collection("customers").doc(id).update({
      history: `Xóa: ${reason}`,
    });
    await db.collection("customers").doc(id).delete();
    fetchCustomers();
  }
}

// Sửa khách hàng
async function editCustomer(id, name) {
  const newName = prompt("Nhập tên mới:", name);
  const reason = prompt("Ghi chú lý do sửa khách hàng:");
  if (newName && reason) {
    await db.collection("customers").doc(id).update({
      name: newName,
      history: `Sửa: ${reason}`,
    });
    fetchCustomers();
  }
}
