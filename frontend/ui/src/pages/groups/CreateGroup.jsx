import React, { useState } from "react";
import { createGroup } from "../../api/groupService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function GroupCreate() {
  const [form, setForm] = useState({
    name: "",
    year: "",
    department: "",
    description: "",
    visibility: "PRIVATE",
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await createGroup(form);
      toast.success("Group created");
      navigate("/groups");
    } catch (err) {
      toast.error("Failed to create group");
    }
  };

  return (
    <div className="p-4 max-w-lg">
      <h2 className="text-xl font-semibold mb-4">Create Group</h2>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Group Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        className="border p-2 w-full mb-2"
        placeholder="Year"
        onChange={(e) => setForm({ ...form, year: e.target.value })}
      />

      <input
        className="border p-2 w-full mb-2"
        placeholder="Department"
        onChange={(e) => setForm({ ...form, department: e.target.value })}
      />

      <textarea
        className="border p-2 w-full mb-2"
        placeholder="Description"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <select
        className="border p-2 w-full mb-2"
        onChange={(e) => setForm({ ...form, visibility: e.target.value })}
      >
        <option value="PRIVATE">Private</option>
        <option value="COLLEGE">College</option>
        <option value="ALL_ADMINS">Admins Only</option>
      </select>

      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Create Group
      </button>
    </div>
  );
}
