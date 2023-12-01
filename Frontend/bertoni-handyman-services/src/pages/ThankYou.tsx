import React from "react";

const ThankYouPage: React.FC = () => {
  return (
    // Use a `role` and `aria-live` to alert screen readers immediately when this page loads.
    // `aria-live` with the value "polite" will notify screen reader users of the update without interrupting.
    <div
      role="alert"
      aria-live="polite"
      className="flex flex-col justify-start flex-grow min-h-screen px-4 pt-16"
    >
      <div className="pt-6 m-6 text-center">
        <span className="text-5xl font-bold text-gray-700">Sent!</span>
      </div>

      {/* // Heading elements like <h2> are already accessible and can be navigated by screen reader users. */}
      <h2 className="my-4 text-3xl font-semibold text-center text-orange-500">
        Thanks for contacting Bertoni Handyman Services!
      </h2>

      <p className="mt-6 text-2xl text-center text-gray-600">
        We'll be in touch soon.
      </p>
    </div>
  );
};

// Export the ThankYouPage component to be used elsewhere in the app.
export default ThankYouPage;
