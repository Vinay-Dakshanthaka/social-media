import React, { useEffect, useState } from "react";
import {
  fetchGroupDetails,
  fetchGroupMembers,
  addGroupMember,
  removeGroupMember,
  fetchAllUsers,
} from "../../api/groupService";

import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function GroupDetails() {
  const { id } = useParams();

  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const g = await fetchGroupDetails(id);
    const m = await fetchGroupMembers(id);
    const u = await fetchAllUsers();

    setGroup(g);
    setMembers(m);
    setUsers(u);
    setSelectedUsers([]);
  };

  // FIXED final membership detection
  const isMember = (userId) =>
    members.some((m) => {
      const memberUserId =
        m.userId ??
        m.user_id ??
        // m.userID ??
        // m.user?.id;
        (m.user && m.user.id);

      return Number(memberUserId) === Number(userId);
    });

  // Search filter
  const filteredUsers = users.filter((u) =>
    `${u.first_name} ${u.last_name} ${u.email} ${u.role}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const toggleSelect = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((u) => u.id));
    }
  };

  const handleAdd = async (userId) => {
    await addGroupMember(id,  userId );
    toast.success("Member added");
    load();
  };

  const handleRemove = async (userId) => {
    await removeGroupMember(id, userId);
    toast.success("Member removed");
    load();
  };

  const addSelected = async () => {
    const toAdd = selectedUsers.filter((uid) => !isMember(uid));
    if (toAdd.length === 0) return toast.warn("No new users selected");

    for (let uid of toAdd) {
      await addGroupMember(id,  uid );
    }

    toast.success("Selected users added");
    load();
  };

  const removeSelected = async () => {
    const toRemove = selectedUsers.filter((uid) => isMember(uid));
    if (toRemove.length === 0) return toast.warn("No group members selected");

    for (let uid of toRemove) {
      await removeGroupMember(id, uid);
    }

    toast.success("Selected members removed");
    load();
  };

  return (
    <div className="p-6">
      {group && (
        <div className="bg-white shadow-md rounded-lg p-6">
          {/* Header */}
          <h2 className="text-2xl font-semibold mb-1">{group.name}</h2>
          <p className="text-gray-700">{group.description || "No description"}</p>
          <p className="text-sm text-gray-500 mt-2">
            Dept: {group.department || "-"} • Year: {group.year || "-"}
          </p>

          {/* Top bar */}
          <div className="flex justify-between items-center mt-6">
            {/* Left: Search */}
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-3 py-2 rounded w-64 text-sm"
            />

            {/* Right: Buttons */}
            <div className="flex gap-3">
              <button
                onClick={addSelected}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add Students
              </button>

              <button
                onClick={removeSelected}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Remove Students
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="mt-6">
            <table className="w-full border rounded-lg text-sm">
              <thead className="bg-gray-100 uppercase text-xs text-gray-700">
                <tr>
                  <th className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={
                        selectedUsers.length === filteredUsers.length &&
                        filteredUsers.length > 0
                      }
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Role</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((u) => {
                  const member = isMember(u.id);

                  return (
                    <tr key={u.id} className="border-t hover:bg-gray-50">
                      <td className="p-3 text-center">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(u.id)}
                          onChange={() => toggleSelect(u.id)}
                        />
                      </td>

                      {/* Name Fix */}
                      <td className="p-3">
                        {u.firstName} {u.lastName}
                      </td>

                      <td className="p-3">{u.email}</td>
                      <td className="p-3">{u.role}</td>

                      <td className="p-3 text-center">
                        {!member ? (
                          <button
                            onClick={() => handleAdd(u.id)}
                            className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                          >
                            Add
                          </button>
                        ) : (
                          <button
                            onClick={() => handleRemove(u.id)}
                            className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
                          >
                            Remove
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}

                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
