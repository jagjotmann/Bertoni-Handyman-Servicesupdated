import React from "react";
import FullSectionLayout from "../layouts/FullSectionLayout";

const Footer = () => {
  return (
    <FullSectionLayout>
      <footer className="py-4 text-center bg-gray-100">
        <div className="text-gray-800 font-inter">
          &copy; 2023 Bertoni Handyman Services. All rights reserved.
        </div>
      </footer>
    </FullSectionLayout>
  );
};

export default Footer;
