import React from "react";
import { Link } from "react-router-dom";
import FullSectionLayout from "../layouts/FullSectionLayout";

const Footer = () => {
  // Get the current year using JavaScript's Date object
  const currentYear = new Date().getFullYear();

  return (
    <FullSectionLayout>
      <footer className="bg-gray-100 py-4 text-center">
        <div className="font-inter text-gray-800">
          &copy; {currentYear} Bertoni Handyman Services. All rights reserved.
        </div>
        {/* Link to Admin Login page */}
        <div className="mt-2">
          <Link
            to="/Login"
            className="text-gray-600 transition duration-300 hover:text-gray-800"
          >
            Admin Login
          </Link>
        </div>
      </footer>
    </FullSectionLayout>
  );
};

export default Footer;
