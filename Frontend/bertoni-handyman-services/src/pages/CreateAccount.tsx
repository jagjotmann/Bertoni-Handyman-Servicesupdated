import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const navigate = useNavigate();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation logic may need changes after backend connection
    const validationErrors: { email?: string; password?: string } = {};

    if (!email) {
      validationErrors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      validationErrors.email = "Invalid email format";
    }

    if (!password) {
      validationErrors.password = "Password is required";
    } else if (password.length < 8) {
      validationErrors.password = "Password must be at least 8 characters long";
    }

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:3001/users/adduser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Account creation successful:", data);
        navigate("/create-account-success"); // redirect on successful account creation
      } catch (error) {
        console.error("Error during account creation:", error);
      }

      // No validation errors, submit the form or perform further actions
      console.log("Form submitted"); // CONNECT TO BACKEND HERE
      // possibly handle errors returned by backend
      navigate("/create-account-success"); // redirects to Create Account Successful (if backend returns successfully)
    } else {
      // Validation errors found, update the state with errors
      setErrors(validationErrors);
    }
  };

  const isValidEmail = (value: string) => {
    // Basic email format validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-12 bg-white rounded-lg shadow-md w-96">
        <h1 className="text-3xl font-semibold mb-6">Create Account</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-lg font-medium text-gray-600">
              Enter your email
            </label>
            <input
              type="email"
              className={`mt-2 p-3 w-full border rounded-md ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder=""
              value={email}
              onChange={handleEmailChange}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-600">
              Enter a password (at least 8 characters)
            </label>
            <input
              type="password"
              className={`mt-2 p-3 w-full border rounded-md ${
                errors.password ? "border-red-500" : ""
              }`}
              placeholder=""
              value={password}
              onChange={handlePasswordChange}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-orange-400 text-white rounded-md hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-opacity-50"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
