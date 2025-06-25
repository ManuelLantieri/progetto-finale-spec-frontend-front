import React from "react";

function getPhoneImagePath(filename) {
  return `/images/phones/${filename}`;
}

export default function CompareCard({
  title,
  image,
  description,
  origin,
  category,
  price,
  megapixels,
  cpuSpeedGHz,
  resolution,
  ram,
  videoRecording,
  brand,
}) {
  return (
    <div
      className="bg-white rounded shadow text-center p-3"
      style={{
        minWidth: "250px",
        flex: "1 1 300px",
        color: "#000",
      }}
    >
      <img
        src={image}
        alt={title || "Smartphone"}
        loading="lazy"
        className="img-fluid mb-3"
        style={{ maxHeight: "250px", objectFit: "contain" }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/img/placeholder.png";
        }}
      />

      <h5 className="fw-bold">{title}</h5>
      <p className="text-muted small">{description}</p>

      <div className="text-start mt-3">
        <p className="mb-1">
          <strong>Prezzo:</strong> {price ? `${price.toFixed(2)} €` : "N/A"}
        </p>
        <p className="mb-1">
          <strong>Categoria:</strong> {category || "N/A"}
        </p>
        <p className="mb-1">
          <strong>Origine:</strong> {origin || "N/A"}
        </p>
        <p className="mb-1">
          <strong>Megapixel:</strong> {megapixels ?? "N/A"}
        </p>
        <p className="mb-1">
          <strong>RAM:</strong> {ram || "N/A"}
        </p>
        <p className="mb-1">
          <strong>CPU:</strong> {cpuSpeedGHz ? `${cpuSpeedGHz} GHz` : "N/A"}
        </p>
        <p className="mb-1">
          <strong>Video:</strong> {videoRecording || "N/A"}
        </p>
        <p className="mb-1">
          <strong>Risoluzione:</strong> {resolution || "N/A"}
        </p>
      </div>
    </div>
  );
}
