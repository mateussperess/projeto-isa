import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/pages/eventos.scss"

export default function Evento() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/eventos/${id}/`)
      .then((res) => setEvento(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!evento) return <p>Evento não encontrado.</p>;

  return (
    <>
      <main className="ev-root">
        <button className="ev-back" onClick={() => navigate(-1)}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M9 2L4 7L9 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Voltar
        </button>

        <div className="ev-header">
          <h1 className="ev-title">{evento.titulo}</h1>
        </div>
        <p className="ev-desc">{evento.descricao}</p>

        <div className="ev-gallery">
          {evento.fotos.map((foto) => (
            <div key={foto.id} className="ev-photo">
              <img src={foto.imagem} alt={foto.legenda || evento.titulo} />
              {foto.legenda && (
                <div className="ev-photo-overlay">
                  <span className="ev-photo-caption">{foto.legenda}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
