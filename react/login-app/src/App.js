import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";

const App = () => {
  return (
    <Routes>
      {/* Redirect "/" to "/login" */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
};

export default App;
