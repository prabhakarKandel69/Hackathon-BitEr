import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate(); // Initialize navigate


  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Basic validation
    if (!email || !phone) {
      setError("Both fields are required.");
      setSuccess(null);
      return;
    }

    try {
      const response = await fetch("https://poudelsangam.com.np/hackathon/forgotpassword.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, phone }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(data.message || "Form submitted successfully!");
        setError(null);
        setEmail("");
        setPhone("");
        localStorage.setItem('userEmail', data.email);

        navigate('/otppage');
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to submit the form.");
        setSuccess(null);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      setSuccess(null);
    }
  };

  const handleCancel = () => {
    setEmail(""); // Clear email field
    setPhone(""); // Clear phone field
    setError(null); // Clear error message
    setSuccess(null); // Clear success message
    navigate('/login');

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Forgot Password</h2>

        

        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500 p-3"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Phone Field */}
          <div className="mb-6">
            <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500 p-3"
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* Success/Error Messages */}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}

          {/* Submit and Cancel Buttons */}
          <div className="flex justify-between">
            <button
              type="submit"
              className="w-1/2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all mr-2"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-1/2 bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition-all ml-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
