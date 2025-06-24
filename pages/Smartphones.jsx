import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { fetchPhones } from "../src/api";
import PhoneCard from "../components/PhoneCard";

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
    fetchPhones()
      .then((data) => setPhones(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="pt-5">
      <div className="container my-5">
        <h2 className="text-center mb-4">I migliori smartphone</h2>
        <Carousel>
          {bestPhonesImages.map((url, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={url}
                alt={`Best phone ${index + 1}`}
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
        ) : (
          <div className="row g-4">
            {phones.map((phone) => (
              <div key={phone.id} className="col-md-4">
                <PhoneCard
                  title={phone.title}
                  category={phone.category}
                  origin={phone.origin}
                  description={phone.description}
                  price={phone.price}
                  image={phone.image}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
