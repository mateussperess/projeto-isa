import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PhotoMasonryGrid({ items = [], onOpenLightbox }) {
  const navigate = useNavigate();

  return (
    <div className="photo-gallery-grid">
      {items.map((item, index) => {
        const categoryName = item.categoria?.nome || item.category || "Fotografia";
        const imageSrc = item.capa || item.src || item.url;
        
        // Alternar tamanhos verticais/horizontais para visual masonry
        const isTall = index % 3 === 0;

        return (
          <article
            key={item.id || index}
            className={`photo-gallery-card ${isTall ? "tall" : ""}`}
            onClick={() => onOpenLightbox(index)}
          >
            <div className="photo-wrap">
              <img
                src={imageSrc}
                alt={item.titulo || item.title || "Fotografia por Isaías Natanael"}
                loading="lazy"
                className="photo-img"
              />
              <div className="photo-overlay">
                <div className="photo-info">
                  <span className="photo-tag">{categoryName}</span>
                  <h3 className="photo-title">{item.titulo || item.title}</h3>
                  <div className="photo-actions">
                    <button
                      className="photo-view-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenLightbox(index);
                      }}
                    >
                      Ampliar ↗
                    </button>
                    {item.id && typeof item.id === "number" && (
                      <button
                        className="photo-detail-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/evento/${item.id}`);
                        }}
                      >
                        Ver Projeto
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
