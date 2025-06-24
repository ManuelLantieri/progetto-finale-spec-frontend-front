import { useState } from "react";
import { useComparator } from "../contexts/ComparatorContext";
import { useNavigate } from "react-router-dom";

export default function CompareCollapse() {
  const { compareList, toggleCompare, clearCompare } = useComparator();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  if (compareList.length === 0) return null;

  return (
    <div
      className="position-fixed"
      style={{ bottom: "1.5rem", right: "1.5rem", zIndex: 1060 }}
    >
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="btn btn-dark d-flex align-items-center gap-2 rounded-pill px-3 py-2"
        style={{
          fontWeight: "500",
          fontSize: "14px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
        }}
      >
        {compareList.length} dispositivo
        {compareList.length > 1 ? "i" : ""} selezionato
      </button>
      {isOpen && (
        <div
          className="bg-white border rounded shadow mt-2 p-3"
          style={{
            minWidth: "280px",
            maxWidth: "90vw",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <div className="d-flex justify-content-between align-items-center mb-2">
            <strong>Dispositivi selezionati</strong>
            <button className="btn-close" onClick={() => setIsOpen(false)} />
          </div>

          <div className="d-flex flex-column gap-2">
            {compareList.map((phone) => (
              <div
                key={phone.id}
                className="d-flex align-items-center border rounded px-2 py-1"
                style={{ backgroundColor: "#f8f9fa" }}
              >
                <img
                  src={phone.image}
                  alt={phone.title}
                  width={40}
                  height={40}
                  className="me-2"
                  style={{ objectFit: "contain" }}
                />
                <span className="small flex-grow-1">{phone.title}</span>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => toggleCompare(phone)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="mt-3 d-flex gap-2">
            <button
              className="btn btn-secondary flex-fill"
              onClick={() => {
                clearCompare();
                setIsOpen(false);
              }}
            >
              Annulla
            </button>

            {compareList.length >= 2 && (
              <button
                className="btn btn-primary flex-fill"
                onClick={() => {
                  const ids = compareList.map((p) => p.id).join(",");
                  setIsOpen(false);
                  navigate(`/compare?ids=${ids}`);
                }}
              >
                Confronta ({compareList.length})
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
