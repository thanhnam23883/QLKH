// Cấu hình Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCm...",
  authDomain: "customermanagement-a522e.firebaseapp.com",
  projectId: "customermanagement-a522e",
  storageBucket: "customermanagement-a522e.appspot.com",
  messagingSenderId: "401838053324",
  appId: "1:401838053324:web:0fa664db88a17510a9ef69",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Thêm khách hàng vào Firestore
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

// Hiển thị dữ liệu và màu sắc theo điều kiện
async function fetchCustomers() {
  const customerTableBody = document.getElementById("customerTableBody");
  customerTableBody.innerHTML = "";

  const snapshot = await db.collection("customers").get();
  snapshot.forEach((doc) => {
    const data = doc.data();
    let rowColor = "";

    switch (data.interaction) {
      case "":
      case null:
        rowColor = "background-color: #FFCCCC;"; // Màu đỏ
        break;
      case "Đang tính lại":
      case "Chưa có ý định":
        rowColor = "background-color: #FFFF99;"; // Màu vàng
        break;
      case "Chuẩn bị mua":
        rowColor = "background-color: #CCFFCC;"; // Màu xanh
        break;
      default:
        rowColor = ""; // Bình thường
    }

    customerTableBody.innerHTML += `
      <tr style="${rowColor}">
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

// Lấy dữ liệu khi tải trang
window.onload = fetchCustomers;
