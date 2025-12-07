import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Your backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// -----------------------------
//  Automatically attach JWT Token
// -----------------------------
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// -----------------------------
//  Global Response Handler
// -----------------------------
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle unauthorized and expired token
    // if (error.response?.status === 401) {
    //   localStorage.removeItem("token");
    //   localStorage.removeItem("user");

    //   // Redirect to login
    //   window.location.href = "/login";
    // }
     if (status === 401 && url !== "/auth/login") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
