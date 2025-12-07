// import axiosInstance from "./axiosInstance";

// // CREATE Album
// export const createAlbum = async (formData) => {
//   const response = await axiosInstance.post("/albums", formData);
//   return response.data;
// };

// // GET all albums (with filters & pagination)
// export const getAlbums = async (queryParams = {}) => {
//   const response = await axiosInstance.get("/albums", { params: queryParams });
//   return response.data;
// };

// // GET single album
// export const getAlbumById = async (id) => {
//   const response = await axiosInstance.get(`/albums/${id}`);
//   return response.data;
// };

// // UPDATE Album
// export const updateAlbum = async (id, formData) => {
//   const response = await axiosInstance.put(`/albums/${id}`, formData);
//   return response.data;
// };

// // DELETE Album
// export const deleteAlbum = async (id) => {
//   const response = await axiosInstance.delete(`/albums/${id}`);
//   return response.data;
// };

// export default {
//   createAlbum,
//   getAlbums,
//   getAlbumById,
//   updateAlbum,
//   deleteAlbum,
// };


import axiosInstance from "./axiosInstance";

// CREATE Album
export const createAlbum = async (formData) => {
  const response = await axiosInstance.post("/albums", formData);
  return response.data;
};

// GET all albums (with filters & pagination)
export const getAlbums = async (queryParams = {}) => {
  const response = await axiosInstance.get("/albums", { params: queryParams });
  return response.data;
};

// GET single album
export const getAlbumById = async (id) => {
  const response = await axiosInstance.get(`/albums/${id}`);
  return response.data;
};

// UPDATE Album
export const updateAlbum = async (id, formData) => {
  const response = await axiosInstance.put(`/albums/${id}`, formData);
  return response.data;
};

// DELETE Album
export const deleteAlbum = async (id) => {
  const response = await axiosInstance.delete(`/albums/${id}`);
  return response.data;
};

// ⭐ NEW: FETCH Featured Media
export const fetchFeaturedMedia = async () => {
  const response = await axiosInstance.get("/media/featured");
  return response.data;
};

// CURRENT USER
export const fetchCurrentUser = async () => {
  const response = await axiosInstance.get("/auth/me");
  return response.data;
};


export default {
  createAlbum,
  getAlbums,
  getAlbumById,
  updateAlbum,
  deleteAlbum,
  fetchFeaturedMedia, // <-- added in default export too
  fetchCurrentUser
};
