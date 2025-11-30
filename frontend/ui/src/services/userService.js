import axiosInstance from "..api/axiosInstance";

export const createUser = (data) => {
  return axiosInstance.post("/users", data);
};
