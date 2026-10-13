import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { getImageUrl } from "../utils/imageUrl";
import LightboxModal from "../components/LightboxModal";
import "../styles/pages/eventos.scss";

export default function Evento() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    currentIndex: 0,
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
    window.scrollTo(0, 0);

    api
      .get(`/eventos/${id}/`)
      .then((res) => setEvento(res.data))
      .catch(() => setEvento(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="ev-loading-container">
        <p>Carregando acervo do evento...</p>
      </div>
    );
  }

  if (!evento) {
    return (
      <div className="ev-error-container">
        <h2>Projeto não encontrado</h2>
        <button className="ev-back" onClick={() => navigate("/")}>
          ← Voltar para a Galeria Principal
        </button>
      </div>
    );
  }

  // Lista de fotos do evento formatadas para o Lightbox e Galeria
  const fotosEvento = (evento.fotos && evento.fotos.length > 0)
    ? evento.fotos.map((f) => ({
        id: f.id,
        src: getImageUrl(f.imagem),
        title: evento.titulo,
        legenda: f.legenda || "",
        description: evento.descricao || "",
        category: evento.categoria?.nome || "Fotografia",
      }))
    : [
        {
          id: evento.id,
          src: getImageUrl(evento.capa),
          title: evento.titulo,
          legenda: "",
          description: evento.descricao || "",
          category: evento.categoria?.nome || "Capa do Evento",
        }
      ];

  const handleOpenPhoto = (index) => {
    setLightboxState({
      isOpen: true,
      currentIndex: index,
    });
  };

  return (
    <div className="ev-page-wrapper">
      <main className="ev-root">
        <button className="ev-back" onClick={() => navigate("/")}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M9 2L4 7L9 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Voltar ao Portfólio
        </button>

        <div className="ev-header">
          {evento.categoria?.nome && (
            <span className="ev-category-tag">{evento.categoria.nome}</span>
          )}
          <h1 className="ev-title">{evento.titulo}</h1>
          {evento.data && <span className="ev-date">{evento.data}</span>}
        </div>

        {evento.descricao && <p className="ev-desc">{evento.descricao}</p>}

        <div className="ev-gallery">
          {fotosEvento.map((foto, idx) => (
            <div
              key={foto.id || idx}
              className="ev-photo group"
              onClick={() => handleOpenPhoto(idx)}
            >
              <img src={foto.src} alt={foto.title} loading="lazy" />
              <div className="ev-photo-overlay">
                <span className="ev-photo-caption">{foto.title}</span>
                <span className="ev-expand-icon">Ampliar ↗</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal Lightbox para o Evento */}
      <LightboxModal
        isOpen={lightboxState.isOpen}
        onClose={() => setLightboxState((prev) => ({ ...prev, isOpen: false }))}
        photos={fotosEvento}
        currentIndex={lightboxState.currentIndex}
        onSelectIndex={(newIdx) =>
          setLightboxState((prev) => ({ ...prev, currentIndex: newIdx }))
        }
      />
    </div>
  );
}
