import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main className="container mt-4">
        <Outlet /> {/* Qui verranno renderizzate HomePage, ComparePage, ecc. */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
