import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);

  const fetchUserDetails = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    if (!user || !user.id) {
      setError("User ID not found. Please log in again.");
      return;
    }

    try {
      const response = await fetch(
        `https://poudelsangam.com.np/hackathon/getuserdetails.php?id=${user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUserDetails(data);
      } else {
        const error = await response.json();
        setError(error.message || "Failed to fetch user details.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } lg:block w-64 bg-blue-300 text-white h-full fixed top-0 left-0 z-50`}
    >
      {/* Sidebar Header with Profile */}
      <div className="flex flex-col items-center py-6 border-b border-gray-700">
        <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
          <img
            src="https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : userDetails ? (
          <h2 className="text-lg font-semibold">
            {userDetails.company_user_firstname || "User"} {userDetails.company_user_lastname}
          </h2>
        ) : (
          <h2 className="text-lg font-semibold animate-pulse">Loading...</h2>
        )}
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
