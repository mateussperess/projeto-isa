import { useNavigate } from "react-router-dom";

export default function EventoCard({ evento }) {
  const navigate = useNavigate();

  return (
    <article
      className="evento-card"
      onClick={() => navigate(`/evento/${evento.id}`)}
    >
      {evento.capa ? (
        <img
          className="evento-card__capa"
          src={evento.capa}
          alt={evento.titulo}
          loading="lazy"
        />
      ) : (
        <div className="evento-card__capa--placeholder">sem capa</div>
      )}
      <div className="evento-card__info">
        <h2 className="evento-card__titulo">{evento.titulo}</h2>
        <div className="evento-card__meta">
          <span>{evento.data}</span>
          <span>{evento.total_fotos} fotos</span>
        </div>
      </div>
    </article>
  );
}
