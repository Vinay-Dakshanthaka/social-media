import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function MainLayout({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "STUDENT";

  return (
    <div className="flex w-full h-screen overflow-hidden">

      {/* FIXED SIDEBAR */}
      <div className="fixed left-0 top-0 h-full w-64 z-40">
        <Sidebar role={role} />
      </div>

      {/* MAIN CONTAINER */}
      <div className="flex flex-col flex-1 ml-64 h-full overflow-hidden">
        
        {/* FIXED NAVBAR */}
        <div className="fixed top-0 left-64 right-0 z-30">
          <Navbar />
        </div>

        {/* SCROLLABLE PAGE CONTENT */}
        <div className="mt-16 p-6 h-[calc(100vh-4rem)] overflow-y-auto bg-gray-100 dark:bg-gray-900">
          {children}
        </div>

      </div>
    </div>
  );
}


// import React from "react";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import { Outlet } from "react-router-dom";

// export default function MainLayout() {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const role = user?.role || "STUDENT";

//   return (
//     <div className="flex w-full h-screen overflow-hidden">

//       {/* FIXED SIDEBAR */}
//       <div className="fixed left-0 top-0 h-full w-64 z-40">
//         <Sidebar role={role} />
//       </div>

//       {/* MAIN CONTAINER */}
//       <div className="flex flex-col flex-1 ml-64 h-full overflow-hidden">
        
//         {/* FIXED NAVBAR */}
//         <div className="fixed top-0 left-64 right-0 z-30">
//           <Navbar />
//         </div>

//         {/* SCROLLABLE PAGE CONTENT */}
//         <div className="mt-16 p-6 h-[calc(100vh-4rem)] overflow-y-auto bg-gray-100 dark:bg-gray-900">
//           <Outlet />   
//         </div>

//       </div>
//     </div>
//   );
// }
