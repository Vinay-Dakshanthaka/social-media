// import React, { useState } from "react";
// import { Outlet, Link } from "react-router-dom";
// import { Menu, X, LogOut } from "lucide-react";

// const AdminLayout = ({ children }) => {
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const logout = () => {
//     localStorage.clear();
//     window.location.href = "/login";
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">

//       {/* --------------------------- */}
//       {/* MOBILE TOP BAR */}
//       {/* --------------------------- */}
//       <div className="md:hidden w-full bg-white dark:bg-gray-800 p-4 shadow flex items-center justify-between">
//         <h1 className="text-xl font-bold dark:text-white">Admin Panel</h1>

//         <button
//           onClick={() => setMobileOpen(true)}
//           className="text-gray-700 dark:text-gray-200"
//         >
//           <Menu size={30} />
//         </button>
//       </div>

//       {/* --------------------------- */}
//       {/* SIDEBAR */}
//       {/* --------------------------- */}
//       {/* Desktop Sidebar */}
//       <div
//         className="
//           hidden
//           md:flex
//           flex-col
//           w-64
//           bg-white dark:bg-gray-800
//           shadow-lg
//         "
//       >
//         {/* Sidebar Header */}
//         <div className="p-4 text-xl font-bold dark:text-white border-b dark:border-gray-700">
//           Admin Panel
//         </div>

//         {/* Menu */}
//         <nav className="flex-1 mt-4 px-3 space-y-2">
//           <Link
//             to="/admin"
//             className="block px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white text-gray-700 dark:text-gray-300"
//           >
//             Dashboard
//           </Link>
//         </nav>

//         {/* Logout */}
//         <div className="p-4 border-t dark:border-gray-700">
//           <button
//             onClick={logout}
//             className="w-full flex items-center gap-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
//           >
//             <LogOut size={18} /> Logout
//           </button>
//         </div>
//       </div>

//       {/* --------------------------- */}
//       {/* MOBILE SIDEBAR OVERLAY */}
//       {/* --------------------------- */}
//       {mobileOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-40 md:hidden"
//           onClick={() => setMobileOpen(false)}
//         ></div>
//       )}

//       {/* --------------------------- */}
//       {/* MOBILE SIDEBAR (SLIDE-IN) */}
//       {/* --------------------------- */}
//       <div
//         className={`
//           fixed top-0 left-0 h-full w-64 z-50 md:hidden
//           bg-white dark:bg-gray-800 shadow-xl transform
//           transition-transform duration-300
//           ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
//         `}
//       >
//         <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
//           <h2 className="text-lg font-bold dark:text-white">Admin Panel</h2>

//           <button
//             onClick={() => setMobileOpen(false)}
//             className="text-gray-700 dark:text-gray-200"
//           >
//             <X size={26} />
//           </button>
//         </div>

//         <nav className="flex-1 mt-4 px-3 space-y-2">
//           <Link
//             to="/admin"
//             onClick={() => setMobileOpen(false)}
//             className="block px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white text-gray-700 dark:text-gray-300"
//           >
//             Dashboard
//           </Link>
//         </nav>

//         <div className="p-4 border-t dark:border-gray-700">
//           <button
//             onClick={logout}
//             className="w-full flex items-center gap-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
//           >
//             <LogOut size={18} /> Logout
//           </button>
//         </div>
//       </div>

//       {/* --------------------------- */}
//       {/* MAIN CONTENT */}
//       {/* --------------------------- */}
//       <div className="flex-1 p-6 overflow-auto">
//         {children}
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;



// import React, { useState } from "react";
// import { Outlet, Link, useLocation } from "react-router-dom";
// import { Menu, X, LogOut } from "lucide-react";

// const AdminLayout = () => {
//   const location = useLocation();
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const logout = () => {
//     localStorage.clear();
//     window.location.href = "/login";
//   };

//   // -------------------------
//   // Sidebar Menu
//   // -------------------------
//   const menuItems = [
//     { name: "Dashboard", path: "/admin" },
//     { name: "Create User", path: "/create" },
//     { name: "Users List", path: "/admin/users" },
//     { name: "Settings", path: "/admin/settings" },
//   ];

//   // Active Link Helper
//   const getLinkClasses = (path) =>
//     `block px-4 py-2 rounded-lg transition ${
//       location.pathname === path
//         ? "bg-blue-600 text-white"
//         : "text-gray-700 dark:text-gray-300 hover:bg-blue-600 hover:text-white"
//     }`;

//   return (
//     <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">

//       {/* --------------------------- */}
//       {/* MOBILE TOP BAR */}
//       {/* --------------------------- */}
//       <div className="md:hidden w-full bg-white dark:bg-gray-800 p-4 shadow flex items-center justify-between">
//         <h1 className="text-xl font-bold dark:text-white">Admin Panel</h1>

//         <button
//           onClick={() => setMobileOpen(true)}
//           className="text-gray-700 dark:text-gray-200"
//         >
//           <Menu size={30} />
//         </button>
//       </div>

//       {/* --------------------------- */}
//       {/* SIDEBAR (DESKTOP) */}
//       {/* --------------------------- */}
//       <div
//         className="
//           hidden md:flex flex-col w-64
//           bg-white dark:bg-gray-800 shadow-lg
//         "
//       >
//         <div className="p-4 text-xl font-bold dark:text-white border-b dark:border-gray-700">
//           Admin Panel
//         </div>

//         {/* Menu */}
//         <nav className="flex-1 mt-4 px-3 space-y-2">
//           {menuItems.map((item) => (
//             <Link key={item.path} to={item.path} className={getLinkClasses(item.path)}>
//               {item.name}
//             </Link>
//           ))}
//         </nav>

//         {/* Logout */}
//         <div className="p-4 border-t dark:border-gray-700">
//           <button
//             onClick={logout}
//             className="w-full flex items-center gap-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
//           >
//             <LogOut size={18} /> Logout
//           </button>
//         </div>
//       </div>

//       {/* --------------------------- */}
//       {/* MOBILE SIDEBAR OVERLAY */}
//       {/* --------------------------- */}
//       {mobileOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-40 md:hidden"
//           onClick={() => setMobileOpen(false)}
//         ></div>
//       )}

//       {/* --------------------------- */}
//       {/* MOBILE SIDEBAR (SLIDE-IN) */}
//       {/* --------------------------- */}
//       <div
//         className={`fixed top-0 left-0 h-full w-64 z-50 md:hidden
//           bg-white dark:bg-gray-800 shadow-xl transform
//           transition-transform duration-300
//           ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
//         `}
//       >
//         <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
//           <h2 className="text-lg font-bold dark:text-white">Admin Panel</h2>

//           <button
//             onClick={() => setMobileOpen(false)}
//             className="text-gray-700 dark:text-gray-200"
//           >
//             <X size={26} />
//           </button>
//         </div>

//         <nav className="flex-1 mt-4 px-3 space-y-2">
//           {menuItems.map((item) => (
//             <Link
//               key={item.path}
//               to={item.path}
//               className={getLinkClasses(item.path)}
//               onClick={() => setMobileOpen(false)}
//             >
//               {item.name}
//             </Link>
//           ))}
//         </nav>

//         <div className="p-4 border-t dark:border-gray-700">
//           <button
//             onClick={logout}
//             className="w-full flex items-center gap-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
//           >
//             <LogOut size={18} /> Logout
//           </button>
//         </div>
//       </div>

//       {/* --------------------------- */}
//       {/* MAIN CONTENT */}
//       {/* --------------------------- */}
//       <div className="flex-1 p-6 overflow-auto">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;


import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";

const AdminLayout = ({children}) => {
  const location = useLocation();

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const menuItems = [
    { name: "Dashboard", path: "/admin" },
    { name: "Create User", path: "/create" },
    { name: "Users List", path: "/admin/users" },
    { name: "Settings", path: "/admin/settings" },
  ];

  const getLinkClasses = (path) =>
    `block px-4 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-700 dark:text-gray-300 hover:bg-blue-600 hover:text-white"
    }`;

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">

      {/* DESKTOP SIDEBAR ONLY */}
      <aside className="
        flex flex-col w-64 
        bg-white dark:bg-gray-800 shadow-lg z-30
      ">
        <div className="p-4 text-xl font-bold dark:text-white border-b dark:border-gray-700">
          Admin Panel
        </div>

        <nav className="flex-1 mt-4 px-3 space-y-2">
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path} className={getLinkClasses(item.path)}>
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t dark:border-gray-700">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">
        {/* <Outlet /> */} {children}
      </main>

    </div>
  );
};

export default AdminLayout;
