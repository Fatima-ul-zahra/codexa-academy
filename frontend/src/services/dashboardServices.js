const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

export async function getDashboardStats() {
  const response = await fetch(
    `${API_URL}/dashboard/stats`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message ||
        "Unable to load dashboard statistics."
    );
  }

  return result.data;
}