import React from "react";

export default function CompareCard({ title, image, description }) {
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
        src={getPhoneImagePath(image)}
        alt={title}
        className="img-fluid mb-3"
        style={{ maxHeight: "250px", objectFit: "contain" }}
      />
      <h5 className="fw-bold">{title}</h5>
      <p className="text-muted small">{description}</p>
    </div>
  );
}
