import React from "react";
import PaddingSectionLayout from "../layouts/PaddingSectionLayout";

const Contact = () => {
  return (
    <PaddingSectionLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto"> {/* Adjust this max-width to match the design */}
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Feel free to contact at:</h2>
          <p className="text-lg text-gray-700">Bertoni.Sean@gmail.com</p>
          <p className="text-lg text-gray-700 mb-3">(916) 508-1742</p>
          <h3 className="text-lg font-semibold text-gray-900 uppercase tracking-wider">Proudly Serving</h3>
          <h3 className="text-lg text-gray-700">Sacramento and Surrounding Counties</h3>
        </div>
      </div>
    </PaddingSectionLayout>
  );
};

export default Contact;
