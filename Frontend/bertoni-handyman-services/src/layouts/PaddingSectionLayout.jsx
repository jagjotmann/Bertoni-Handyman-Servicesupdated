import React from "react";

const PaddingSectionLayout = ({ children }) => {
  return (
    <>
      <section className="w-full p-8 md:p-20 bg-slate-300">{children}</section>
    </>
  );
};

export default PaddingSectionLayout;
