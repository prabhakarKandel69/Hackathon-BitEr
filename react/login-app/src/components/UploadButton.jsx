import React from 'react';

const UploadButton = ({ onUpload }) => {
  return (
    <button
      onClick={onUpload}
      className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700 transition"
    >
      Upload
    </button>
  );
};

export default UploadButton;
