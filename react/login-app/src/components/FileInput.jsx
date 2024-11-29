import React from 'react';

const FileInput = ({ onFileChange }) => {
  const handleChange = (event) => {
    const file = event.target.files[0];
    onFileChange(file);
  };

  return (
    <input
      type="file"
      accept="application/pdf,image/*"
      onChange={handleChange}
      className="mb-4 w-full border rounded p-2"
    />
  );
};

export default FileInput;
