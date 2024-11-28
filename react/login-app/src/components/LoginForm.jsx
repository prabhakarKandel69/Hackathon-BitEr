import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import InputField from './InputField';
import Button from './Button';

const LoginForm = ({ onSuccess, onError }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate(); // Initialize navigate
  const [errors, setErrors] = useState({}); // To store validation errors

  const validate = () => {
    let formErrors = {};
    if (!username) formErrors.username = 'Username is required';
    if (!password) formErrors.password = 'Password is required';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validate()) return; // Do not proceed if validation fails


    try {
      const response = await fetch('https://your-backend-api.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, rememberMe }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.token) localStorage.setItem('authToken', data.token);
        onSuccess();
      } else {
        const error = await response.json();
        onError(error.message || 'Login failed.');
      }
    } catch (err) {
      onError('An unexpected error occurred.');
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <InputField
        label="Username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
        required
        error={errors.username}

      />
      <InputField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        required
        error={errors.password}

      />
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
        <a href="#" className="text-sm text-blue-500 hover:underline">
          Forgot Password?
        </a>
      </div>
      <Button
        type="submit"
        className="bg-blue-500 text-white hover:bg-blue-600 w-full rounded-lg py-2"
      >
        Login
      </Button>

      {/* Register Button */}
<div className="text-center mt-4">
  <span className="text-sm text-gray-600">Don't have an account yet?</span> 
  <a
    href="#"
    className="text-sm text-blue-500 hover:text-blue-600 font-semibold ml-1"
    onClick={() => navigate('/signup')}
  >
    Create an account
  </a>
</div>

    </form>
  );
};

export default LoginForm;
