import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`${
        isOpen ? 'block' : 'hidden'
      } lg:block w-64 bg-black text-white h-full fixed top-0 left-0 z-50`}
    >
      {/* Sidebar Header with Profile */}
      <div className="flex flex-col items-center py-6 border-b border-gray-700">
        {/* Profile Picture */}
        <div className="w-20 h-20 rounded-full bg-gray-600 mb-4"></div>
        {/* User Name */}
        <h2 className="text-lg font-semibold">John Doe</h2>
        {/* User Role */}
        <p className="text-sm text-gray-400">Administrator</p>
      </div>

   {/* Navigation Links */}
<div className="flex flex-col space-y-2 px-4 mt-2">
  <Link
    to="/dashboard"
    className="text-white text-lg px-4 py-2 hover:bg-gray-700 rounded-lg transition-all"
  >
    Dashboard
  </Link>
  <Link
    to="/profile"
    className="text-white text-lg px-4 py-2 hover:bg-gray-700 rounded-lg transition-all"
  >
    Profile
  </Link>
  <Link
    to="/upload"
    className="text-white text-lg px-4 py-2 hover:bg-gray-700 rounded-lg transition-all"
  >
    Upload
  </Link>
  <Link
    to="/logout"
    className="text-white text-lg px-4 py-2 hover:bg-gray-700 rounded-lg transition-all"
  >
    Log Out
  </Link>
</div>


      {/* Close Button for Mobile */}
      <button
        className="lg:hidden text-white absolute top-4 right-4"
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
  );
};

export default Sidebar;
