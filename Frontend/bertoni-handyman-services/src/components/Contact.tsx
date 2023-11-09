import React from "react";
import PaddingSectionLayout from "../layouts/PaddingSectionLayout";

const Contact = () => {
  const customStyles = {
    container: {
      maxWidth: '760px', // Adjust this width to match your mockup's width
    },
    header: {
      fontSize: '24px', // Adjust font size as needed
      fontWeight: '600', // Adjust font weight as needed: '400' for regular, '600' for semi-bold
      color: '#333', // Adjust the color to match your mockup
      marginBottom: '16px', // Adjust the space between the header and the email
    },
    text: {
      fontSize: '20px', // Adjust font size as needed
      color: '#555', // Adjust the color to match your mockup
      marginBottom: '16px', // Adjust the space between elements
    },
    serving: {
      fontSize: '20px', // Adjust font size as needed
      fontWeight: '600', // Adjust for semi-bold
      textTransform: 'uppercase', // Makes text uppercase
      letterSpacing: '1px', // Adjust letter spacing as needed
      color: '#333', // Adjust the color to match your mockup
    }
  };

  return (
    <PaddingSectionLayout>
      <div style={customStyles.container} className="mx-auto px-4 text-center">
        <h2 style={customStyles.header}>Feel free to contact at:</h2>
        <p style={customStyles.text}>Bertoni.Sean@gmail.com</p>
        <p style={customStyles.text}>(916) 508-1742</p>
        <h3 style={customStyles.serving}>Proudly Serving</h3>
        <h3 style={customStyles.text}>Sacramento and Surrounding Counties</h3>
      </div>
    </PaddingSectionLayout>
  );
};

export default Contact;
