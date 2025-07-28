import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPhones } from "../src/api";

export default function HomePage() {
  const [queries, setQueries] = useState([""]);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPhones, setSelectedPhones] = useState([]);
  const activeIndex = selectedPhones.length;
  const searchBoxRef = useRef(null);
  const navigate = useNavigate();

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

        const phones = results.map((r) => r.smartphone);

        const filtered = phones.filter(
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
  }, [queries, activeIndex, selectedPhones]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target)
      ) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      style={{
        height: "100vh",
        background:
          "linear-gradient(90deg,rgba(2, 0, 36, 1) 24%, rgba(9, 9, 121, 1) 51%, rgba(7, 55, 151, 1) 63%, rgba(2, 145, 211, 1) 90%, rgba(1, 176, 231, 1) 96%, rgba(0, 212, 255, 1) 100%)",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Poppins', sans-serif",
        padding: "40px 20px",
      }}
    >
      <h1 className="display-3 fw-bold">Confronta tutto</h1>
      <p className="lead mt-3">Scegli due o tre dispositivi da confrontare.</p>

      <div className="mt-4 w-100" style={{ maxWidth: "600px" }}>
        {selectedPhones.map((phone, index) => (
          <div
            key={phone.id}
            className="bg-white border rounded p-3 mb-3 d-flex justify-content-between align-items-center shadow-sm"
            style={{ color: "#000" }}
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
          <div
            className="position-relative"
            style={{ width: "100%" }}
            ref={searchBoxRef}
          >
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Cerca un prodotto"
              value={queries[activeIndex]}
              onChange={(e) => handleInput(activeIndex, e.target.value)}
            />

            {queries[activeIndex]?.trim() && suggestions !== null && (
              <div
                className="position-absolute bg-white border rounded shadow-sm"
                style={{
                  top: "100%",
                  left: 0,
                  right: 0,
                  maxHeight: "250px",
                  overflowY: "auto",
                  zIndex: 10,
                  color: "#000",
                }}
              >
                {isLoading ? (
                  <div className="p-3 text-muted">Caricamento...</div>
                ) : suggestions.length > 0 ? (
                  suggestions.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 border-bottom"
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
          </div>
        )}
      </div>

      {selectedPhones.length >= 2 && (
        <div className="mt-4 d-flex justify-content-center">
          <button
            className="btn btn-primary btn-lg px-5"
            onClick={() => {
              const ids = selectedPhones.map((p) => p.id).join(",");
              navigate(`/compare?ids=${ids}`);
            }}
          >
            Confronta {selectedPhones.length} dispositivi
          </button>
        </div>
      )}
    </section>
  );
}
