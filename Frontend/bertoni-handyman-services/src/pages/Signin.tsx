import React, { useState } from "react";
import PaddingSectionLayout from "../layouts/PaddingSectionLayout";
import PageLayout from "../layouts/PageLayout";
import Modal from "../components/UI/Modal";

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

  const [modal, setModal] = useState<any>();

  const handleSignIn = () => {
    setEmailError(false);
    setPasswordError(false);
    if (!email.trim()) {
      setEmailError(true);
    }
    if (!password.trim()) {
      setPasswordError(true);
    }
    if (emailError || passwordError) {
      //do not sign in, there was an error
      return;
    }
    setModal({
      content:
        "Sorry, we couldn’t find an account with that email and password. Please try again.",
    });
  };

  const handleCreateAccount = () => {
    console.log("redirect to create account");
  };

  const handleQuoteNumberSubmit = () => {
    setQuoteNumberError(false);
    if (!quoteNumber.trim()) {
      setQuoteNumberError(true);
      //do not submit, there was error
      return;
    }
    console.log(quoteNumber);
    setModal({
      content:
        "Sorry, we couldn’t find an account with that quote number. Please try again.",
    });
  };

  const errorHandler = () => {
    setModal(null);
  };

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
        <section className="flex justify-center text-center flex-col items-center">
          <h1 className="font-bold text-4xl">Sign in</h1>
          <br />
          <p className="text-xl max-w-md">
            If you have an account with us, you can sign in with your email or
            quote number.
          </p>
          <br />
          <div className="w-full md:max-w-lg flex flex-col gap-4 bg-[#F2F2F4] p-4 md:p-12 text-left">
            <h3 className="font-bold md:text-xl">Email Sign-in</h3>
            <input
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
                onClick={handleSignIn}
              >
                Sign in
              </button>
              <button
                className="text-[#FEA33F] bg-white font-medium text-xs md:text-lg py-2 px-5 rounded-xl border border-[#FEA33F] shadow-md"
                onClick={handleCreateAccount}
              >
                Create Account
              </button>
            </div>
            <div className="flex justify-center items-center w-full gap-6">
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
              onClick={handleQuoteNumberSubmit}
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
