import React, { useState } from "react";
import PageLayout from "../layouts/PageLayout";
import PaddingSectionLayout from "../layouts/PaddingSectionLayout";
import Modal from "../components/UI/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import QuoteList from "../components/QuoteList";
import QuoteForm from "../components/QuoteForm";

interface ModalProps {
  title?: string;
  content?: string;
}

interface Quote {
  id: string;
  detail: string;
  status: string;
}

const QuoteStatus = () => {
  const [quoteNumber, setQuoteNumber] = useState("");
  const [quoteNumberError, setQuoteNumberError] = useState(false);
  const [modal, setModal] = useState<ModalProps | null>(null);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [showQuoteList, setShowQuoteList] = useState(false);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const navigate = useNavigate();

  // Define the handleFormSubmit function here
  const handleFormSubmit = (formData: any) => {
    console.log("Form Data Submitted:", formData);
    // Here, you would typically handle the form submission,
    // such as sending the data to a backend server via an API call.
    // For demonstration purposes, this just logs the form data to the console.
  };

  const handleSignInWithQuoteNumber = async () => {
    setQuoteNumberError(!quoteNumber.trim());
    if (quoteNumber.trim()) {
      try {
        const response = await axios.get(
          `http://localhost:3001/quotes/${quoteNumber}`
        );
        navigate(`/QuoteLogin/${quoteNumber}`);
      } catch (err: any) {
        setModal({
          content: "Invalid quote number.",
        });
      }
    } else {
      setModal({
        content: "Please enter your quote number.",
      });
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
            <h1 className="p-4 text-4xl font-bold">Check your Quote Status</h1>
            <p className="max-w-md p-5 text-xl">
              If you have a quote number, you can check your quote status here.
            </p>
            <div className="flex w-full flex-col gap-7 rounded-md bg-gray-200 p-4 md:max-w-lg md:p-12">
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
              <button
                className="rounded-xl bg-[#F69327] px-5 py-2 text-xs font-medium text-[#2D333A] shadow-md transition-transform hover:scale-105 md:text-lg"
                onClick={handleSignInWithQuoteNumber}
              >
                Check Quote Status
              </button>
              {showQuoteForm && <QuoteForm onSubmit={handleFormSubmit} />}
              {showQuoteList && <QuoteList quotes={quotes} />}
              <div className="flex justify-center">
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

