import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="container text-center mt-5">
      <h1>Inizia la Comparazione</h1>
      <p>Scegli una categoria per confrontare i migliori dispositivi.</p>
      <div className="row mt-4">
        <div className="col-md-3">
          <Link to="/compare/smartphones" className="btn btn-primary w-100">
            Smartphones
          </Link>
        </div>
        <div className="col-md-3">
          <Link to="/compare/tablets" className="btn btn-secondary w-100">
            Tablets
          </Link>
        </div>
        <div className="col-md-3">
          <Link to="/compare/smartwatches" className="btn btn-success w-100">
            Smartwatches
          </Link>
        </div>
        <div className="col-md-3">
          <Link to="/compare/accessories" className="btn btn-warning w-100">
            Accessori
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
