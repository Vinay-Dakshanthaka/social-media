import { Routes, Route, useLocation} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateUser from "./pages/CreateUser";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AdminLayout from "./layout/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
// import { Sidebar } from "lucide-react";

function App() {
  const location = useLocation();
  
  const isLoggedIn = !!localStorage.getItem("token");

  // Hide navbar on login & signup pages
  // const hideNavbarRoutes = ["/login", "/register"];
  // const hideNavbar = hideNavbarRoutes.includes(location.pathname);
  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname.startsWith("/admin");
  return (
    <>
    {isLoggedIn && !hideNavbar && <Navbar />}
    
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={ <AdminDashboard /> } />
        {/* <Route index element={<AdminDashboard />} /> </Route> */}
          {/* <Route path="*" element={<Navigate to="/login" />} /> */}
      </Routes>
    <ToastContainer/>
    </>
  );
}
    
export default App;
