import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import UserTable from "../components/UserTable";
import {
  getUsers,
  approveUser,
  revokeUser,
  updateRole,
} from "../api/adminService";

import { toast } from "react-toastify";
// import { Sidebar } from "lucide-react";

const roles = ["ADMIN", "PRINCIPAL", "HOD", "STAFF", "STUDENT"];

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [search, setSearch] = useState("");

  const loadUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const toggleSelect = (id) => {
    setSelected((prev) => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  };

  const toggleSelectAll = () => {
    if (selected.size === users.length) setSelected(new Set());
    else setSelected(new Set(users.map((u) => u.id)));
  };

  const bulkApprove = async () => {
    if (selected.size === 0) return toast.warning("No users selected");
    for (let id of selected) await approveUser(id);
    toast.success("Approved selected users");
    loadUsers();
  };

  const bulkRevoke = async () => {
    if (selected.size === 0) return toast.warning("No users selected");
    for (let id of selected) await revokeUser(id);
    toast.success("Revoked selected users");
    loadUsers();
  };

  const onApprove = async (id) => {
    await approveUser(id);
    toast.success("User approved");
    loadUsers();
  };

  const onRevoke = async (id) => {
    await revokeUser(id);
    toast.success("User revoked");
    loadUsers();
  };

  const onRoleChange = async (id, role) => {
    await updateRole(id, role);
    toast.success("Role updated");
    loadUsers();
  };

  const filtered = users.filter(
    (u) =>
      u.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      u.lastName?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>

      <h1 className="text-3xl font-bold dark:text-white mb-6">
        Dashboard Overview
      </h1>

      {/* Search + Bulk Actions */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 rounded-lg border dark:bg-gray-800 dark:text-white"
        />

        <div className="flex gap-3">
          <button
            onClick={bulkApprove}
            className="bg-blue-600 px-5 py-2 text-white rounded-lg hover:bg-blue-700"
          >
            Approve
          </button>

          <button
            onClick={bulkRevoke}
            className="bg-red-600 px-5 py-2 text-white rounded-lg hover:bg-red-700"
          >
            Revoke
          </button>
        </div>
      </div>

      {/* Users Table */}
      <UserTable
        users={filtered}
        selected={selected}
        toggleSelect={toggleSelect}
        toggleSelectAll={toggleSelectAll}
        onApprove={onApprove}
        onRevoke={onRevoke}
        onRoleChange={onRoleChange}
        roles={["ADMIN", "PRINCIPAL", "HOD", "STAFF", "STUDENT"]}
      />

    </AdminLayout>
    
  );
};

export default AdminDashboard;
