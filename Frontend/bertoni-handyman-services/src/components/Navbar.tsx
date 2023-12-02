import React, { useState, useEffect } from "react";
import FullSectionLayout from "../layouts/FullSectionLayout";
import { IoIosHome } from "react-icons/io";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    {
      href: "/",
      label: "Home",
      className:
        "text-xl sm:text-lg hover:text-blue-600 transition duration-300 transition-transform transform hover:scale-110",
    },
    {
      href: "/#services-section",
      label: "Services",
      className:
        "text-xl sm:text-lg hover:text-blue-600 transition duration-300 transition-transform transform hover:scale-110",
    },
    {
      href: "/#testimonials-section",
      label: "Testimonials",
      className:
        "text-xl sm:text-lg hover:text-blue-600 transition duration-300 transition-transform transform hover:scale-110",
    },
  ];

  const navButtons = [
    {
      href: "/get-a-quote",
      label: "Get A Quote",
      className:
        "bg-orange-500 text-black shadow-custom-shadow text-2xl sm:text-xl px-6 sm:px-4 py-3 sm:py-2 font-bold transition-transform transform hover:scale-105",
    },
    {
      href: "/contact",
      label: "Contact",
      className:
        "bg-white text-black shadow-custom-shadow text-2xl sm:text-xl px-6 sm:px-4 py-3 sm:py-2 font-bold transition-transform transform hover:scale-105",
    },
    {
      href: "/QuoteStatus",
      label: "Quote Status",
      className:
        "bg-custom-gray text-white shadow-custom-shadow text-2xl sm:text-xl px-6 sm:px-4 py-3 sm:py-2 font-bold transition-transform transform hover:scale-105",
    },
  ];

  const mobileNavButtons = [
    {
      href: "/get-a-quote",
      label: "Get A Quote",
      className:
        "bg-orange-500 text-black shadow-custom-shadow text-xs px-6 py-3 font-bold transition-transform transform hover:scale-105",
    },
    {
      href: "/contact",
      label: "Contact",
      className:
        "bg-white text-black shadow-custom-shadow text-xs px-6 py-3 font-bold transition-transform transform hover:scale-105",
    },
    {
      href: "/QuoteStatus",
      label: "Quote Status",
      className:
        "bg-custom-gray text-white shadow-custom-shadow text-xs px-6 py-3 font-bold transition-transform transform hover:scale-105",
    },
  ];

  const DefaultNavbar = () => {
    return (
      <div className="bg-custom-gray">
        <div className="container mx-auto flex items-center justify-between p-5 text-white">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={link.className}>
              {link.label}
            </a>
          ))}

          {navButtons.map((button) => (
            <a
              key={button.href}
              href={button.href}
              className={button.className}
            >
              {button.label}
            </a>
          ))}
        </div>
      </div>
    );
  };

  const MobileNavbar = () => {
    return (
      <div className="bg-custom-gray">
        <div className="container mx-auto flex items-center justify-between p-5 text-white">
          <a
            href="/"
            className="transform transition transition-transform duration-300 hover:scale-110 hover:text-blue-600"
          >
            <IoIosHome style={{ fontSize: "30px" }} />
          </a>
          {mobileNavButtons.map((button) => (
            <a
              key={button.href}
              href={button.href}
              className={button.className}
            >
              {button.label}
            </a>
          ))}
        </div>
      </div>
    );
  };

  return (
    <FullSectionLayout>
      {isMobile ? <MobileNavbar /> : <DefaultNavbar />}
    </FullSectionLayout>
  );
};

export default Navbar;
