import { NavLink } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";
import { useComparator } from "../contexts/ComparatorContext";
import SearchFilter from "./SearchFilter";
import { useState } from "react";

export default function Header() {
  const { favorites } = useFavorites();
  const { compareList } = useComparator();
  const [search, setSearch] = useState("");

  return (
    <header className="bg-primary py-3 shadow-sm">
      <div className="container-fluid d-flex align-items-center justify-content-between gap-3 flex-wrap">
        <NavLink to="/" className="navbar-brand fw-bold fs-4 text-light m-0">
          Boolphones
        </NavLink>

        <div
          className="flex-grow-1 d-flex justify-content-center"
          style={{ minWidth: "150px" }}
        >
          <div style={{ width: "100%", maxWidth: "500px" }}>
            <SearchFilter value={search} onChange={setSearch} />
          </div>
        </div>

        <nav className="d-flex gap-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              "nav-link px-2" +
              (isActive ? " active fw-semibold text-light" : " text-light")
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              "nav-link px-2" +
              (isActive ? " active fw-semibold text-light" : " text-light")
            }
          >
            Preferiti ({favorites.length})
          </NavLink>
          <NavLink
            to="/compare"
            className={({ isActive }) =>
              "nav-link px-2" +
              (isActive ? " active fw-semibold text-light" : " text-light")
            }
          >
            Confronta ({compareList.length})
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
