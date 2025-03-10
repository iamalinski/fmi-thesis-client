import axios from "axios";

// Create axios instance with default config
const api = axios.create({
  baseURL: "http://localhost/fmi-thesis/public/api",
  headers: {
    "Content-Type": "application/json",
    // Accept: "application/json",
  },
  withCredentials: true,
  withXSRFToken: true,
});

// Request interceptor - useful for adding auth tokens
api.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - useful for handling errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors (401, 403, etc.)
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login page, etc.
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
