import { Link } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";
import { useComparator } from "../contexts/ComparatorContext";

export default function PhoneItem({ phone }) {
  const { favorites, addFav, removeFav } = useFavorites();
  const { compareList, toggleCompare } = useComparator();

  const isFav = favorites.some((f) => f.id === phone.id);
  const inCompare = compareList.some((c) => c.id === phone.id);

  return (
    <div className="card h-100 shadow-sm border-0">
      <img
        src={`/img/${phone.imageUrl}`}
        alt={phone.title}
        className="card-img-top img-fluid"
        style={{ objectFit: "cover", maxHeight: "180px" }}
      />

      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <Link to={`/phones/${phone.id}`} className="text-decoration-none">
            <h5 className="card-title fw-bold text-dark">{phone.title}</h5>
          </Link>
          <p className="card-subtitle mb-2 text-muted small">
            {phone.category}
          </p>
        </div>

        <div className="d-flex gap-2 mt-3">
          <button
            onClick={() => (isFav ? removeFav(phone.id) : addFav(phone))}
            className="btn btn-sm btn-outline-danger"
            aria-label="Toggle Preferito"
          >
            {isFav ? "❤️" : "🤍"}
          </button>

          <button
            onClick={() => toggleCompare(phone)}
            disabled={!inCompare && compareList.length >= 4}
            className="btn btn-sm btn-outline-secondary"
            aria-label="Toggle Confronto"
          >
            {inCompare ? "✔️" : "+"}
          </button>
        </div>
      </div>
    </div>
  );
}
