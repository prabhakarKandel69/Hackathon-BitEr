import React from 'react';

const InputField = ({ label, type, value, onChange, placeholder, required,error }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        required={required}
      />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

    </div>
  );
};

export default InputField;
