import React from "react";

type SearchFilterProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchFilter({ value, onChange }: SearchFilterProps) {
  return (
    <input
      type="text"
      placeholder="Cerca per titolo..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="form-control mb-3"
    />
  );
}
