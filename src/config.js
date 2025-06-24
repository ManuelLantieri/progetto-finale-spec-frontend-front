export const API_BASE = "http://localhost:3001";

export function getPhoneImagePath(relativePath) {
  if (!relativePath) return `${API_BASE}/img/placeholder.jpg`;
  return relativePath.startsWith("http")
    ? relativePath
    : `${API_BASE}${relativePath}`;
}
