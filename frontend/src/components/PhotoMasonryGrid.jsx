import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../utils/imageUrl";

export default function PhotoMasonryGrid({ items = [], onOpenLightbox }) {
  const navigate = useNavigate();

  return (
    <div className="photo-gallery-grid">
      {items.map((item, index) => {
        const categoryName = item.categoria?.nome || item.category || "Fotografia";
        const rawSrc = item.capa || item.src || item.url || item.imagem;
        const imageSrc = getImageUrl(rawSrc);
        
        // Alternar tamanhos verticais/horizontais para visual masonry
        const isTall = index % 3 === 0;

        const targetEventoId = item.eventoId || item.id;

        const handleCardClick = () => {
          if (onOpenLightbox) {
            onOpenLightbox(index);
          } else if (targetEventoId) {
            navigate(`/evento/${targetEventoId}`);
          }
        };

        return (
          <article
            key={`${item.id}-${index}`}
            className={`photo-gallery-card ${isTall ? "tall" : ""}`}
            onClick={handleCardClick}
          >
            <div className="photo-wrap">
              <img
                src={imageSrc}
                alt={item.titulo || item.title || "Fotografia por Isaías Natanael"}
                loading="lazy"
                decoding="async"
                className="photo-img"
              />
              <div className="photo-overlay">
                <div className="photo-info">
                  <span className="photo-tag">{categoryName}</span>
                  <h3 className="photo-title">{item.titulo || item.title}</h3>
                  {/* {(item.legenda || item.description) && (
                    <p className="photo-subtitle">
                      {item.legenda || item.description}
                    </p>
                  )} */}
                  <div className="photo-actions">
                    {targetEventoId && (
                      <button
                        className="photo-view-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/evento/${targetEventoId}`);
                        }}
                      >
                        Ver Projeto Completo →
                      </button>
                    )}
                    {onOpenLightbox && (
                      <button
                        className="photo-detail-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenLightbox(index);
                        }}
                      >
                        Ampliar ↗
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
