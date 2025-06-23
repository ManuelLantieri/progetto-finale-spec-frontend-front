import { useEffect, useState } from "react";
import { fetchPhones } from "../api";
import PhoneItem from "./PhoneItem";
import CategoryFilter from "./CategoryFilter";
import SortControl from "./SortControl";
import { useComparator } from "../contexts/ComparatorContext";
import { useNavigate } from "react-router-dom";

const showToast = (message, type = "info") => {
  const toastContainer = document.getElementById("toastArea");
  if (!toastContainer) return;

  const toastEl = document.createElement("div");
  toastEl.className = `toast fade align-items-center text-white bg-${type} border-0 mb-2`;
  toastEl.setAttribute("role", "alert");
  toastEl.setAttribute("aria-live", "assertive");
  toastEl.setAttribute("aria-atomic", "true");

  toastEl.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Chiudi"></button>
    </div>
  `;

  toastContainer.appendChild(toastEl);

  const bsToast = new bootstrap.Toast(toastEl, {
    animation: true,
    autohide: true,
    delay: 4000,
  });

  bsToast.show();

  toastEl.addEventListener("hidden.bs.toast", () => {
    toastEl.remove();
  });
};

export default function PhoneList() {
  const [phones, setPhones] = useState([]);
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [cats, setCats] = useState([]);
  const { compareList, toggleCompare } = useComparator();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPhones({ category, sortBy, order })
      .then((data) => {
        if (Array.isArray(data)) {
          setPhones(data);
          const uniqueCategories = [
            ...new Set(data.map((p) => p.category).filter(Boolean)),
          ];
          setCats(uniqueCategories);
        } else {
          console.warn(
            "Attenzione: fetchPhones ha restituito un valore non atteso:",
            data
          );
          setPhones([]);
          setCats([]);
        }
      })
      .catch((err) => {
        console.error("Errore durante il fetch dei telefoni:", err);
        setPhones([]);
        setCats([]);
      });
  }, [category, sortBy, order]);

  const handleCompareWithToast = (phone) => {
    const inCompare = compareList.some((c) => c.id === phone.id);

    if (inCompare) {
      toggleCompare(phone);
      return;
    }

    if (compareList.length >= 3) {
      showToast("❌ Puoi confrontare al massimo 3 prodotti.", "danger");
      return;
    }

    toggleCompare(phone);

    const nextCount = compareList.length + 1;

    if (nextCount === 1) {
      showToast(
        "ℹ️ Seleziona almeno un altro prodotto per avviare il confronto",
        "info"
      );
    } else {
      showToast(
        `${phone.title} aggiunto! <a href="/compare" class="text-white text-decoration-underline ms-1">Vai al confronto</a>`,
        "success"
      );
    }
  };

  return (
    <div className="container my-5">
      <div
        id="toastArea"
        className="toast-container position-fixed bottom-0 end-0 p-3"
        style={{ zIndex: 9999 }}
      ></div>

      <div className="row g-3 mb-4">
        <div className="col-12 col-md-6">
          <CategoryFilter
            categories={cats}
            value={category}
            onChange={setCategory}
          />
        </div>
        <div className="col-12 col-md-6">
          <SortControl
            sortBy={sortBy}
            order={order}
            onSortChange={(s, o) => {
              setSortBy(s);
              setOrder(o);
            }}
          />
        </div>
      </div>

      {phones.length === 0 ? (
        <p className="text-center text-muted fs-5 mt-4">
          Nessun telefono da mostrare.
        </p>
      ) : (
        <div className="row g-4">
          {phones
            .filter((p) => p.id != null)
            .map((p) => (
              <div key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <PhoneItem phone={p} onCompare={handleCompareWithToast} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
