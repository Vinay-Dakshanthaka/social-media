// src/components/albums/AlbumList.jsx
import React, { useEffect, useState } from "react";
import { getAlbums, deleteAlbum } from "../../api/albumService";

export default function AlbumList({ currentUser, onCreate, onEdit, onOpen }) {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [year, setYear] = useState("");
  const [department, setDepartment] = useState("");
  const [event, setEvent] = useState("");
  const [visibility, setVisibility] = useState("");
  const [albumType, setAlbumType] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const isAdminOrStaff = (role) =>
    ["ADMIN", "PRINCIPAL", "HOD", "STAFF"].includes(role || "");

  const load = async () => {
    try {
      setLoading(true);
      const data = await getAlbums({
        search,
        year,
        department,
        event,
        visibility,
        albumType,
        page,
        limit: 9,
      });
      setAlbums(data.items || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error(err);
      alert("Failed to load albums");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    load();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this album?")) return;
    try {
      await deleteAlbum(id);
      load();
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
  };

  return (
    <div className="space-y-4">
      <form
        className="grid gap-3 md:grid-cols-5 items-end"
        onSubmit={handleSearch}
      >
        <div className="md:col-span-2">
          <label className="block text-xs text-gray-500 mb-1">
            Search by title/event
          </label>
          <input
            className="w-full border rounded-md px-2 py-1 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
          />
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">Year</label>
          <input
            className="w-full border rounded-md px-2 py-1 text-sm"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="2025"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">Department</label>
          <input
            className="w-full border rounded-md px-2 py-1 text-sm"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="CSE"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">Event</label>
          <input
            className="w-full border rounded-md px-2 py-1 text-sm"
            value={event}
            onChange={(e) => setEvent(e.target.value)}
            placeholder="Farewell"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">
            Album Type
          </label>
          <select
            className="w-full border rounded-md px-2 py-1 text-sm"
            value={albumType}
            onChange={(e) => setAlbumType(e.target.value)}
          >
            <option value="">All</option>
            <option value="PHOTO">Photo</option>
            <option value="VIDEO">Video</option>
            <option value="MIXED">Mixed</option>
          </select>
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">
            Visibility
          </label>
          <select
            className="w-full border rounded-md px-2 py-1 text-sm"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          >
            <option value="">All</option>
            <option value="PRIVATE">Private</option>
            <option value="GROUP">Group</option>
            <option value="ALL_STUDENTS">All Students</option>
            <option value="ADMINS_ONLY">Admins Only</option>
          </select>
        </div>

        <div className="md:col-span-2 flex gap-2">
          <button
            type="submit"
            className="self-end px-3 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700"
          >
            Apply
          </button>

          {currentUser && isAdminOrStaff(currentUser.role) && (
            <button
              type="button"
              onClick={onCreate}
              className="self-end px-3 py-2 rounded-md border text-sm hover:bg-gray-50"
            >
              + New
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <div className="text-center text-sm text-gray-500 py-8">
          Loading...
        </div>
      ) : albums.length === 0 ? (
        <div className="text-center text-sm text-gray-500 py-8">
          No albums found.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {albums.map((album) => (
            <div
              key={album.id}
              className="border rounded-lg p-3 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-semibold text-sm mb-1">{album.title}</h3>
                <p className="text-xs text-gray-500 line-clamp-2 mb-2">
                  {album.description}
                </p>
                <div className="text-[11px] text-gray-500 space-y-1">
                  <p>
                    <span className="font-medium">Event:</span> {album.event}
                  </p>
                  <p>
                    <span className="font-medium">Year:</span> {album.year}
                  </p>
                  <p>
                    <span className="font-medium">Dept:</span> {album.department}
                  </p>
                  <p>
                    <span className="font-medium">Visibility:</span>{" "}
                    {album.visibility}
                  </p>
                  {album.isFeatured && (
                    <p className="text-yellow-600 font-semibold">★ Featured</p>
                  )}
                </div>
              </div>

              <div className="flex justify-between mt-3 text-xs">
                <button
                  className="px-2 py-1 border rounded-md hover:bg-gray-50"
                  onClick={() => onOpen(album)}
                >
                  View
                </button>
                {currentUser && isAdminOrStaff(currentUser.role) && (
                  <>
                    <button
                      className="px-2 py-1 border rounded-md hover:bg-gray-50"
                      onClick={() => onEdit(album)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 border border-red-500 text-red-500 rounded-md hover:bg-red-50"
                      onClick={() => handleDelete(album.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-4 text-xs">
        <span>
          Page {page} of {totalPages}
        </span>
        <div className="space-x-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className={`px-2 py-1 border rounded-md ${
              page <= 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
            }`}
          >
            Prev
          </button>
          <button
            disabled={page >= totalPages}
            onClick={() =>
              setPage((p) => (p < totalPages ? p + 1 : p))
            }
            className={`px-2 py-1 border rounded-md ${
              page >= totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-50"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
