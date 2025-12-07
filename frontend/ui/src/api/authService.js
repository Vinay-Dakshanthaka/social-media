import axiosInstance from "./axiosInstance";

//  Register User
export const register = async (formData) => {
  const response = await axiosInstance.post("/auth/register", formData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await axiosInstance.post("/auth/login", credentials);

  if (response.token) {
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));
  }

  return response.data;
};


export const updatePassword = async (oldPassword, newPassword) => {
  return axiosInstance.post("/auth/update-password", {
    oldPassword,
    newPassword,
  });
};


