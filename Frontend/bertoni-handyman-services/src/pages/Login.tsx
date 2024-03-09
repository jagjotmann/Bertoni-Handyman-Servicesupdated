import axios from "axios";
import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import EmailDashboard from "../components/EmailDashboard";
import QuoteDashboard from "../components/QuoteDashboard";
import Modal from "../components/UI/Modal";
import PaddingSectionLayout from "../layouts/PaddingSectionLayout";
import PageLayout from "../layouts/PageLayout";

// Interface for modal properties
interface ModalProps {
  title?: string;
  content?: string;
}

const Login = () => {
  // State for managing form inputs and errors
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // Hook for navigation
  const navigate = useNavigate();

  // State for handling modal display and content
  const [modal, setModal] = useState<ModalProps | null>(null);

  // Function to validate email format
  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  // New state for toggling password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Function to handle sign-in logic
  const handleSignInWithEmail = async () => {
    let hasError = false;

    // Validate email input
    if (!email.trim()) {
      setEmailError("Email is required.");
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email.");
      hasError = true;
    } else {
      setEmailError("");
    }

    // Validate password input
    if (!password.trim()) {
      setPasswordError("Password is required.");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (hasError) {
      return;
    }
    try {
      // Attempt to log in the user
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });

      const token = response.data.token;
      // Store the token in local storage
      localStorage.setItem("token", token);

      // Navigate to the admin page upon successful login
      navigate("/admin");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Login Error", error.response.data);
        setModal({
          content: error.response.data.message || "Invalid email or password.",
        });
      } else {
        console.error("Login Error", error);
        setModal({
          content: "An unknown error occurred.",
        });
      }
    }
  };

  // Function to handle modal closure
  const errorHandler = () => {
    setModal(null);
  };

  return (
    <PageLayout>
      <div className="min-h-screen">
        <PaddingSectionLayout>
          {/* Modal for displaying error messages */}
          {modal && (
            <Modal
              title={modal.title}
              content={modal.content}
              onConfirm={errorHandler}
            />
          )}
          <section className="flex flex-col items-center justify-center text-center">
            {/* Sign-in form layout */}
            <h1 className="p-4 text-4xl font-bold">Sign in</h1>
            <p className="max-w-md p-4 text-xl">
              If you have an account with us, you can sign in with your email.
            </p>
            <div className="flex w-full flex-col gap-4 rounded-md bg-gray-200 p-5 md:max-w-lg md:p-12 ">
              <h3 className="font-bold md:text-xl">Email Sign-in</h3>
              {/* Email input field */}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full border ${
                  emailError ? "border-red-500" : "border-black"
                } rounded-xl bg-[#F2F2F4] p-1 md:p-2`}
              />
              {emailError && (
                <p className="text-sm text-red-500">{emailError}</p>
              )}
              {/* Password input field and visibility toggle */}
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full border ${
                    passwordError ? "border-red-500" : "border-black"
                  } rounded-xl bg-[#F2F2F4] p-1 md:p-2`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {passwordVisible ? (
                    <FiEyeOff className="h-5 w-5 text-gray-700" />
                  ) : (
                    <FiEye className="h-5 w-5 text-gray-700" />
                  )}
                </button>
              </div>
              {passwordError && (
                <p className="text-sm text-red-500">{passwordError}</p>
              )}

              {/* Forgot password link */}
              <div className="text-right">
                <Link
                  to="/forgotPassword"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="items-center ">
                {/* Sign-in button */}
                <button
                  type="submit"
                  onClick={handleSignInWithEmail}
                  className="transform rounded-md bg-orange-500 p-2 px-10 font-bold text-white transition-transform hover:scale-105"
                >
                  Sign in
                </button>
              </div>
            </div>
          </section>
        </PaddingSectionLayout>
      </div>
    </PageLayout>
  );
};

export default Login;
