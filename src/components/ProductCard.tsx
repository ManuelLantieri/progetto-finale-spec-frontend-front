import type { Product } from "../types/types";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="card text-center shadow-lg">
      <img
        src={product.images[0]}
        className="card-img-top"
        alt={product.name}
      />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <p className="text-primary">
          Prezzo:{" "}
          {product.price.discount ? product.price.discount : product.price.base}
          €
        </p>
        <button className="btn btn-outline-primary">Confronta</button>
      </div>
    </div>
  );
};

export default ProductCard;
