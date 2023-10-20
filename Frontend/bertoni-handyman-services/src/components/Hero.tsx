import React from "react";
import FullSectionLayout from "../layouts/FullSectionLayout";
import heroBackgroundImage from "../images/hero_bg.jpeg";

const heroStyle = {
  backgroundImage: `url(${heroBackgroundImage})`,
  height: "80vh",
  backgroundSize: "cover",
};

const Hero = () => {
  return (
    <FullSectionLayout>
      <div
        // Using a section to denote a standalone section of the webpage.
        role="section"
        aria-label="Hero section"
        className="hero-container bg-cover bg-left flex justify-start items-center p-4 sm:p-8 md:p-12 lg:p-16"
        style={heroStyle}
      >
        <div className="content-container ml-4 sm:ml-8 md:ml-12 lg:ml-16 mt-4 sm:mt-5 md:mt-8 lg:mt-10">
          {/* Using headings to provide a hierarchy of information */}
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">Bertoni's Handyman</h1>
          <h2 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">Services</h2>
          <p className="text-white text-2xl sm:text-3xl md:text-3xl lg:text-4xl pt-4 sm:pt-6 md:pt-8 lg:pt-14">Your best choice for remodeling and renovation.</p>
          <div className="button-container mt-8 sm:mt-10 md:mt-12 lg:mt-16">
            {/* Adding aria-label to provide more context for screen readers */}
            <button 
              aria-label="Get a quote for Bertoni's Handyman services"
              className="bg-orange-500 text-black text-xl sm:text-2xl md:text-2xl lg:text-3xl px-4 sm:px-6 md:px-7 lg:px-9 py-3 sm:py-4 md:py-5 lg:py-6 font-bold mr-4 sm:mr-6 md:mr-8 lg:mr-10 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              Get a Quote
            </button>
            {/* Adding aria-label to provide more context for screen readers */}
            <button 
              aria-label="Contact Bertoni's Handyman services"
              className="bg-white text-black text-xl sm:text-2xl md:text-2xl lg:text-3xl px-6 sm:px-8 md:px-10 lg:px-14 py-3 sm:py-4 md:py-5 lg:py-6 font-bold focus:outline-none focus:ring-2 focus:ring-black"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </FullSectionLayout>
  );
};

export default Hero;