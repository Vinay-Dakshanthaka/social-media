import axios from "./axiosInstance";  // your axios instance

export const getUsers = () => axios.get("/api/users");

export const approveUser = (id) => axios.put(`/api/auth/approve/${id}`);

export const revokeUser = (id) => axios.put(`/api/auth/revoke/${id}`);

export const updateRole = (id, role) =>
  axios.put(`/api/auth/update-role/${id}`, { role });
