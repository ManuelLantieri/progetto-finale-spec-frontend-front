const API_BASE = "http://localhost:3001";

export async function fetchPhones({
  search = "",
  category = "",
  sortBy = "",
  order = "asc",
} = {}) {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (category) params.append("category", category);

  const res = await fetch(`${API_BASE}/smartphones?${params.toString()}`);
  if (!res.ok) throw new Error(`Error fetching phones: ${res.status}`);
  const data = await res.json();

  // Se i tuoi oggetti sono già "flat" (niente wrapper tipo { phone: {...} }) puoi saltare il map
  const partials = data;

  const fullList = await Promise.all(
    partials.map((p) => fetchPhoneById(p.id).catch(() => null))
  );

  let phones = fullList.filter(Boolean);

  if (sortBy) {
    phones = phones.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return order === "asc" ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return order === "asc" ? 1 : -1;
      return 0;
    });
  }

  return phones;
}

export async function fetchPhoneById(id) {
  if (!id) throw new Error("Invalid ID");

  const res = await fetch(`${API_BASE}/smartphones/${id}`);
  if (!res.ok) throw new Error("Not found");

  const json = await res.json();
  return json;
}
