
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
  