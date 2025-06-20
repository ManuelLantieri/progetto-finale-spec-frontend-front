import { createContext, useState, useContext } from "react";
import type { Phone } from "../types/types";

type ComparatorContextType = {
  compareList: Phone[];
  toggleCompare: (item: Phone) => void;
  clearCompare: () => void;
};

const ComparatorContext = createContext<ComparatorContextType | null>(null);

export function ComparatorProvider({ children }: { children: any }) {
  const [compareList, setCompareList] = useState<Phone[]>([]);

  const toggleCompare = (item: Phone) => {
    setCompareList((c) => {
      const exists = c.find((i) => i.id === item.id);
      if (exists) return c.filter((i) => i.id !== item.id);
      if (c.length >= 2) return c;
      return [...c, item];
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

export const useComparator = () => {
  const context = useContext(ComparatorContext);
  if (!context) {
    throw new Error("useComparator must be used within a ComparatorProvider");
  }
  return context;
};
