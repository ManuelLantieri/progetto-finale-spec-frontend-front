import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import PhoneCard from "../src/components/Phonecard";
import CompareCollapse from "../src/components/CompareCollapse";
import { fetchPhones } from "../src/api";

const bestPhonesImages = [
  "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-1.jpg",
  "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s24-ultra-5g-1.jpg",
  "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-14-ultra-1.jpg",
  "https://fdn2.gsmarena.com/vv/pics/oppo/oppo-find-x7-ultra-1.jpg",
  "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-max-1.jpg",
];

export default function Smartphones() {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Chiamata fetchPhones() da API...");

    fetchPhones()
      .then((data) => {
        console.log("Dati completi:", data);
        setPhones(data);
      })
      .catch((err) => {
        console.error("Errore nella fetch:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="pt-5 mb-5">
      <div className="container my-5">
        <h2 className="text-center mb-4">I migliori smartphone</h2>
        <Carousel>
          {bestPhonesImages.map((url) => (
            <Carousel.Item key={`carousel-${url}`}>
              <img
                className="d-block w-100"
                src={url}
                alt="Best phone"
                style={{ maxHeight: "500px", objectFit: "cover" }}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <div className="container">
        <h3 className="my-4">Tutti i dispositivi</h3>

        {loading ? (
          <p className="text-center py-5">Caricamento...</p>
        ) : phones.length > 0 ? (
          <div className="row g-4">
            {phones.map((phone, index) => (
              <div
                key={phone.smartphone?.id || `phone-${index}`}
                className="col-md-4"
              >
                <PhoneCard {...phone.smartphone} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center py-5">Nessun dispositivo trovato.</p>
        )}
      </div>

      <CompareCollapse />
    </div>
  );
}
