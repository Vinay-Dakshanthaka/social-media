// src/components/albums/AlbumForm.jsx
import React, { useEffect, useState } from "react";
import { createAlbum, getAlbumById, updateAlbum } from "../../api/albumService";
import { fetchGroups } from "../../api/groupService";
import { toast } from "react-toastify";

const emptyForm = {
  title: "",
  description: "",
  albumType: "PHOTO",
  event: "",
  year: "",
  department: "",
  visibility: "GROUP",
  allowDownload: false,
  isFeatured: false,
  groupId: "",
};

export default function AlbumForm({ album, onSaved }) {
  const [form, setForm] = useState(emptyForm);
  const [groups, setGroups] = useState([]); // <-- new state
  const [loading, setLoading] = useState(false);

  const isEdit = Boolean(album?.id);

  useEffect(() => {
    (async () => {
      try {
        // Load Album When Editing
        if (isEdit) {
          const data = await getAlbumById(album.id);
          setForm({
            title: data.title || "",
            description: data.description || "",
            albumType: data.albumType || "PHOTO",
            event: data.event || "",
            year: data.year || "",
            department: data.department || "",
            visibility: data.visibility || "GROUP",
            allowDownload: !!data.allowDownload,
            isFeatured: !!data.isFeatured,
            groupId: data.groupId || "",
          });
        } else {
          setForm(emptyForm);
        }

        // Load Groups
        const groupList = await fetchGroups();
        setGroups(groupList);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load required data");
      }
    })();
  }, [album, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let saved;
      if (isEdit) {
        saved = await updateAlbum(album.id, form);
      } else {
        saved = await createAlbum(form);
      }
      toast.success("Album saved");
      onSaved && onSaved(saved);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4 max-w-xl" onSubmit={handleSubmit}>
      
      {/* Title */}
      <div>
        <label className="block text-xs text-gray-500 mb-1">Title *</label>
        <input
          name="title"
          className="w-full border rounded-md px-2 py-1 text-sm"
          value={form.title}
          onChange={handleChange}
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs text-gray-500 mb-1">Description</label>
        <textarea
          name="description"
          className="w-full border rounded-md px-2 py-1 text-sm"
          rows={3}
          value={form.description}
          onChange={handleChange}
        />
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-4">

        {/* Album Type */}
        <div>
          <label className="block text-xs text-gray-500 mb-1">Album Type</label>
          <select
            name="albumType"
            className="w-full border rounded-md px-2 py-1 text-sm"
            value={form.albumType}
            onChange={handleChange}
          >
            <option value="PHOTO">Photo</option>
            <option value="VIDEO">Video</option>
            <option value="MIXED">Mixed</option>
          </select>
        </div>

        {/* Event */}
        <div>
          <label className="block text-xs text-gray-500 mb-1">Event</label>
          <input
            name="event"
            className="w-full border rounded-md px-2 py-1 text-sm"
            value={form.event}
            onChange={handleChange}
          />
        </div>

        {/* Year */}
        <div>
          <label className="block text-xs text-gray-500 mb-1">Year</label>
          <input
            name="year"
            className="w-full border rounded-md px-2 py-1 text-sm"
            value={form.year}
            onChange={handleChange}
            placeholder="2025"
          />
        </div>

        {/* Department */}
        <div>
          <label className="block text-xs text-gray-500 mb-1">Department</label>
          <input
            name="department"
            className="w-full border rounded-md px-2 py-1 text-sm"
            value={form.department}
            onChange={handleChange}
            placeholder="CSE"
          />
        </div>

        {/* Visibility */}
        <div>
          <label className="block text-xs text-gray-500 mb-1">Visibility</label>
          <select
            name="visibility"
            className="w-full border rounded-md px-2 py-1 text-sm"
            value={form.visibility}
            onChange={handleChange}
          >
            <option value="PRIVATE">Private</option>
            <option value="GROUP">Group</option>
            <option value="ALL_STUDENTS">All Students</option>
            <option value="ADMINS_ONLY">Admins Only</option>
          </select>
        </div>

        {/* Group Dropdown */}
        <div>
          <label className="block text-xs text-gray-500 mb-1">Group</label>
          <select
            name="groupId"
            className="w-full border rounded-md px-2 py-1 text-sm"
            value={form.groupId}
            onChange={handleChange}
          >
            <option value="">-- No Group --</option>

            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Checkboxes */}
      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="allowDownload"
            checked={form.allowDownload}
            onChange={handleChange}
          />
          Allow download
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="isFeatured"
            checked={form.isFeatured}
            onChange={handleChange}
          />
          Mark as featured
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : isEdit ? "Update Album" : "Create Album"}
      </button>

    </form>
  );
}
