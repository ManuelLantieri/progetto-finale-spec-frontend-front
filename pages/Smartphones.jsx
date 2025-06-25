import React, { useEffect, useState, useRef } from "react";
import Carousel from "react-bootstrap/Carousel";
import PhoneCard from "../src/components/Phonecard";
import CompareCollapse from "../src/components/CompareCollapse";
import { fetchPhones } from "../src/api";
import CarouselSlideCard from "../src/components/CarouselSlideCard";

// Funzione per mescolare un array (shuffle)
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

  useEffect(() => {
    fetchPhones()
      .then((data) => {
        setPhones(data); // griglia rimane stabile
        const shuffled = shuffleArray([...data]);
        setCarouselPhones(shuffled.slice(0, 5)); // carosello = casuale
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

        {loading ? (
          <p className="text-center py-5">Caricamento...</p>
        ) : phones.length > 0 ? (
          <div className="row g-4">
            {phones.map((phone, index) => {
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
