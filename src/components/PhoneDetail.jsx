import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPhoneById } from "../api";
import { useFavorites } from "../contexts/FavoritesContext";
import { useComparator } from "../contexts/ComparatorContext";

export default function PhoneDetail() {
  const { id } = useParams();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const { favorites, addFav, removeFav } = useFavorites();
  const { compareList, toggleCompare } = useComparator();

  useEffect(() => {
    fetchPhoneById(id)
      .then(setPhone)
      .catch(() => setError("Telefono non trovato"));
  }, [id]);

  if (error)
    return (
      <div className="container my-5 text-danger text-center">
        <p className="fs-5">{error}</p>
      </div>
    );

  if (!phone)
    return (
      <div className="container my-5 text-center">
        <p className="fs-5">Caricamento…</p>
      </div>
    );

  const isFav = favorites.some((f) => f.id === phone.id);
  const inCompare = compareList.some((c) => c.id === phone.id);

  return (
    <div className="container my-5">
      <div className="card shadow p-4 border-0">
        <img
          src={phone.imageUrl}
          alt={phone.title}
          className="card-img-top mb-4 rounded"
          style={{ maxHeight: "400px", objectFit: "contain" }}
        />

        <div className="card-body">
          <h2 className="card-title fs-3 fw-bold mb-3">{phone.title}</h2>

          <div className="row mb-4 text-muted small">
            <div className="col-md-6">
              <p>
                <strong>Categoria:</strong> {phone.category}
              </p>
              <p>
                <strong>Origine:</strong> {phone.origin}
              </p>
              <p>
                <strong>Display o Chip:</strong> {phone.roastLevel || "N/A"}
              </p>
            </div>
            <div className="col-md-6">
              <p>
                <strong>Prezzo:</strong> €{phone.price?.toFixed(2)}
              </p>
              <p>{phone.description}</p>
            </div>
          </div>

          <div className="d-flex flex-wrap gap-3">
            <button
              onClick={() => (isFav ? removeFav(phone.id) : addFav(phone))}
              className="btn btn-primary"
            >
              {isFav ? "Rimuovi dai Preferiti" : "Aggiungi ai Preferiti"}
            </button>

            <button
              onClick={() => toggleCompare(phone)}
              disabled={!inCompare && compareList.length >= 4}
              className="btn btn-outline-secondary"
            >
              {inCompare ? "Rimuovi dal Confronto" : "Aggiungi al Confronto"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
