import React from 'react';

const Button = ({ onClick, type, className, children }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full py-2 px-4 rounded-lg transition ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
