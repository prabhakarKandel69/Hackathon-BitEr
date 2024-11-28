import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from './InputField';
import Button from './Button';
import Divider from './Divider';
import Footer from './Footer';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Remember Me:', rememberMe);
    // Add login logic here (e.g., API call)
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="text-center">
        
          <h2 className="text-2xl font-bold text-gray-800">Welcome to CV Analyser</h2>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="mt-6">
          <InputField
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between mt-4 mb-4">
            <label className="flex items-center text-gray-600 text-sm">
              <input
                type="checkbox"
                className="form-checkbox text-blue-500 mr-2"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember Me
            </label>
            <a
              href="#"
              className="text-sm text-blue-500 hover:underline"
              onClick={() => navigate('/forgot-password')}
            >
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            className="bg-blue-500 text-white hover:bg-blue-600 w-full rounded-lg py-2"
          >
            Login
          </Button>
        </form>

        {/* Divider */}
        <Divider />

        

        {/* Register Section */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don’t have an account?{' '}
            <a
              href="#"
              className="text-green-500 hover:underline"
              onClick={() => navigate('/signup')}
            >
              Register Now
            </a>
          </p>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default LoginPage;
