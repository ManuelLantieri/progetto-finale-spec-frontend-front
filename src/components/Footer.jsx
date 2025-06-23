const Footer = () => {
  return (
    <footer
      className="text-center py-4 position-relative"
      style={{
        backgroundColor: "#161616",
        color: "#fff",
        fontSize: "1rem",
        fontWeight: "400",
      }}
    >
      <div className="container">
        <p className="mb-1">
          &copy; {new Date().getFullYear()} Boolphones · Comparazione Telefoni
        </p>
        <p className="mb-0 small">
          <a href="/privacy" className="text-decoration-none text-light me-2">
            Privacy Policy
          </a>
          |
          <a href="/contact" className="text-decoration-none text-light ms-2">
            Contatti
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
