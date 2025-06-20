import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import PhoneList from "./components/PhoneList";
import PhoneDetail from "./components/PhoneDetail";
import Favorites from "./components/Favorites";
import Comparator from "./components/Comparator";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="pt-5 bg-light min-vh-100">
        <Routes>
          <Route path="/" element={<PhoneList />} />
          <Route path="/phones/:id" element={<PhoneDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/compare" element={<Comparator />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
