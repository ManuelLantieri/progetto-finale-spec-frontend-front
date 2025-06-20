// src/components/PhoneList.tsx

import React, { useEffect, useState } from "react";
import PhoneItem from "./PhoneItem";
import type { Phone } from "../types/types";

const PhoneList: React.FC = () => {
  const [phones, setPhones] = useState<Phone[]>([]);

  useEffect(() => {
    fetch("/data/smartphones.json")
      .then((res) => res.json())
      .then((data) => setPhones(data))
      .catch((err) => console.error("Errore nel caricamento dei dati:", err));
  }, []);

  return (
    <div className="container py-5">
      <div className="row">
        {phones.map((phone) => (
          <PhoneItem key={phone.id} {...phone} />
        ))}
      </div>
    </div>
  );
};

export default PhoneList;
