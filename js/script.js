/* ========================= */
/* SMART AUTH SYSTEM (FIXED) */
/* ========================= */

(function () {
const isLoggedIn = localStorage.getItem("isLoggedIn");
const currentPage = window.location.pathname;

// ❌ REMOVE FORCED REDIRECT FROM INDEX
// ✅ Only protect internal pages

const protectedPages = [
"dashboard.html",
"categories.html",
"aboutus.html",
"service.html",
"contact.html",
"week.html"
];

const current = currentPage.split("/").pop();

if (protectedPages.includes(current) && !isLoggedIn) {
window.location.href = "html/login.html";
}

// agar login hai aur login page pe hai → redirect home
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

```
if (linkPage === currentPage) {
  link.classList.add("active");
}
```

});
});

/* ========================= */
/* LOAD HEADER */
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
});
}

loadHeader();

/* ========================= */
/* DARK MODE */
/* ========================= */

window.addEventListener("DOMContentLoaded", () => {
const icon = document.getElementById("themeIcon");

if (localStorage.getItem("darkMode") === "enabled") {
document.body.classList.add("dark");
if (icon) icon.textContent = "☀️";
}
});

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

```
localStorage.setItem("isLoggedIn", "true");

msg.style.color = "green";
msg.textContent = "Login successful!";

setTimeout(() => {
  window.location.href = "../index.html";
}, 800);
```

} else {
msg.style.color = "red";
msg.textContent = "Invalid username or password.";
}
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {
loginForm.addEventListener("submit", function(e) {
e.preventDefault();
login();
});
}

/* ========================= */
/* REGISTER */
/* ========================= */

function register() {
const username = prompt("Enter username:");
const password = prompt("Enter password:");
const msg = document.getElementById("message");

if (!msg) return;

if (username && password) {
localStorage.setItem("username", username);
localStorage.setItem("password", password);

```
msg.style.color = "green";
msg.textContent = "Registered! Now login.";
```

}
}

/* ========================= */
/* LOGOUT */
/* ========================= */

function logout() {
localStorage.removeItem("isLoggedIn");

window.location.href = "html/login.html";
}

/* ========================= */
/* SKELETON LOADER */
/* ========================= */

window.addEventListener("load", () => {
const loader = document.getElementById("skeleton-loader");

if (loader) {
setTimeout(() => {
loader.style.display = "none";
}, 500);
}
});
