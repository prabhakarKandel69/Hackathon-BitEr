import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar"; // Import Sidebar component
import { Link } from "react-router-dom";

const CvTable = () => {
  const [cvData, setCvData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar open/close
  };

  useEffect(() => {
    // Fetch data from the PHP API
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://poudelsangam.com.np/hackathon/sendcvdetails.php"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (data.status === "success" && Array.isArray(data.data)) {
          setCvData(data.data); // Set the fetched data
        } else {
          throw new Error(data.message || "Invalid data received");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Show loading if data is empty
  if (loading || cvData.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <div
        className={`flex-1 p-6 transition-all duration-300 ${
          isSidebarOpen ? "pl-64" : "pl-0 lg:pl-64"
        }`}
      >
        {/* Top Bar */}
        <div className="lg:hidden flex items-center justify-between bg-blue-600 p-4 text-white sticky top-0 z-10">
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
        <div className="flex justify-center mt-6">
          <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-4">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
              CV Data Table
            </h1>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-separate border-spacing-0.5">
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="px-4 py-2 text-left">id</th>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Work Experience Score</th>
                    <th className="px-4 py-2 text-left">Project Score</th>
                    <th className="px-4 py-2 text-left">Skills Score</th>
                    <th className="px-4 py-2 text-left">Final Score</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-50">
                  {cvData.map((cv, index) => (
                    <tr
                      key={cv.id}
                      className="border-b hover:bg-gray-200 transition-all duration-200"
                    >
                      <td className="px-4 py-3">{index + 1}</td> {/* Index-based ID */}
                      <td className="px-4 py-3">{cv.cv_sender_name}</td>
                      <td className="px-4 py-3">{cv.cv_sender_work_experience_score}</td>
                      <td className="px-4 py-3">{cv.cv_sender_project_score}</td>
                      <td className="px-4 py-3">{cv.cv_sender_skills_score}</td>
                      <td className="px-4 py-3">{cv.cv_sender_finalscore}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CvTable;
