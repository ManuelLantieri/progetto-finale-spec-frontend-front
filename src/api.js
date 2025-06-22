const API_BASE = "http://localhost:3001";

export async function fetchPhones({
  search = "",
  category = "",
  sortBy = "",
  order = "asc",
} = {}) {
  const params = new URLSearchParams();
  if (search) params.append("title_like", search);
  if (category) params.append("category", category);

  const res = await fetch(`${API_BASE}/smartphones?${params.toString()}`);
  if (!res.ok) throw new Error(`Errore nella fetch: ${res.status}`);

  let phones = await res.json();

  if (sortBy) {
    phones.sort((a, b) => {
      const A = a[sortBy]?.toString().toLowerCase() || "";
      const B = b[sortBy]?.toString().toLowerCase() || "";
      return order === "asc" ? A.localeCompare(B) : B.localeCompare(A);
    });
  }

  return phones;
}
