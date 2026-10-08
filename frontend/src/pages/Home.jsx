import { useEffect, useState } from "react";
import api from "../api/axios";
import useReveal from "../hooks/useReveal";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PhotoMasonryGrid from "../components/PhotoMasonryGrid";
import LightboxModal from "../components/LightboxModal";

// Fotografias selecionadas em alta definição (acervo inicial de galeria)
const GALERIA_FOTOS_DEFAULT = [
  {
    id: 1,
    title: "Convenção Anual & Gala Corporativa",
    category: "Corporativo",
    capa: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=75",
    categoria: { slug: "corporativo", nome: "Corporativo" },
  },
  {
    id: 2,
    title: "Entre Luzes e Sombras — Retrato Autoral",
    category: "Retratos",
    capa: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=75",
    categoria: { slug: "retratos", nome: "Retratos" },
  },
  {
    id: 3,
    title: "Festival Cultural & Iluminação Cênica",
    category: "Galas & Shows",
    capa: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=75",
    categoria: { slug: "shows", nome: "Galas & Shows" },
  },
  {
    id: 4,
    title: "Celebração ao Entardecer na Serra",
    category: "Celebrações",
    capa: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=75",
    categoria: { slug: "celebracoes", nome: "Celebrações" },
  },
  {
    id: 5,
    title: "Solenidade de Formatura & Baile",
    category: "Eventos Sociais",
    capa: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=900&q=75",
    categoria: { slug: "eventos", nome: "Eventos Sociais" },
  },
  {
    id: 6,
    title: "Contornos Naturais — Fine Art",
    category: "Fine Art",
    capa: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=75",
    categoria: { slug: "fineart", nome: "Fine Art" },
  },
  {
    id: 7,
    title: "Bruma Matinal na Serra Gaúcha",
    category: "Fine Art",
    capa: "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=900&q=75",
    categoria: { slug: "fineart", nome: "Fine Art" },
  },
  {
    id: 8,
    title: "Simpósio Internacional de Inovação",
    category: "Corporativo",
    capa: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=75",
    categoria: { slug: "corporativo", nome: "Corporativo" },
  },
  {
    id: 9,
    title: "Espetáculo de Dança & Movimento",
    category: "Galas & Shows",
    capa: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=900&q=75",
    categoria: { slug: "shows", nome: "Galas & Shows" },
  }
];

const METODOLOGIA_STEPS = [
  {
    num: "01.",
    titulo: "Alinhamento & Cronograma",
    desc: "Compreensão detalhada da agenda do evento, momentos chave e requisitos de iluminação e cobertura.",
  },
  {
    num: "02.",
    titulo: "Equipamento & Iluminação Cênica",
    desc: "Seleção rigorosa de lentes e ótica para capturar imagens nítidas tanto em auditórios quanto ao ar livre.",
  },
  {
    num: "03.",
    titulo: "Atuação Discreta & Ágil",
    desc: "Registro espontâneo da atmosfera, autoridades, participantes e detalhes sem interferir na dinâmica do acontecimento.",
  },
  {
    num: "04.",
    titulo: "Entrega Digital & Tratamento",
    desc: "Tratamento de cor consistente em tons pastéis e minerais, com galeria protegida de alta resolução.",
  },
];

export default function Home() {
  const [eventosBackend, setEventosBackend] = useState([]);
  const [categoriasBackend, setCategoriasBackend] = useState([]);
  const [filtro, setFiltro] = useState("todos");
  
  // Estado para o Lightbox Carousel
  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    currentIndex: 0,
  });

  useReveal();

  useEffect(() => {
    api
      .get("/eventos/")
      .then((res) => setEventosBackend(res.data))
      .catch(() => setEventosBackend([]));

    api
      .get("/categorias/")
      .then((res) => setCategoriasBackend(res.data))
      .catch(() => setCategoriasBackend([]));
  }, []);

  // Lista de fotografias ativas
  const fotosGerais = eventosBackend.length > 0
    ? eventosBackend.map((ev) => ({
        id: ev.id,
        title: ev.titulo,
        src: ev.capa,
        category: ev.categoria?.nome || "Evento",
        categoria: ev.categoria || { slug: "eventos", nome: "Eventos" },
      }))
    : GALERIA_FOTOS_DEFAULT;

  // Abas de filtro
  const abasFiltro = [
    { slug: "todos", nome: "Todas as Fotos" },
    ...(categoriasBackend.length > 0
      ? categoriasBackend.map((c) => ({ slug: c.slug, nome: c.nome }))
      : [
          { slug: "corporativo", nome: "Corporativo" },
          { slug: "shows", nome: "Galas & Shows" },
          { slug: "retratos", nome: "Retratos" },
          { slug: "celebracoes", nome: "Celebrações" },
          { slug: "fineart", nome: "Fine Art" },
        ]),
  ];

  // Filtrar fotos
  const fotosFiltradas = fotosGerais.filter((foto) => {
    if (filtro === "todos") return true;
    const catSlug = (foto.categoria?.slug || foto.category || "").toLowerCase();
    return catSlug.includes(filtro);
  });

  // Abrir foto no lightbox
  const handleOpenLightbox = (indexInFiltered) => {
    setLightboxState({
      isOpen: true,
      currentIndex: indexInFiltered,
    });
  };

  return (
    <>
      <Navbar />
      <Hero photos={fotosGerais} />

      {/* ── SEÇÃO GALERIA DE FOTOS (PHOTO-FIRST) ───────────────── */}
      <section id="galeria">
        <div className="gallery-header-bar reveal">
          <div>
            <span className="section-eyebrow">ACERVO FOTOGRÁFICO</span>
            <h2 className="section-title">
              GALERIA DE <em>FOTOS</em>
            </h2>
          </div>

          <div className="gallery-filter-tabs">
            {abasFiltro.map((cat) => (
              <button
                key={cat.slug}
                className={`filter-btn ${filtro === cat.slug ? "active" : ""}`}
                onClick={() => setFiltro(cat.slug)}
              >
                {cat.nome}
              </button>
            ))}
          </div>
        </div>

        {/* Grade de Galeria de Fotos */}
        <div className="reveal">
          <PhotoMasonryGrid
            items={fotosFiltradas}
            onOpenLightbox={handleOpenLightbox}
          />
        </div>
      </section>

      {/* ── SEÇÃO HISTÓRIA NA FOTOGRAFIA ───────────────────────── */}
      <section id="historia">
        <div className="history-container reveal">
          <div className="history-header">
            <span className="section-eyebrow">TRAJETÓRIA & HISTÓRIA</span>
            <h2 className="section-title">
              UMA HISTÓRIA ESCRITA ATRAVÉS DE <em>LENTES & MEMÓRIAS</em>
            </h2>
          </div>

          <div className="history-text-grid">
            <p className="history-paragraph">
              <strong>[CONTEXTO HISTÓRICO MOCKADO]</strong> A paixão pelo registro documental nasceu da busca constante por eternizar a atmosfera e os sentimentos que preenchem cada ambiente. Ao longo dos anos, construí um acervo focado na verdade de cada gesto.
            </p>
            <p className="history-paragraph">
              Com experiência consolidada em coberturas de solenidades corporativas, festivais culturais e retratos autorais, cada etapa da trajetória refinou o olhar para antecipar momentos espontâneos com precisão técnica.
            </p>
          </div>

          <div className="history-timeline">
            <div className="timeline-card">
              <span className="timeline-year">2014</span>
              <h3 className="timeline-title">PRIMEIROS PASSOS</h3>
              <p className="timeline-desc">Estudo de luz natural e ensaios autorais focados em retrato emotivo.</p>
            </div>
            <div className="timeline-card">
              <span className="timeline-year">2018</span>
              <h3 className="timeline-title">GRANDES EVENTOS</h3>
              <p className="timeline-desc">Expansão para solenidades, convenções corporativas e espetáculos cênicos.</p>
            </div>
            <div className="timeline-card">
              <span className="timeline-year">2022</span>
              <h3 className="timeline-title">ASSINATURA VISUAL</h3>
              <p className="timeline-desc">Consolidação do tratamento pastel mineral e acervo em alta resolução.</p>
            </div>
            <div className="timeline-card">
              <span className="timeline-year">2026</span>
              <h3 className="timeline-title">PROJETOS ATUAIS</h3>
              <p className="timeline-desc">Cobertura documental de âmbito nacional e acervo digital autoral.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEÇÃO SOBRE O FOTÓGRAFO ────────────────────────────── */}
      <section id="sobre-fotografo">
        <div className="photographer-container reveal">
          <div className="photographer-portrait-wrap">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
              alt="Isaías Natanael — Fotógrafo"
            />
            <div className="photographer-badge">
              <span className="badge-name">ISAÍAS NATANAEL</span>
              <span className="badge-role">Fotógrafo Documental & Diretor Criativo</span>
            </div>
          </div>

          <div className="photographer-info">
            <span className="section-eyebrow">SOBRE O FOTÓGRAFO</span>
            <h2 className="photographer-title">
              OLHAR SENSÍVEL E <em>ATUAÇÃO DISCRETA</em>
            </h2>

            <p className="photographer-bio">
              <strong>[CONTEÚDO SOBRE O FOTÓGRAFO - MOCKADO PARA EDITAR DEPOIS]</strong>
            </p>
            <p className="photographer-bio">
              Olá! Sou Isaías Natanael. Minha missão é registrar pessoas, instituições e acontecimentos com autenticidade, capturando a energia singular de cada momento. Atuo com postura silenciosa e observadora para que os convidados e participantes fiquem totalmente à vontade diante da câmera.
            </p>

            <div className="photographer-details-grid">
              <div className="detail-box">
                <span className="detail-label">BASE</span>
                <span className="detail-value">Porto Alegre / RS</span>
              </div>
              <div className="detail-box">
                <span className="detail-label">ATENDIMENTO</span>
                <span className="detail-value">Todo o Brasil</span>
              </div>
              <div className="detail-box">
                <span className="detail-label">ESTILO</span>
                <span className="detail-value">Documental & Autoral</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEÇÃO SOBRE / FILOSOFIA & TÉCNICA ───────────────────── */}
      <section id="sobre">
        <div className="philosophy-container reveal">
          <span className="section-eyebrow">FILOSOFIA & TÉCNICA</span>
          
          <h2 className="philosophy-quote">
            A essência do registro documental traduzida em <span>fundamentos visuais</span>.
          </h2>
          
          <div className="divider-line" />
          
          <p className="philosophy-text">
            Cada trabalho é conduzido com sensibilidade artística e rigor técnico, garantindo uma cobertura elegante, discreta e focada no que é duradouro.
          </p>

          <div className="pillars-grid">
            <div className="pillar-card">
              <span className="pillar-num">01.</span>
              <h3 className="pillar-title">Domínio Técnico de Luz</h3>
              <p className="pillar-desc">
                Precisão em palcos, auditórios com iluminação cênica desafiadora e luz natural ao ar livre.
              </p>
            </div>
            <div className="pillar-card">
              <span className="pillar-num">02.</span>
              <h3 className="pillar-title">Atuação Documental</h3>
              <p className="pillar-desc">
                Discreção total para registrar autoridades, convidados e participantes de maneira autêntica.
              </p>
            </div>
            <div className="pillar-card">
              <span className="pillar-num">03.</span>
              <h3 className="pillar-title">Edição Pastel Mineral</h3>
              <p className="pillar-desc">
                Tratamento limpo e atemporal com foco na fidelidade dos tons de pele e acervo visual refinado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── METODOLOGIA / PROCESSO ───────────────────────────────── */}
      <section id="experiencia">
        <div className="experience-header reveal">
          <span className="section-eyebrow">COMO FUNCIONA</span>
          <h2 className="section-title">METODOLOGIA DE COBERTURA</h2>
          <p className="exp-sub">
            Do planejamento das lentes ao envio do acervo digital em alta resolução.
          </p>
        </div>

        <div className="experience-grid reveal">
          {METODOLOGIA_STEPS.map((step, i) => (
            <div key={i} className="exp-step-card">
              <span className="exp-num">{step.num}</span>
              <h3 className="exp-title">{step.titulo}</h3>
              <p className="exp-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTATO ────────────────────────────────────────────── */}
      <section id="contato">
        <div className="contact-container reveal">
          <span className="contact-eyebrow">DISPONIBILIDADE & ORÇAMENTOS</span>
          
          <h2 className="contact-title">
            VAMOS REGISTRAR O SEU PRÓXIMO EVENTO OU PROJETO?
          </h2>
          
          <p className="contact-text">
            Fotografia de eventos corporativos, galas, festivais, formaturas e ensaios autorais em Porto Alegre, Serra Gaúcha e em todo o território nacional.
          </p>

          <div className="contact-buttons">
            <a
              href="https://wa.me/555183187452?text=Ol%C3%A1%20Isa%C3%ADas,%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20fotografia"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              Solicitar Orçamento via WhatsApp
            </a>
            
            <a
              href="mailto:contato@isaiasnatanael.com"
              className="btn-email"
            >
              Enviar E-mail Comercial
            </a>
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX CAROUSEL MODAL ────────────────────────────── */}
      <LightboxModal
        isOpen={lightboxState.isOpen}
        onClose={() => setLightboxState((prev) => ({ ...prev, isOpen: false }))}
        photos={fotosFiltradas}
        currentIndex={lightboxState.currentIndex}
        onSelectIndex={(newIdx) =>
          setLightboxState((prev) => ({ ...prev, currentIndex: newIdx }))
        }
      />
    </>
  );
}
