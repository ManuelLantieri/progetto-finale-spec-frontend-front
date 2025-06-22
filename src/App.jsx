import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PhoneList from "./components/PhoneList";
import PhoneDetail from "./components/PhoneDetail";
import Favorites from "./components/Favorites";
import Comparator from "./components/Comparator";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main
        className="pt-5 bg-white min-vh-100"
        style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
      >
        <Routes>
          <Route path="/" element={<PhoneList />} />
          <Route path="/phones/:id" element={<PhoneDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/compare" element={<Comparator />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
