import React, { useState } from "react";
import { login } from "../api/authService";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await login({ email, password });

      // Save token & user in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login Successful");

      const role = res.data.user.role;

      // Redirect based on role
      if (role === "ADMIN") {
        setTimeout(() => {
          window.location.href = "/admin"; // Admin dashboard
        }, 1200);
      } else {
        setTimeout(() => {
          window.location.href = "/dashboard"; // Student/staff dashboard
        }, 1200);
      }

    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid email or password");
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center dark:text-white">
          Login
        </h2>

        <form onSubmit={handleLogin} className="mt-6 space-y-5">
          {/* Email Field */}
          <div>
            <label className="text-gray-700 dark:text-gray-200 font-medium">
              Email
            </label>
            <input
              type="email"
              className="mt-1 px-4 py-2 w-full border rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-100 dark:bg-gray-700 dark:text-white outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <label className="text-gray-700 dark:text-gray-200 font-medium">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="mt-1 px-4 py-2 w-full border rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-100 dark:bg-gray-700 dark:text-white outline-none transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-500 dark:text-gray-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 transition text-white shadow-md"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center mt-4 dark:text-gray-300">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 font-medium">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
