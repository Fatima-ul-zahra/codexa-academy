const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

async function handleResponse(response) {
  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message ||
        "Something went wrong."
    );
  }

  return result;
}

export async function getEnrollments(
  params = {}
) {
  const searchParams =
    new URLSearchParams();

  Object.entries(params).forEach(
    ([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        value !== ""
      ) {
        searchParams.append(
          key,
          value
        );
      }
    }
  );

  const query =
    searchParams.toString();

  const response = await fetch(
    `${API_URL}/enrollments${
      query ? `?${query}` : ""
    }`,
    {
      credentials: "include",
    }
  );

  return handleResponse(response);
}

export async function getEnrollmentById(
  id
) {
  const response = await fetch(
    `${API_URL}/enrollments/${id}`,
    {
      credentials: "include",
    }
  );

  return handleResponse(response);
}

export async function getEnrollmentStats() {
  const response = await fetch(
    `${API_URL}/enrollments/stats`,
    {
      credentials: "include",
    }
  );

  return handleResponse(response);
}

export async function updateEnrollmentStatus(
  id,
  status
) {
  const response = await fetch(
    `${API_URL}/enrollments/${id}/status`,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
      }),
    }
  );

  return handleResponse(response);
}

export async function deleteEnrollment(
  id
) {
  const response = await fetch(
    `${API_URL}/enrollments/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  return handleResponse(response);
}