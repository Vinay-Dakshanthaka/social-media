import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);

      toast.success("Account created successfully ");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1200);
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed!");
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 p-8 w-full max-w-md rounded-2xl shadow-xl transition-all">
        <h2 className="text-2xl font-bold text-center dark:text-white">
          Create Account 
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">

          {/* First Name */}
          <div>
            <label className="dark:text-gray-300 font-semibold">First Name</label>
            <input
              type="text"
              name="firstName"
              className="mt-1 w-full px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
              placeholder="Enter first name"
              required
              onChange={handleChange}
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="dark:text-gray-300 font-semibold">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="mt-1 w-full px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
              placeholder="Enter last name"
              required
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div>
            <label className="dark:text-gray-300 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              className="mt-1 w-full px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
              placeholder="Enter email"
              required
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="dark:text-gray-300 font-semibold">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="mt-1 w-full px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
              placeholder="Enter password"
              required
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute right-3 top-[45px] text-gray-500 dark:text-gray-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            className="w-full py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 active:scale-95 transition text-center shadow-md"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600 dark:text-gray-300 text-sm">
          Already have an account?{" "}
          <a className="text-blue-600 dark:text-blue-400 font-medium" href="/login">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
