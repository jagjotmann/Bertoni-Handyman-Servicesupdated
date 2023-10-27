import React from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();

  // Handles the form submission and redirects to the "thankyou" page.
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/thankyou");
  };

  return (
    <div className="h-screen max-w-screen-md p-6 py-2 pt-10 mx-auto">
      {/* Heading for the contact form */}
      <h2 className="text-4xl font-extrabold text-center text-gray-900 py-9">
        Contact
      </h2>
      <div className="p-6 bg-gray-200 rounded-md ">
        <form action="#" onSubmit={handleFormSubmit}>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full px-2 md:w-1/2">
              {/* Label for the first name field */}
              <label
                htmlFor="firstName"
                className="block my-2 text-sm font-medium text-left text-gray-900"
              >
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                placeholder="Jane"
                aria-required="true" // Adds aria-required for better screen reader experience.
                required
              />
            </div>
            <div className="w-full px-2 md:w-1/2">
              {/* Label for the last name field */}
              <label
                htmlFor="lastName"
                className="block my-2 text-sm font-medium text-left text-gray-900"
              >
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                placeholder="Doe"
                aria-required="true" // Adds aria-required for better screen reader experience.
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full px-2 md:w-1/2">
              {/* Label for the phone field */}
              <label
                htmlFor="phone"
                className="block my-2 text-sm font-medium text-left text-gray-900"
              >
                Phone (Optional)
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                placeholder="(123) 456-7890"
                aria-label="Phone number" // More descriptive aria-label for screen readers.
              />
            </div>
            <div className="w-full px-2 md:w-1/2">
              {/* Label for the email field */}
              <label
                htmlFor="email"
                className="block my-2 text-sm font-medium text-left text-gray-900"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                placeholder="jane.doe@example.com"
                aria-required="true" // Adds aria-required for better screen reader experience.
                required
              />
            </div>
          </div>
          <div className="mt-4">
            {/* Label for the message field */}
            <label
              htmlFor="message"
              className="block my-2 text-sm font-medium text-left text-gray-900"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 shadow-sm border border-gray-300"
              placeholder="Describe your home repair needs or ask a question..."
              aria-required="true" // Adds aria-required for better screen reader experience.
              required
            ></textarea>
          </div>
          {/* Submit button for the form */}
          <button
            type="submit"
            className="p-2 px-10 my-4 font-bold text-white transition-transform transform bg-orange-500 rounded-md hover:scale-105"
          >
            Send
          </button>
        </form>
      </div>
      <div className="mb-10"></div>
    </div>
  );
};

export default Contact;
