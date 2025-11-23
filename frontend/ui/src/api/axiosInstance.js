import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Base URL for your backend
  headers: {
    "Content-Type": "application/json",
  },
});

// ---- Attach JWT token automatically ----
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ---- Global response error handler ----
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // If token expired / unauthorized → logout user
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
