/* ========================= */
/* SMART AUTH SYSTEM (FINAL) */
/* ========================= */

(function () {
const isLoggedIn = localStorage.getItem("isLoggedIn");
const currentPath = window.location.pathname;
const current = currentPath.split("/").pop();

const protectedPages = [
"categories.html",
"aboutus.html",
"service.html",
"contact.html",
"week.html",
"fat.html",
"normal.html"
];

// ✅ protect only internal pages
if (protectedPages.includes(current) && !isLoggedIn) {
window.location.href = "/html/login.html";
}

// ✅ already logged in → avoid login page
if (isLoggedIn && current === "login.html") {
window.location.href = "/index.html";
}
})();

/* ========================= */
/* AUTO ACTIVE NAVBAR */
/* ========================= */

document.addEventListener("DOMContentLoaded", function () {
const links = document.querySelectorAll("#navigation a");

let currentPage = window.location.pathname.split("/").pop();

if (currentPage === "") currentPage = "index.html";

links.forEach(link => {
const linkPage = link.getAttribute("href").split("/").pop();
if (linkPage === currentPage) {
link.classList.add("active");
}
});
});

/* ========================= */
/* LOAD HEADER */
/* ========================= */

function loadHeader() {
const container = document.getElementById("header-container");
if (!container) return;

const path = window.location.pathname;

const basePath = path.includes("/html/")
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
localStorage.setItem("hasVisited", "true"); // 👈 mark first visit done

msg.style.color = "green";
msg.textContent = "Login successful!";

setTimeout(() => {
  window.location.href = "/index.html";
}, 500);
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
window.location.href = "/html/login.html";
}

/* ========================= */
/* SMART SKELETON LOADER */
/* ========================= */

window.addEventListener("load", () => {
const loader = document.getElementById("skeleton-loader");
const current = window.location.pathname.split("/").pop();

if (!loader) return;

// ❌ login page → no loader
if (current === "login.html") {
loader.style.display = "none";
return;
}

const hasVisited = localStorage.getItem("hasVisited");

// 🎯 FIRST TIME → ALWAYS SHOW
if (!hasVisited) {
localStorage.setItem("hasVisited", "true");

```
setTimeout(() => {
  loader.style.opacity = "0";
  setTimeout(() => loader.style.display = "none", 300);
}, 1200);

return;
```

}

// 🎲 RANDOM LOADER (30% chance)
const showLoader = Math.random() < 0.3;

if (showLoader) {
setTimeout(() => {
loader.style.opacity = "0";
setTimeout(() => loader.style.display = "none", 300);
}, 600);
} else {
loader.style.display = "none";
}
});
