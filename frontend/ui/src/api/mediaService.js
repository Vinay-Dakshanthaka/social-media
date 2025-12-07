// src/api/media.js
import axiosInstance from "./axiosInstance";

export const fetchAlbumMedia = async (albumId) => {
  const { data } = await axiosInstance.get(`/albums/${albumId}/media`);
  return data;
};

// export const uploadMedia = async (albumId, files) => {
//   const formData = new FormData();
//   Array.from(files).forEach((f) => formData.append("files", f));

//   const { data } = await axiosInstance.post(
//     `/albums/${albumId}/media`,
//     formData,
//     {
//       headers: { "Content-Type": "multipart/form-data" },
//     }
//   );

//   return data;
// };

export const deleteMedia = async (mediaId) => {
  const { data } = await axiosInstance.delete(`/media/${mediaId}`);
  return data;
};

export const toggleMediaFeatured = async (mediaId, isFeatured) => {
  const { data } = await axiosInstance.patch(`/media/${mediaId}/featured`, {
    isFeatured,
  });
  return data;
};

export const updateMediaVisibility = async (mediaId, visibility) => {
  const response = await axiosInstance.patch(
    `/media/${mediaId}/visibility`,
    { visibility }
  );
  return response.data;
};

export const uploadMedia = async (albumId, files) => {
  const formData = new FormData();
  for (const file of files) {
    formData.append("files", file);
  }

  const response = await axiosInstance.post(`/albums/${albumId}/media`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });

  return response.data;
};


export const fetchFeaturedMedia = async () => {
  const { data } = await axiosInstance.get("/media/featured");
  return data;
};
