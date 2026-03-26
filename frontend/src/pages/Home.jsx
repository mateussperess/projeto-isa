import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import useCursor from "../hooks/useCursor";
import useReveal from "../hooks/useReveal";
import Navbar from "../components/NavBar";
import Hero from "../components/Hero";

const CATEGORIAS = [
  {
    tag: "01 — Especialidade",
    nome: "Casamentos",
    count: "48 projetos",
    img: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80",
  },
  {
    tag: "02 — Especialidade",
    nome: "Corporativo",
    count: "31 projetos",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
  },
  {
    tag: "03 — Especialidade",
    nome: "Fine Art",
    count: "22 projetos",
    img: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=600&q=80",
  },
  {
    tag: "04 — Especialidade",
    nome: "Ensaios",
    count: "19 projetos",
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=80",
  },
  {
    tag: "05 — Especialidade",
    nome: "Eventos",
    count: "14 projetos",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
  },
];

const DEPOIMENTOS = [
  {
    inicial: "A",
    nome: "Ana & Pedro",
    evento: "Casamento · Porto Alegre",
    texto:
      '"O Fulano captou cada momento com uma sensibilidade que nos surpreendeu. As fotos são simplesmente mágicas."',
  },
  {
    inicial: "R",
    nome: "Roberto Alves",
    evento: "Evento Corporativo · Caxias do Sul",
    texto:
      '"Contratamos para fotografar nosso evento corporativo e o resultado foi impressionante."',
  },
  {
    inicial: "C",
    nome: "Camila Moretti",
    evento: "Fine Art · Gramado",
    texto:
      '"As fotos fine art que fez das paisagens da Serra são obras de arte. Já a terceira vez que trabalhamos juntos."',
  },
  {
    inicial: "J",
    nome: "Júlia & Thiago",
    evento: "Casamento · Gramado",
    texto:
      '"O resultado superou todas as expectativas. Comprometido em capturar nossa história do início ao fim."',
  },
  {
    inicial: "M",
    nome: "Marina Souza",
    evento: "Evento · Porto Alegre",
    texto:
      '"Incrível a capacidade de encontrar a luz certa em qualquer situação. Qualidade editorial impressionante."',
  },
];

export default function Home() {
  const [eventos, setEventos] = useState([]);
  const [filtro, setFiltro] = useState("todos");
  const navigate = useNavigate();

  useCursor();
  useReveal();

  useEffect(() => {
    api.get("/eventos/").then((res) => setEventos(res.data));
  }, []);

  return (
    <>
      {/* Cursor */}
      <div className="cursor" id="cursorDot">
        <div className="cursor-dot" />
      </div>
      <div className="cursor-ring" id="cursorRing" />

      <Navbar />
      <Hero />

      {/* ── CATEGORIAS ──────────────────────────────────────────── */}
      <section id="categorias">
        <div className="categories-header reveal">
          <div>
            <p className="section-eyebrow">O que faço</p>
            <h2 className="section-title">Especialidades</h2>
          </div>
          <a
            href="#portfolio"
            style={{
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--warm-gray, #9c9089)",
            }}
          >
            Ver todos os trabalhos →
          </a>
        </div>

        <div className="categories-grid reveal">
          {CATEGORIAS.map((cat, i) => (
            <div className="cat-card" key={i}>
              <div className="cat-bg" style={{ height: "100%" }}>
                <img src={cat.img} alt={cat.nome} />
              </div>
              <div className="cat-overlay" />
              <span className="cat-count">{cat.count}</span>
              <div className="cat-content">
                <p className="cat-tag">{cat.tag}</p>
                <h3 className="cat-name">{cat.nome}</h3>
                <a href="#portfolio" className="cat-link">
                  Ver galeria <span className="cat-arrow" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PORTFOLIO (eventos do Django) ───────────────────────── */}
      <section id="portfolio">
        <div className="portfolio-header reveal">
          <div>
            <p className="section-eyebrow">Trabalhos recentes</p>
            <h2 className="section-title">Portfólio</h2>
          </div>
          <div className="filter-tabs">
            {[
              "todos",
              "casamento",
              "corporativo",
              "fine-art",
              "ensaio",
              "evento",
            ].map((cat) => (
              <button
                key={cat}
                className={`filter-btn${filtro === cat ? " active" : ""}`}
                onClick={() => setFiltro(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="portfolio-masonry">
          {eventos.map((evento) => (
            <div
              key={evento.id}
              className="portfolio-item"
              onClick={() => navigate(`/evento/${evento.id}`)}
            >
              {evento.capa && (
                <img
                  className="portfolio-img"
                  src={evento.capa}
                  alt={evento.titulo}
                  loading="lazy"
                />
              )}
              <div className="portfolio-overlay">
                <div className="portfolio-info">
                  <h3>{evento.titulo}</h3>
                  <p>
                    {evento.data} · {evento.total_fotos} fotos
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SOBRE ───────────────────────────────────────────────── */}
      <section id="sobre">
        <div className="about-photo reveal">
          <div className="about-photo-main">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
              alt="Isaías Natanael"
            />
          </div>
          <div className="about-badge">
            <span className="about-badge-num">8+</span>
            <span className="about-badge-txt">
              anos de
              <br />
              experiência
            </span>
          </div>
        </div>

        <div className="about-text reveal reveal-delay-2">
          <p className="section-eyebrow">Sobre mim</p>
          <h2 className="section-title">
            Cada foto conta
            <br />
            <em>uma história</em>
          </h2>
          <div className="divider" />
          <p>
            Sou fotógrafo especializado em casamentos, eventos corporativos e
            fotografia fine art baseado em Porto Alegre. Acredito que cada
            imagem deve capturar não apenas o momento, mas a emoção que o
            envolve.
          </p>
          <p>
            Com mais de 8 anos de experiência e centenas de histórias
            documentadas, trago um olhar único para cada projeto — combinando
            técnica apurada com sensibilidade artística.
          </p>
          <div className="about-stats">
            <div>
              <div className="stat-num">134+</div>
              <div className="stat-label">Projetos</div>
            </div>
            <div>
              <div className="stat-num">8+</div>
              <div className="stat-label">Anos</div>
            </div>
            <div>
              <div className="stat-num">100%</div>
              <div className="stat-label">Satisfação</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DEPOIMENTOS ─────────────────────────────────────────── */}
      <section id="depoimentos">
        <div className="reveal">
          <p className="section-eyebrow">O que dizem</p>
          <h2 className="section-title">Depoimentos</h2>
        </div>

        <div className="testimonials-track-wrap">
          {/* duplicado para loop contínuo */}
          <div className="testimonials-track">
            {[...DEPOIMENTOS, ...DEPOIMENTOS].map((dep, i) => (
              <div className="testimonial-card" key={i}>
                <div className="testimonial-stars">
                  {[...Array(5)].map((_, s) => (
                    <div className="star" key={s} />
                  ))}
                </div>
                <p className="testimonial-quote">{dep.texto}</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{dep.inicial}</div>
                  <div>
                    <p className="author-name">{dep.nome}</p>
                    <p className="author-event">{dep.evento}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTATO ─────────────────────────────────────────────── */}
      <section id="contato">
        <div className="reveal">
          <p className="section-eyebrow">Vamos conversar</p>
          <h2 className="section-title">
            Agende sua
            <br />
            <em>sessão</em>
          </h2>
          <div className="divider" />
          <div className="contact-details">
            <div className="contact-detail">
              <div className="detail-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <div>
                <p className="detail-label">WhatsApp</p>
                <p className="detail-value">+55 51 9 9999-9999</p>
              </div>
            </div>
            <div className="contact-detail">
              <div className="detail-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <p className="detail-label">Email</p>
                <p className="detail-value">contato@isaiasnatanael.com</p>
              </div>
            </div>
            <div className="contact-detail">
              <div className="detail-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <p className="detail-label">Localização</p>
                <p className="detail-value">Porto Alegre, RS — Brasil</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-wrap reveal reveal-delay-2">
          <div className="form-row">
            <div className="form-group">
              <label>Nome</label>
              <input type="text" placeholder="Seu nome" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="seu@email.com" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Telefone</label>
              <input type="tel" placeholder="(51) 9 0000-0000" />
            </div>
            <div className="form-group">
              <label>Tipo de evento</label>
              <select defaultValue="">
                <option value="" disabled>
                  Selecione...
                </option>
                <option>Casamento</option>
                <option>Corporativo</option>
                <option>Fine Art / Paisagem</option>
                <option>Ensaio de casal</option>
                <option>Evento social</option>
                <option>Outro</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Data prevista</label>
            <input type="text" placeholder="Ex: Março de 2026" />
          </div>
          <div className="form-group">
            <label>Mensagem</label>
            <textarea placeholder="Conte um pouco sobre seu evento, local, expectativas..." />
          </div>
          <button type="button" className="submit-btn">
            Enviar mensagem
          </button>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer>
        <div className="footer-logo">
          Isaías <span>Natanael</span>
        </div>
        <p className="footer-copy">
          © 2026 Isaías Natanael Fotografia — Todos os direitos reservados
        </p>
        <div className="footer-social">
          <a href="#">Instagram</a>
          <a href="#">Behance</a>
          <a href="#">LinkedIn</a>
        </div>
      </footer>
    </>
  );
}
