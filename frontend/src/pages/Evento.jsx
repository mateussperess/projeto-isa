import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

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
    <main>
      <button onClick={() => navigate(-1)}>← Voltar</button>
      <h1>{evento.titulo}</h1>
      <p>{evento.descricao}</p>
      <div>
        {evento.fotos.map((foto) => (
          <img
            key={foto.id}
            src={foto.imagem}
            alt={foto.legenda || evento.titulo}
            style={{ width: "300px", aspectRatio: "4/3", objectFit: "cover" }}
          />
        ))}
      </div>
    </main>
  );
}
