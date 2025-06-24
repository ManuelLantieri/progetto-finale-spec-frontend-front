import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "../pages/HomePage";
import ComparePhones from "../pages/ComparePhones";
import Smartphones from "../pages/Smartphones";
import Favorites from "../pages/Favorites";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="d-flex flex-column">
        <div style={{ flex: 1, overflow: "hidden" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Smartphones" element={<Smartphones />} />
            <Route path="/Favorites" element={<Favorites />} />
            <Route path="/compare" element={<ComparePhones />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
