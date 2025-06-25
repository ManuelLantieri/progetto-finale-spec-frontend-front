import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPhonesByIds } from "../src/api";
import CompareCard from "../src/components/CompareCard";

export default function ComparePhones() {
  const [phones, setPhones] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ids = params.get("ids")?.split(",") || [];

    if (ids.length >= 2) {
      fetchPhonesByIds(ids).then((data) => {
        const ordered = ids
          .map((id) => data.find((p) => p.smartphone?.id.toString() === id))
          .filter(Boolean);
        setPhones(ordered);
      });
    }
  }, [location]);

  if (phones.length < 2) {
    return (
      <div className="text-white text-center p-5">
        <h2>Seleziona almeno due dispositivi da confrontare</h2>
      </div>
    );
  }

  return (
    <section
      className="text-white px-3 d-flex flex-column align-items-center"
      style={{
        height: "100vh",
        backgroundColor: "#fff",
        fontFamily: "'Poppins', sans-serif",
        paddingTop: "40px",
        overflow: "hidden",
      }}
    >
      <div className="container-fluid">
        <h1 className="text-center mb-4">Confronto dispositivi</h1>

        <div
          className="d-flex flex-nowrap gap-4 px-3 justify-content-center"
          style={{
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            paddingBottom: "20px",
          }}
        >
          {phones.map((phone) => (
            <div
              key={phone.smartphone.id}
              className="flex-shrink-0"
              style={{
                width: "300px",
                scrollSnapAlign: "start",
              }}
            >
              <CompareCard {...phone.smartphone} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
