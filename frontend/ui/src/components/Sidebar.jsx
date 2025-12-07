// import React, { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Menu, X, ChevronRight, LogOut } from "lucide-react";
// import { menus } from "../config/menus";

// export default function Sidebar({ role }) {
//   const [open, setOpen] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const menuItems = menus[role] || [];

//   const handleLogout = () => {
//     localStorage.clear();
//     setOpen(false);
//     navigate("/login");
//   };

//   return (
//     <>
//       {/* Mobile Toggle */}
//       <button
//         onClick={() => setOpen(true)}
//         className="md:hidden fixed top-4 left-4 z-[100] p-3 
//         bg-gray-100 dark:bg-gray-800 rounded-full shadow-lg"
//       >
//         <Menu size={22} className="text-gray-700 dark:text-gray-200" />
//       </button>

//       {open && (
//         <div
//           className="fixed inset-0 bg-black/50 z-[90] md:hidden"
//           onClick={() => setOpen(false)}
//         ></div>
//       )}

//       {/* SIDEBAR */}
//       <aside
//         className={`
//           fixed top-0 left-0 h-full w-64 z-[100]
//           bg-gradient-to-b from-gray-900 to-gray-800 
//           text-white shadow-xl border-r border-gray-700
//           transform transition-transform duration-300
//           ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
//         `}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between px-5 py-5 border-b border-gray-700">
//           <h1 className="text-xl font-bold tracking-wide">{role} PANEL</h1>

//           <button
//             onClick={() => setOpen(false)}
//             className="md:hidden bg-gray-700 p-1 rounded-full"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* Menu Items */}
//         <nav className="mt-4 space-y-2">
//           {menuItems.map((item) => {
//             const active = location.pathname === item.path;
//             return (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 onClick={() => window.innerWidth < 768 && setOpen(false)}
//                 className={`
//                   flex items-center justify-between px-6 py-3 rounded-lg mx-3
//                   transition-all duration-200 
//                   ${active 
//                     ? "bg-gray-700 text-white shadow-md"
//                     : "text-gray-300 hover:bg-gray-800 hover:text-white"}
//                 `}
//               >
//                 <span className="font-medium">{item.name}</span>
//                 <ChevronRight size={18} className={`${active ? "opacity-100" : "opacity-40"}`} />
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Logout Button */}
//         <div className="absolute bottom-20 left-0 w-full px-5">
//           <button
//             onClick={handleLogout}
//             className="w-full flex items-center justify-center gap-2 
//             bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition"
//           >
//             <LogOut size={18} />
//             Logout
//           </button>
//         </div>

//         {/* Footer */}
//         <div className="absolute bottom-5 left-0 w-full px-5 text-center text-gray-400 text-sm">
//           © {new Date().getFullYear()} Edueco
//         </div>
//       </aside>
//     </>
//   );
// }

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronRight, LogOut, KeyRound } from "lucide-react";
import { menus } from "../config/menus";

export default function Sidebar({ role }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // FETCH USER DETAILS FROM LOCAL STORAGE
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const forcePasswordChange = user.forcePasswordChange || false;

  // If forced change is true → show ONLY this menu
  const menuItems = forcePasswordChange
    ? [
        {
          name: "Update Your Password",
          // path: "/force-password-change",
          icon: <KeyRound size={18} />,
        },
      ]
    : menus[role] || [];

  const handleLogout = () => {
    localStorage.clear();
    setOpen(false);
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-[100] p-3 
        bg-gray-100 dark:bg-gray-800 rounded-full shadow-lg"
      >
        <Menu size={22} className="text-gray-700 dark:text-gray-200" />
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-[90] md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 z-[100]
          bg-gradient-to-b from-gray-900 to-gray-800 
          text-white shadow-xl border-r border-gray-700
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-gray-700">
          <h1 className="text-xl font-bold tracking-wide">
            {forcePasswordChange ? "Update Password" : `${role} PANEL`}
          </h1>

          <button
            onClick={() => setOpen(false)}
            className="md:hidden bg-gray-700 p-1 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="mt-4 space-y-2">
          {menuItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => window.innerWidth < 768 && setOpen(false)}
                className={`
                  flex items-center justify-between px-6 py-3 rounded-lg mx-3
                  transition-all duration-200 
                  ${
                    active
                      ? "bg-gray-700 text-white shadow-md"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }
                `}
              >
                <span className="font-medium flex items-center gap-2">
                  {item.icon}
                  {item.name}
                </span>
                <ChevronRight
                  size={18}
                  className={`${active ? "opacity-100" : "opacity-40"}`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-20 left-0 w-full px-5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 
            bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Footer */}
        <div className="absolute bottom-5 left-0 w-full px-5 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Edueco
        </div>
      </aside>
    </>
  );
}
