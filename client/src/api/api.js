const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const getToken = () => {
  return localStorage.getItem("cinerate_token");
};

const apiFetch = async (
  endpoint,
  options = {}
) => {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,
      headers
    }
  );

  let data = {};

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(
      data.message ||
      `Request failed with status ${response.status}`
    );
  }

  return data;
};


// =========================
// AUTH
// =========================

export const registerUser = async (
  username,
  email,
  password
) => {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password
    })
  });
};

export const loginUser = async (
  email,
  password
) => {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password
    })
  });
};

export const getMe = async () => {
  return apiFetch("/auth/me");
};


// =========================
// MOVIES
// =========================

export const getMovies = async ({
  search = "",
  sort = "newest"
} = {}) => {
  const params = new URLSearchParams();

  if (search.trim()) {
    params.set(
      "search",
      search.trim()
    );
  }

  params.set("sort", sort);

  return apiFetch(
    `/movies?${params.toString()}`
  );
};

export const getMovie = async (id) => {
  return apiFetch(`/movies/${id}`);
};

export const createMovie = async (
  movieData
) => {
  return apiFetch("/movies", {
    method: "POST",
    body: JSON.stringify(movieData)
  });
};

export const updateMovie = async (
  id,
  movieData
) => {
  return apiFetch(`/movies/${id}`, {
    method: "PUT",
    body: JSON.stringify(movieData)
  });
};

export const deleteMovie = async (id) => {
  return apiFetch(`/movies/${id}`, {
    method: "DELETE"
  });
};


// =========================
// REVIEWS
// =========================

export const getReviews = async (
  movieId
) => {
  return apiFetch(
    `/movies/${movieId}/reviews`
  );
};

export const saveReview = async (
  movieId,
  reviewData
) => {
  return apiFetch(
    `/movies/${movieId}/reviews`,
    {
      method: "POST",
      body: JSON.stringify(reviewData)
    }
  );
};

export const deleteReview = async (
  reviewId
) => {
  return apiFetch(
    `/reviews/${reviewId}`,
    {
      method: "DELETE"
    }
  );
};