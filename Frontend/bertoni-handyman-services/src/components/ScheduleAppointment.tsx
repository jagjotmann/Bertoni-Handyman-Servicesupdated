import React, { useRef, useState, useEffect } from "react";
import PaddingSectionLayout from "../layouts/PaddingSectionLayout";

let today = new Date();
let tomorrow = new Date(today);

tomorrow.setDate(today.getDate() + 1);

type Event = {
  summary: string;
  description: string;
  start: {
    dateTime: string;
  };
  end: {
    dateTime: string;
  };
  attendees: {
    email: string;
  }[];
  reminders: {
    useDefault: boolean;
    overrides: {
      method: string;
      minutes: number;
    }[];
  };
};

let event = {
  summary: "Sample Event happening Tomorrow!",
  description:
    "This is your sample event created from Murilloves' Google Calendar NODEJS API",
  start: {
    dateTime: today.toISOString(),
  },
  end: {
    dateTime: tomorrow.toISOString(),
  },
  attendees: [{ email: "email1@gmail.com" }, { email: "email2@gmail.com" }],
  reminders: {
    useDefault: false,
    overrides: [
      { method: "email", minutes: 24 * 60 },
      { method: "popup", minutes: 30 },
    ],
  },
};

const ScheduleAppointment = () => {
  const [completed, setCompleted] = useState(false);

  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  async function submitAppointment() {
    let details = {
      email,
      summary,
      description,
      date,
      time,
    };
    setCompleted(true);
    return;
    try {
      const response = await fetch(
        "http://localhost:3000/scheduling/createEvent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: details }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      setCompleted(true);
    } catch (err: any) {
      console.log(err);
    }
  }

  function isValidEmail(email: string) {
    // Define a regular expression pattern for email validation.
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }

  const [email, setEmail] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [failedSearch, setFailedSearch] = useState(false);

  const emailInput = useRef<HTMLInputElement>(null);

  function handleFocus() {
    if (emailInput.current) {
      emailInput.current.blur();
    }
  }

  const [timer, setTimer] = useState<NodeJS.Timeout>();

  const handleEmailValidation = async (e: any) => {
    e.preventDefault();
    setFailedSearch(false);
    setEmail(e.target.value);

    if (isValidEmail(email)) {
      clearTimeout(timer);
      const newTimer = setTimeout(async () => {
        setVerifying(true);
        let response = await verify(email);
        if (response) {
          setEmailVerified(true);
          setVerifying(false);
          setFailedSearch(false);
        } else {
          setEmailVerified(false);
          setVerifying(false);
          setFailedSearch(true);
        }
        handleFocus();
      }, 1000);
      setTimer(newTimer);
    }
  };

  function verify(email: string) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 2000);
    });
  }

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
              Before we begin, please enter the email address associated with
              your account.
            </label>
            <input
              ref={emailInput}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Type your email..."
              value={email}
              onChange={(e) => handleEmailValidation(e)}
            />
            {failedSearch && (
              <p className="text-yellow-600">
                Email could not be connected to account.
              </p>
            )}
            {verifying && <p className="italic">Verifying...</p>}
          </div>
          {emailVerified && (
            <>
              <p className="text-green-500">
                Email Verified! Continue making appointment.
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
