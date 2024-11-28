
// export default App;
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from "./components/pages/SignUpPage";
import Dashboard from "./components/pages/DashboardPage"; 
import FileUploadPage from "./components/pages/FileUplodepage";
import FileInput from "./components/FileInput";
import UploadButton from "./components/UploadButton";
import ProgressBar from "./components/ProgressBar";
import Logout from "./components/pages/logout";

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
      
      {/* File Upload Components */}y
      <Route path="/upload" element={<FileUploadPage />} />
      <Route path="/file-input" element={<FileInput />} />
      <Route path="/upload-button" element={<UploadButton />} />
      <Route path="/progress-bar" element={<ProgressBar />} />
      <Route path ="/logout" element = {<Logout/>}/>

      {/* Private Routes */}
      <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />

      {/* Catch all other routes */}
      {/* <Route path="*" element={<Navigate to="/login" />} /> */}
    </Routes>
  );
};

export default App;
