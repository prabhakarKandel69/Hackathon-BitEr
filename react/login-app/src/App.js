// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import LoginPage from "./components/pages/LoginPage";
// import SignUpPage from "./components/pages/SignUpPage";
// import Dashboard from "./components/pages/DashboardPage.jsx"; 
// import FileUploadPage from "./components/pages/FileUplodepage.jsx";
// import FileInput from "./components/FileInput.jsx";
// import UploadButton from "./components/UploadButton.jsx";
// import ProgressBar from "./components/ProgressBar.jsx";// Assuming you have a Dashboard component

// const PrivateRoute = ({ element }) => {
//   const isAuthenticated = true; // Replace with actual authentication logic
//   return isAuthenticated ? element : <Navigate to="/login" />;
// };

// const App = () => {
//   return (
//     <Routes>
//       {/* Redirect "/" to "/login" */}
//       <Route path="/" element={<Navigate to="/login" />} />

//       {/* Public Routes */}
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/signup" element={<SignUpPage />} />
//       <Route patha ="/uplode" element={<FileUploadPage/>}/>
//       <Route patha = "/FileInput" element ={<FileInput/>}/>
//       <Route patha ="/UploadButto" element ={<UploadButton/>}/>
//       <Route patha ="/ProgressBar" element ={<ProgressBar/>}/>

//       {/* Private Routes */}
//       <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />

//       {/* Catch all other routes */}
//       <Route path="*" element={<Navigate to="/login" />} />
//     </Routes>
//   );
// };

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
      
      {/* File Upload Components */}
      <Route path="/upload" element={<FileUploadPage />} />
      <Route path="/file-input" element={<FileInput />} />
      <Route path="/upload-button" element={<UploadButton />} />
      <Route path="/progress-bar" element={<ProgressBar />} />

      {/* Private Routes */}
      <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />

      {/* Catch all other routes */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
