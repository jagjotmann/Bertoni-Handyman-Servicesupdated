import React from "react";
import PaddingSectionLayout from "../layouts/PaddingSectionLayout";

const Contact = () => {
  const textStyle = {
    fontSize: '20px', // Adjust font size as needed
    fontWeight: '600', // Adjust font weight to match the mockup, '600' for semi-bold
    color: '#333', // Adjust the color to match your mockup
  };

  return (
    <PaddingSectionLayout>
      <div className="container mx-auto px-4" style={{ maxWidth: '1024px' }}>
        <div className="flex justify-between items-start">
          <div>
            <p style={textStyle}>Feel free to contact at:</p>
            <p style={textStyle}>Bertoni.Sean@gmail.com</p>
            <p style={textStyle}>(916) 508-1742</p>
          </div>
          <div className="text-right" style={{ maxWidth: '50%' }}> {/* This ensures the text does not stretch beyond half the container */}
            <p style={textStyle}>PROUDLY SERVING</p>
            <p style={textStyle}>SACRAMENTO AND</p>
            <p style={textStyle}>SURROUNDING COUNTIES</p>
          </div>
        </div>
      </div>
    </PaddingSectionLayout>
  );
};

export default Contact;
