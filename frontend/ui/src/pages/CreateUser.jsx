import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const CreateUser = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Spinner state

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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
    setLoading(true); // Start spinner

    try {
      await axios.post(
        "http://localhost:5000/api/users/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("User created successfully, Mail sent");
      navigate("/admin");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create user!");
    }

    setLoading(false); // Stop spinner
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 p-8 w-full max-w-lg rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center dark:text-white">
          Create New User 👤
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">

          {/* First Name */}
          <div>
            <label className="dark:text-gray-300 font-semibold">First Name</label>
            <input
              type="text"
              name="firstName"
              required
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter first name"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="dark:text-gray-300 font-semibold">Last Name</label>
            <input
              type="text"
              name="lastName"
              required
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter last name"
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
          <div className="relative">
            <label className="dark:text-gray-300 font-semibold">Password</label>

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 pr-12 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter password"
            />

            {/* EYE ICON */}
            <button
              type="button"
              className="absolute right-4 top-[52px] transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* SUBMIT BUTTON WITH SPINNER */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 font-semibold rounded-xl transition shadow-md
              ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
          >
            {loading ? (
              <div className="flex justify-center items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Creating...
              </div>
            ) : (
              "Create User"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
