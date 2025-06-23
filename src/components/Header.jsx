import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header
      className="py-3 px-4 position-absolute top-0 start-0 end-0"
      style={{
        background: "transparent",
        zIndex: 20,
      }}
    >
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <NavLink to="/" className="navbar-brand fw-bold fs-3 text-white m-0">
          Boolphones
        </NavLink>

        <nav className="d-flex gap-4">
          <NavLink
            to="/favorites"
            className="text-white nav-link fw-semibold fs-5"
          >
            Preferiti
          </NavLink>
          <NavLink
            to="/smartphones"
            className="text-white nav-link fw-semibold fs-5"
          >
            Smartphones
          </NavLink>
          <NavLink to="/about" className="text-white nav-link fw-semibold fs-5">
            Chi siamo
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
