import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ||
    `${window.location.protocol}//${window.location.hostname}:5000/api`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("agromarket_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message ||
      (error.code === "ECONNABORTED"
        ? "El servidor tardó demasiado en responder"
        : "No se pudo conectar con el servidor");
    return Promise.reject(new Error(message));
  },
);

export default api;
