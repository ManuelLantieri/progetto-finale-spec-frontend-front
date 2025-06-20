// src/components/PhoneDetail.tsx

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPhoneById } from "../api";
import { useFavorites } from "../contexts/FavoritesContext";
import { useComparator } from "../contexts/ComparatorContext";
import type { Phone } from "../types/types";

const PhoneDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [phone, setPhone] = useState<Phone | null>(null);
  const [error, setError] = useState("");

  const { favorites, addFav, removeFav } = useFavorites();
  const { compareList, toggleCompare } = useComparator();

  useEffect(() => {
    if (id) {
      fetchPhoneById(id)
        .then(setPhone)
        .catch(() => setError("Smartphone non trovato"));
    }
  }, [id]);

  if (error) return <p className="text-center mt-5 text-danger">{error}</p>;
  if (!phone) return <p className="text-center mt-5">Caricamento…</p>;

  const isFav = favorites.some((f: Phone) => f.id === phone.id);
  const inCompare = compareList.some((c: Phone) => c.id === phone.id);

  return (
    <div className="container my-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "700px" }}>
        <img
          src={phone.imageUrl}
          alt={phone.title}
          className="w-100 mb-4 rounded"
          style={{ objectFit: "contain", maxHeight: "400px" }}
        />

        <h2 className="mb-3 text-center">{phone.title}</h2>

        <div className="row text-secondary">
          <div className="col-md-6">
            <p>
              <strong>Categoria:</strong> {phone.category}
            </p>
            <p>
              <strong>Origine:</strong> {phone.origin}
            </p>
            <p>
              <strong>Roast Level:</strong> {phone.roastLevel}
            </p>
          </div>
          <div className="col-md-6">
            <p>
              <strong>Prezzo:</strong> €{phone.price.toFixed(2)}
            </p>
            <p className="mt-2">{phone.description}</p>
          </div>
        </div>

        <div className="d-flex justify-content-center gap-3 mt-4">
          <button
            className="btn btn-primary"
            onClick={() => (isFav ? removeFav(phone.id) : addFav(phone))}
          >
            {isFav ? "Rimuovi dai Preferiti" : "Aggiungi ai Preferiti"}
          </button>
          <button
            className="btn btn-outline-secondary"
            disabled={!inCompare && compareList.length >= 4}
            onClick={() => toggleCompare(phone)}
          >
            {inCompare ? "Rimuovi dal Confronto" : "Aggiungi al Confronto"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhoneDetail;
