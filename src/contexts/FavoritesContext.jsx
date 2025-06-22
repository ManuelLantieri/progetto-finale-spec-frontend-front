import { createContext, useState, useContext } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem("favs");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const addFav = (item) => {
    setFavorites((prev) => {
      const next = [...prev.filter((el) => el.id !== item.id), item];
      localStorage.setItem("favs", JSON.stringify(next));
      return next;
    });
  };

  const removeFav = (id) => {
    setFavorites((prev) => {
      const next = prev.filter((el) => el.id !== id);
      localStorage.setItem("favs", JSON.stringify(next));
      return next;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFav, removeFav }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
