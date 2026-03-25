/* ─── TOUCH DETECTION ────────────────────────────────────────── */
const isTouch = () => window.matchMedia("(hover: none)").matches;

/* ─── CUSTOM CURSOR (desktop only) ──────────────────────────── */
if (!isTouch()) {
  const dot = document.getElementById("cursorDot").firstElementChild;
  const ring = document.getElementById("cursorRing");
  let mx = -100, my = -100, rx = -100, ry = -100;

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.parentElement.style.transform = `translate(${mx}px,${my}px)`;
  });

  (function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.transform = `translate(${rx}px,${ry}px)`;
    requestAnimationFrame(animRing);
  })();

  document
    .querySelectorAll("a, button, .cat-card, .portfolio-item, .filter-btn")
    .forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("expanded"));
      el.addEventListener("mouseleave", () => ring.classList.remove("expanded"));
    });
}

/* ─── HAMBURGER MENU ─────────────────────────────────────────── */
// Injeta o botão hamburger e o drawer no DOM
const navbar = document.getElementById("navbar");

// Cria botão hamburger
const hamburger = document.createElement("button");
hamburger.className = "nav-hamburger";
hamburger.setAttribute("aria-label", "Abrir menu");
hamburger.innerHTML = "<span></span><span></span><span></span>";
navbar.appendChild(hamburger);

// Cria drawer
const drawer = document.createElement("nav");
drawer.className = "nav-drawer";
drawer.innerHTML = `
  <a href="#categorias" class="drawer-link">Trabalhos</a>
  <a href="#portfolio"  class="drawer-link">Portfólio</a>
  <a href="#sobre"      class="drawer-link">Sobre</a>
  <a href="#depoimentos"class="drawer-link">Depoimentos</a>
  <a href="#contato"    class="drawer-link drawer-cta">Agendar Sessão</a>
`;
document.body.appendChild(drawer);

function openDrawer() {
  hamburger.classList.add("open");
  drawer.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeDrawer() {
  hamburger.classList.remove("open");
  drawer.classList.remove("open");
  document.body.style.overflow = "";
}

hamburger.addEventListener("click", () => {
  hamburger.classList.contains("open") ? closeDrawer() : openDrawer();
});

// Fecha ao clicar em qualquer link do drawer
drawer.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeDrawer);
});

// Fecha com ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeDrawer();
});

/* ─── NAVBAR SCROLL ──────────────────────────────────────────── */
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);
});

/* ─── SLIDESHOW ──────────────────────────────────────────────── */
const slides = document.querySelectorAll(".slide");
const counter = document.getElementById("currentSlide");
let current = 0;

setInterval(() => {
  slides[current].classList.remove("active");
  current = (current + 1) % slides.length;
  slides[current].classList.add("active");
  counter.textContent = String(current + 1).padStart(2, "0");
}, 4500);

/* ─── REVEAL ON SCROLL ───────────────────────────────────────── */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.1 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

/* ─── PORTFOLIO FILTER ───────────────────────────────────────── */
function filterPortfolio(btn, cat) {
  document
    .querySelectorAll(".filter-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");

  document.querySelectorAll(".portfolio-item").forEach((item) => {
    const show = cat === "todos" || item.dataset.cat === cat;
    item.style.transition = "opacity 0.4s, transform 0.4s";
    item.style.opacity = show ? "1" : "0.15";
    item.style.transform = show ? "scale(1)" : "scale(0.97)";
  });
}