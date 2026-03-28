/* ========================= */
/* FIRST TIME USER CHECK */
/* ========================= */

(function () {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const currentPage = window.location.pathname;

  // agar login nahi hai → redirect to login
  if (!isLoggedIn && !currentPage.includes("login.html")) {
    window.location.href = "html/login.html";
  }

  // agar login hai aur login page pe hai → redirect to home
  if (isLoggedIn && currentPage.includes("login.html")) {
    window.location.href = "../index.html";
  }
})();

/* ========================= */
/* AUTO ACTIVE NAVBAR */
/* ========================= */

document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll("#navigation a");

  let currentPage = window.location.pathname.split("/").pop();

  if (currentPage === "") {
    currentPage = "index.html";
  }

  links.forEach(link => {
    const linkPage = link.getAttribute("href").split("/").pop();

    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });
});


/* ========================= */
/* LOAD HEADER (SMART PATH) */
/* ========================= */

function loadHeader() {
  const container = document.getElementById("header-container");
  if (!container) return;

  let path = window.location.pathname;

  let basePath = path.includes("/html/") 
    ? "../components/header.html" 
    : "components/header.html";

  fetch(basePath)
    .then(res => res.text())
    .then(data => {
      container.innerHTML = data;
    })
    .catch(() => {
      console.log("Header load failed");
    });
}

loadHeader();


/* ========================= */
/* DARK MODE (PERSISTENT) */
/* ========================= */

// page load par check
window.addEventListener("DOMContentLoaded", () => {
  const icon = document.getElementById("themeIcon");

  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark");
    if (icon) icon.textContent = "☀️";
  }
});

// toggle function
function toggleDarkMode() {
  document.body.classList.toggle("dark");

  const icon = document.getElementById("themeIcon");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("darkMode", "enabled");
    if (icon) icon.textContent = "☀️";
  } else {
    localStorage.removeItem("darkMode");
    if (icon) icon.textContent = "🌙";
  }
}

/* ========================= */
/* LOGIN SYSTEM */
/* ========================= */

function login() {
  const username = document.getElementById("username")?.value.trim();
  const password = document.getElementById("password")?.value.trim();
  const savedUsername = localStorage.getItem("username");
  const savedPassword = localStorage.getItem("password");
  const msg = document.getElementById("message");

  if (!msg) return;

  if (username === savedUsername && password === savedPassword) {

    // ✅ SESSION SAVE
    localStorage.setItem("isLoggedIn", "true");

    msg.style.color = "green";
    msg.textContent = "Login successful!";

    setTimeout(() => {
      window.location.href = "../index.html";
    }, 1000);

  } else {
    msg.style.color = "red";
    msg.textContent = "Invalid username or password.";
  }
}

/* ========================= */
/* LOGIN FORM AUTO HANDLE */
/* ========================= */

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    login(); // existing function call
  });
}


/* ========================= */
/* REGISTER SYSTEM */
/* ========================= */

function register() {
  const username = prompt("Enter a username:");
  const password = prompt("Enter a password:");
  const msg = document.getElementById("message");

  if (!msg) return;

  if (username && password) {
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    msg.style.color = "green";
    msg.textContent = "Registration successful! You can now login.";
  } else {
    msg.style.color = "red";
    msg.textContent = "Registration cancelled or invalid input.";
  }
}


/* ========================= */
/* AUTH PROTECTION */
/* ========================= */

if (!window.location.pathname.includes("login.html")) {

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    window.location.href = "html/login.html";
  }
}


/* ========================= */
/* LOGOUT */
/* ========================= */

function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("darkMode");

  document.body.classList.remove("dark");

  // ✅ FIXED PATH
  window.location.href = "../html/login.html";
}


/* ========================= */
/* EMAIL SYSTEM (HYBRID) */
/* ========================= */

(function () {
  if (typeof emailjs !== "undefined") {
    emailjs.init("YOUR_PUBLIC_KEY"); // replace
  }
})();

const form = document.getElementById("contactForm");
const statusMsg = document.getElementById("statusMsg");
const sendBtn = document.getElementById("sendBtn");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
      firstName: document.getElementById("firstName")?.value,
      lastName: document.getElementById("lastName")?.value,
      email: document.getElementById("email")?.value,
      message: document.getElementById("message")?.value,
    };

    if (navigator.onLine) {
      sendEmail(data);
    } else {
      saveOffline(data);
    }

    form.reset();
  });
}


/* ========================= */
/* SEND EMAIL */
/* ========================= */

function sendEmail(data) {

  if (sendBtn) sendBtn.classList.add("loading");

  if (typeof emailjs === "undefined") {
    saveOffline(data);
    return;
  }

  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
    from_name: data.firstName + " " + data.lastName,
    from_email: data.email,
    message: data.message,
  })
  .then(() => {
    if (statusMsg) {
      statusMsg.innerText = "✅ Message sent successfully!";
      statusMsg.style.color = "green";
    }
  })
  .catch(() => {
    saveOffline(data);
  })
  .finally(() => {
    if (sendBtn) sendBtn.classList.remove("loading");
  });
}


/* ========================= */
/* OFFLINE SAVE */
/* ========================= */

function saveOffline(data) {
  let messages = JSON.parse(localStorage.getItem("messages")) || [];
  messages.push(data);
  localStorage.setItem("messages", JSON.stringify(messages));

  if (statusMsg) {
    statusMsg.innerText = "📴 Saved offline. Will send when online.";
    statusMsg.style.color = "orange";
  }
}


/* ========================= */
/* AUTO SYNC */
/* ========================= */

window.addEventListener("online", () => {
  let messages = JSON.parse(localStorage.getItem("messages")) || [];

  messages.forEach(msg => {
    sendEmail(msg);
  });

  localStorage.removeItem("messages");
});


/* ========================= */
/* SKELETON LOADER */
/* ========================= */

window.addEventListener("load", () => {
  const loader = document.getElementById("skeleton-loader");

  if (loader) {
    setTimeout(() => {
      loader.style.opacity = "0";

      setTimeout(() => {
        loader.style.display = "none";
      }, 300);
    }, 800);
  }
});