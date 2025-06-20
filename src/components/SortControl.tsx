import React from "react";

type SortControlProps = {
  sortBy: string;
  order: "asc" | "desc";
  onSortChange: (sortBy: string, order: "asc" | "desc") => void;
};

export default function SortControl({
  sortBy,
  order,
  onSortChange,
}: SortControlProps) {
  return (
    <div className="mb-3 d-flex gap-2">
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value, order)}
        className="form-select"
      >
        <option value="">Nessun ordinamento</option>
        <option value="title">Titolo</option>
        <option value="category">Categoria</option>
      </select>

      <select
        value={order}
        onChange={(e) => onSortChange(sortBy, e.target.value as "asc" | "desc")}
        className="form-select"
      >
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>
    </div>
  );
}
