import React, { useState, useEffect } from "react";
import { useComparator } from "../contexts/ComparatorContext";
import { fetchPhoneById } from "../api";

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
  const { compareList: compareIds, clearCompare } = useComparator();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (compareIds.length < 2) {
      setItems([]);
      return;
    }

    Promise.all(compareIds.map((p) => fetchPhoneById(p.id)))
      .then(setItems)
      .catch((err) => console.error(err));
  }, [compareIds]);

  if (compareIds.length < 2) {
    return (
      <div className="container my-5 text-center text-muted">
        <p className="fs-5">Seleziona almeno 2 telefoni per confrontarli.</p>
      </div>
    );
  }

  const list = items.slice(0, 4); // max 4 colonne
  const keys = Object.keys(list[0] ?? {}).filter(
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

      <div className="table-responsive">
        <table className="table table-bordered align-middle text-center">
          <thead className="table-light">
            <tr>
              <th></th>
              {list.map((p) => (
                <th key={`hdr-${p.id}`}>
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="img-fluid rounded mb-2"
                    style={{ maxHeight: "100px" }}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {keys.map((key) => (
              <tr key={key}>
                <th className="text-start">{LABELS_IT[key] || key}</th>
                {list.map((p) => (
                  <td key={`${p.id}-${key}`}>
                    {key === "price"
                      ? `€${(p.price ?? 0).toFixed(2)}`
                      : p[key] ?? "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
