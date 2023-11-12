import React from "react";
import PageLayout from "../layouts/PageLayout";
import PaddingSectionLayout from "../layouts/PaddingSectionLayout";

const EmailDashboard = ({ email }) => {
  return (
    <PageLayout>
      <PaddingSectionLayout>
        <section className="flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold">Welcome, {email}</h1>
          {/* Add more personalized content here */}
          <p>
            Your past services, settings, and profile information will be
            displayed here.
          </p>
          {/* ... additional elements ... */}
        </section>
      </PaddingSectionLayout>
    </PageLayout>
  );
};

export default EmailDashboard;
