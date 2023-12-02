import React from "react";

const PageLayout = ({ children }) => {
  return (
    <>
      <main className="bg-white flex flex-col overflow-hidden min-h-screen">
        {children}
      </main>
    </>
  );
};

export default PageLayout;
