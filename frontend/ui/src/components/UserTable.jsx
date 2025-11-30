import React from "react";

const UserTable = ({
  users,
  selected,
  toggleSelect,
  toggleSelectAll,
  onApprove,
  onRevoke,
  onRoleChange,
  roles,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md mt-6 overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700 text-left">
            <th className="p-3">
              <input
                type="checkbox"
                checked={selected.size === users.length}
                onChange={toggleSelectAll}
              />
            </th>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Status</th>
            <th className="p-3">Assign Role</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td className="p-4 text-gray-500 dark:text-gray-300" colSpan={7}>
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr
                key={user.id}
                className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition"
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selected.has(user.id)}
                    onChange={() => toggleSelect(user.id)}
                  />
                </td>

                <td className="p-3">
                  {user.firstName} {user.lastName}
                </td>

                <td className="p-3">{user.email}</td>

                <td className="p-3">{user.role}</td>

                <td className="p-3">
                  {user.isApproved ? (
                    <span className="text-green-600 font-semibold">Approved</span>
                  ) : (
                    <span className="text-yellow-600 font-semibold">Pending</span>
                  )}
                </td>

                <td className="p-3">
                  <select
                    className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white px-3 py-1 rounded-lg"
                    value={user.role}
                    onChange={(e) => onRoleChange(user.id, e.target.value)}
                  >
                    {roles.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </td>

                {/* ACTION BUTTONS */}
                <td className="p-3 flex gap-2">
                  {!user.isApproved ? (
                    <button
                      onClick={() => onApprove(user.id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Approve
                    </button>
                  ) : (
                    <button
                      onClick={() => onRevoke(user.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Revoke
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
