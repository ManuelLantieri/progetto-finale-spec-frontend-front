import { useState } from "react";
import type { Product } from "../types/types";
import ProductCard from "./ProductCard";

type Props = {
  products: Product[];
};

const CompareSelection = ({ products }: Props) => {
  const [selectedProducts, setSelectedProducts] = useState<(Product | null)[]>([
    null,
    null,
  ]);

  const addProduct = (product: Product) => {
    setSelectedProducts((prev) => {
      const newSelection = [...prev];
      const emptyIndex = newSelection.indexOf(null);
      if (emptyIndex !== -1) newSelection[emptyIndex] = product;
      return newSelection;
    });
  };

  const removeProduct = (index: number) => {
    setSelectedProducts((prev) => {
      const newSelection = [...prev];
      newSelection[index] = null;
      return newSelection;
    });
  };

  console.log("🚀 Prodotti ricevuti:", products);

  return (
    <div className="container mt-4">
      <h2 className="text-center">📲 Prodotti da confrontare</h2>
      <div className="row justify-content-center mb-5">
        {selectedProducts.map((product, index) => (
          <div key={index} className="col-md-5 position-relative">
            {product ? (
              <>
                <ProductCard product={product} />
                <button
                  className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                  onClick={() => removeProduct(index)}
                >
                  ✖
                </button>
              </>
            ) : (
              <div className="card border-dashed p-5 text-center h-100 d-flex align-items-center justify-content-center">
                <p className="text-muted">Scegli un prodotto</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <h4 className="mb-3">🔽 Scegli un prodotto dalla lista</h4>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div
              className="card text-center h-100 p-2"
              onClick={() => addProduct(product)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={product.images[0]}
                className="card-img-top"
                alt={product.name}
                style={{ maxHeight: "200px", objectFit: "contain" }}
              />
              <div className="card-body">
                <h6>{product.name}</h6>
                <p>{product.price.base} €</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompareSelection;
