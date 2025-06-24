import { NavLink, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const isComparePage =
    location.pathname === "/compare" ||
    location.pathname === "/smartphones" ||
    location.pathname === "/favorites";

  return (
    <header
      className="py-3 px-4 position-absolute top-0 start-0 end-0"
      style={{
        background: isComparePage ? "#000" : "transparent",
        zIndex: 20,
      }}
    >
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <NavLink
          to="/"
          className={`navbar-brand fw-bold fs-3 ${
            isComparePage ? "text-white" : "text-white"
          } m-0`}
        >
          Boolphones
        </NavLink>

        <nav className="d-flex gap-4">
          <NavLink
            to="/favorites"
            className="nav-link fw-semibold fs-5 text-white"
          >
            Preferiti
          </NavLink>
          <NavLink
            to="/smartphones"
            className="nav-link fw-semibold fs-5 text-white"
          >
            Smartphones
          </NavLink>
          <NavLink to="/about" className="nav-link fw-semibold fs-5 text-white">
            Chi siamo
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
