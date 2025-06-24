import { useFavorites } from "../src/contexts/FavoritesContext";
import { useNavigate } from "react-router-dom";
import PhoneCard from "../src/components/Phonecard";
import Footer from "../src/components/Footer";

export default function Favorites() {
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="container flex-grow-1 py-5 pt-5 mt-4">
        <h2 className="fw-bold mb-4 text-center">I tuoi telefoni preferiti</h2>

        {favorites.length === 0 ? (
          <div className="text-center py-5">
            <p className="lead mb-3">
              Nessun telefono tra i preferiti al momento.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/smartphones")}
            >
              Aggiungi i tuoi preferiti
            </button>
          </div>
        ) : (
          <div className="row g-4">
            {favorites.map((phone) => (
              <div key={phone.id} className="col-md-4">
                <PhoneCard {...phone} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
