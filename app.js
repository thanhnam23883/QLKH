// Thêm khách hàng vào Firestore
document.getElementById("customerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    date: document.getElementById("date").value || "",
    name: document.getElementById("name").value || "",
    phone: document.getElementById("phone").value || "",
    address: document.getElementById("address").value || "",
    product: document.getElementById("product").value || "",
    channel: document.getElementById("channel").value || "",
    approachDate: document.getElementById("approachDate").value || "",
    manager: document.getElementById("manager").value || "",
    interaction: document.getElementById("interaction").value || "",
    purchaseDate: document.getElementById("purchaseDate").value || "",
    notes: document.getElementById("notes").value || "",
    history: "Thêm mới khách hàng",
  };

  try {
    await db.collection("customers").add(formData);
    fetchCustomers();
    document.getElementById("customerForm").reset();
  } catch (error) {
    console.error("Lỗi khi thêm khách hàng:", error);
  }
});

// Hiển thị dữ liệu khách hàng và cập nhật màu sắc
async function fetchCustomers() {
  const customerTableBody = document.getElementById("customerTableBody");
  customerTableBody.innerHTML = "";
  const snapshot = await db.collection("customers").get();

  snapshot.forEach((doc) => {
    const data = doc.data();
    let rowColor = "";

    // Điều kiện màu sắc dựa trên Kết quả tương tác
    if (!data.interaction || data.interaction.trim() === "") {
      rowColor = "background-color: #FFCCCC;"; // Màu đỏ khi trống
    } else if (data.interaction === "Đang tính lại" || data.interaction === "Chưa có ý định") {
      rowColor = "background-color: #FFFF99;"; // Màu vàng
    } else if (data.interaction === "Chuẩn bị mua") {
      rowColor = "background-color: #CCFFCC;"; // Màu xanh
    } else if (data.interaction === "Đã mua xe") {
      rowColor = ""; // Trở lại bình thường
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

// Xóa và sửa khách hàng giữ nguyên (như code trước)

