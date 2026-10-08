import { useEffect, useState } from "react";

const DEFAULT_HERO_PHOTOS = [
  {
    url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80",
    title: "Convenção Anual Corporativa",
    category: "Corporativo & Galas"
  },
  {
    url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80",
    title: "Festival Cultural & Palco",
    category: "Eventos & Espetáculos"
  },
  {
    url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1600&q=80",
    title: "Ensaio Autoral em Luz Natural",
    category: "Retratos & Fine Art"
  },
  {
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80",
    title: "Celebração ao Entardecer",
    category: "Celebrações & Sociais"
  }
];

export default function Hero({ photos = [] }) {
  // Se fotos foram fornecidas do backend Django, usamos elas no banner
  const slidesToUse = photos.length > 0
    ? photos.map((ev) => ({
        url: ev.capa || ev.src || ev.url,
        title: ev.titulo || ev.title || "Fotografia de Eventos",
        category: ev.categoria?.nome || ev.category || "Acervo Isaías Natanael"
      }))
    : DEFAULT_HERO_PHOTOS;

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (slidesToUse.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slidesToUse.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slidesToUse.length]);

  const activePhoto = slidesToUse[current] || slidesToUse[0];

  return (
    <section id="hero" className="photo-hero">
      <div className="hero-backdrop-slides">
        {slidesToUse.map((photo, i) => (
          <div
            key={i}
            className={`hero-bg-slide ${i === current ? "active" : ""}`}
            style={{ backgroundImage: `url(${photo.url})` }}
          />
        ))}
        <div className="hero-gradient-overlay" />
      </div>

      <div className="hero-photo-content">
        <div className="hero-header-meta">
          <span className="meta-badge">OLHAR</span>
        </div>

        <h1 className="hero-quote-title">
          “Que minhas fotos nunca terminem em si mesmas, mas conduzam o olhar para <span className="hero-quote-highlight">aquilo que é eterno</span>.”
        </h1>

        <p className="hero-subtext">
          Assim, primeiro você conhece o meu olhar — para depois conhecer o meu trabalho. Fotografia documental de eventos corporativos, solenidades, galas e retratos autorais.
        </p>

        <div className="hero-bottom-bar">
          <a href="#galeria" className="explore-btn">
            CONHEÇA O MEU TRABALHO ↓
          </a>

          {activePhoto && (
            <div className="hero-photo-indicator">
              <span className="indicator-current">
                {String(current + 1).padStart(2, "0")}
              </span>
              <span className="indicator-sep">/</span>
              <span className="indicator-total">
                {String(slidesToUse.length).padStart(2, "0")}
              </span>
              <span className="indicator-label">{activePhoto.category}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

