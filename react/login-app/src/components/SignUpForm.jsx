import React, { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";

const SignUpForm = ({ onSuccess, onError }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [email, setEmail] = useState("");
  
  const [errors, setErrors] = useState({}); // To store validation errors

  // Function to validate form data
  const validate = () => {
    let formErrors = {};
    
    if (!firstName) formErrors.firstName = "First name is required";
    if (!lastName) formErrors.lastName = "Last name is required";
    if (!companyName) formErrors.companyName = "Company name is required";
    
    // Validate company phone number (simple number validation, can be extended)
    if (!companyPhone || !/^\d{10}$/.test(companyPhone)) {
      formErrors.companyPhone = "Please enter a valid 10-digit phone number";
    }

    // Validate email format
    if (!email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "Please enter a valid email address";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0; // If no errors, return true
  };

  // Handle form submission
  const handleSignUp = async (e) => {
    e.preventDefault();
    
    if (!validate()) return; // If validation fails, don't submit

    const signUpData = {
      firstName,
      lastName,
      companyName,
      companyPhone,
      email,
    };

    try {
      const response = await fetch("https://your-backend-api.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
      });

      if (response.ok) {
        const data = await response.json();
        onSuccess();
        console.log("Response:", data);
      } else {
        const error = await response.json();
        onError(error.message || "Sign-up failed.");
      }
    } catch (err) {
      console.error("Error:", err);
      onError("An unexpected error occurred.");
    }
  };

  return (
    <form onSubmit={handleSignUp}>
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
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
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
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
        </div>
      </div>

      <InputField
        label="Company Name"
        type="text"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        placeholder="Enter your company name"
        required
        error={errors.companyName}
      />

      <InputField
        label="Company Phone"
        type="text"
        value={companyPhone}
        onChange={(e) => setCompanyPhone(e.target.value)}
        placeholder="Enter your company phone"
        required
        error={errors.companyPhone}
      />

      <InputField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        error={errors.email}
      />

      <Button
        type="submit"
        className="bg-blue-500 text-white hover:bg-green-600 w-full"
      >
        Sign Up
      </Button>
    </form>
  );
};

export default SignUpForm;
