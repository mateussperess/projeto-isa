/* ─── TOUCH DETECTION ────────────────────────────────────────── */
const isTouch = () => window.matchMedia("(hover: none)").matches;

/* ─── CUSTOM CURSOR (desktop only) ──────────────────────────── */
if (!isTouch()) {
  const cursorDotEl = document.getElementById("cursorDot");
  const dot = cursorDotEl ? cursorDotEl.firstElementChild : null;
  const ring = document.getElementById("cursorRing");

  if (dot && ring) {
    let mx = -100, my = -100, rx = -100, ry = -100;
    let isMoving = false;
    let rafId = null;

    const renderCursor = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      ring.style.transform = `translate3d(${rx}px,${ry}px,0)`;

      if (Math.abs(mx - rx) > 0.1 || Math.abs(my - ry) > 0.1) {
        rafId = requestAnimationFrame(renderCursor);
      } else {
        isMoving = false;
      }
    };

    document.addEventListener("mousemove", (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.parentElement.style.transform = `translate3d(${mx}px,${my}px,0)`;

      if (!isMoving) {
        isMoving = true;
        rafId = requestAnimationFrame(renderCursor);
      }
    }, { passive: true });

    document
      .querySelectorAll("a, button, .cat-card, .portfolio-item, .filter-btn")
      .forEach((el) => {
        el.addEventListener("mouseenter", () => ring.classList.add("expanded"), { passive: true });
        el.addEventListener("mouseleave", () => ring.classList.remove("expanded"), { passive: true });
      });
  }
}

/* ─── HAMBURGER MENU ─────────────────────────────────────────── */
// Injeta o botão hamburger e o drawer no DOM
const navbar = document.getElementById("navbar");

if (navbar) {
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
    <a href="#galeria" class="drawer-link">Galeria</a>
    <a href="#sobre"      class="drawer-link">Visão</a>
    <a href="#experiencia" class="drawer-link">Metodologia</a>
    <a href="#contato"    class="drawer-link drawer-cta">Solicitar Orçamento</a>
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
  let isNavScrolled = false;
  window.addEventListener("scroll", () => {
    const shouldScroll = window.scrollY > 60;
    if (shouldScroll !== isNavScrolled) {
      isNavScrolled = shouldScroll;
      navbar.classList.toggle("scrolled", shouldScroll);
    }
  }, { passive: true });
}

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