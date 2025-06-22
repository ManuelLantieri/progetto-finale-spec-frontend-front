import { createContext, useState, useContext } from "react";

const ComparatorContext = createContext();

export function ComparatorProvider({ children }) {
  const [compareList, setCompareList] = useState([]);

  const toggleCompare = (item) => {
    setCompareList((current) => {
      const exists = current.find((el) => el.id === item.id);
      if (exists) {
        return current.filter((el) => el.id !== item.id);
      }
      if (current.length >= 2) {
        return current; // limite: massimo 2 elementi
      }
      return [...current, item];
    });
  };

  const clearCompare = () => setCompareList([]);

  return (
    <ComparatorContext.Provider
      value={{ compareList, toggleCompare, clearCompare }}
    >
      {children}
    </ComparatorContext.Provider>
  );
}

export const useComparator = () => useContext(ComparatorContext);
