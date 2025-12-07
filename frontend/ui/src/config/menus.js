export const menus = {
  ADMIN: [
    { name: "Dashboard", path: "dashboard" },
    { name: "Manage Students", path: "admin" },
    { name: "Create User", path: "create" },
    { name: "Reports", path: "reports" },
    { name: "Albums", path: "/albums"},
    { name: "Groups", path: "/groups"},
  ],

  PRINCIPAL: [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Departments", path: "/departments" },
    { name: "Staff Reports", path: "/staff-reports" },
  ],

  HOD: [
    { name: "Dashboard", path: "/dashboard" },
    { name: "My Staff", path: "/my-staff" },
    { name: "Students", path: "/students" },
  ],

  STAFF: [
    { name: "Dashboard", path: "/dashboard" },
    { name: "My Classes", path: "/classes" },
    { name: "Attendance", path: "/attendance" },
  ],

  STUDENT: [
    { name: "Dashboard", path: "/dashboard" },
    { name: "My Courses", path: "/courses" },
    { name: "Results", path: "/results" },
  ],
};
