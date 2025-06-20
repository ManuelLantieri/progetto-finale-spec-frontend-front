import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Product } from "../types/types";
import CompareSelection from "../components/CompareSelection";

const CompareCategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3001/products?category=${category}`)
      .then((response) => response.json())
      .then((data) => {
        const key = category?.toLowerCase();
        if (key && data[key]) {
          setProducts(data[key]);
        } else {
          console.warn("Dati non trovati per la categoria:", key);
          setProducts([]);
        }
      })
      .catch((error) =>
        console.error("Errore nel caricamento dei prodotti", error)
      );
  }, [category]);

  return (
    <div className="container mt-5">
      <h1 className="text-center">Categoria: {category}</h1>
      <CompareSelection products={products} />
      <div className="row mt-4">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card p-3 text-center" style={{ cursor: "pointer" }}>
              <img
                src={product.images[0]}
                className="card-img-top"
                alt={product.name}
              />
              <h5>{product.name}</h5>
              <p>Prezzo: {product.price.base}€</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompareCategoryPage;
