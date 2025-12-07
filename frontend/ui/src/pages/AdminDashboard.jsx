import React, { useEffect, useState } from "react";
import UserTable from "../components/UserTable";
import {
  getUsers,
  approveUser,
  revokeUser,
  updateRole,
} from "../api/adminService";
import { toast } from "react-toastify";

const roles = ["ADMIN", "PRINCIPAL", "HOD", "STAFF", "STUDENT"];

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [search, setSearch] = useState("");

  const [loadingApprove, setLoadingApprove] = useState(null);
  const [loadingRevoke, setLoadingRevoke] = useState(null);

  const [bulkLoadingApprove, setBulkLoadingApprove] = useState(false);
  const [bulkLoadingRevoke, setBulkLoadingRevoke] = useState(false);

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

  // SINGLE APPROVE
  const onApprove = async (id) => {
    setLoadingApprove(id);
    await approveUser(id);
    toast.success("User approved");
    setLoadingApprove(null);
    loadUsers();
  };

  // SINGLE REVOKE
  const onRevoke = async (id) => {
    setLoadingRevoke(id);
    await revokeUser(id);
    toast.success("User revoked");
    setLoadingRevoke(null);
    loadUsers();
  };

  // BULK APPROVE
  const bulkApprove = async () => {
    if (selected.size === 0) return toast.warning("No users selected");

    setBulkLoadingApprove(true);
    for (let id of selected) await approveUser(id);
    setBulkLoadingApprove(false);

    toast.success("Approved selected users");
    loadUsers();
  };

  // BULK REVOKE
  const bulkRevoke = async () => {
    if (selected.size === 0) return toast.warning("No users selected");

    setBulkLoadingRevoke(true);
    for (let id of selected) await revokeUser(id);
    setBulkLoadingRevoke(false);

    toast.success("Revoked selected users");
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
    <>
      <h1 className="text-3xl font-bold dark:text-white mb-6">MANAGE STUDENTS</h1>

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
            disabled={bulkLoadingApprove}
            className={`px-5 py-2 rounded-lg text-white ${
              bulkLoadingApprove ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {bulkLoadingApprove ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                Approving...
              </span>
            ) : (
              "Approve"
            )}
          </button>

          <button
            onClick={bulkRevoke}
            disabled={bulkLoadingRevoke}
            className={`px-5 py-2 rounded-lg text-white ${
              bulkLoadingRevoke ? "bg-red-400" : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {bulkLoadingRevoke ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                Revoking...
              </span>
            ) : (
              "Revoke"
            )}
          </button>
        </div>
      </div>

      <UserTable
        users={filtered}
        selected={selected}
        toggleSelect={toggleSelect}
        toggleSelectAll={toggleSelectAll}
        onApprove={onApprove}
        onRevoke={onRevoke}
        onRoleChange={onRoleChange}
        roles={roles}
        loadingApprove={loadingApprove}
        loadingRevoke={loadingRevoke}
      />
    </>
  );
};

export default AdminDashboard;
