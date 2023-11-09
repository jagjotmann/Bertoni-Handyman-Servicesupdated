import React from "react";
import PaddingSectionLayout from "../layouts/PaddingSectionLayout";

const Contact = () => {
  return (
    <PaddingSectionLayout>
      <div 
        className="mx-auto px-4" 
        style={{ maxWidth: '1024px' }} // Adjust this width to match your mockup's width
      >
        <h2 
          style={{ 
            fontSize: '24px', // Adjust font size as needed
            fontWeight: '600', // Adjust font weight as needed: '400' for regular, '600' for semi-bold
            color: '#333', // Adjust the color to match your mockup
            marginBottom: '16px', // Adjust the space between the header and the email
            textAlign: 'left', // Align text to the left
          }}
        >
          Feel free to contact at:
        </h2>
        <p 
          style={{ 
            fontSize: '20px', // Adjust font size as needed
            color: '#555', // Adjust the color to match your mockup
            marginBottom: '16px', // Adjust the space between elements
            textAlign: 'left', // Align text to the left
          }}
        >
          Bertoni.Sean@gmail.com
        </p>
        <p 
          style={{ 
            fontSize: '20px', // Adjust font size as needed
            color: '#555', // Adjust the color to match your mockup
            marginBottom: '16px', // Adjust the space between elements
            textAlign: 'left', // Align text to the left
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
            textAlign: 'left', // Align text to the left
          }}
        >
          Proudly Serving Sacramento and Surrounding Counties
        </h3>
        <h3 
          style={{ 
            fontSize: '20px', // Adjust font size as needed
            color: '#555', // Adjust the color to match your mockup
            textAlign: 'right', // Align text to the left
          }}
      
          >
        </h3>
      </div>
    </PaddingSectionLayout>
  );
};

export default Contact;
