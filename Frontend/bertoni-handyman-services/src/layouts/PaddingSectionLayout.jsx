import React from "react";

const PaddingSectionLayout = ({ id = "default", children }) => {
  return (
    <>
      <section id={id} className="min-h-screen w-full p-8 md:px-20 md:py-10">
        {children}
      </section>
    </>
  );
};

export default PaddingSectionLayout;
