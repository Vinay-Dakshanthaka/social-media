// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const UpdatePasswordPopup = ({ close }) => {
//   const [oldPassword, setOld] = useState("");
//   const [newPassword, setNew] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const token = localStorage.getItem("token");

//       await axios.post(
//         "/api/auth/update-password",
//         { oldPassword, newPassword },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       toast.success("Password updated successfully!");

//       close(); // Close popup
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to update password");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>

//       {/* Old Password */}
//       <label className="dark:text-gray-300">Old Password</label>
//       <input
//         type="password"
//         className="border w-full p-2 mb-3 rounded-md dark:bg-gray-800 dark:text-white"
//         value={oldPassword}
//         onChange={(e) => setOld(e.target.value)}
//       />

//       {/* New Password */}
//       <label className="dark:text-gray-300">New Password</label>
//       <input
//         type="password"
//         className="border w-full p-2 mb-3 rounded-md dark:bg-gray-800 dark:text-white"
//         value={newPassword}
//         onChange={(e) => setNew(e.target.value)}
//       />

//       {/* Buttons */}
//       <div className="flex justify-end gap-3 mt-4">
//         <button
//           type="button"
//           onClick={close}
//           className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-md"
//         >
//           Cancel
//         </button>

//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-600 text-white rounded-md"
//         >
//           Update
//         </button>
//       </div>
//     </form>
//   );
// };

// export default UpdatePasswordPopup;

// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const UpdatePasswordPopup = ({ close }) => {
//   const user = JSON.parse(localStorage.getItem("user"));

//   const [oldPassword, setOld] = useState("");
//   const [newPassword, setNew] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!oldPassword || !newPassword) {
//       toast.error("All fields are required");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");

//       const res = await axios.post(
//         "/api/auth/update-password",
//         { oldPassword, newPassword },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       toast.success("Password updated successfully");

//       const updatedUser = { ...user, forcePasswordChange: false };
//       localStorage.setItem("user", JSON.stringify(updatedUser));

//       close();
//       setTimeout(() => window.location.reload(), 300);

//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to update password");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>

//       <label>Old Password</label>
//       <input
//         type="password"
//         className="border w-full p-2 mb-3 rounded"
//         value={oldPassword}
//         onChange={(e) => setOld(e.target.value)}
//       />

//       <label>New Password</label>
//       <input
//         type="password"
//         className="border w-full p-2 mb-3 rounded"
//         value={newPassword}
//         onChange={(e) => setNew(e.target.value)}
//       />

//       <div className="flex justify-end gap-3 mt-4">
//         <button type="button" onClick={close} className="bg-gray-400 px-4 py-2 rounded">
//           Cancel
//         </button>
//         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
//           Update
//         </button>
//       </div>
//     </form>
//   );
// };

// export default UpdatePasswordPopup;

import React, { useState } from "react";
import { toast } from "react-toastify";
import { updatePassword } from "../api/authService";
import { Eye, EyeOff } from "lucide-react";

const UpdatePasswordPopup = ({ close }) => {
  const [oldPassword, setOld] = useState("");
  const [newPassword, setNew] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword) {
      toast.error("Both fields are required");
      return;
    }

    if (oldPassword === newPassword) {
      toast.error("New password cannot be the same as old password");
      return;
    }

    try {
      await updatePassword(oldPassword, newPassword);

      // toast.success(res.data.message || "Password updated successfully!");
      const user = JSON.parse(localStorage.getItem("user")) || {};
      user.forcePasswordChange = false;
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Password updated successfully!");
      setTimeout(close, 800);
      window.location.reload();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update password");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Old Password */}
      <label className="block mb-1 font-medium">Old Password</label>
      <div className="relative mb-3">
        <input
          type={showOld ? "text" : "password"}
          className="w-full border rounded p-2 pr-10"
          value={oldPassword}
          onChange={(e) => setOld(e.target.value)}
        />
        <button
          type="button"
          className="absolute right-3 top-2.5 text-gray-600"
          onClick={() => setShowOld(!showOld)}
        >
          {showOld ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {/* New Password */}
      <label className="block mb-1 font-medium">New Password</label>
      <div className="relative mb-3">
        <input
          type={showNew ? "text" : "password"}
          className="w-full border rounded p-2 pr-10"
          value={newPassword}
          onChange={(e) => setNew(e.target.value)}
        />
        <button
          type="button"
          className="absolute right-3 top-2.5 text-gray-600"
          onClick={() => setShowNew(!showNew)}
        >
          {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button"
          onClick={close}
          className="px-4 py-2 rounded bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-600 text-white"
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default UpdatePasswordPopup;
