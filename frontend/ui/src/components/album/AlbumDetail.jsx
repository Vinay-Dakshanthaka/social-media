// src/components/albums/AlbumDetail.jsx
import React, { useEffect, useState } from "react";
import {
  getAlbumById,
  updateAlbum,
} from "../../api/albumService";
import {
  fetchAlbumMedia,
  uploadMedia,
  deleteMedia,
  toggleMediaFeatured,
  updateMediaVisibility,
} from "../../api/mediaService";
import { toast } from "react-toastify";

export default function AlbumDetail({ album, currentUser }) {
  const [albumData, setAlbumData] = useState(album);
  const [mediaList, setMediaList] = useState([]);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [uploading, setUploading] = useState(false);

  const isAdminOrStaff = (role) =>
    ["ADMIN", "PRINCIPAL", "HOD", "STAFF"].includes(role || "");

  const loadAlbum = async () => {
    try {
      const data = await getAlbumById(album.id);
      setAlbumData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadMedia = async () => {
    try {
      setLoadingMedia(true);
      const data = await fetchAlbumMedia(album.id);
      setMediaList(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load media");
    } finally {
      setLoadingMedia(false);
    }
  };

  useEffect(() => {
    loadAlbum();
    loadMedia();
  }, [album.id]);

  const handleUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    try {
      setUploading(true);
      await uploadMedia(album.id, files);
      e.target.value = null;
      loadMedia();
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteMedia = async (id) => {
    if (!window.confirm("Delete this media item?")) return;
    try {
      await deleteMedia(id);
      setMediaList((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete");
    }
  };

  const handleToggleFeatured = async (item) => {
    try {
      await toggleMediaFeatured(item.id, !item.isFeatured);
      setMediaList((prev) =>
        prev.map((m) =>
          m.id === item.id ? { ...m, isFeatured: !m.isFeatured } : m
        )
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to update featured status");
    }
  };

  const renderMediaPreview = (m) => {
    if (m.type === "PHOTO") {
      return (
        <img
          src={m.thumbnailUrl || m.fileUrl}
          alt={m.caption || ""}
          className="w-full h-full object-cover"
        />
      );
    }

    if (m.type === "VIDEO") {
      return (
        <video className="w-full h-full object-cover" controls>
          <source src={m.fileUrl} type={m.mimeType || "video/mp4"} />
        </video>
      );
    }

    if (m.type === "AUDIO") {
      return <audio controls className="w-full"><source src={m.fileUrl} /></audio>;
    }

    return (
      <div className="flex items-center justify-center text-xs text-blue-700 underline">
        <a href={m.fileUrl} target="_blank" rel="noreferrer">
          Open file
        </a>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Album header */}
      <div className="border rounded-md p-3 bg-gray-50 text-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h2 className="font-semibold text-base">{albumData.title}</h2>
            <p className="text-xs text-gray-600">{albumData.description}</p>
            <div className="mt-2 text-[11px] text-gray-500 space-y-1">
              <p><span className="font-medium">Event:</span> {albumData.event}</p>
              <p><span className="font-medium">Year:</span> {albumData.year}</p>
              <p><span className="font-medium">Dept:</span> {albumData.department}</p>
            </div>
          </div>

          <div className="text-xs space-y-2">
            <div>
              <span className="font-medium">Visibility: </span>
              {isAdminOrStaff(currentUser?.role) ? (
                <select
                  value={albumData.visibility || "GROUP"}
                  onChange={async (e) => {
                    try {
                      const updated = await updateAlbum(album.id, {
                        ...albumData,
                        visibility: e.target.value,
                      });
                      setAlbumData(updated);
                    } catch {
                      toast.error("Failed to update album visibility");
                    }
                  }}
                  className="border rounded-md px-2 py-1 text-xs"
                >
                  <option value="PRIVATE">Private</option>
                  <option value="GROUP">Group</option>
                  <option value="ALL_STUDENTS">All Students</option>
                  <option value="ADMINS_ONLY">Admins Only</option>
                </select>
              ) : (
                <span>{albumData.visibility}</span>
              )}
            </div>

            <div>
              <span className="font-medium">Album Type:</span> {albumData.albumType}
            </div>
          </div>
        </div>
      </div>

      {/* Upload */}
      {currentUser && isAdminOrStaff(currentUser.role) && (
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">Media Items</div>
          <label className="inline-flex items-center px-3 py-1.5 border rounded-md text-xs cursor-pointer hover:bg-gray-50">
            <input
              type="file"
              multiple
              accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.ppt,.pptx"
              className="hidden"
              onChange={handleUpload}
            />
            {uploading ? "Uploading..." : "Upload files"}
          </label>
        </div>
      )}

      {/* Media grid */}
      {loadingMedia ? (
        <div className="text-center text-sm text-gray-500 py-8">Loading media...</div>
      ) : mediaList.length === 0 ? (
        <div className="text-center text-sm text-gray-500 py-8">No media uploaded yet.</div>
      ) : (
        <div className="grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {mediaList.map((m) => (
            <div key={m.id} className="border rounded-md overflow-hidden flex flex-col">
              <div className="aspect-video bg-black/5 flex items-center justify-center">
                {renderMediaPreview(m)}
              </div>

              <div className="p-2 text-[11px] flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span className="font-medium line-clamp-1">
                    {m.caption || m.fileName || "Media"}
                  </span>
                  {m.isFeatured && (
                    <span className="text-[10px] px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full">
                      Featured
                    </span>
                  )}
                </div>

                {/* Tags */}
                {m.tags && m.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {m.tags.map((t) => (
                      <span
                        key={t}
                        className="bg-gray-100 rounded-full px-2 py-0.5 text-[10px]"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Visibility Dropdown */}
                {isAdminOrStaff(currentUser?.role) && (
                  <select
                    value={m.visibility || "GROUP"}
                    className="border rounded-md text-[10px] px-1 py-0.5 mt-1"
                    onChange={async (e) => {
                      try {
                        await updateMediaVisibility(m.id, e.target.value);
                        setMediaList((prev) =>
                          prev.map((mi) =>
                            mi.id === m.id ? { ...mi, visibility: e.target.value } : mi
                          )
                        );
                      } catch {
                        toast.error("Failed to update media visibility");
                      }
                    }}
                  >
                    <option value="PRIVATE">Private</option>
                    <option value="GROUP">Group</option>
                    <option value="ALL_STUDENTS">All Students</option>
                    <option value="ADMINS_ONLY">Admins Only</option>
                  </select>
                )}

                {/* Actions */}
                <div className="flex justify-between mt-2">
                  {isAdminOrStaff(currentUser?.role) ? (
                    <>
                      <button
                        className="px-2 py-0.5 border rounded-md hover:bg-gray-50"
                        onClick={() => handleToggleFeatured(m)}
                      >
                        {m.isFeatured ? "Unfeature" : "Feature"}
                      </button>

                      <button
                        className="px-2 py-0.5 border border-red-500 text-red-500 rounded-md hover:bg-red-50"
                        onClick={() => handleDeleteMedia(m.id)}
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-400 text-[10px]">
                      Uploaded by #{m.uploadedById}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
