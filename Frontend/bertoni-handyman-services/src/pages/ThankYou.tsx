import React from "react";

const ThankYouPage: React.FC = () => {
  return (
    <div className="flex flex-col justify-start flex-grow h-screen px-4 pt-16">
      <div className="pt-6 m-6 text-center">
        <span className="text-5xl font-bold text-gray-700">Sent!</span>
      </div>
      <h2 className="my-4 text-3xl font-semibold text-center text-orange-500">
        Thanks for contacting Bertoni Handyman Services!
      </h2>
      <p className="mt-6 text-2xl text-center text-gray-600">
        We'll be in touch soon.
      </p>
    </div>
  );
};

export default ThankYouPage;
