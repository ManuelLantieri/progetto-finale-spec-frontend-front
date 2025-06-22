export default function CategoryFilter({ categories = [], value, onChange }) {
  const uniqueCategories = [...new Set(categories.filter(Boolean))];

  return (
    <div className="mb-3">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-select"
      >
        <option value="">Tutte le categorie</option>
        {uniqueCategories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
