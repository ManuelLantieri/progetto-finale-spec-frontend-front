import React, { useState, useEffect } from "react";
import { useComparator } from "../contexts/ComparatorContext";

const LABELS_IT = {
  title: "Modello",
  category: "Categoria",
  origin: "Origine",
  chip: "Chipset",
  display: "Display",
  battery: "Batteria",
  price: "Prezzo",
  description: "Descrizione",
};

export default function Comparator() {
  const { compareList, clearCompare } = useComparator();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (compareList.length < 2) {
      setItems([]);
    } else {
      const selected = compareList.slice(0, 3);
      console.log(
        "📦 Telefoni selezionati:",
        selected.map((p) => p.imageUrl)
      );
      setItems(selected);
    }
  }, [compareList]);

  if (compareList.length < 2) {
    return (
      <div className="container my-5 text-center text-muted">
        <p className="fs-5">Seleziona almeno 2 telefoni per confrontarli.</p>
      </div>
    );
  }

  const keys = Object.keys(items[0] ?? {}).filter(
    (k) => !["id", "createdAt", "updatedAt", "imageUrl"].includes(k)
  );

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Confronto Telefoni</h2>
        <button className="btn btn-outline-secondary" onClick={clearCompare}>
          Svuota Confronto
        </button>
      </div>

      <div className="row gx-4 gy-5">
        <div className="col-12 col-md-3 fw-semibold">
          <div className="mb-5 d-none d-md-block" />
          {keys.map((key) => (
            <div key={key} className="mb-4 text-secondary">
              {LABELS_IT[key] || key}
            </div>
          ))}
        </div>

        {items.map((phone) => {
          console.log("🖼️ Comparator image:", phone.imageUrl);

          return (
            <div key={phone.id} className="col-6 col-md">
              <div className="text-center mb-4">
                <img
                  src={phone.imageUrl}
                  alt={phone.title}
                  className="img-fluid mb-3"
                  style={{ maxHeight: "180px", objectFit: "contain" }}
                />
                <h5 className="fw-bold">{phone.title}</h5>
                <p className="text-primary">
                  {typeof phone.price === "number"
                    ? `€ ${phone.price.toFixed(2)}`
                    : "—"}
                </p>
              </div>
              <div>
                {keys.map((key) => (
                  <div key={key} className="mb-4 text-center">
                    {phone[key] ?? "—"}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
