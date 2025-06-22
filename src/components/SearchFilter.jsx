export default function SearchFilter({ value, onChange }) {
  return (
    <div className="mb-3">
      <input
        type="text"
        placeholder="Cerca per titolo..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-control"
      />
    </div>
  );
}
