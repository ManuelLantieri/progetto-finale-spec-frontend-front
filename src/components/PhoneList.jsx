import { useEffect, useState } from "react";
import { fetchPhones } from "../api";
import PhoneItem from "./PhoneItem";
import SearchFilter from "./SearchFilter";
import CategoryFilter from "./CategoryFilter";
import SortControl from "./SortControl";

export default function PhoneList() {
  const [phones, setPhones] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [cats, setCats] = useState([]);

  useEffect(() => {
    fetchPhones({ search, category, sortBy, order })
      .then((data) => {
        console.log("📱 Telefoni caricati:", data);
        setPhones(data);
        const uniqueCategories = [
          ...new Set(data.map((p) => p.category).filter(Boolean)),
        ];
        setCats(uniqueCategories);
      })
      .catch((err) => {
        console.error("Errore durante la fetch dei telefoni:", err);
        setPhones([]);
        setCats([]);
      });
  }, [search, category, sortBy, order]);

  return (
    <div className="container my-5">
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <SearchFilter value={search} onChange={setSearch} />
        </div>
        <div className="col-12 col-md-4">
          <CategoryFilter
            categories={cats}
            value={category}
            onChange={setCategory}
          />
        </div>
        <div className="col-12 col-md-4">
          <SortControl
            sortBy={sortBy}
            order={order}
            onSortChange={(s, o) => {
              setSortBy(s);
              setOrder(o);
            }}
          />
        </div>
      </div>

      {phones.length === 0 ? (
        <p className="text-center text-muted fs-5 mt-4">
          Nessun telefono da mostrare.
        </p>
      ) : (
        <div className="row g-4">
          {phones.map((p) => (
            <div key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <PhoneItem phone={p} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
