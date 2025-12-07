// import React, { useState, useEffect } from "react";

// export default function EditGroupModal({ open, onClose, group, onSave }) {
//   const [form, setForm] = useState({
//     name: "",
//     department: "",
//     year: "",
//     visibility: "",
//     description: "",
//   });

//   useEffect(() => {
//     if (group) {
//       setForm({
//         name: group.name,
//         department: group.department || "",
//         year: group.year || "",
//         visibility: group.visibility,
//         description: group.description || "",
//       });
//     }
//   }, [group]);

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
//       <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
        
//         {/* Title */}
//         <h2 className="text-xl font-semibold mb-4">Edit Group</h2>

//         {/* Form */}
//         <div className="space-y-3">

//           <div>
//             <label className="block text-sm font-medium">Group Name</label>
//             <input
//               type="text"
//               className="w-full border p-2 rounded"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium">Department</label>
//             <input
//               type="text"
//               className="w-full border p-2 rounded"
//               value={form.department}
//               onChange={(e) => setForm({ ...form, department: e.target.value })}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium">Year</label>
//             <input
//               type="text"
//               className="w-full border p-2 rounded"
//               value={form.year}
//               onChange={(e) => setForm({ ...form, year: e.target.value })}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium">Visibility</label>
//             <select
//               className="w-full border p-2 rounded"
//               value={form.visibility}
//               onChange={(e) => setForm({ ...form, visibility: e.target.value })}
//             >
//               <option value="PRIVATE">PRIVATE</option>
//               <option value="COLLEGE">COLLEGE</option>
//               <option value="ALL_ADMINS">ALL_ADMINS</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium">Description</label>
//             <textarea
//               className="w-full border p-2 rounded"
//               value={form.description}
//               rows="3"
//               onChange={(e) => setForm({ ...form, description: e.target.value })}
//             />
//           </div>

//         </div>

//         {/* Buttons */}
//         <div className="flex justify-end gap-3 mt-5">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={() => onSave(form)}
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             Update
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { updateGroup } from "../api/groupService";

export default function EditGroupModal({ open, onClose, group, onSave }) {
  const [form, setForm] = useState({
    name: "",
    department: "",
    year: "",
    visibility: "",
    description: "",
  });

  useEffect(() => {
    if (group) {
      setForm({
        name: group.name,
        department: group.department || "",
        year: group.year || "",
        visibility: group.visibility,
        description: group.description || "",
      });
    }
  }, [group]);

  if (!open) return null;

  const handleUpdate = async () => {
    try {
      await updateGroup(group.id, form);

      toast.success("Group updated successfully!");

      onSave(); // This reloads the list (parent)
      onClose(); // Close modal
    } catch (err) {
      console.error(err);
      toast.error("Failed to update group");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">

        <h2 className="text-xl font-semibold mb-4">Edit Group</h2>

        <div className="space-y-3">

          <div>
            <label className="block text-sm font-medium">Group Name</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Department</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Year</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Visibility</label>
            <select
              className="w-full border p-2 rounded"
              value={form.visibility}
              onChange={(e) => setForm({ ...form, visibility: e.target.value })}
            >
              <option value="PRIVATE">PRIVATE</option>
              <option value="COLLEGE">COLLEGE</option>
              <option value="ALL_ADMINS">ALL_ADMINS</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              className="w-full border p-2 rounded"
              rows="3"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            ></textarea>
          </div>

        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Update
          </button>
        </div>

      </div>
    </div>
  );
}
