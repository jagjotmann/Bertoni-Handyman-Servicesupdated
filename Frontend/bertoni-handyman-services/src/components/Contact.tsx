import React from "react";
import PaddingSectionLayout from "../layouts/PaddingSectionLayout";

const Contact = () => {
  return (
    <PaddingSectionLayout>
      <div 
        className="mx-auto px-4 text-center" 
        style={{ maxWidth: '760px' }} // Adjust this width to match your mockup's width
      >
        <h2 
          style={{ 
            fontSize: '24px', // Adjust font size as needed
            fontWeight: '600', // Adjust font weight as needed: '400' for regular, '600' for semi-bold
            color: '#333', // Adjust the color to match your mockup
            marginBottom: '16px', // Adjust the space between the header and the email
          }}
        >
          Feel free to contact at:
        </h2>
        <p 
          style={{ 
            fontSize: '20px', // Adjust font size as needed
            color: '#555', // Adjust the color to match your mockup
            marginBottom: '16px', // Adjust the space between elements
          }}
        >
          Bertoni.Sean@gmail.com
        </p>
        <p 
          style={{ 
            fontSize: '20px', // Adjust font size as needed
            color: '#555', // Adjust the color to match your mockup
            marginBottom: '16px', // Adjust the space between elements
          }}
        >
          (916) 508-1742
        </p>
        <h3 
          style={{ 
            fontSize: '20px', // Adjust font size as needed
            fontWeight: '600', // Adjust for semi-bold
            textTransform: 'uppercase', // Makes text uppercase
            letterSpacing: '1px', // Adjust letter spacing as needed
            color: '#333', // Adjust the color to match your mockup
          }}
        >
          Proudly Serving
        </h3>
        <h3 
          style={{ 
            fontSize: '20px', // Adjust font size as needed
            color: '#555', // Adjust the color to match your mockup
          }}
        >
          Sacramento and Surrounding Counties
        </h3>
      </div>
    </PaddingSectionLayout>
  );
};

export default Contact;
