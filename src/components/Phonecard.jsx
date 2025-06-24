import React from "react";
import { useFavorites } from "../contexts/FavoritesContext";

export default function PhoneCard({
  id,
  title,
  image,
  category,
  origin,
  description,
  price,
}) {
  const { favorites, addFav, removeFav } = useFavorites();

  const isFavorited = favorites.some((item) => item.id === id);

  const handleFavoriteToggle = () => {
    const phone = { id, title, image, category, origin, description, price };
    isFavorited ? removeFav(id) : addFav(phone);
  };

  return (
    <div className="card shadow-sm h-100">
      <img
        src={image}
        alt={title}
        className="card-img-top img-fluid p-3"
        style={{ objectFit: "contain", maxHeight: "250px" }}
      />

      <div className="card-body text-center d-flex flex-column">
        <h5 className="card-title fw-bold">{title}</h5>
        <p className="card-text text-muted small">
          {category} · {origin}
        </p>
        <p className="card-text">{description}</p>
        <p className="fw-semibold">{price?.toFixed(2)} €</p>

        <div className="btn-group justify-content-center mt-auto" role="group">
          <button
            className={`btn btn-outline-primary ${isFavorited ? "active" : ""}`}
            onClick={handleFavoriteToggle}
            title="Aggiungi ai preferiti"
          >
            {isFavorited ? "✅ Salvato" : "💾"}
          </button>
          <button
            className="btn btn-outline-success"
            onClick={() => console.log("TODO: aggiungi a comparazione")}
            title="Aggiungi alla comparazione"
          >
            ➕
          </button>
        </div>
      </div>
    </div>
  );
}
