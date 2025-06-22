import { NavLink } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";
import { useComparator } from "../contexts/ComparatorContext";

export default function Header() {
  const { favorites } = useFavorites();
  const { compareList } = useComparator();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
      <div className="container">
        <NavLink to="/" className="navbar-brand fw-bold fs-4 text-dark">
          Boolphones
        </NavLink>

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
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active fw-semibold text-dark" : "")
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active fw-semibold text-dark" : "")
                }
              >
                Preferiti ({favorites.length})
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/compare"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active fw-semibold text-dark" : "")
                }
              >
                Confronta ({compareList.length}/2)
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
