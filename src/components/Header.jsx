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
    <nav className="navbar navbar-expand-lg navbar-light bg-primary shadow-sm py-3">
      <div className="container">
        <NavLink to="/" className="navbar-brand fw-bold fs-4 text-light">
          Boolphones
        </NavLink>
        <div className="w-100 d-flex justify-content-center ">
          <div style={{ width: "50%", maxWidth: "500px" }}>
            <SearchFilter value={search} onChange={setSearch} />
          </div>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="mainNavbar"
        >
          <ul className="navbar-nav mb-2 mb-lg-0 align-items-center">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  "nav-link" +
                  (isActive ? " active fw-semibold text-light" : "")
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  "nav-link" +
                  (isActive ? " active fw-semibold text-light" : "")
                }
              >
                Preferiti
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/compare"
                className={({ isActive }) =>
                  "nav-link" +
                  (isActive ? " active fw-semibold text-light" : "")
                }
              >
                Confronta
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
