import React from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/thankyou");
  };

  return (
    <div className="max-w-screen-md p-6 py-2 mx-auto">
      <h2 className="text-4xl font-extrabold text-center text-gray-900 py-9">
        Contact
      </h2>
      <div className="p-6 bg-gray-200 ">
        <form action="#" onSubmit={handleFormSubmit}>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full px-2 md:w-1/2">
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
                required
              />
            </div>
            <div className="w-full px-2 md:w-1/2">
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
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full px-2 md:w-1/2">
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
              />
            </div>
            <div className="w-full px-2 md:w-1/2">
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
                required
              />
            </div>
          </div>
          <div className="mt-4">
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
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="p-2 px-10 my-4 text-white bg-orange-500 rounded-md hover:scale-105"
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
