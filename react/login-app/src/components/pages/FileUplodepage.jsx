import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import UserProfile from '../UserProfile';
import UploadButton from '../UploadButton';
import FileInput from '../FileInput';
import ProgressBar from '../ProgressBar';

const FileUploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
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

    const user = JSON.parse(sessionStorage.getItem('user'));

    if (!user || !user.id) {
      alert('User ID not found. Please log in again.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('id', user.id); // Include the user ID

    try {
      const response = await axios.post(
        'https://poudelsangam.com.np/hackathon/uploadfile.php', // Update with your backend endpoint
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (event) => {
            if (event.total) {
              const percentage = Math.round((event.loaded * 100) / event.total);
              setUploadProgress(percentage);
            }
          },
        }
      );

      alert('File uploaded successfully!');
      console.log('Upload response:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
    } finally {
      setIsUploading(false);
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
        <div className="flex items-center justify-between bg-blue-600 p-4 text-white sticky top-0 z-10 lg:hidden">
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
        
        </div>

        {/* File Upload Content */}
        <div className="flex-1 flex justify-center items-center p-6 overflow-auto">
  <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 mx-auto">
    <h1 className="text-2xl font-semibold text-gray-800 mb-4">
      Upload File
    </h1>
    <FileInput onFileChange={handleFileChange} />
    <ProgressBar progress={uploadProgress} />
    <UploadButton
      onUpload={handleFileUpload}
      disabled={isUploading}
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
