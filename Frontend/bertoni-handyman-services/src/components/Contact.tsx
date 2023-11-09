import React from "react";
import PaddingSectionLayout from "../layouts/PaddingSectionLayout";

const Contact = () => {
  return (
    <PaddingSectionLayout>
      <div className="contact-container">
      <div className="contact-header">
        <h2>Feel free to contact at:</h2>
        </div>
        <div className="contact-info">
        <p>Bertoni.Sean@gmail.com</p>
        <p>(916) 508-1742</p>
        </div>
        <div className="contact-serving">
        <h3>PROUDLY SERVING</h3>
        <h3>SACRAMENTO AND</h3>
        <h3>SURROUNDING COUNTIES</h3>
      </div>
      </div>
    </PaddingSectionLayout>
  );
};

export default Contact;
