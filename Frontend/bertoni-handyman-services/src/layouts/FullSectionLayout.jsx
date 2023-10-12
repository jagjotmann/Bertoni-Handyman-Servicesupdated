import React from "react";

const FullSectionLayout = ({ children }) => {
  return (
    <>
      <section className="w-full bg-slate-400">{children}</section>
    </>
  );
};

export default FullSectionLayout;
