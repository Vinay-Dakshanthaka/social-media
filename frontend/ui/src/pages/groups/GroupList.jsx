import React, { useEffect, useState } from "react";
import { fetchGroups, deleteGroup, updateGroup } from "../../api/groupService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import EditGroupModal from "../../components/EditGroupModal";

export default function GroupList() {
  const [groups, setGroups] = useState([]);
  const [selected, setSelected] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);

  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    const data = await fetchGroups();
    setGroups(data);
  };

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selected.length === groups.length) {
      setSelected([]);
    } else {
      setSelected(groups.map((g) => g.id));
    }
  };

  const deleteSelected = async () => {
    if (selected.length === 0) return toast.warn("No groups selected");

    if (!window.confirm("Delete selected groups?")) return;

    for (let id of selected) {
      await deleteGroup(id);
    }

    toast.success("Groups deleted");
    loadGroups();
    setSelected([]);
  };

  return (
    <div className="p-6">
      {/* Outer Card Wrapper */}
      <div className="bg-white shadow-md rounded-lg p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Manage Groups</h2>

          <div className="flex gap-3">
            <Link
              to="/groups/new"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              + Create Group
            </Link>

            <button
              onClick={deleteSelected}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Delete Group
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full text-sm table-auto">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
              <tr>
                <th className="p-3 w-12 text-center">
                  <input
                    type="checkbox"
                    checked={selected.length === groups.length && groups.length > 0}
                    onChange={toggleSelectAll}
                    className="scale-110"
                  />
                </th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Department</th>
                <th className="p-3 text-left">Year</th>
                <th className="p-3 text-left">Visibility</th>
                <th className="p-3 text-center w-40">Actions</th>
              </tr>
            </thead>

            <tbody>
              {groups.map((g) => (
                <tr
                  key={g.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={selected.includes(g.id)}
                      onChange={() => toggleSelect(g.id)}
                      className="scale-110"
                    />
                  </td>

                  <td className="p-3 font-medium">{g.name}</td>
                  <td className="p-3">{g.department || "-"}</td>
                  <td className="p-3">{g.year || "-"}</td>
                  <td className="p-3">{g.visibility}</td>

                  {/* ACTION BUTTONS */}
                  <td className="p-3 text-center flex gap-2 justify-center">

                    {/* VIEW BUTTON */}
                    <Link
                      to={`/groups/${g.id}`}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
                    >
                      View
                    </Link>

                    {/* EDIT BUTTON (POPUP) */}
                    <button
                      onClick={() => {
                        setEditingGroup(g);
                        setEditOpen(true);
                      }}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-xs"
                    >
                      Edit
                    </button>

                  </td>
                </tr>
              ))}

              {groups.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center p-6 text-gray-500">
                    No groups found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* EDIT POPUP */}
      <EditGroupModal
        open={editOpen}
        group={editingGroup}
        onClose={() => setEditOpen(false)}
        onSave={async (updated) => {
          await updateGroup(editingGroup.id, updated);
          toast.success("Group updated successfully!");
          loadGroups();
          setEditOpen(false);
        }}
      />
    </div>
  );
}
