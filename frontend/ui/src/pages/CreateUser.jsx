import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // Role-based access protection
  useEffect(() => {
    if (!user || !["ADMIN", "HOD", "PRINCIPAL"].includes(user.role)) {
      toast.error("Access denied! Only admins can create users.");
      navigate("/dashboard");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/users",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("User created successfully 🎉");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create user!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 p-8 w-full max-w-lg rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center dark:text-white">
          Create New User 👤
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">

          {/* Name */}
          <div>
            <label className="dark:text-gray-300 font-semibold">Full Name</label>
            <input
              type="text"
              name="name"
              required
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter full name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="dark:text-gray-300 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              required
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter email"
            />
          </div>

          {/* Role Dropdown */}
          <div>
            <label className="dark:text-gray-300 font-semibold">Role</label>
            <select
              name="role"
              required
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">Select a role</option>
              <option value="ADMIN">Admin</option>
              <option value="HOD">Head of Department</option>
              <option value="PRINCIPAL">Principal</option>
              <option value="STAFF">Staff</option>
              <option value="STUDENT">Student</option>
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="dark:text-gray-300 font-semibold">Password</label>
            <input
              type="password"
              name="password"
              required
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:scale-95 transition shadow-md"
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
