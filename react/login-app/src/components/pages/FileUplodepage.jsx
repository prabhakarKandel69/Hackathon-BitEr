import React, { useState, useRef } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import ProgressBar from '../ProgressBar';  // Import the ProgressBar component
import { useNavigate } from 'react-router-dom';

const FileUploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const fileInputRef = useRef(null); // Reference for the file input
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
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

      navigate('/showdatapage');
      console.log('Upload response:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.', error);
    } finally {
      setIsUploading(false);
    }
  };

  // Trigger file input click when "select a file" is clicked
  const handleSelectFileClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1621243804936-775306a8f2e3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
      }}
    >
      <div className="absolute bg-black opacity-60 inset-0 z-0"></div>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

<div
  className={`sm:max-w-lg w-full p-10 bg-white rounded-xl z-10 flex flex-col items-center justify-center transition-all duration-300 ${
    isSidebarOpen ? 'pl-[5rem]' : 'pl-0 lg:pl-[5rem]'  // Added 5rem padding-left
  }`}
>

        <div className="text-center">
          <h2 className="mt-5 text-3xl font-bold text-gray-900">File Upload!</h2>
          <p className="mt-2 text-sm text-gray-400">Please upload your document below</p>
        </div>

        {/* Form for file upload */}
        <form className="mt-8 space-y-6 w-full">
          {/* File Input */}
          <div className="grid grid-cols-1 space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">
              Attach Document
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                <div className="h-full w-full text-center flex flex-col items-center justify-center">
                  <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                    <img
                      className="has-mask h-36 object-center"
                      src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                      alt="Upload Icon"
                    />
                  </div>
                  <p className="pointer-none text-gray-500">
                    <span className="text-sm">Drag and drop</span> files here <br /> or{' '}
                    <a
                      href="#"
                      onClick={handleSelectFileClick}
                      className="text-blue-600 hover:underline"
                    >
                      select a file
                    </a>{' '}
                    from your computer
                  </p>
                </div>
                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>

          {/* File Type Information */}
          <p className="text-sm text-gray-300">
            <span>File type: doc, pdf, types of images</span>
          </p>

           {/* Display Progress Bar after clicking Upload */}
           {isUploading && (
                <div className="w-full mt-4">
                  <ProgressBar progress={uploadProgress} />
                  <p className="text-center text-gray-500 mt-2">{uploadProgress}%</p>
                </div>
              )}

          {/* Upload Button */}
          {selectedFile && (
            <div>
              <button
                type="button"
                onClick={handleFileUpload}
                className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
                disabled={isUploading}
              >
                {isUploading ? 'Uploading...' : 'Upload'}
              </button>

            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default FileUploadPage;
