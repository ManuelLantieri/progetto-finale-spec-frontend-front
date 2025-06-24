import { createContext, useState, useContext, clearCompare } from "react";

const ComparatorContext = createContext();

export function ComparatorProvider({ children }) {
  const [compareList, setCompareList] = useState([]);

  const toggleCompare = (item) => {
    setCompareList((current) => {
      const exists = current.find((el) => el.id === item.id);
      if (exists) {
        return current.filter((el) => el.id !== item.id);
      }
      if (current.length >= 3) {
        return current;
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
