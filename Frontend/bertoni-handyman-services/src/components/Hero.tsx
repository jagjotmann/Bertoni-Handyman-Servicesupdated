import React from "react";
import FullSectionLayout from "../layouts/FullSectionLayout";
import heroBackgroundImage from "../images/hero_bg.jpeg";
import { Link } from "react-router-dom";

const Hero = () => {
  const heroStyle = {
    backgroundImage: `url(${heroBackgroundImage})`,
    height: "90vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <FullSectionLayout>
      <div
        role="section"
        aria-label="Hero section"
        className="hero-container bg-cover flex justify-start items-center p-4 sm:p-8 md:p-12 lg:p-16"
        style={heroStyle}
      >
        <div className="content-container ml-4 sm:ml-8 md:ml-12 lg:ml-16 mt-4 sm:mt-5 md:mt-8 lg:mt-10">
          <h1 className="text-white text-4xl sm:text-5xl md:text-5xl lg:text-7xl font-bold">Bertoni's Handyman</h1>
          <h2 className="text-white text-4xl sm:text-5xl md:text-5xl lg:text-7xl font-bold">Services</h2>
          <p className="text-white text-2xl sm:text-3xl md:text-3xl lg:text-4xl pt-4 sm:pt-6 md:pt-8 lg:pt-14">Your best choice for remodeling and renovation.</p>
          <div className="button-container mt-8 sm:mt-10 md:mt-12 lg:mt-16">
            <Link to="/get-a-quote">
              <button 
                aria-label="Get a quote for Bertoni's Handyman services"
                className="bg-orange-500 text-black text-xl sm:text-2xl md:text-2xl lg:text-3xl px-4 sm:px-5 md:px-6 lg:px-7 py-3 sm:py-3 md:py-4 lg:py-5 font-bold mr-4 sm:mr-6 md:mr-8 lg:mr-10 focus:outline-none focus:ring-2 focus:ring-orange-400 hover:scale-105 shadow-custom-shadow transition-transform"
              >
                Get a Quote
              </button>
            </Link>

            <Link to="/contact">
              <button 
                aria-label="Contact Bertoni's Handyman services"
                className="bg-white text-black text-xl sm:text-2xl md:text-2xl lg:text-3xl px-6 sm:px-7 md:px-8 lg:px-11 py-3 sm:py-3 md:py-4 lg:py-5 font-bold focus:outline-none focus:ring-2 focus:ring-black hover:scale-105 shadow-custom-shadow transition-transform"
              >
                Contact
              </button>
            </Link>
          </div>
        </div>
      </div>
    </FullSectionLayout>
  );
};

export default Hero;