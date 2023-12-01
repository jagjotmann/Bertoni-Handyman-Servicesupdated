import React, { useState } from "react";
import PaddingSectionLayout from "../layouts/PaddingSectionLayout";
import PageLayout from "../layouts/PageLayout";
import Modal from "../components/UI/Modal";
import EmailDashboard from "../components/EmailDashboard";
import QuoteDashboard from "../components/QuoteDashboard";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  title?: string;
  content?: string;
}

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [quoteNumber, setQuoteNumber] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [quoteNumberError, setQuoteNumberError] = useState(false);
  const navigate = useNavigate();

  const [modal, setModal] = useState<ModalProps | null>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [signInMethod, setSignInMethod] = useState("");

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

  const handleSignInWithQuoteNumber = () => {
    setQuoteNumberError(!quoteNumber.trim());
    if (!quoteNumber.trim()) {
      setModal({
        content: "Please enter your quote number.",
      });
    } else {
      setIsSignedIn(true);
      setSignInMethod("quote");
    }
  };

  const handleCreateAccount = () => {
    navigate("/create-account"); // redirects to Create Account
  };

  const handleQuoteNumberSubmit = () => {
    setQuoteNumberError(false);
    if (!quoteNumber.trim()) {
      setQuoteNumberError(true);
      //do not submit, there was error
      return;
    }
    window.location.href = `/QuoteLogin`;
  };

  const errorHandler = () => {
    setModal(null);
  };

  if (isSignedIn) {
    switch (signInMethod) {
      case "email":
        return <EmailDashboard email={email} />;
      case "quote":
        return <QuoteDashboard quoteNumber={quoteNumber} />;
      default:
        // You could also implement a redirect to a default page here
        return <div>Error: Unknown sign-in method.</div>;
    }
  }

  return (
    <PageLayout>
      <PaddingSectionLayout>
        {modal && (
          <Modal
            title={modal.title}
            content={modal.content}
            onConfirm={errorHandler}
          />
        )}
        <section className="flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold">Sign in</h1>
          <br />
          <p className="max-w-md text-xl">
            If you have an account with us, you can sign in with your email or
            quote number.
          </p>
          <br />
          <div className="w-full md:max-w-lg flex flex-col gap-4 bg-[#F2F2F4] p-4 md:p-12 text-left">
            <h3 className="font-bold md:text-xl">Email Sign-in</h3>
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full border ${
                emailError
                  ? "border-red-500 placeholder-red-500"
                  : "border-black placeholder-black"
              } p-1 md:p-2 bg-[#F2F2F4] rounded-xl`}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full border ${
                passwordError
                  ? "border-red-500 placeholder-red-500"
                  : "border-black placeholder-black"
              } p-1 md:p-2 bg-[#F2F2F4] rounded-xl`}
            />
            <div className="flex flex-wrap gap-4">
              <button
                className="bg-[#2D333A] text-white font-medium text-xs md:text-lg py-2 px-5 rounded-xl shadow-md"
                onClick={handleSignInWithEmail}
              >
                Sign in with Email
              </button>
              <button
                className="text-[#FEA33F] bg-white font-medium text-xs md:text-lg py-2 px-5 rounded-xl border border-[#FEA33F] shadow-md"
                onClick={handleCreateAccount}
              >
                Create Account
              </button>
            </div>
            <div className="flex items-center justify-center w-full gap-6">
              <span className="bg-[#2D333A] h-[1px] flex-grow rounded-full"></span>
              <span className="font-medium">or</span>
              <span className="bg-[#2D333A] h-[1px] flex-grow rounded-full"></span>
            </div>

            <h3 className="font-bold md:text-xl">Quote Number</h3>
            <input
              placeholder="ex. Q00000000"
              value={quoteNumber}
              onChange={(e) => setQuoteNumber(e.target.value)}
              className={`w-full border ${
                quoteNumberError
                  ? "border-red-500 placeholder-red-500"
                  : "border-black placeholder-black"
              } p-1 md:p-2 bg-[#F2F2F4] rounded-xl`}
            />
            <button
              className="bg-[#F69327] text-[#2D333A] font-medium text-xs md:text-lg py-2 px-5 rounded-xl shadow-md"
              onClick={handleSignInWithQuoteNumber}
            >
              Sign in with Quote Number
            </button>
          </div>
        </section>
      </PaddingSectionLayout>
    </PageLayout>
  );
};

export default Signin;
