import React from "react";
import FullSectionLayout from "../layouts/FullSectionLayout";

const footerStyle = {
  fontFamily: 'Inter',
  fontSize: '20px',
  fontWeight: 400,
  lineHeight: '24px',
  letterSpacing: '0em',
  textAlign: 'left',
};

const Footer = () => {
  return (
    <footer style={footerStyle}>
      @ 2023 Bertoni Handyman Services. All rights reserved.
    </footer>
  );
}

export default Footer;
