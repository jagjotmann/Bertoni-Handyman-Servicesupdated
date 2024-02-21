import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const QuoteLogin = () => {
  const { quoteid: quoteId } = useParams();

  const [quoteStatus, setQuoteStatus] = useState(null);

  useEffect(() => {
    async function FetchQuote() {
      try {
        const response = await axios.get(
          `http://localhost:3001/quotes/${quoteId}`
        );

        setQuoteStatus(response.data.quoteStatus);

        console.log(response.data);
      } catch (err: any) {
        console.log(err);
      }
    }
    FetchQuote();
  }, []);

  return (
    <div className="bg-white min-h-screen flex flex-col items-center p-4">
      <div className="bg-white p-9 w-full max-lg">
        <h1 className="font-bold text-3xl mb-4">{`Quote #${quoteId}`}</h1>
        <div className="text-gray-700 mb-6 text-xs font-bold">
          <p>
            Please reach out to Bertoni's Handyman Services for any questions.
          </p>
        </div>
        <div className="flex space-x-10">
          <div
            className="px-6 py-3 p-2 bg-white-200 rounded-lg"
            style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
          >
            <h2 className="font-bold text-xsm    ">Quote Request</h2>
            <div className="text-yellow-600 text-xs">{quoteStatus}</div>
          </div>
          <div
            className="px-6 py-3 p-2 bg-white-200 rounded-lg"
            style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
          >
            <h2 className="font-bold text-xsm    ">Appointment</h2>
            <div className="text-gray-600 text-xs">Waiting for Quote</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteLogin;
