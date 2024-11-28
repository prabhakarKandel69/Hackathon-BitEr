import React from 'react';

const UserProfile = () => {
  return (
    <div className="flex items-center space-x-4">
      {/* Avatar */}
      <div className="rounded-full w-10 h-10 bg-gray-400"></div>
      
      <div>
        <p className="text-sm">John Doe</p>
        <p className="text-xs text-gray-300">Admin</p>
      </div>
    </div>
  );
};

export default UserProfile;
