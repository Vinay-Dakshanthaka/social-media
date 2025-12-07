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

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Sun, Moon, LogOut } from "lucide-react";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [theme, setTheme] = useState("dark");

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

//   const toggleTheme = () => {
//     const newTheme = theme === "dark" ? "light" : "dark";
//     setTheme(newTheme);
//     localStorage.setItem("theme", newTheme);
//     document.documentElement.classList.toggle("dark");
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-white dark:bg-gray-900 border-b dark:border-gray-800 h-16 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">

//       {/* LOGO */}
//       <Link to="/dashboard" className="text-xl font-bold dark:text-white">
//         Edueco
//       </Link>

//       {/* ACTION BUTTONS */}
//       <div className="flex items-center space-x-4">

//         {/* Theme */}
//         <button
//           onClick={toggleTheme}
//           className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
//         >
//           {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
//         </button>

//         {/* Logout */}
//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-2 bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700"
//         >
//           <LogOut size={18} />
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   Sun,
//   Moon,
//   LogOut,
//   User,
//   Settings,
//   KeyRound,
//   ChevronDown,
// } from "lucide-react";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [theme, setTheme] = useState("dark");
//   const [menuOpen, setMenuOpen] = useState(false);
//   // const [showPasswordPopup, setShowPasswordPopup] = useState(false);


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

//   const toggleTheme = () => {
//     const newTheme = theme === "dark" ? "light" : "dark";
//     setTheme(newTheme);
//     localStorage.setItem("theme", newTheme);
//     document.documentElement.classList.toggle("dark");
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <>
//       <nav className="bg-white dark:bg-gray-900 border-b dark:border-gray-800 h-16 flex items-center justify-end px-4 md:px-8 sticky top-0 z-40">

//         {/* Right Actions */}
//         <div className="flex items-center space-x-4">

//           {/* Theme Toggle */}
//           <button
//             onClick={toggleTheme}
//             className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
//           >
//             {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
//           </button>

//           {/* Profile Menu */}
//           <div className="relative">
//             <button
//               onClick={() => setMenuOpen(!menuOpen)}
//               className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
//             >
//               <div className="bg-gray-300 dark:bg-gray-700 p-2 rounded-full">
//                 <User size={18} className="text-gray-900 dark:text-white" />
//               </div>
//               <ChevronDown size={16} className="text-gray-700 dark:text-gray-300" />
//             </button>

//             {/* Dropdown */}
//             {menuOpen && (
//               <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-lg border dark:border-gray-700 p-4 z-50">

//                 {/* Profile Header */}
//                 <div className="flex items-center gap-3 pb-4 border-b dark:border-gray-700">
//                   <div className="bg-gray-400 dark:bg-gray-600 p-3 rounded-full">
//                     <User size={26} className="text-white" />
//                   </div>
//                   <div>
//                     <p className="text-lg font-semibold dark:text-white">
//                       {user?.firstName} {user?.lastName}
//                     </p>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">
//                       {user?.email}
//                     </p>
//                     <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-1">
//                       Role: {user?.role}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Account */}
//                 <button
//                   onClick={() => navigate("/account")}
//                   className="flex items-center gap-3 w-full mt-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
//                 >
//                   <User size={18} />
//                   Account
//                 </button>

//                 {/* Settings */}
//                 <button
//                   onClick={() => navigate("/settings")}
//                   className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
//                 >
//                   <Settings size={18} />
//                   Settings
//                 </button>

//                 {/* Update Password */}
//                 <button
//                   onClick={() => navigate("/update-password")}
//                   className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
//                 >
//                   <KeyRound size={18} />
//                   Update Password
//                 </button>

//                 {/* Dark / Light Mode (if still needed inside dropdown, remove if unwanted) */}
//                 <button
//                   onClick={toggleTheme}
//                   className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
//                 >
//                   {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
//                   {theme === "dark" ? "Light Mode" : "Dark Mode"}
//                 </button>

//                 {/* Logout */}
//                 <button
//                   onClick={handleLogout}
//                   className="flex items-center gap-3 w-full mt-3 p-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-left"
//                 >
//                   <LogOut size={18} />
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Navbar;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Sun,
//   Moon,
//   LogOut,
//   User,
//   Settings,
//   KeyRound,
//   ChevronDown,
// } from "lucide-react";

// // POPUP IMPORTS (files must be inside components folder)
// import UpdatePasswordPopup from "./UpdatePasswordPopup";
// import AccountPopup from "./AccountPopup";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [theme, setTheme] = useState("dark");
//   const [menuOpen, setMenuOpen] = useState(false);

//   // POPUP STATES
//   const [showPasswordPopup, setShowPasswordPopup] = useState(false);
//   const [showAccountPopup, setShowAccountPopup] = useState(false);

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

//   const toggleTheme = () => {
//     const newTheme = theme === "dark" ? "light" : "dark";
//     setTheme(newTheme);
//     localStorage.setItem("theme", newTheme);
//     document.documentElement.classList.toggle("dark");
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <>
//       <nav className="bg-white dark:bg-gray-900 border-b dark:border-gray-800 h-16 flex items-center justify-end px-4 md:px-8 sticky top-0 z-40">

//         <div className="flex items-center space-x-4">

//           {/* Theme Toggle */}
//           <button
//             onClick={toggleTheme}
//             className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
//           >
//             {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
//           </button>

//           {/* Profile Menu */}
//           <div className="relative">
//             <button
//               onClick={() => setMenuOpen(!menuOpen)}
//               className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
//             >
//               <div className="bg-gray-300 dark:bg-gray-700 p-2 rounded-full">
//                 <User size={18} className="text-gray-900 dark:text-white" />
//               </div>
//               <ChevronDown size={16} className="text-gray-700 dark:text-gray-300" />
//             </button>

//             {/* Dropdown */}
//             {menuOpen && (
//               <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-lg border dark:border-gray-700 p-4 z-50">

//                 {/* Profile Header */}
//                 <div className="flex items-center gap-3 pb-4 border-b dark:border-gray-700">
//                   <div className="bg-gray-400 dark:bg-gray-600 p-3 rounded-full">
//                     <User size={26} className="text-white" />
//                   </div>
//                   <div>
//                     <p className="text-lg font-semibold dark:text-white">
//                       {user?.firstName} {user?.lastName}
//                     </p>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">
//                       {user?.email}
//                     </p>
//                     <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-1">
//                       Role: {user?.role}
//                     </p>
//                   </div>
//                 </div>

//                 {/* OPEN ACCOUNT POPUP */}
//                 <button
//                   onClick={() => { setShowAccountPopup(true); setMenuOpen(false); }}
//                   className="flex items-center gap-3 w-full mt-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
//                 >
//                   <User size={18} />
//                   Account
//                 </button>

//                 {/* SETTINGS PAGE */}
//                 <button
//                   // onClick={() => navigate("/settings")}
//                   className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
//                 >
//                   <Settings size={18} />
//                   Settings
//                 </button>

//                 {/* OPEN UPDATE PASSWORD POPUP */}
//                 <button
//                   onClick={() => { setShowPasswordPopup(true); setMenuOpen(false); }}
//                   className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
//                 >
//                   <KeyRound size={18} />
//                   Update Password
//                 </button>

//                 {/* LOGOUT */}
//                 <button
//                   onClick={handleLogout}
//                   className="flex items-center gap-3 w-full mt-3 p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//                 >
//                   <LogOut size={18} />
//                   Logout
//                 </button>

//               </div>
//             )}
//           </div>
//         </div>
//       </nav>

//       {/* ACCOUNT POPUP */}
//       {showAccountPopup && (
//         <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
//           <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-96 shadow-xl">
//             <h2 className="text-xl font-bold mb-4 dark:text-white">Account</h2>
//             <AccountPopup close={() => setShowAccountPopup(false)} />
//           </div>
//         </div>
//       )}

//       {/* UPDATE PASSWORD POPUP */}
//       {showPasswordPopup && (
//         <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
//           <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-96 shadow-xl">
//             <h2 className="text-xl font-bold mb-4 dark:text-white">Update Password</h2>
//             <UpdatePasswordPopup close={() => setShowPasswordPopup(false)} />
//           </div>
//         </div>
//       )}

//     </>
//   );
// };

// export default Navbar;

// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Sun,
//   Moon,
//   LogOut,
//   User,
//   Settings,
//   KeyRound,
//   ChevronDown,
// } from "lucide-react";

// import UpdatePasswordPopup from "./UpdatePasswordPopup";
// import AccountPopup from "./AccountPopup";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [theme, setTheme] = useState("dark");
//   const [menuOpen, setMenuOpen] = useState(false);

//   const [showPasswordPopup, setShowPasswordPopup] = useState(false);
//   const [showAccountPopup, setShowAccountPopup] = useState(false);

//   const dropdownRef = useRef(null);

//   // LOAD USER + THEME
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

//   // Theme toggle
//   const toggleTheme = () => {
//     const newTheme = theme === "dark" ? "light" : "dark";
//     setTheme(newTheme);
//     localStorage.setItem("theme", newTheme);
//     document.documentElement.classList.toggle("dark");
//   };

//   // CLOSE DROPDOWN when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setMenuOpen(false);
//       }
//     };

//     const handleScroll = () => {
//       setMenuOpen(false); // close dropdown when scrolling
//     };

//     document.addEventListener("click", handleClickOutside);
//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <>
//       <nav className="bg-white dark:bg-gray-900 border-b dark:border-gray-800 h-16 flex items-center justify-end px-4 md:px-8 sticky top-0 z-40">
//         <div className="flex items-center space-x-4">

//           {/* Profile Menu */}
//           <div className="relative" ref={dropdownRef}>
//             <button
//               onClick={() => setMenuOpen(!menuOpen)}
//               className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
//             >
//               <div className="bg-gray-300 dark:bg-gray-700 p-2 rounded-full">
//                 <User size={18} className="text-gray-900 dark:text-white" />
//               </div>
//               <ChevronDown size={16} className="text-gray-700 dark:text-gray-300" />
//             </button>

//             {menuOpen && (
//               <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-lg border dark:border-gray-700 p-4 z-50">

//                 {/* Profile Header */}
//                 <div className="flex items-center gap-3 pb-4 border-b dark:border-gray-700">
//                   <div className="bg-gray-400 dark:bg-gray-600 p-3 rounded-full">
//                     <User size={26} className="text-white" />
//                   </div>
//                   <div>
//                     <p className="text-lg font-semibold dark:text-white">
//                       {user?.firstName} {user?.lastName}
//                     </p>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">
//                       {user?.email}
//                     </p>
//                     <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-1">
//                       Role: {user?.role}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Account */}
//                 <button
//                   onClick={() => { setShowAccountPopup(true); setMenuOpen(false); }}
//                   className="flex items-center gap-3 w-full mt-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
//                 >
//                   <User size={18} />
//                   Account
//                 </button>

//                 {/* Settings Page */}
//                 <button
//                   className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
//                 >
//                   <Settings size={18} />
//                   Settings
//                 </button>

//                 {/* Update Password */}
//                 <button
//                   onClick={() => { setShowPasswordPopup(true); setMenuOpen(false); }}
//                   className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
//                 >
//                   <KeyRound size={18} />
//                   Update Password
//                 </button>

//                 {/* DARK MODE INSIDE DROPDOWN */}
//                 <button
//                   onClick={toggleTheme}
//                   className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
//                 >
//                   {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
//                   {theme === "dark" ? "Light Mode" : "Dark Mode"}
//                 </button>

//                 {/* Logout */}
//                 <button
//                   onClick={handleLogout}
//                   className="flex items-center gap-3 w-full mt-3 p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//                 >
//                   <LogOut size={18} />
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </nav>

//       {/* ACCOUNT POPUP */}
//       {showAccountPopup && (
//         <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
//           <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-96 shadow-xl">
//             <h2 className="text-xl font-bold mb-4 dark:text-white">Account</h2>
//             <AccountPopup close={() => setShowAccountPopup(false)} />
//           </div>
//         </div>
//       )}

//       {/* UPDATE PASSWORD POPUP */}
//       {showPasswordPopup && (
//         <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
//           <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-96 shadow-xl">
//             <h2 className="text-xl font-bold mb-4 dark:text-white">Update Password</h2>
//             <UpdatePasswordPopup close={() => setShowPasswordPopup(false)} />
//           </div>
//         </div>
//       )}

//     </>
//   );
// };

// export default Navbar;


import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sun, Moon, LogOut, User, KeyRound, ChevronDown } from "lucide-react";
import UpdatePasswordPopup from "./UpdatePasswordPopup";

const Navbar = () => {
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);

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

  // close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark");
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const disabled = user?.forcePasswordChange; // true/false

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 border-b dark:border-gray-800 h-16 flex items-center justify-end px-4 md:px-8 sticky top-0 z-40">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div ref={menuRef} className="relative ml-4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <div className="bg-gray-300 dark:bg-gray-700 p-2 rounded-full">
              <User size={18} className="text-gray-900 dark:text-white" />
            </div>
            <ChevronDown size={16} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-lg border dark:border-gray-700 p-4 z-50">
              <div className="flex items-center gap-3 pb-4 border-b dark:border-gray-700">
                <div className="bg-gray-400 dark:bg-gray-600 p-3 rounded-full">
                  <User size={26} className="text-white" />
                </div>
                <div>
                  <p className="text-lg font-semibold dark:text-white">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {user?.email}
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">
                    Role: {user?.role}
                  </p>
                </div>
              </div>

              {/* Example disabled item */}
              <button
                disabled={disabled}
                className={`flex items-center gap-3 w-full mt-3 p-2 rounded-md ${
                  disabled
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <User size={18} />
                Account
              </button>

              {/* Update password always enabled */}
              <button
                onClick={() => {
                  setShowPasswordPopup(true);
                  setMenuOpen(false);
                }}
                className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <KeyRound size={18} />
                Update Password
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full mt-3 p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {showPasswordPopup && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-96 shadow-xl">
            <h2 className="text-xl font-bold mb-4 dark:text-white">
              Update Password
            </h2>
            <UpdatePasswordPopup close={() => setShowPasswordPopup(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
