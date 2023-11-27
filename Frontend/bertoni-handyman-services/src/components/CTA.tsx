import React, { ReactNode } from "react";
import FullSectionLayout from "../layouts/FullSectionLayout";
import ctaBackgroundImage from "../images/cta_bg.jpeg";
import { Link } from "react-router-dom";

const CTA = () => {
  const ctaStyle = {
    backgroundImage: `url(${ctaBackgroundImage})`,
    height: "60vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <FullSectionLayout>
      <div
        role="section"
        aria-label="cta section"
        className="cta-container relative bg-cover flex justify-center items-center p-4 sm:p-8 md:p-12 lg:p-16"
        style={ctaStyle}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="content-container z-10 text-center">
          <h3 className="text-white text-4xl sm:text-5xl md:text-5xl lg:text-7xl font-bold">
            Don't wait, get an estimate now!
          </h3>
          <br />
          <br />
          <div className="button-container">
            <Link to="/get-a-quote">
              <button
                aria-label="Get a quote for Bertoni's Handyman services"
                className="bg-orange-500 text-black text-xl sm:text-2xl md:text-2xl lg:text-3xl px-8 py-3 font-bold focus:outline-none focus:ring-2 focus:ring-orange-400 hover:scale-105 transition-transform"
              >
                Get a Quote
              </button>
            </Link>
          </div>
        </div>
      </div>
    </FullSectionLayout>
  );
};

export default CTA;
