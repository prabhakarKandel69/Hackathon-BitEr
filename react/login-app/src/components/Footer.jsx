import React from 'react';

const Footer = () => {
  return (
    <div className="mt-6 text-sm text-gray-500 flex items-center justify-between">
      {/* Powered by text */}
      <span className="text-gray-800">@bit-er 2024</span>
      
      {/* Developed By Section with Image and Link */}
      <a 
        href="https://poudelsangam.com.np" 
        className="flex flex-row justify-center items-center hover:scale-100" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <span className="text-gray-700">Developed by</span>

        <img 
          className="w-8 h-8 " 
          src="https://poudelsangam.com.np/img/icon.png" 
          alt="itEr Devs Logo" 
        />
        <span className="text-green-700 strong">itEr Devs</span>
      </a>
    </div>
  );
};

export default Footer;
