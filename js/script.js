/* ========================= */
/* AUTH SYSTEM (CLEAN FINAL) */
/* ========================= */

(function () {
const isLoggedIn = localStorage.getItem("isLoggedIn");
const current = window.location.pathname.split("/").pop();

const protectedPages = [
"categories.html",
"aboutus.html",
"service.html",
"contact.html",
"week.html",
"fat.html",
"normal.html"
];

if (protectedPages.includes(current) && !isLoggedIn) {
window.location.href = "/html/login.html";
}

if (isLoggedIn && current === "login.html") {
window.location.href = "/index.html";
}
})();

/* ========================= */
/* DOM READY (SAFE INIT) */
/* ========================= */

document.addEventListener("DOMContentLoaded", () => {

/* ===== NAVBAR ACTIVE ===== */
const links = document.querySelectorAll("#navigation a");

let currentPage = window.location.pathname.split("/").pop();
if (currentPage === "") currentPage = "index.html";

links.forEach(link => {
const linkPage = link.getAttribute("href").split("/").pop();
if (linkPage === currentPage) {
link.classList.add("active");
}
});

/* ===== LOGIN FORM ===== */
const loginForm = document.getElementById("loginForm");

if (loginForm) {
loginForm.addEventListener("submit", function(e) {
e.preventDefault();
login();
});
}

/* ===== DARK MODE LOAD ===== */
const icon = document.getElementById("themeIcon");

if (localStorage.getItem("darkMode") === "enabled") {
document.body.classList.add("dark");
if (icon) icon.textContent = "☀️";
}

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
})
.catch(() => console.log("Header load failed"));
}

loadHeader();

/* ========================= */
/* DARK MODE */
/* ========================= */

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
/* REGISTER (FIXED) */
/* ========================= */

function register() {
const username = prompt("Enter username:");
const password = prompt("Enter password:");

const msg = document.getElementById("message");

if (!username || !password) {
if (msg) {
msg.style.color = "red";
msg.textContent = "Invalid input!";
}
return;
}

localStorage.setItem("username", username.trim());
localStorage.setItem("password", password.trim());

if (msg) {
msg.style.color = "green";
msg.textContent = "Registered successfully!";
}
}

/* ========================= */
/* LOGIN (FULL FIX) */
/* ========================= */

function login() {
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

const msg = document.getElementById("message");

if (!usernameInput || !passwordInput || !msg) return;

const username = usernameInput.value.trim();
const password = passwordInput.value.trim();

const savedUsername = localStorage.getItem("username")?.trim();
const savedPassword = localStorage.getItem("password")?.trim();

// ❌ empty input
if (!username || !password) {
msg.style.color = "red";
msg.textContent = "Enter username & password!";
return;
}

// ❌ not registered
if (!savedUsername || !savedPassword) {
msg.style.color = "red";
msg.textContent = "Please register first!";
return;
}

// ❌ wrong credentials
if (username !== savedUsername || password !== savedPassword) {
msg.style.color = "red";
msg.textContent = "Wrong username or password!";
return;
}

// ✅ SUCCESS
localStorage.setItem("isLoggedIn", "true");

// 🔥 loader only after login
sessionStorage.setItem("afterLoginLoader", "true");

msg.style.color = "green";
msg.textContent = "Login successful!";

setTimeout(() => {
window.location.href = "/index.html";
}, 300);
}

/* ========================= */
/* LOGOUT */
/* ========================= */

function logout() {
localStorage.removeItem("isLoggedIn");

// reset dark mode
localStorage.removeItem("darkMode");
document.body.classList.remove("dark");

// reset session
sessionStorage.clear();

window.location.href = "/html/login.html";
}

/* ========================= */
/* LOADER (FINAL FIXED) */
/* ========================= */

window.addEventListener("load", () => {
const loader = document.getElementById("skeleton-loader");
const current = window.location.pathname.split("/").pop();

if (!loader) return;

// hide by default
loader.style.display = "none";

// ❌ never on login page
if (current === "login.html") return;

const shouldShow = sessionStorage.getItem("afterLoginLoader");

if (shouldShow === "true") {

```
loader.style.display = "block";

setTimeout(() => {
  loader.style.opacity = "0";
  setTimeout(() => {
    loader.style.display = "none";
  }, 300);
}, 600);

sessionStorage.removeItem("afterLoginLoader");
```

}
});
