const Footer = () => {
  return (
    <footer className="bg-dark text-light text-center py-3 mt-5">
      <p>
        &copy; {new Date().getFullYear()} Comparazione Telefoni | Tutti i
        diritti riservati
      </p>
      <p>
        <a href="/privacy" className="text-light">
          Privacy Policy
        </a>{" "}
        |
        <a href="/contact" className="text-light">
          Contatti
        </a>
      </p>
    </footer>
  );
};

export default Footer;
