import React, { useRef, useState, useEffect } from "react";
import PaddingSectionLayout from "../layouts/PaddingSectionLayout";

// const validQuote = "65d801f3452ad8fd60537222";
const validQuote = "65da41d696f6a43eb6bd56c5";
let url = "/?id=" + validQuote;

const ScheduleAppointment = () => {
  const queryParameters = new URLSearchParams(window.location.search);
  const quoteFromParam = queryParameters.get("id") || "";

  const [completed, setCompleted] = useState(false);
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  async function submitAppointment() {
    setScheduling(true);
    let details = {
      quoteID,
      summary,
      description,
      date,
      time,
    };
    try {
      const response = await fetch(
        "http://localhost:3001/scheduling/createEvent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(details),
        }
      );

      if (!response.ok) {
        setScheduling(false);
        setErrorText("Could not create event");
        console.log(response);
        // throw new Error("Network response was not ok");
        return;
      }

      const data = await response.json();
      setCompleted(true);
      setScheduling(false);
    } catch (err: any) {
      console.log(err);
      setErrorText(err);
      setScheduling(false);
    }
  }

  function isValidQuote(quote: string) {
    // Define a regular expression pattern for quote validation.
    // const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // return pattern.test(quote);
    return quote.length > 5;
  }

  const [quoteID, setQuoteID] = useState(quoteFromParam);
  const [quoteVerfied, setQuoteVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [failedSearch, setFailedSearch] = useState(false);
  const [errorText, setErrorText] = useState("");

  const [scheduling, setScheduling] = useState(false);

  const quoteInput = useRef<HTMLInputElement>(null);

  const [timer, setTimer] = useState<NodeJS.Timeout>();

  const handleQuoteIDValidation = async (e: any) => {
    if (!isValidQuote(quoteID)) {
      return;
    }

    setFailedSearch(false);
    setVerifying(true);
    setErrorText("");

    try {
      const response = await fetch(`http://localhost:3000/quotes/${quoteID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setVerifying(false);

      if (!response.ok) {
        setErrorText("Invalid Quote ID.");
        setQuoteVerified(false);
        return;
      }

      const data = await response.json();

      if (data.scheduled == true) {
        setErrorText("This quote has already been scheduled.");
        return;
      }

      //quote statuses can be:
      // ["Pending", "Accepted", "Declined", "Completed"]
      //only allow sheduling if quote is in accepted state
      if (data.quoteStatus != "Accepted") {
        setErrorText("This quote has not been accepted yet.");
        return;
      }

      setQuoteVerified(true);
    } catch (err: any) {
      console.log(err);
      setErrorText(err);
    }
  };

  function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1 + "").padStart(2, "0");
    const day = (date.getDate() + "").padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <PaddingSectionLayout id="scheduling-appointment">
      {!completed ? (
        <>
          <h2 className="text-3xl font-bold">Schedule an Appointment</h2>
          <br />
          <div className="w-full max-w-xl mb-6">
            <label className="block text-gray-500 text-md mb-2">
              Before we begin, please enter the QuoteID associated with your
              quote.
            </label>
            <div className=" text-red-500">{errorText}</div>
            <input
              ref={quoteInput}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Quote number"
              value={quoteID}
              onChange={(e) => setQuoteID(e.target.value)}
            />
            {failedSearch && (
              <p className="text-yellow-600">Quote was not found.</p>
            )}
            {verifying && <p className="italic">Verifying...</p>}
          </div>
          <button
            onClick={(e) => handleQuoteIDValidation(e)}
            className="py-2 px-4 font-medium rounded  text-white bg-[#2A3036] hover:bg-[#4e555c] duration-150"
          >
            Continue
          </button>
          {quoteVerfied && (
            <>
              <p className="text-green-500 mt-4 font-semibold">
                Quote Verified! Continue making appointment.
              </p>
              <br />
              <form
                className="w-full max-w-xl"
                onSubmit={(e) => {
                  e.preventDefault();
                  submitAppointment();
                }}
              >
                <div className="w-full mb-6">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Summary
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="Kitchen Remodel"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                  />
                </div>
                <div className="w-full mb-6">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Description
                  </label>
                  <textarea
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="Any notes you want to add..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-8">
                  <div className="mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Date
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="date"
                      value={date}
                      required
                      onChange={(e) => setDate(e.target.value)}
                      min={getCurrentDate()}
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Time
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="time"
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      min="07:00"
                      max="15:00"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <div className="w-full md:w-1/3 mb-6">
                    <button
                      type="submit"
                      className="appearance-none block w-full  rounded py-3 px-4 leading-tight bg-[#2D333A] text-white"
                    >
                      Schedule
                    </button>
                    {scheduling && <p className="italic">Scheduling...</p>}
                  </div>
                </div>
              </form>
            </>
          )}
        </>
      ) : (
        <h2 className="font-bold text-lg tracking-tight md:text-3xl w-full text-center">
          Thank you for scheduling an appointment!
          <br />
          You will be getting an email confirmation shortly.
        </h2>
      )}
    </PaddingSectionLayout>
  );
};

export default ScheduleAppointment;
