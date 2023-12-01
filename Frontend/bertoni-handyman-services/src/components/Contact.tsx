import React from "react";
import PaddingSectionLayout from "../layouts/PaddingSectionLayout";

const Contact = () => {
  return (
    <PaddingSectionLayout>
      <div className="container mx-auto px-4">
        <div className="md:flex justify-between items-center">
          <div>
            <h2 style={{ fontSize: "24px", fontWeight: "600", color: "#333" }}>
              Feel free to contact at:
            </h2>
            <p style={{ fontSize: "20px", color: "#555" }}>
              Bertoni.Sean@gmail.com
            </p>
            <p style={{ fontSize: "20px", color: "#555" }}>(916) 508-1742</p>
          </div>
          <div className="md:text-right pt-5">
            <h3
              style={{
                fontSize: "24px",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "1px",
                color: "#333",
              }}
            >
              Proudly Serving
            </h3>
            <h3
              style={{
                fontSize: "24px",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "1px",
                color: "#333",
              }}
            >
              Sacramento and
            </h3>
            <h3
              style={{
                fontSize: "24px",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "1px",
                color: "#333",
              }}
            >
              Surrounding Counties
            </h3>
          </div>
        </div>
      </div>
    </PaddingSectionLayout>
  );
};

export default Contact;
