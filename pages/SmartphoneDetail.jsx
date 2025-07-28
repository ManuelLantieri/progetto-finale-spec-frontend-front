import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SmartphoneDetail() {
  const { state: phone } = useLocation();
  const navigate = useNavigate();

  if (!phone) {
    return (
      <div className="d-flex flex-column min-vh-100">
        {" "}
        <main className="container text-center py-5">
          <h3>Nessun smartphone selezionato</h3>
          <button
            className="btn btn-outline-primary mt-3"
            onClick={() => navigate("/smartphones")}
          >
            Torna alla lista
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="container py-5">
        <h2 className="fw-bold mb-4 text-center">{phone.title}</h2>

        <div className="row g-5">
          <div className="col-md-6 text-center">
            <img
              src={phone.image}
              alt={phone.title || "Smartphone"}
              className="img-fluid border rounded p-2 bg-light"
              style={{ maxHeight: "350px", objectFit: "contain" }}
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/img/placeholder.png";
              }}
            />
          </div>

          <div className="col-md-6">
            <h5 className="text-muted">
              {phone.brand} · {phone.category}
            </h5>
            <p>
              <strong>Origine:</strong> {phone.origin || "N/A"}
            </p>
            <p>
              <strong>Descrizione:</strong> {phone.description}
            </p>
            <p>
              <strong>Prezzo:</strong>{" "}
              {phone.price ? `${phone.price.toFixed(2)} €` : "N/A"}
            </p>

            <hr />

            <h6 className="fw-semibold mb-3">🔍 Specifiche Tecniche</h6>
            <ul className="list-unstyled">
              <li>
                <strong>RAM:</strong> {phone.ram || "N/A"}
              </li>
              <li>
                <strong>CPU:</strong>{" "}
                {phone.cpuSpeedGHz ? `${phone.cpuSpeedGHz} GHz` : "N/A"}
              </li>
              <li>
                <strong>Fotocamera:</strong>{" "}
                {phone.megapixels ? `${phone.megapixels} MP` : "N/A"}
              </li>
              <li>
                <strong>Risoluzione:</strong> {phone.resolution || "N/A"}
              </li>
              <li>
                <strong>Video Recording:</strong>{" "}
                {phone.videoRecording ? "Sì" : "No"}
              </li>
            </ul>

            <button
              className="btn btn-secondary mt-4"
              onClick={() => navigate("/smartphones")}
            >
              🔙 Torna alla lista
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
