import { useFavorites } from "../contexts/FavoritesContext";
import PhoneItem from "./PhoneItem";
import type { Phone } from "../types/types";

const Favorites = () => {
  const { favorites } = useFavorites();

  if (!favorites.length)
    return <p className="text-center mt-5">Nessun preferito.</p>;

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">I tuoi Preferiti</h2>
      <div className="row">
        {favorites.map((phone: Phone) => (
          <PhoneItem key={phone.id} {...phone} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
