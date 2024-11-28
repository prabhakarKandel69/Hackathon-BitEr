import React from 'react';

const ProgressBar = ({ progress }) => {
  if (progress === 0) {
    return null;
  }

  return (
    <div className="w-full bg-gray-300 rounded-full overflow-hidden mb-4">
      <div
        className="bg-blue-500 text-xs font-medium text-white text-center p-1 leading-none rounded-full"
        style={{ width: `${progress}%` }}
      >
        {progress}%
      </div>
    </div>
  );
};

export default ProgressBar;
