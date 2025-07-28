import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "../pages/HomePage";
import ComparePhones from "../pages/ComparePhones";
import Smartphones from "../pages/Smartphones";
import Favorites from "../pages/Favorites";
import SmartphoneDetail from "../pages/SmartphoneDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="d-flex flex-column">
        <div style={{ flex: 1, overflow: "hidden" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/smartphones" element={<Smartphones />} />
            <Route path="/smartphones/:id" element={<SmartphoneDetail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/compare" element={<ComparePhones />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
