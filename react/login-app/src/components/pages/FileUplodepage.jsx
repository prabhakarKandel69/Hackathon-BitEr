import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import UserProfile from '../UserProfile';
import UploadButton from '../UploadButton';
import FileInput from '../FileInput';
import ProgressBar from '../ProgressBar';

const FileUploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false); // Track upload state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleFileChange = (file) => {
    setSelectedFile(file);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    setIsUploading(true); // Disable the upload button
    setUploadProgress(0);

    // Simulate file upload using FormData
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      // Mock API request to simulate file upload
      await new Promise((resolve) => {
        const interval = setInterval(() => {
          setUploadProgress((prevProgress) => {
            if (prevProgress >= 100) {
              clearInterval(interval);
              resolve();
              return 100;
            }
            return prevProgress + 10; // Increment progress
          });
        }, 200); // Simulated delay
      });

      alert('File uploaded successfully!');
    } catch (error) {
      alert('Error uploading file.');
    } finally {
      setIsUploading(false); // Re-enable the button
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? 'pl-64' : 'pl-0 lg:pl-64'
        }`}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between bg-blue-600 p-4 text-white sticky top-0 z-10">
          <button
            className="lg:hidden text-white"
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
          {/* User Profile */}
          <UserProfile />
        </div>

        {/* File Upload Content */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 mx-auto">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
              Upload File
            </h1>
            <FileInput onFileChange={handleFileChange} />
            <ProgressBar progress={uploadProgress} />
            <UploadButton
              onUpload={handleFileUpload}
              disabled={isUploading} // Disable button during upload
            >
              {isUploading ? 'Uploading...' : 'Upload'}
            </UploadButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadPage;
