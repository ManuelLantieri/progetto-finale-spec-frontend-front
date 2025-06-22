import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const API_BASE = "http://localhost:3001";

export default function PhoneDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [phone, setPhone] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/smartphones/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Telefono non trovato");
        return res.json();
      })
      .then(setPhone)
      .catch((err) => {
        console.error(err);
        navigate("/"); // Torna alla home se errore
      });
  }, [id, navigate]);

  if (!phone) {
    return (
      <div className="container my-5 text-center">
        <p className="text-muted">Caricamento telefono...</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <button
        className="btn btn-outline-secondary mb-4"
        onClick={() => navigate(-1)}
      >
        ← Torna indietro
      </button>

      <div className="row g-4 align-items-start">
        <div className="col-md-5">
          <img
            src={phone.imageUrl}
            alt={phone.title}
            className="img-fluid rounded shadow-sm"
          />
        </div>

        <div className="col-md-7">
          <h2 className="mb-3">{phone.title}</h2>
          <p className="text-muted mb-1">Categoria: {phone.category}</p>
          <p className="text-muted mb-1">Origine: {phone.origin}</p>
          {phone.roastLevel && phone.roastLevel !== "N/A" && (
            <p className="text-muted mb-1">Tostatura: {phone.roastLevel}</p>
          )}
          <p className="fs-5 mt-3">{phone.description}</p>
          <h4 className="mt-4 text-primary">€ {phone.price.toFixed(2)}</h4>
        </div>
      </div>
    </div>
  );
}
