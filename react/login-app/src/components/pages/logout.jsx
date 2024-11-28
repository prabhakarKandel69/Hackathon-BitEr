import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user authentication data (e.g., token, session storage, etc.)
    localStorage.removeItem('authToken'); // Adjust according to your authentication logic
    sessionStorage.clear();

    // Redirect to login page after logout
    navigate('/login');
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Logging out...
        </h1>
      </div>
    </div>
  );
};

export default Logout;
