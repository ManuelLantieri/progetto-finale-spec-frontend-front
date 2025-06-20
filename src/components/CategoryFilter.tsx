type CategoryFilterProps = {
  categories: string[];
  value: string;
  onChange: (value: string) => void;
};

export default function CategoryFilter({
  categories,
  value,
  onChange,
}: CategoryFilterProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="form-select mb-3"
    >
      <option value="">Tutte le categorie</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
}
