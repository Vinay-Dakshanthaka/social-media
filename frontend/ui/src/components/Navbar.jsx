// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Menu, X, Sun, Moon, LogOut } from "lucide-react";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const [theme, setTheme] = useState("dark"); 

//   // Load user + theme at start
//   useEffect(() => {
//     const usr = localStorage.getItem("user");
//     setUser(usr ? JSON.parse(usr) : null);

//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme === "light") {
//       document.documentElement.classList.remove("dark");
//       setTheme("light");
//     } else {
//       document.documentElement.classList.add("dark");
//       setTheme("dark");
//     }
//   }, []);

//   // THEME TOGGLE FUNCTION 
//   const toggleTheme = () => {
//     document.documentElement.classList.toggle("dark");

//     const newTheme = document.documentElement.classList.contains("dark")
//       ? "dark"
//       : "light";

//     setTheme(newTheme);
//     localStorage.setItem("theme", newTheme);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-white dark:bg-gray-900 border-b dark:border-gray-800">
//       <div className="px-4 md:px-8 h-16 flex items-center justify-between">
        
//         {/* LOGO */}
//         <Link
//           to="/dashboard"
//           className="text-xl font-bold text-gray-900 dark:text-white"
//         >
//           Edueco
//         </Link>

//         {/* DESKTOP MENU  */}
//         <div className="hidden md:flex items-center space-x-6">

//           <Link className="text-gray-700 dark:text-gray-300" to="/dashboard">
//             Dashboard
//           </Link>

//           {/* Admin only menu */}
//           {user?.role === "ADMIN" && (
//             <Link className="text-gray-700 dark:text-gray-300" to="/create">
//               Create User
//             </Link>
//           )}

//           {/* THEME BUTTON */}
//           <button
//             onClick={toggleTheme}
//             className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
//           >
//             {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
//           </button>

//           {/* LOGOUT */}
//           <button
//             onClick={handleLogout}
//             className="flex items-center space-x-1 px-3 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
//           >
//             <LogOut size={16} />
//             <span>Logout</span>
//           </button>
//         </div>

//         {/* MOBILE MENU BUTTON */}
//         <button
//           onClick={() => setOpen(!open)}
//           className="md:hidden p-2 text-gray-700 dark:text-gray-300"
//         >
//           {open ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {/* MOBILE MENU DROPDOWN */}
//       {open && (
//         <div className="md:hidden px-4 py-3 space-y-3 bg-white dark:bg-gray-900 border-t dark:border-gray-800">

//           <Link className="block text-gray-700 dark:text-gray-300" to="/dashboard" onClick={() => setOpen(false)}>
//             Dashboard
//           </Link>

//           {user?.role === "ADMIN" && (
//             <Link className="block text-gray-700 dark:text-gray-300" to="/create" onClick={() => setOpen(false)}>
//               Create User
//             </Link>
//           )}

//           {/* Theme Toggle on Mobile */}
//           <button
//             onClick={toggleTheme}
//             className="w-full flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-100"
//           >
//             {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
//             <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
//           </button>

//           {/* Logout */}
//           <button
//             onClick={handleLogout}
//             className="w-full flex items-center space-x-2 px-3 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
//           >
//             <LogOut size={16} />
//             <span>Logout</span>
//           </button>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sun, Moon, LogOut } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const usr = localStorage.getItem("user");
    setUser(usr ? JSON.parse(usr) : null);

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark");
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b dark:border-gray-800 h-16 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">

      {/* LOGO */}
      <Link to="/dashboard" className="text-xl font-bold dark:text-white">
        Edueco
      </Link>

      {/* ACTION BUTTONS */}
      <div className="flex items-center space-x-4">

        {/* Theme */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700"
        >
          <LogOut size={18} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
