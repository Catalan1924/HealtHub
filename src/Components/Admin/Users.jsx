import { useState, useEffect } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("all");
  const [visiblePasswords, setVisiblePasswords] = useState({});

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(savedUsers);
  }, []);

  const handlePasswordChange = (index, newPassword) => {
    const updated = [...users];
    updated[index].password = newPassword;
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
  };

  const togglePasswordVisibility = (index) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleDeleteUser = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    const updated = [...users];
    updated.splice(index, 1);
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
  };

  const filteredUsers =
    filterRole === "all"
      ? users
      : users.filter((user) => user.role === filterRole);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-4 text-blue-700">User Accounts</h2>

      <div className="flex gap-4 mb-4 items-center">
        <label className="font-medium">Filter by Role:</label>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="border px-3 py-2 rounded-md"
        >
          <option value="all">All</option>
          <option value="patient">Patients</option>
          <option value="doctor">Doctors</option>
        </select>
      </div>

      <div className="overflow-auto">
        <table className="w-full border border-gray-300 text-sm rounded-xl">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-2">Username</th>
              <th className="p-2">Role</th>
              <th className="p-2">Details</th>
              <th className="p-2">Password</th>
              <th className="p-2">Change Password</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index} className="border-t text-center">
                <td className="p-2">{user.username}</td>
                <td className="p-2 capitalize">{user.role}</td>
                <td className="p-2 text-left">
                  {user.role === "patient" ? (
                    <div className="text-xs leading-5 text-left">
                      <p><strong>Service:</strong> {user.service}</p>
                    </div>
                  ) : (
                    <div className="text-xs leading-5 text-left">
                      <p><strong>Specialization:</strong> {user.specialization}</p>
                    </div>
                  )}
                </td>
                <td className="p-2">
                  {visiblePasswords[index] ? (
                    <span>{user.password}</span>
                  ) : (
                    <span>••••••••</span>
                  )}
                  <button
                    onClick={() => togglePasswordVisibility(index)}
                    className="ml-2 text-blue-600 text-xs underline"
                  >
                    {visiblePasswords[index] ? "Hide" : "Show"}
                  </button>
                </td>
                <td className="p-2">
                  <input
                    type="text"
                    placeholder="New Password"
                    onChange={(e) =>
                      handlePasswordChange(index, e.target.value)
                    }
                    className="border px-2 py-1 rounded w-full"
                  />
                </td>
                <td className="p-2">
                  <button
                    onClick={() => handleDeleteUser(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No users found for this role.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;