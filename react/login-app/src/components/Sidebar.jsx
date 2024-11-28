
// import React from 'react';
// import { NavLink } from 'react-router-dom';

// const Sidebar = ({ isOpen, toggleSidebar }) => {
//   return (
//     <>
//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 z-50 bg-blue-800 text-white h-full transition-all ease-in-out duration-300 ${
//           isOpen ? 'w-64' : 'w-20'
//         } lg:w-64`}
//       >
//         {/* Logo / Profile Section */}
//         <div className="flex items-center justify-center mt-8">
//           <img
//             src="/path/to/logo.png"
//             alt="Logo"
//             className="w-12 h-12 rounded-full lg:w-16 lg:h-16"
//           />
//         </div>

//         {/* Navigation Links */}
//         <nav
//           className="flex flex-col items-center mt-8 space-y-6"
//           aria-label="Sidebar Navigation"
//         >
//           <NavLink
//             to="/dashboard"
//             className={({ isActive }) =>
//               isActive
//                 ? 'text-lg font-bold text-white px-4 py-2 bg-blue-700 rounded'
//                 : 'text-lg text-white px-4 py-2 hover:bg-blue-600 rounded'
//             }
//           >
//             Dashboard
//           </NavLink>
//           <NavLink
//             to="/profile"
//             className={({ isActive }) =>
//               isActive
//                 ? 'text-lg font-bold text-white px-4 py-2 bg-blue-700 rounded'
//                 : 'text-lg text-white px-4 py-2 hover:bg-blue-600 rounded'
//             }
//           >
//             Profile
//           </NavLink>
//           <NavLink
//             to="/settings"
//             className={({ isActive }) =>
//               isActive
//                 ? 'text-lg font-bold text-white px-4 py-2 bg-blue-700 rounded'
//                 : 'text-lg text-white px-4 py-2 hover:bg-blue-600 rounded'
//             }
//           >
//             Settings
//           </NavLink>
//         </nav>

//         {/* Sidebar toggle for mobile */}
//         <button
//           className="absolute top-4 right-4 lg:hidden text-white"
//           onClick={toggleSidebar}
//           aria-expanded={isOpen}
//           aria-controls="sidebar-menu"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             className="w-6 h-6"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M6 18L18 6M6 6l12 12"
//             />
//           </svg>
//         </button>
//       </div>

//       {/* Mobile Overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//           onClick={toggleSidebar}
//         ></div>
//       )}
//     </>
//   );
// };

// export default Sidebar;
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`${
        isOpen ? 'block' : 'hidden'
      } lg:block w-64 bg-blue-800 text-white h-full fixed top-0 left-0 z-50`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4">
        <h1 className="text-lg font-bold">Logo</h1>
        {/* Close Button for Mobile */}
        <button
          className="lg:hidden text-white"
          onClick={toggleSidebar}
          aria-label="Close Sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col mt-8 space-y-6">
        <Link
          to="/dashboard"
          className="text-white text-lg px-4 py-2 hover:bg-blue-600 rounded-lg transition-all"
        >
          Dashboard
        </Link>
        <Link
          to="/profile"
          className="text-white text-lg px-4 py-2 hover:bg-blue-600 rounded-lg transition-all"
        >
          Profile
        </Link>
        <Link
          to="/settings"
          className="text-white text-lg px-4 py-2 hover:bg-blue-600 rounded-lg transition-all"
        >
          Settings
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
  