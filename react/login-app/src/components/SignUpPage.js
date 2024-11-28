import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import Button from "./Button";
import Divider from "./Divider";
import Footer from "./Footer";

const SignUpPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Company Name:", companyName);
    console.log("Company Phone:", companyPhone);
    console.log("Email:", email);
    // Add sign-up logic here (e.g., API call)
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleSignUp}>
          {/* First Name and Last Name */}
          <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-2">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your first name"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-2">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your last name"
                required
              />
            </div>
          </div>

          {/* Company Name */}
          <InputField
            label="Company Name"
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter your company name"
            required
          />

          {/* Company Phone */}
          <InputField
            label="Company Phone"
            type="text"
            value={companyPhone}
            onChange={(e) => setCompanyPhone(e.target.value)}
            placeholder="Enter your company phone"
            required
          />

          {/* Email */}
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />

          {/* Sign Up Button */}
          <Button
            type="submit"
            className="bg-green-500 text-white hover:bg-green-600 w-full"
          >
            Sign Up
          </Button>
        </form>

        {/* Divider */}
        <Divider />

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
