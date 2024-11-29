import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import UserProfile from '../UserProfile';

const DashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? 'pl-64' : 'pl-0 lg:pl-64'
        }`}
      >
        {/* Top Bar - Hidden in Large View */}
        <div className="flex items-center justify-between bg-blue-600 p-4 text-white sticky top-0 z-10 lg:hidden ">
          {/* Hamburger Menu for Mobile */}
          <button
            className="text-white"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

       
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          <p className="mt-4 text-gray-600">
            Welcome to your dashboard. Here, you can manage your tasks, view analytics, and more.
          </p>

          {/* Example Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <div className="bg-white p-4 shadow rounded-lg">Content Block 1</div>
            <div className="bg-white p-4 shadow rounded-lg">Content Block 2</div>
            <div className="bg-white p-4 shadow rounded-lg">Content Block 3</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
