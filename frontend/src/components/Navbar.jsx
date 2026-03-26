import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawer] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setDrawer(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
  }, [drawerOpen]);

  const close = () => setDrawer(false);

  return (
    <>
      <nav id="navbar" className={scrolled ? "scrolled" : ""}>
        <a href="#" className="logo">
          Isaías <span>Natanael</span>
        </a>

        <ul className="nav-links">
          <li>
            <a href="#categorias">Trabalhos</a>
          </li>
          <li>
            <a href="#portfolio">Portfólio</a>
          </li>
          <li>
            <a href="#sobre">Sobre</a>
          </li>
          <li>
            <a href="#depoimentos">Depoimentos</a>
          </li>
        </ul>

        <a href="#contato" className="nav-contact-btn">
          Agendar Sessão
        </a>

        <button
          className={`nav-hamburger${drawerOpen ? " open" : ""}`}
          aria-label="Abrir menu"
          onClick={() => setDrawer((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <nav className={`nav-drawer${drawerOpen ? " open" : ""}`}>
        <a href="#categorias" onClick={close}>
          Trabalhos
        </a>
        <a href="#portfolio" onClick={close}>
          Portfólio
        </a>
        <a href="#sobre" onClick={close}>
          Sobre
        </a>
        <a href="#depoimentos" onClick={close}>
          Depoimentos
        </a>
        <a href="#contato" className="drawer-cta" onClick={close}>
          Agendar Sessão
        </a>
      </nav>
    </>
  );
}
