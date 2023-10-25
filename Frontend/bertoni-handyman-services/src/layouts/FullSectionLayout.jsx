import React from "react";

const FullSectionLayout = ({ children }) => {
  return (
    <>
      <section className="w-full">{children}</section>
    </>
  );
};

export default FullSectionLayout;
