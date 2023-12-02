// forgotPassword.tsx
import React, { useState } from "react";
import PageLayout from "../layouts/PageLayout";
import PaddingSectionLayout from "../layouts/PaddingSectionLayout";
import Modal from "../components/UI/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Interface for modal properties
interface ModalProps {
  title?: string;
  content?: string;
}

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();
  const [modal, setModal] = useState<ModalProps | null>(null);

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleResetPassword = async () => {
    if (!email.trim()) {
      setEmailError("Email is required.");
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email.");
    } else {
      setEmailError("");
      try {
        // Here you would put your logic to handle password reset
        // For example, sending a reset link to the user's email
        await axios.post("http://localhost:3001/reset-password", {
          email,
        });
        setModal({
          content:
            "If there is an account associated with this email, we will send a password reset link.",
        });
      } catch (error) {
        console.error("Password Reset Error", error);
        setModal({
          content: "There was an error processing your request.",
        });
      }
    }
  };

  const errorHandler = () => {
    setModal(null);
  };

  return (
    <PageLayout>
      <div className="min-h-screen">
        <PaddingSectionLayout>
          {modal && (
            <Modal
              title={modal.title}
              content={modal.content}
              onConfirm={errorHandler}
            />
          )}
          <section className="flex flex-col items-center justify-center text-center">
            <h1 className="p-4 text-4xl font-bold">Forgot your password?</h1>
            <p className="max-w-md p-4 text-xl">
              Enter the Email you used to register with us and we will send you
              instructions to reset your password.
            </p>
            <div className="flex w-full flex-col gap-4 bg-[#F2F2F4] p-5 md:max-w-lg md:p-12 ">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full border ${
                  emailError ? "border-red-500" : "border-black"
                } rounded-xl bg-[#F2F2F4] p-1 md:p-2`}
              />
              {emailError && (
                <p className="text-sm text-red-500">{emailError}</p>
              )}
              <button
                type="submit"
                onClick={handleResetPassword}
                className="transform whitespace-nowrap rounded-md bg-orange-500 p-2 px-4 font-bold text-white transition-transform hover:scale-105"
              >
                Send Reset Instructions
              </button>
            </div>
          </section>
        </PaddingSectionLayout>
      </div>
    </PageLayout>
  );
};

export default ForgotPassword;
