import React, { useState } from "react";
import PageLayout from "../layouts/PageLayout";
import PaddingSectionLayout from "../layouts/PaddingSectionLayout";
import Modal from "../components/UI/Modal";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import EmailDashboard from "../components/EmailDashboard";
import QuoteDashboard from "../components/QuoteDashboard";
import { useNavigate } from "react-router-dom";

// Interface for modal properties
interface ModalProps {
  title?: string;
  content?: string;
}

const Signin = () => {
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

  const handleSignInWithEmail = () => {
    // setEmailError(!email.trim());
    // setPasswordError(!password.trim());
    // if (!email.trim() || !password.trim()) {
    //   setModal({
    //     content: "Please enter both your email and password.",
    //   });
    // } else {
    //   setIsSignedIn(true);
    //   setSignInMethod("email");
    // }
    window.location.href = `/admin`;
  };


    // Validate password input
    if (!password.trim()) {
      setPasswordError("Password is required.");
      hasError = true;
    } else {
      setPasswordError("");
    }

  const handleCreateAccount = () => {
    navigate("/create-account"); // redirects to Create Account
  };

    if (hasError) {
      return;
    }

    try {
      // Attempt to log in the user
      await axios.post("http://localhost:3001/login", {
        username: email,
        password,
      });
      navigate("/admin"); // Navigate to the admin page upon successful login
    } catch (error) {
      console.error("Login Error", error);
      setModal({
        content: "Invalid email or password.",
      });
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
            <div className="flex w-full flex-col gap-4 bg-[#F2F2F4] p-5 md:max-w-lg md:p-12 ">
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
              {/* Password input field */}
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full border ${
                  passwordError ? "border-red-500" : "border-black"
                } rounded-xl bg-[#F2F2F4] p-1 md:p-2`}
              />
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
                  className=" transform rounded-md bg-orange-500 p-2 px-10 font-bold text-white transition-transform hover:scale-105"
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

export default Signin;
