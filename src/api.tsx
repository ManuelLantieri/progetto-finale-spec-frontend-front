import type { Phone } from "./types/types";

const API_BASE = "http://localhost:3001";

type FetchOptions = {
  search?: string;
  category?: string;
  sortBy?: keyof Phone;
  order?: "asc" | "desc";
};

export async function fetchPhoneById(id: string | number): Promise<Phone> {
  if (!id) throw new Error("Invalid ID");

  const res = await fetch(`${API_BASE}/phones/${id}`);
  if (!res.ok) throw new Error(`Not found (status ${res.status})`);

  const json = await res.json();

  return "phone" in json ? (json.phone as Phone) : (json as Phone);
}

export async function fetchPhones(
  options: FetchOptions = {}
): Promise<Phone[]> {
  const { search = "", category = "", sortBy = "", order = "asc" } = options;

  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (category) params.append("category", category);

  const res = await fetch(`${API_BASE}/phones?${params.toString()}`);
  if (!res.ok) throw new Error(`Error fetching phones: ${res.status}`);
  const wrappers = (await res.json()) as Array<any>;

  const partials: Phone[] = wrappers.map((w) => ("phone" in w ? w.phone : w));

  const fullListRaw = await Promise.all(
    partials.map((p) => fetchPhoneById(p.id).catch(() => null))
  );

  let data: Phone[] = fullListRaw.filter((x): x is Phone => x !== null);

  if (sortBy) {
    data.sort((a, b) => {
      const valA = a[sortBy];
      const valB = b[sortBy];
      if (valA < valB) return order === "asc" ? -1 : 1;
      if (valA > valB) return order === "asc" ? 1 : -1;
      return 0;
    });
  }

  return data;
}
