import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "../pages/HomePage";
import ComparePhones from "../pages/ComparePhones";
import Smartphones from "../pages/Smartphones";
export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <div
        className="d-flex flex-column"
        style={{
          height: "100vh",
          overflow: "hidden",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <div style={{ flex: 1, overflow: "hidden" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Smartphones" element={<Smartphones />} />
            <Route path="/compare" element={<ComparePhones />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
