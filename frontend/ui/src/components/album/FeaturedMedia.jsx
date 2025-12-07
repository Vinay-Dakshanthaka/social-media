// src/components/albums/FeaturedMedia.jsx
import React, { useEffect, useState } from "react";
import { fetchFeaturedMedia } from "../../api/albumService";

export default function FeaturedMedia() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const data = await fetchFeaturedMedia();
      setItems(data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load featured media");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const renderPreview = (m) => {
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
      <h2 className="text-sm font-semibold">Featured Media</h2>
      {loading ? (
        <div className="text-center text-sm text-gray-500 py-8">
          Loading...
        </div>
      ) : items.length === 0 ? (
        <div className="text-center text-sm text-gray-500 py-8">
          No featured items yet.
        </div>
      ) : (
        <div className="grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {items.map((m) => (
            <div
              key={m.id}
              className="border rounded-md overflow-hidden flex flex-col"
            >
              <div className="aspect-video bg-black/5 flex items-center justify-center">
                {renderPreview(m)}
              </div>
              <div className="p-2 text-[11px] flex flex-col gap-1">
                <div className="flex justify-between">
                  <span className="font-medium line-clamp-1">
                    {m.caption || m.fileName || "Media"}
                  </span>
                  <span className="text-gray-500">
                    #{m.albumId}
                  </span>
                </div>
                {m.albumTitle && (
                  <p className="text-[10px] text-gray-500">
                    Album: {m.albumTitle}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
