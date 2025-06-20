import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { ComparatorProvider } from "./contexts/ComparatorContext";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Elemento root non trovato");
}

const root = ReactDOM.createRoot(container as HTMLElement);

root.render(
  <React.StrictMode>
    <FavoritesProvider>
      <ComparatorProvider>
        <App />
      </ComparatorProvider>
    </FavoritesProvider>
  </React.StrictMode>
);
