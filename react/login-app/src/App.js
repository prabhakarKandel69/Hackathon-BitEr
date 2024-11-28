import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from "./components/pages/SignUpPage";
import Dashboard from "./components/pages/DashboardPage.jsx"; // Assuming you have a Dashboard component

const PrivateRoute = ({ element }) => {
  const isAuthenticated = true; // Replace with actual authentication logic
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Routes>
      {/* Redirect "/" to "/login" */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      {/* Private Routes */}
      <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />

      {/* Catch all other routes */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
