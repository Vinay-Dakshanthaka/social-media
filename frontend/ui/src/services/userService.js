import axiosInstance from "..api/axiosInstance";

export const CreateUser = (data) => {
  return axiosInstance.post("/users", data);
};
