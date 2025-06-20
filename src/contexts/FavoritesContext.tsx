import { createContext, useState, useContext, useEffect } from "react";
import type { Phone } from "../types/types";

type FavoritesContextType = {
  favorites: Phone[];
  addFav: (item: Phone) => void;
  removeFav: (id: number) => void;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: any }) {
  const [favorites, setFavorites] = useState<Phone[]>(() => {
    try {
      const stored = localStorage.getItem("favs");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favs", JSON.stringify(favorites));
  }, [favorites]);

  const addFav = (item: Phone) => {
    setFavorites((f) => {
      const next = [...f.filter((i) => i.id !== item.id), item];
      return next;
    });
  };

  const removeFav = (id: number) => {
    setFavorites((f) => f.filter((i) => i.id !== id));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFav, removeFav }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

export default FavoritesContext;
