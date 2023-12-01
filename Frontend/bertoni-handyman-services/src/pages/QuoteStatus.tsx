import React, { useState } from "react";
import PageLayout from "../layouts/PageLayout";
import PaddingSectionLayout from "../layouts/PaddingSectionLayout";
import Modal from "../components/UI/Modal";
import QuoteDashboard from "../components/QuoteDashboard";

// Interface for modal properties
interface ModalProps {
  title?: string;
  content?: string;
}

const QuoteStatus = () => {
  // State for managing quote number input and errors
  const [quoteNumber, setQuoteNumber] = useState("");
  const [quoteNumberError, setQuoteNumberError] = useState(false);
  // State for handling modal display and content
  const [modal, setModal] = useState<ModalProps | null>(null);

  // Function to handle quote number validation and submission
  const handleSignInWithQuoteNumber = () => {
    setQuoteNumberError(!quoteNumber.trim());
    if (quoteNumber.trim()) {
      // Placeholder for login logic with quote number, potentially an API call
      // Example response handling:
      // On successful validation, navigate to QuoteDashboard
      // On failure, display error modal
      setModal({
        content: "Invalid quote number.",
      });
    } else {
      setModal({
        content: "Please enter your quote number.",
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
          {/* Modal for displaying error or information messages */}
          {modal && (
            <Modal
              title={modal.title}
              content={modal.content}
              onConfirm={errorHandler}
            />
          )}
          <section className="flex flex-col items-center justify-center text-center">
            {/* Layout for the quote status check */}
            <h1 className="p-4 text-4xl font-bold">Check your Quote Status</h1>
            <p className="max-w-md p-5 text-xl">
              If you have a quote number, you can check your quote status here.
            </p>
            <div className="flex w-full flex-col gap-7 bg-[#F2F2F4] p-4 md:max-w-lg md:p-12">
              {/* Quote number input field */}
              <input
                placeholder="ex. Q00000000"
                value={quoteNumber}
                onChange={(e) => setQuoteNumber(e.target.value)}
                className={`w-full border ${
                  quoteNumberError
                    ? "border-red-500 placeholder-red-500"
                    : "border-black placeholder-black"
                } rounded-xl bg-[#F2F2F4] p-1 md:p-2`}
              />
              <div className="flex justify-center border-b-2 border-black border-divider pb-4">
                {/* Button to submit the quote number */}
                <button
                  className="rounded-xl bg-[#F69327] px-5 py-2 text-xs font-medium text-[#2D333A] shadow-md md:text-lg "
                  onClick={handleSignInWithQuoteNumber}
                >
                  Check your Quote Status
                </button>
              </div>
              <div className="flex justify-center">
                {/* Link to obtain a new quote */}
                <p className="mt-4 text-center">
                  Don't have a Quote?{" "}
                  <a href="/get-a-quote" className="underline">
                    Get a quote here!
                  </a>
                </p>
              </div>
            </div>
          </section>
        </PaddingSectionLayout>
      </div>
    </PageLayout>
  );
};

export default QuoteStatus;
