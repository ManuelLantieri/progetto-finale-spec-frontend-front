import React, { useState } from "react";

export default function PhoneCard({
  title,
  image,
  category,
  origin,
  description,
  price,
}) {
  const [favorited, setFavorited] = useState(false);
  const [compared, setCompared] = useState(false);

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
            className={`btn btn-outline-primary ${favorited ? "active" : ""}`}
            onClick={() => setFavorited(!favorited)}
            title="Aggiungi ai preferiti"
          >
            {favorited ? "Preferito" : "💾"}
          </button>

          <button
            className={`btn btn-outline-success ${compared ? "active" : ""}`}
            onClick={() => setCompared(!compared)}
            title="Aggiungi alla comparazione"
          >
            {compared ? "✓" : "➕"}
          </button>
        </div>
      </div>
    </div>
  );
}
