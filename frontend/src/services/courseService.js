const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

/*
|--------------------------------------------------------------------------
| Handle API response
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| GET /api/courses
| Public
|--------------------------------------------------------------------------
*/

export async function getCourses(params = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(
    ([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        value !== ""
      ) {
        searchParams.append(key, value);
      }
    }
  );

  const query = searchParams.toString();

  const response = await fetch(
    `${API_URL}/courses${
      query ? `?${query}` : ""
    }`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  return handleResponse(response);
}

/*
|--------------------------------------------------------------------------
| GET /api/courses/:id
| Public
|--------------------------------------------------------------------------
*/

export async function getCourseById(id) {
  const response = await fetch(
    `${API_URL}/courses/${id}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  return handleResponse(response);
}

/*
|--------------------------------------------------------------------------
| POST /api/courses
| Admin
|--------------------------------------------------------------------------
*/

export async function createCourse(courseData) {
  const response = await fetch(
    `${API_URL}/courses`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(courseData),
    }
  );

  return handleResponse(response);
}

/*
|--------------------------------------------------------------------------
| PUT /api/courses/:id
| Admin
|--------------------------------------------------------------------------
*/

export async function updateCourse(
  id,
  courseData
) {
  const response = await fetch(
    `${API_URL}/courses/${id}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(courseData),
    }
  );

  return handleResponse(response);
}

/*
|--------------------------------------------------------------------------
| DELETE /api/courses/:id
| Admin
|--------------------------------------------------------------------------
*/

export async function deleteCourse(id) {
  const response = await fetch(
    `${API_URL}/courses/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  return handleResponse(response);
}