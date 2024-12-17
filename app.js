// Firebase Config
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

// Hàm kiểm tra mật khẩu
function checkLogin() {
  const password = document.getElementById("password").value;

  if (password === "123456") {
    localStorage.setItem("loggedIn", "true");
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
    fetchCustomers(); // Tải dữ liệu khách hàng
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

// Duy trì trạng thái đăng nhập
window.onload = () => {
  if (localStorage.getItem("loggedIn") === "true") {
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
    fetchCustomers();
  }
};

// Hàm tải dữ liệu khách hàng
function fetchCustomers() {
  console.log("Dữ liệu khách hàng được tải ở đây...");
}
