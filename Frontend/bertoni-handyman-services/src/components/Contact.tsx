import React from "react";
import PaddingSectionLayout from "../layouts/PaddingSectionLayout";

const Contact = () => {
  return (
    <PaddingSectionLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Feel free to contact at:</h2>
          <p className="mt-2 text-lg text-gray-600">Bertoni.Sean@gmail.com</p>
          <p className="text-lg text-gray-600">(916) 508-1742</p>
          <h3 className="mt-4 text-xl font-bold text-gray-800 uppercase">Proudly Serving</h3>
          <h3 className="text-lg text-gray-600">Sacramento and Surrounding Counties</h3>
        </div>
      </div>
    </PaddingSectionLayout>
  );
};

export default Contact;
