import React, { useState } from "react";
import { toast } from "react-toastify";

const AccountPopup = ({ close }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(user?.profilePic || null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const saveProfile = async () => {
    try {
      //  Simulate a successful upload
      // Replace this area with your API call later
      await new Promise((resolve) => setTimeout(resolve, 500));

      toast.success("Profile updated successfully!");

      close();
    } catch (error) {
      toast.error("Failed to update profile. Try again!");
    }
  };

  return (
    <div>
      {/* Profile Picture */}
      <div className="flex justify-center mb-4">
        <img
          src={preview || "/default-avatar.png"}
          className="w-28 h-28 rounded-full object-cover shadow"
          alt="Profile Preview"
        />
      </div>

      {/* Upload Input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="mb-4"
      />

      {/* Disabled Fields */}
      <div className="space-y-4">

        <div>
          <label className="text-sm dark:text-gray-300">Name</label>
          <input
            type="text"
            value={`${user?.firstName || ""} ${user?.lastName || ""}`.trim()}
            disabled
            className="w-full p-2 mt-1 rounded-md bg-gray-200 dark:bg-gray-700 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="text-sm dark:text-gray-300">Email</label>
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full p-2 mt-1 rounded-md bg-gray-200 dark:bg-gray-700 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="text-sm dark:text-gray-300">Role</label>
          <input
            type="text"
            value={user.role}
            disabled
            className="w-full p-2 mt-1 rounded-md bg-gray-200 dark:bg-gray-700 cursor-not-allowed"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={close}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-md"
        >
          Cancel
        </button>

        <button
          onClick={saveProfile}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AccountPopup;
