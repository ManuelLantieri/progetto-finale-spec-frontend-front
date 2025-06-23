import { useState, useEffect } from "react";
import { fetchPhones } from "../src/api";

export default function HomePage() {
  const [queries, setQueries] = useState([""]);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPhones, setSelectedPhones] = useState([]);

  const activeIndex = selectedPhones.length;

  useEffect(() => {
    const query = queries[activeIndex];
    if (!query?.trim()) {
      setSuggestions([]);
      return;
    }

    const delay = setTimeout(async () => {
      setIsLoading(true);
      try {
        const results = await fetchPhones({ search: query });

        const filtered = results.filter(
          (phone) => !selectedPhones.some((p) => p.id === phone.id)
        );

        const sorted = filtered.sort((a, b) => {
          const q = query.toLowerCase();
          const aTitle = a.title.toLowerCase();
          const bTitle = b.title.toLowerCase();
          const aStarts = aTitle.startsWith(q);
          const bStarts = bTitle.startsWith(q);
          if (aStarts && !bStarts) return -1;
          if (!aStarts && bStarts) return 1;
          return aTitle.localeCompare(bTitle);
        });

        setSuggestions(sorted);
      } catch (err) {
        console.error("Errore nella fetch:", err);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [queries, activeIndex]);

  const handleInput = (index, value) => {
    setQueries((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleSelect = (item) => {
    const updatedPhones = [...selectedPhones, item];
    const updatedQueries = [...queries.slice(0, activeIndex + 1), ""];
    setSelectedPhones(updatedPhones);
    setQueries(updatedQueries);
    setSuggestions([]);
  };

  const handleRemove = (index) => {
    const updatedPhones = [...selectedPhones];
    const updatedQueries = [...queries];

    updatedPhones.splice(index, 1);
    updatedQueries.splice(index, 1);
    updatedQueries.splice(index, 0, "");

    setSelectedPhones(updatedPhones);
    setQueries(updatedQueries);
  };

  return (
    <section
      className="d-flex flex-column align-items-center justify-content-center text-center px-3"
      style={{ minHeight: "85vh", background: "#f8f9fa" }}
    >
      <h1 className="display-3 fw-bold">
        Confronta <span className="text-primary">tutto</span>
      </h1>
      <p className="lead text-muted mt-3">
        Scegli due o tre dispositivi da confrontare.
      </p>

      <div className="mt-4 w-100" style={{ maxWidth: "600px" }}>
        {selectedPhones.map((phone, index) => (
          <div
            key={phone.id}
            className="bg-white border rounded p-3 mb-3 d-flex justify-content-between align-items-center shadow-sm"
          >
            <strong className="me-2">{phone.title}</strong>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => handleRemove(index)}
              title="Rimuovi"
            >
              ❌
            </button>
          </div>
        ))}

        {selectedPhones.length < 3 && (
          <>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Cerca un prodotto"
              value={queries[activeIndex]}
              onChange={(e) => handleInput(activeIndex, e.target.value)}
            />

            {queries[activeIndex]?.trim() && (
              <div className="bg-white border rounded mt-2 text-start shadow-sm">
                {isLoading ? (
                  <div className="p-3 text-muted">Caricamento...</div>
                ) : suggestions.length > 0 ? (
                  suggestions.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 border-bottom hover-bg-light"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleSelect(item)}
                    >
                      {item.title}
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-muted">Nessun risultato</div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {selectedPhones.length >= 2 && (
        <div className="mt-4 d-flex justify-content-center">
          <button
            className="btn btn-primary btn-lg px-5"
            onClick={() => {
              const ids = selectedPhones.map((p) => p.id).join(",");
              window.location.href = `/compare?ids=${ids}`;
            }}
          >
            Confronta {selectedPhones.length} dispositivi
          </button>
        </div>
      )}
    </section>
  );
}
