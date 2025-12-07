// import React from "react";

// const Dashboard = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//     const role = user.role; 

//   console.log("role  :", role)
//   if (!user) {
//     return (
//       <div className="flex justify-center items-center h-screen text-xl">
//         No user logged in
//       </div>
//     );
//   }

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
//       <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center dark:text-white mb-4">
//           Welcome, {user.firstName} 
//         </h2>

//         <div className="space-y-3 text-gray-700 dark:text-gray-300">
//           <p>
//             <strong>First Name:</strong> {user.firstName}
//           </p>
//           <p>
//             <strong>Email:</strong> {user.email}
//           </p>
//           <p>
//             <strong>Role:</strong> {user.role}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// import React from "react";

// const Dashboard = () => {
//   const user = JSON.parse(localStorage.getItem("user"));

//   if (!user) {
//     return (
//       <div className="flex justify-center items-center h-screen text-xl">
//         No user logged in
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col justify-start items-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-10">

//       {/* 🔴 Forced Password Change Warning */}
//       {user.forcePasswordChange && (
//         <div className="bg-red-600 text-white p-3 rounded-md text-center font-semibold mb-6 w-full max-w-md shadow">
//           ⚠️ Important: Please update your password to access the application.
//         </div>
//       )}

//       {/* Dashboard Card */}
//       <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center dark:text-white mb-4">
//           Welcome, {user.firstName}
//         </h2>

//         <div className="space-y-3 text-gray-700 dark:text-gray-300">
//           <p>
//             <strong>First Name:</strong> {user.firstName}
//           </p>
//           <p>
//             <strong>Email:</strong> {user.email}
//           </p>
//           <p>
//             <strong>Role:</strong> {user.role}
//           </p>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default Dashboard;


import React from "react";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        No user logged in
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start items-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4 py-10">
      {user.forcePasswordChange && (
        <div className="bg-red-600 text-white p-3 rounded-md text-center font-semibold mb-6 w-full max-w-md shadow">
          ⚠️ Important: Please update your password to access the application.
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center dark:text-white mb-4">
          Welcome, {user.firstName}
        </h2>

        <div className="space-y-3 text-gray-700 dark:text-gray-300">
          <p>
            <strong>First Name:</strong> {user.firstName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
