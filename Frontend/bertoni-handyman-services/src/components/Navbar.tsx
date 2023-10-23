import React, { useState } from "react";
import FullSectionLayout from "../layouts/FullSectionLayout";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    {
      href: "/",
      label: "Home",
      className:
        "text-xl hover:text-blue-600 transition duration-300 transition-transform transform hover:scale-110",
    },
    {
      href: "/services",
      label: "Services",
      className:
        "text-xl hover:text-blue-600 transition duration-300 transition-transform transform hover:scale-110",
    },
    {
      href: "/about",
      label: "About",
      className:
        "text-xl hover:text-blue-600 transition duration-300 transition-transform transform hover:scale-110",
    },
    {
      href: "/testimonials",
      label: "Testimonials",
      className:
        "text-xl hover:text-blue-600 transition duration-300 transition-transform transform hover:scale-110",
    },
  ];

  const navButtons = [
    {
      href: "/get-a-quote",
      label: "Get A Quote",
      className:
        "bg-orange-500 text-black shadow-custom-shadow text-2xl px-6 py-3 font-bold transition-transform transform hover:scale-105",
    },
    {
      href: "/contact",
      label: "Contact",
      className:
        "bg-white text-black shadow-custom-shadow text-2xl px-6 py-3 font-bold transition-transform transform hover:scale-105",
    },
    {
      href: "/signin",
      label: "Sign In",
      className:
        "bg-custom-gray text-white shadow-custom-shadow text-2xl px-6 py-3 font-bold transition-transform transform hover:scale-105",
    },
  ];

  return (
    <FullSectionLayout>
      <div className="bg-custom-gray">
        <div className="container mx-auto p-5 flex justify-between text-white items-center">
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
    </FullSectionLayout>
  );
};

export default Navbar;
