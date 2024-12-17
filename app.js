// Hàm kiểm tra mật khẩu
function checkLogin() {
  const password = document.getElementById("password").value;

  if (password === "123456") { // Mật khẩu cố định
    // Lưu trạng thái đăng nhập vào localStorage
    localStorage.setItem("loggedIn", "true");

    // Hiển thị phần nội dung chính và ẩn phần đăng nhập
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
  } else {
    // Hiển thị thông báo lỗi khi mật khẩu sai
    document.getElementById("errorMessage").style.display = "block";
  }
}

// Hàm đăng xuất
function logout() {
  // Xóa trạng thái đăng nhập khỏi localStorage
  localStorage.removeItem("loggedIn");

  // Hiển thị lại phần đăng nhập và ẩn phần nội dung chính
  document.getElementById("loginContainer").style.display = "block";
  document.getElementById("mainContent").style.display = "none";
}

// Duy trì trạng thái đăng nhập khi load lại trang
window.onload = () => {
  if (localStorage.getItem("loggedIn") === "true") {
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
  }
};
