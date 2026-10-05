import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawer] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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
          ISAÍAS <span>NATANAEL</span>
        </a>

        <ul className="nav-links">
          <li>
            <a href="#galeria">Galeria de Fotos</a>
          </li>
          <li>
            <a href="#sobre">Visão</a>
          </li>
          <li>
            <a href="#experiencia">Metodologia</a>
          </li>
          <li>
            <a href="#contato">Contato</a>
          </li>
        </ul>

        <div className="nav-right">
          <a href="#contato" className="nav-contact-btn">
            Solicitar Orçamento
          </a>
        </div>

        {/* Botão de Menu Hambúrguer / Fechar */}
        <button
          className={`nav-hamburger-btn${drawerOpen ? " open" : ""}`}
          aria-label={drawerOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setDrawer((v) => !v)}
        >
          {drawerOpen ? (
            <>
              <X className="btn-menu-icon" size={18} />
            </>
          ) : (
            <Menu className="btn-menu-icon" size={20} />
          )}
        </button>
      </nav>

      {/* Backdrop e Drawer Mobile */}
      <div className={`nav-drawer-backdrop${drawerOpen ? " open" : ""}`} onClick={close} />
      
      <nav className={`nav-drawer${drawerOpen ? " open" : ""}`}>
        {/* Botão de Fechar Dedicado no Canto Superior do Drawer */}
        <button className="drawer-close-btn" onClick={close} aria-label="Fechar menu">
          <X size={22} />
        </button>

        <a href="#galeria" onClick={close}>
          Galeria de Fotos
        </a>
        <a href="#sobre" onClick={close}>
          Visão & Filosofia
        </a>
        <a href="#experiencia" onClick={close}>
          Metodologia
        </a>
        <a href="#contato" className="drawer-cta" onClick={close}>
          Solicitar Orçamento
        </a>
      </nav>
    </>
  );
}
