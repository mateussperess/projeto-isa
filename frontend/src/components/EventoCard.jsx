import { useNavigate } from "react-router-dom";

export default function EventoCard({ evento, onExpand }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/evento/${evento.id}`);
  };

  const categoriaNome = evento.categoria?.nome || "Série Autoral";

  return (
    <article className="editorial-card">
      <div className="card-image-wrap" onClick={handleCardClick}>
        {evento.capa ? (
          <img
            className="card-img"
            src={evento.capa}
            alt={evento.titulo}
            loading="lazy"
          />
        ) : (
          <div className="card-img-placeholder">Sem capa</div>
        )}
        <div className="card-overlay" />
      </div>

      <div className="card-header">
        <span className="card-tag">{categoriaNome}</span>
        {onExpand && (
          <button
            className="card-expand-btn"
            onClick={(e) => {
              e.stopPropagation();
              onExpand(evento);
            }}
            title="Ampliar foto"
          >
            Ampliar ↗
          </button>
        )}
      </div>

      <h3 className="card-title" onClick={handleCardClick}>
        {evento.titulo}
      </h3>

      <p className="card-subtitle">
        {evento.data && <span>{evento.data}</span>}
        {evento.total_fotos ? <span> · {evento.total_fotos} fotos</span> : null}
      </p>
    </article>
  );
}
