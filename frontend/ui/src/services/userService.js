import axiosInstance from "..api/axiosInstance";

export const CreateUser = (data) => {
  return axiosInstance.post("api/users/create", data);
};
