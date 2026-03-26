import { useEffect, useState } from "react";

const SLIDES = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1600&q=80",
  "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1600&q=80",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero">
      <div className="hero-slideshow">
        {SLIDES.map((src, i) => (
          <div
            key={i}
            className={`slide${i === current ? " active" : ""}`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
      </div>

      <div className="grain" />

      <div className="hero-content">
        <p className="hero-eyebrow">Fotografia de autor — Porto Alegre, RS</p>
        <h1 className="hero-title">
          Momentos que
          <br />
          <em>resistem</em>
          <br />
          ao tempo
        </h1>
        <p className="hero-sub">
          Casamentos, eventos corporativos e fotografia fine art. Cada imagem é
          uma história que merece ser contada com precisão e sensibilidade.
        </p>
      </div>

      <div className="slide-counter">
        <strong id="currentSlide">
          {String(current + 1).padStart(2, "0")}
        </strong>{" "}
        / 0{SLIDES.length}
      </div>

      <div className="hero-scroll">
        <div className="scroll-line" />
        <span>Explorar</span>
      </div>
    </section>
  );
}
