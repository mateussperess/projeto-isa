import { useEffect } from "react";

export default function LightboxModal({
  isOpen,
  onClose,
  photos = [],
  currentIndex = 0,
  onSelectIndex,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && photos.length > 0) {
        onSelectIndex((currentIndex + 1) % photos.length);
      }
      if (e.key === "ArrowLeft" && photos.length > 0) {
        onSelectIndex((currentIndex - 1 + photos.length) % photos.length);
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose, photos, currentIndex, onSelectIndex]);

  if (!isOpen || photos.length === 0) return null;

  const currentPhoto = photos[currentIndex] || photos[0];
  const hasMultiple = photos.length > 1;

  const handlePrev = (e) => {
    e.stopPropagation();
    onSelectIndex((currentIndex - 1 + photos.length) % photos.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    onSelectIndex((currentIndex + 1) % photos.length);
  };

  return (
    <div className="lightbox-backdrop" onClick={onClose}>
      {/* Botão de Fechar */}
      <button className="lightbox-close" onClick={onClose} aria-label="Fechar">
        ✕
      </button>

      {/* Contador de Fotos */}
      <div className="lightbox-counter">
        <span>{String(currentIndex + 1).padStart(2, "0")}</span> /{" "}
        {String(photos.length).padStart(2, "0")}
      </div>

      {/* Navegação por Setas */}
      {hasMultiple && (
        <>
          <button
            className="lightbox-arrow left"
            onClick={handlePrev}
            aria-label="Foto anterior"
          >
            ‹
          </button>
          <button
            className="lightbox-arrow right"
            onClick={handleNext}
            aria-label="Próxima foto"
          >
            ›
          </button>
        </>
      )}

      {/* Imagem Central e Legenda */}
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <img
          src={currentPhoto.src || currentPhoto.capa || currentPhoto.url}
          alt={currentPhoto.title || "Fotografia Isaías Natanael"}
          className="lightbox-img"
        />
        <div className="lightbox-caption">
          {currentPhoto.category && (
            <p className="lightbox-tag">{currentPhoto.category}</p>
          )}
          {currentPhoto.title && (
            <h3 className="lightbox-title">{currentPhoto.title}</h3>
          )}
        </div>
      </div>
    </div>
  );
}
