import axiosInstance from "./axiosInstance";

export const fetchGroups = async () => {
  const res = await axiosInstance.get("/groups");
  return res.data;
};

export const fetchAllUsers = async () => {
  const res = await axiosInstance.get("/users");
  return res.data;
};


export const createGroup = async (payload) => {
  const res = await axiosInstance.post("/groups", payload);
  return res.data;
};

export const fetchGroupDetails = async (id) => {
  const res = await axiosInstance.get(`/groups/${id}`);
  return res.data;
};

export const fetchGroupMembers = async (id) => {
  const res = await axiosInstance.get(`/groups/${id}/members`);
  return res.data;
};

export const addGroupMember = async (id, userId) => {
  const res = await axiosInstance.post(`/groups/${id}/members`, { userId });
  return res.data;
};

export const removeGroupMember = async (id, userId) => {
  const res = await axiosInstance.delete(`/groups/${id}/members/${userId}`);
  return res.data;
};

export const deleteGroup = async (id) => {
  const response = await axiosInstance.delete(`/groups/${id}`);
  return response.data;
};

export const updateGroup = async (id, data) => {
  const res = await axiosInstance.put(`/groups/${id}`, data);
  return res.data;
};
