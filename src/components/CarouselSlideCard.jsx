import React from "react";
import { useFavorites } from "../contexts/FavoritesContext";
import { useComparator } from "../contexts/ComparatorContext";

export default function CarouselSlideCard(props) {
  const {
    id,
    title,
    image,
    category,
    origin,
    description,
    price,
    megapixels,
    cpuSpeedGHz,
    resolution,
    ram,
    videoRecording,
    brand,
  } = props;

  const { favorites, addFav, removeFav } = useFavorites();
  const { compareList, toggleCompare } = useComparator();

  const isFavorited = favorites.some((item) => item.id === id);
  const isCompared = compareList.some((item) => item.id === id);
  const maxReached = compareList.length >= 3 && !isCompared;

  const phone = { ...props };

  const handleFavoriteToggle = () => {
    isFavorited ? removeFav(id) : addFav(phone);
  };

  const handleCompareToggle = () => {
    if (!maxReached) toggleCompare(phone);
  };

  return (
    <div
      className="card shadow-sm d-flex flex-row align-items-center p-3"
      style={{ minHeight: "240px" }}
    >
      <div style={{ flex: "0 0 200px" }}>
        <img
          src={image}
          alt={title || "Smartphone"}
          className="img-fluid"
          style={{
            objectFit: "contain",
            height: "200px",
            width: "100%",
            backgroundColor: "#f5f5f5",
            padding: "1rem",
            borderRadius: "10px",
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/img/placeholder.png";
          }}
        />
      </div>

      <div
        className="flex-grow-1 ms-4 d-flex flex-column justify-content-between"
        style={{ minHeight: "200px" }}
      >
        <div>
          <h5 className="fw-bold mb-1">{title}</h5>
          <p className="text-muted small mb-1">
            {brand || category || "Sconosciuto"} · {origin || "N/A"}
          </p>
          <p className="mb-2">
            {description || "Nessuna descrizione disponibile."}
          </p>

          <ul className="list-unstyled small mb-2">
            <li>
              <strong>CPU:</strong> {cpuSpeedGHz} GHz
            </li>
            <li>
              <strong>RAM:</strong> {ram} GB
            </li>
            <li>
              <strong>Risoluzione:</strong> {resolution || "N/D"}
            </li>
            <li>
              <strong>Video:</strong> {videoRecording ? "✅" : "❌"}
            </li>
          </ul>
        </div>

        <div className="d-flex align-items-center justify-content-between mt-2">
          <span className="fw-bold text-success" style={{ fontSize: "1.4rem" }}>
            {price ? `${price.toFixed(2)} €` : "Prezzo non disponibile"}
          </span>
        </div>
      </div>
    </div>
  );
}
