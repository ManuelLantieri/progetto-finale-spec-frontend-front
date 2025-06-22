const Footer = () => {
  return (
    <footer className="bg-white border-top text-center text-muted py-4 mt-5">
      <div className="container">
        <p className="mb-1">
          &copy; {new Date().getFullYear()} Boolphones · Comparazione Telefoni
        </p>
        <p className="mb-0 small">
          <a
            href="/privacy"
            className="text-decoration-none text-secondary me-2"
          >
            Privacy Policy
          </a>
          |
          <a
            href="/contact"
            className="text-decoration-none text-secondary ms-2"
          >
            Contatti
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
