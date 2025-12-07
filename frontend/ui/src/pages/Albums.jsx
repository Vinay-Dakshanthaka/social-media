// src/pages/Albums.jsx
import React, { useEffect, useState } from "react";
import { fetchCurrentUser } from "../api/albumService";
import AlbumList from "../components/album/AlbumList";
import AlbumForm from "../components/album/AlbumForm";
import AlbumDetail from "../components/album/AlbumDetail";
import FeaturedMedia from "../components/album/FeaturedMedia";

export default function Albums() {
  const [activeTab, setActiveTab] = useState("list"); // list | form | detail | featured
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const user = await fetchCurrentUser();
        setCurrentUser(user);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const handleCreateNew = () => {
    setSelectedAlbum(null);
    setActiveTab("form");
  };

  const handleEditAlbum = (album) => {
    setSelectedAlbum(album);
    setActiveTab("form");
  };

  const handleOpenAlbum = (album) => {
    setSelectedAlbum(album);
    setActiveTab("detail");
  };

  const handleAlbumSaved = (album) => {
    setSelectedAlbum(album);
    setActiveTab("detail");
  };

  const isAdminOrStaff = (role) =>
    ["ADMIN", "PRINCIPAL", "HOD", "STAFF"].includes(role || "");

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Albums</h1>
        {currentUser && isAdminOrStaff(currentUser.role) && (
          <button
            onClick={handleCreateNew}
            className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700"
          >
            + Create Album
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b mb-4">
        <nav className="-mb-px flex gap-4 text-sm">
          <button
            className={`pb-2 border-b-2 ${
              activeTab === "list"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500"
            }`}
            onClick={() => setActiveTab("list")}
          >
            Album List
          </button>

          {currentUser && isAdminOrStaff(currentUser.role) && (
            <button
              className={`pb-2 border-b-2 ${
                activeTab === "form"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500"
              }`}
              onClick={() => setActiveTab("form")}
            >
              {selectedAlbum ? "Edit Album" : "Create Album"}
            </button>
          )}

          <button
            className={`pb-2 border-b-2 ${
              activeTab === "detail"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500"
            }`}
            onClick={() => selectedAlbum && setActiveTab("detail")}
            disabled={!selectedAlbum}
          >
            Album Details
          </button>

          <button
            className={`pb-2 border-b-2 ${
              activeTab === "featured"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500"
            }`}
            onClick={() => setActiveTab("featured")}
          >
            Featured Media
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow p-4 md:p-6 min-h-[400px]">
        {activeTab === "list" && (
          <AlbumList
            currentUser={currentUser}
            onCreate={handleCreateNew}
            onEdit={handleEditAlbum}
            onOpen={handleOpenAlbum}
          />
        )}

        {activeTab === "form" && currentUser && isAdminOrStaff(currentUser.role) && (
          <AlbumForm album={selectedAlbum} onSaved={handleAlbumSaved} />
        )}

        {activeTab === "detail" && selectedAlbum && (
          <AlbumDetail album={selectedAlbum} currentUser={currentUser} />
        )}

        {activeTab === "featured" && (
          <FeaturedMedia currentUser={currentUser} />
        )}
      </div>
    </div>
  );
}
