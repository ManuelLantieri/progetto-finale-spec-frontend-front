import { useFavorites } from "../contexts/FavoritesContext";
import PhoneItem from "./PhoneItem";

export default function Favorites() {
  const { favorites } = useFavorites();

  if (!favorites.length) {
    return (
      <div className="container my-5 text-center text-muted">
        <p className="fs-5">Nessun telefono tra i preferiti.</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4 fw-bold text-center">I tuoi Preferiti</h2>
      <div className="row g-4">
        {favorites.map((p) => (
          <div key={p.id} className="col-12 col-md-6 col-lg-4">
            <PhoneItem phone={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
