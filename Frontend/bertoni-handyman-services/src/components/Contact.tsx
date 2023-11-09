import React from "react";
import PaddingSectionLayout from "../layouts/PaddingSectionLayout";

const Contact = () => {
  return (
    <PaddingSectionLayout>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center" style={{ maxWidth: '1024px' }}> {/* Adjust this width to match your mockup's width */}
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#333' }}>
              Feel free to contact at:
            </h2>
            <p style={{ fontSize: '20px', color: '#555' }}>
              Bertoni.Sean@gmail.com
            </p>
            <p style={{ fontSize: '20px', color: '#555' }}>
              (916) 508-1742
            </p>
          </div>
          <div className="text-right">
            <h3 style={{ fontSize: '20px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', color: '#333' }}>
              Proudly Serving 
              Sacramento and 
              Surrounding Counties
            </h3>
            
          </div>
        </div>
      </div>
    </PaddingSectionLayout>
  );
};

export default Contact;
