import axiosInstance from "./axiosInstance";

//  Register User
export const register = async (userData) => {
  const response = await axiosInstance.post("/auth/register", userData);
  return response.data;
};

//  Login User
export const login = async (credentials) => {
  const response = await axiosInstance.post("/auth/login", credentials);

  // Save token to localStorage
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
};
