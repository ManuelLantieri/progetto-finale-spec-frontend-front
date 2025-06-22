import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import App from "./App";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { ComparatorProvider } from "./contexts/ComparatorContext";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <FavoritesProvider>
      <ComparatorProvider>
        <App />
      </ComparatorProvider>
    </FavoritesProvider>
  </React.StrictMode>
);
