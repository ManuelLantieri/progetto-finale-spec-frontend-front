import React from "react";
import type { Phone } from "../types/types";

type Props = Omit<Phone, "id" | "category" | "roastLevel">;

const PhoneItem: React.FC<Props> = ({
  title,
  origin,
  description,
  price,
  imageUrl,
}) => {
  return (
    <div className="col-md-4 mb-5">
      <div className="card border-0 shadow-sm h-100">
        <img
          src={imageUrl}
          alt={title}
          className="card-img-top"
          style={{ objectFit: "cover", height: "300px" }}
        />
        <div className="card-body px-4 pb-4 text-center">
          <h5 className="card-title fw-semibold text-dark">{title}</h5>
          <p className="text-muted mb-1">{origin}</p>
          <p className="card-text small text-secondary">{description}</p>
          <p className="fs-5 fw-bold text-primary">€{price}</p>
        </div>
      </div>
    </div>
  );
};

export default PhoneItem;
