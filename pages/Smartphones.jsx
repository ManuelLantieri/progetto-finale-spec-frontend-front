import React, { useEffect, useState, useRef } from "react";
import Carousel from "react-bootstrap/Carousel";
import PhoneCard from "../src/components/Phonecard";
import CompareCollapse from "../src/components/CompareCollapse";
import { fetchPhones } from "../src/api";
import CarouselSlideCard from "../src/components/CarouselSlideCard";

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function Smartphones() {
  const [phones, setPhones] = useState([]);
  const [carouselPhones, setCarouselPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const phoneRefs = useRef({});
  const [highlightedId, setHighlightedId] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);

  useEffect(() => {
    fetchPhones()
      .then((data) => {
        setPhones(data);
        const shuffled = shuffleArray([...data]);
        setCarouselPhones(shuffled.slice(0, 5));
      })
      .catch((err) => {
        console.error("Errore nella fetch:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const scrollToPhone = (id) => {
    const ref = phoneRefs.current[id];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
      setHighlightedId(id);
      setTimeout(() => setHighlightedId(null), 2000);
    }
  };

  const getVisiblePhones = () => {
    let filtered = [...phones];

    if (selectedBrand) {
      filtered = filtered.filter((p) => p.smartphone?.brand === selectedBrand);
    }

    switch (sortOrder) {
      case "price-asc":
        filtered.sort((a, b) => a.smartphone?.price - b.smartphone?.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.smartphone?.price - a.smartphone?.price);
        break;
      case "name-asc":
        filtered.sort((a, b) =>
          a.smartphone?.title?.localeCompare(b.smartphone?.title)
        );
        break;
      case "name-desc":
        filtered.sort((a, b) =>
          b.smartphone?.title?.localeCompare(a.smartphone?.title)
        );
        break;
      default:
        break;
    }

    return filtered;
  };

  return (
    <div className="pt-5 mb-5">
      <div className="container my-5">
        <h2 className="text-center mb-4">I migliori smartphone</h2>

        {!loading && (
          <Carousel interval={null} touch={false} pause="hover">
            {carouselPhones.map((phone, index) => (
              <Carousel.Item
                key={`slide-${phone.smartphone?.id || phone.id || index}`}
              >
                <div
                  onClick={() => scrollToPhone(phone.smartphone?.id)}
                  style={{ cursor: "pointer" }}
                >
                  <CarouselSlideCard {...phone.smartphone} />
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        )}
      </div>

      <div className="container">
        <h3 className="my-4">Tutti i dispositivi</h3>

        <div className="d-flex flex-wrap gap-3 mb-4">
          <div className="dropdown">
            <button
              className="btn btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
            >
              Prezzo
            </button>
            <ul className="dropdown-menu">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setSortOrder("price-asc")}
                >
                  Prezzo crescente
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setSortOrder("price-desc")}
                >
                  Prezzo decrescente
                </button>
              </li>
            </ul>
          </div>

          <div className="dropdown">
            <button
              className="btn btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
            >
              Nome
            </button>
            <ul className="dropdown-menu">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setSortOrder("name-asc")}
                >
                  A → Z
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setSortOrder("name-desc")}
                >
                  Z → A
                </button>
              </li>
            </ul>
          </div>

          <div className="dropdown">
            <button
              className="btn btn-outline-primary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
            >
              Brand {selectedBrand ? `: ${selectedBrand}` : ""}
            </button>
            <ul className="dropdown-menu">
              {["Apple", "Samsung", "Xiaomi"].map((brand) => (
                <li key={brand}>
                  <button
                    className={`dropdown-item ${
                      selectedBrand === brand ? "active" : ""
                    }`}
                    onClick={() =>
                      setSelectedBrand((prev) =>
                        prev === brand ? null : brand
                      )
                    }
                  >
                    {brand}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button
            className="btn btn-outline-danger ms-auto"
            onClick={() => {
              setSortOrder(null);
              setSelectedBrand(null);
            }}
          >
            Ripristina filtri
          </button>
        </div>

        {loading ? (
          <p className="text-center py-5">Caricamento...</p>
        ) : phones.length > 0 ? (
          <div className="row g-4">
            {getVisiblePhones().map((phone, index) => {
              const id = phone.smartphone?.id;
              if (!id) return null;
              phoneRefs.current[id] =
                phoneRefs.current[id] || React.createRef();

              return (
                <div
                  key={id}
                  className={`col-md-4 ${
                    highlightedId === id ? "highlighted" : ""
                  }`}
                  ref={phoneRefs.current[id]}
                >
                  <PhoneCard {...phone.smartphone} />
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center py-5">Nessun dispositivo trovato.</p>
        )}
      </div>

      <CompareCollapse />
    </div>
  );
}
