// import React, { useState } from "react";
// import {
//   LayoutDashboard,
//   Users,
//   LogOut,
//   Menu,
//   X
// } from "lucide-react";

// const Sidebar = ({ onLogout }) => {
//   const [open, setOpen] = useState(false);

//   const role = localStorage.getItem("role")

//   console.log("role  :", role)
  
//   const menuItems = [
//     { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin" },
//     { name: "Users", icon: <Users size={20} />, path: "/admin/users" },
//   ];

//   return (
//     <>
//       {/* Mobile toggle button */}
//       <div className="md:hidden p-3 flex justify-between bg-gray-900 text-white">
//         <button onClick={() => setOpen(true)}>
//           <Menu size={28} />
//         </button>

//         <h1 className="text-lg font-semibold">Admin Panel</h1>
//       </div>

//       {/* Sidebar Background (mobile overlay) */}
//       {open && (
//         <div
//           className="fixed inset-0 bg-black/40 z-30 md:hidden"
//           onClick={() => setOpen(false)}
//         ></div>
//       )}

//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-5 z-40 transition-transform md:translate-x-0 
//         ${open ? "translate-x-0" : "-translate-x-full"}`}
//       >
//         {/* Close button for mobile */}
//         <div className="md:hidden flex justify-end mb-4">
//           <button onClick={() => setOpen(false)}>
//             <X size={26} />
//           </button>
//         </div>

//         <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

//         <nav className="space-y-3">
//           {menuItems.map((item) => (
//             <a
//               key={item.name}
//               href={item.path}
//               className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition"
//             >
//               {item.icon}
//               <span>{item.name}</span>
//             </a>
//           ))}
//         </nav>

//         <button
//           onClick={onLogout}
//           className="mt-10 flex items-center gap-3 p-3 rounded-lg bg-red-600 hover:bg-red-700 w-full"
//         >
//           <LogOut size={20} />
//           Logout
//         </button>
//       </div>
//     </>
//   );
// };

// export default Sidebar;


// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Menu, X } from "lucide-react";

// export default function Sidebar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();

//   const menuItems = [
//     { name: "Dashboard", path: "/dashboard" },
//     { name: "Create User", path: "/create" },
//     { name: "Admin Panel", path: "/admin" },
//   ];

//   return (
//     <>
//       {/* Mobile Toggle Button */}
//       <button
//         className="md:hidden p-3 text-gray-700"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         {isOpen ? <X size={26} /> : <Menu size={26} />}
//       </button>

//       {/* Sidebar */}
//       <aside
//         className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 
//                     transform transition-transform duration-300 z-50
//                     ${isOpen ? "translate-x-0" : "-translate-x-full"} 
//                     md:translate-x-0`}
//       >
//         <div className="p-4 text-lg font-semibold border-b border-gray-700">
//           My App
//         </div>

//         <nav className="mt-4">
//           {menuItems.map((item) => (
//             <Link
//               key={item.path}
//               to={item.path}
//               onClick={() => {
//                 // Only close sidebar on mobile screens
//                 if (window.innerWidth < 768) {
//                   setIsOpen(false);
//                 }
//               }}
//               className={`block px-6 py-3 hover:bg-gray-700 transition
//                 ${location.pathname === item.path ? "bg-gray-700" : ""}`}
//             >
//               {item.name}
//             </Link>
//           ))}
//         </nav>
//       </aside>
//     </>
//   );
// }


import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Create User", path: "/create" },
    { name: "Admin Panel", path: "/admin" },
  ];

  return (
    <>
      {/* MOBILE OPEN BUTTON (visible only on mobile) */}
      <button
        className="md:hidden p-3 text-gray-700 dark:text-gray-300 fixed top-4 left-4 z-50"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white shadow-lg z-40
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static
      `}
      >
        <div className="p-4 text-lg font-semibold border-b border-gray-700">
          Edueco Menu
        </div>

        <nav className="mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-6 py-3 transition 
                ${location.pathname === item.path ? "bg-gray-700" : "hover:bg-gray-700"}
              `}
              onClick={() => {
                if (window.innerWidth < 768) setOpen(false);
              }}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
