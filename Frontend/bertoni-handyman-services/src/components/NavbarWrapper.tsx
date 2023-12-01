import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar"; // Adjust the import path as needed

function NavbarWrapper() {
  const location = useLocation();

  // Conditionally render Navbar based on the route
  if (location.pathname !== "/admin") {
    return <Navbar />;
  }

  return null; // Return null if we're on the admin route
}

export default NavbarWrapper;
