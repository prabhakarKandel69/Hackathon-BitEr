import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUpForm from "../SignUpForm";
import Message from "../Message";
import Footer from "../Footer";

const SignUpPage = () => {
  const [message, setMessage] = useState(null); // State for success or error messages
  const navigate = useNavigate();

  const handleSignUpSuccess = () => {
    setMessage({ type: "success", text: "Sign-up successful! Welcome!" });
    setTimeout(() => navigate("/login"), 3000); // Redirect after success
  };

  const handleSignUpError = (errorText) => {
    setMessage({ type: "error", text: errorText });
  };
  const removeMessage = () => {
    setMessage(null); // Remove the message after 3 seconds
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>
        {/* Sign-Up Form */}
        <SignUpForm onSuccess={handleSignUpSuccess} onError={handleSignUpError} />
        {/* Message Display */}
        {message && <Message type={message.type} text={message.text} onRemove={removeMessage} />}       
        {/* Login Link */}
        <div className="text-center mt-4">
          <p className="text-gray-700">
            Already have an account?{" "}
            <a
              href="#"
              onClick={() => navigate("/login")}
              className="text-blue-500 hover:underline"
            >
              Login
            </a>
          </p>
        </div>
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default SignUpPage;
