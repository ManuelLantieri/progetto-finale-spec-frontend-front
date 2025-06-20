import React, { useState, useEffect } from "react";
import { useComparator } from "../contexts/ComparatorContext";
import { fetchPhoneById } from "../api";
import type { Phone } from "../types/types";

const LABELS_IT: Record<keyof Omit<Phone, "id" | "imageUrl">, string> = {
  title: "Titolo",
  category: "Categoria",
  origin: "Origine",
  roastLevel: "Tostatura",
  price: "Prezzo",
  description: "Descrizione",
};

const Comparator = () => {
  const { compareList, clearCompare } = useComparator();
  const [items, setItems] = useState<Phone[]>([]);

  useEffect(() => {
    if (compareList.length < 2) {
      setItems([]);
      return;
    }

    Promise.all(compareList.map((item) => fetchPhoneById(item.id)))
      .then((full) => setItems(full))
      .catch((err) => console.error("Errore nel caricamento:", err));
  }, [compareList]);

  if (compareList.length < 2) {
    return (
      <div className="max-w-6xl mx-auto px-6 mt-5 text-center text-muted">
        Seleziona 2 smartphone per confrontarli.
      </div>
    );
  }

  const list = items.slice(0, 4);
  const colsClass =
    {
      2: "grid-cols-3",
      3: "grid-cols-4",
      4: "grid-cols-5",
    }[list.length] || "grid-cols-3";

  const keys = Object.keys(list[0] ?? {}).filter(
    (k) => !["id", "createdAt", "updatedAt", "imageUrl"].includes(k)
  ) as (keyof Omit<Phone, "id" | "imageUrl">)[];

  return (
    <div className="max-w-6xl mx-auto px-6 mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h4 fw-bold">Confronto Smartphone</h2>
        <button onClick={clearCompare} className="btn btn-outline-secondary">
          Svuota Confronto
        </button>
      </div>

      <div
        className={`grid ${colsClass} gap-3 bg-white shadow rounded overflow-hidden`}
      >
        <div className="bg-light p-3" />

        {list.map((phone) => (
          <div
            key={`hdr-${phone.id}`}
            className="bg-light p-3 d-flex flex-column align-items-center"
          >
            <img
              src={phone.imageUrl}
              alt={phone.title}
              className="rounded mb-2"
              style={{ width: "80px", height: "80px", objectFit: "cover" }}
            />
          </div>
        ))}

        {keys.map((key) => (
          <React.Fragment key={key}>
            <div className="p-3 fw-semibold bg-light">{LABELS_IT[key]}</div>
            {list.map((phone) => (
              <div key={`${phone.id}-${key}`} className="p-3 text-center">
                {key === "price"
                  ? `€${phone.price.toFixed(2)}`
                  : phone[key] || "—"}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Comparator;
