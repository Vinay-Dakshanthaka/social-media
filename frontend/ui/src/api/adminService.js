import axios from "./axiosInstance";  // your axios instance

export const getUsers = () => axios.get("/users");

export const approveUser = (id) => axios.put(`/auth/approve/${id}`);

export const revokeUser = (id) => axios.put(`/auth/revoke/${id}`);

export const updateRole = (id, role) =>
  axios.put(`/auth/update-role/${id}`, { role });
