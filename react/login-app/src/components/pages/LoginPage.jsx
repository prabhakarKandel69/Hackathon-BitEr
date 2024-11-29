import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../LoginForm';
import Message from '../Message';
import Footer from '../Footer';
import Divider from '../Divider';

const LoginPage = () => {
  const [message, setMessage] = useState(null); // To display success/error messages
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    setMessage({ type: 'success', text: 'Login successful!' });
    setTimeout(() => navigate('/dashboard'), 2000);
  };

  const handleLoginError = (errorText) => {
    setMessage({ type: 'error', text: errorText });
  };

  const removeMessage = () => {
    setMessage(null); // Remove the message after 3 seconds
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Welcome to CV Analyser</h2>
        </div>
        {/* Login Form */}
        <LoginForm
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
        />
        {/* Message */}
        {message && <Message type={message.type} text={message.text} onRemove={removeMessage} />}
        {/* Divider */}
        <Divider />
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default LoginPage;
