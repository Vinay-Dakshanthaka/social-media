// import { Routes, Route, useLocation} from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import CreateUser from "./pages/CreateUser";
// import Navbar from "./components/Navbar";
// import Dashboard from "./pages/Dashboard";
// // import AdminLayout from "./layout/AdminLayout";
// import AdminDashboard from "./pages/AdminDashboard";
// // import { Sidebar } from "lucide-react";
// import MainLayout from "./layout/MainLayout";


// function App() {
//   const location = useLocation();
  
//   const isLoggedIn = !!localStorage.getItem("token");

//   // Hide navbar on login & signup pages
//   // const hideNavbarRoutes = ["/login", "/register"];
//   // const hideNavbar = hideNavbarRoutes.includes(location.pathname);
//   const hideNavbar =
//     location.pathname === "/login" ||
//     location.pathname === "/register" ||
//     location.pathname.startsWith("/admin");
//   return (
//     <>
//     {isLoggedIn && !hideNavbar && <Navbar />}
//     <MainLayout>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Signup />} />
//         <Route path="/create" element={<CreateUser />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/admin" element={ <AdminDashboard /> } />
//         {/* <Route index element={<AdminDashboard />} /> </Route> */}
//           {/* <Route path="*" element={<Navigate to="/login" />} /> */}
//       </Routes>
//       </MainLayout>
//     <ToastContainer/>
//     </>
//   );
// }
    
// export default App;

import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CreateUser from "./pages/CreateUser";
import AdminDashboard from "./pages/AdminDashboard";
import MainLayout from "./layout/MainLayout";
import Albums from "./pages/Albums";
import GroupList from "./pages/groups/GroupList";
import CreateGroup from "./pages/groups/CreateGroup";
import GroupDetails from "./pages/groups/GroupDetails";

// Check if logged in
const isAuthenticated = () => !!localStorage.getItem("token");

export default function App() {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      {!isAuthPage && isAuthenticated() ? (
        <MainLayout>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create" element={<CreateUser />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
            <Route path="/albums" element={<Albums />} />
            <Route path="/groups" element={<GroupList />} />
            <Route path="/groups/new" element={<CreateGroup />} />
            <Route path="/groups/:id" element={<GroupDetails />} />
          </Routes>
        </MainLayout>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}

      <ToastContainer />
    </>
  );
}
