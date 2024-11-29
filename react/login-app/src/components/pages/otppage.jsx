import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const OTPPage = () => {
  const [otp, setOtp] = useState(['', '', '', '']); // OTP input state
  const [error, setError] = useState('');
  const [userId] = useState(1); // Example user ID, replace it with actual value
  const navigate = useNavigate(); // Initialize navigate


  // Handle OTP change and auto-focus on next box
  const handleChange = (e, index) => {
    const value = e.target.value;

    // Ensure only a single digit is entered
    if (/[^0-9]/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Auto-focus on the next input if the current input is filled
    if (value && index < otp.length - 1) {
      document.getElementById(`otp${index + 1}`).focus();
    }
  };

  // Handle form submission and send OTP to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const otpValue = otp.join(''); // Join OTP digits into a single string

    // Basic OTP validation (this can be modified as per your requirements)
    if (otpValue === '') {
      setError('Please enter a valid OTP.');
      return;
    }

    // Send OTP and userId to the backend for verification
    try {
      const response = await fetch('https://your-backend-url.com/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, otp: otpValue }), // Send userId and OTP
      });

      const result = await response.json();

      if (response.ok) {
        alert('OTP verified successfully!');
        navigate('/changepassword');

      } else {
        setError(result.message || 'Failed to verify OTP.');
      }
    } catch (error) {
      setError('Error connecting to the server. Please try again later.');
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    setOtp(['', '', '', '']); // Reset OTP
    setError('');
    navigate('/otppage');

  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 to-blue-500 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full md:w-96">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Enter OTP</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="flex justify-between mb-6 space-x-4">
            {/* OTP input fields */}
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                className="w-12 h-12 text-center text-2xl border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                maxLength="1"
                autoFocus={index === 0}
              />
            ))}
          </div>

          <div className="flex justify-between space-x-4">
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-all mb-4"
            >
              Submit
            </button>
            {/* Cancel Button */}
            <button
              type="button"
              onClick={handleCancel}
              className="w-full bg-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-400 transition-all mb-4"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPPage;
