import React from "react";
import PageLayout from "../layouts/PageLayout";
import PaddingSectionLayout from "../layouts/PaddingSectionLayout";

interface QuoteDashboardProps {
  quoteNumber: string;
}

interface StatusIndicatorStyles {
  dot: React.CSSProperties;
  text: React.CSSProperties & { content: string };
}

const QuoteDashboard: React.FC<QuoteDashboardProps> = ({ quoteNumber }) => {
  // Shared style for the containers
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "12px", // Maintain existing padding
    paddingRight: "24px", // Increase right padding
    border: "1px solid #E0E0E0",
    borderRadius: "16px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    backgroundColor: "white",
    width: "fit-content",
    marginBottom: "8px",
    marginRight: "8px",
  };

  // Styles for the "Pending approval" status
  const pendingStyle = {
    dot: {
      height: "8px", // Adjust dot size if needed
      width: "8px",
      backgroundColor: "#FFA500", // Orange color
    },
    text: {
      color: "#FFA500",
      fontSize: "14px", // Adjust status text font size if needed
    },
  };

  // Styles for the "Waiting for Quote" status
  const waitingStyle = {
    dot: {
      height: "8px",
      width: "8px",
      backgroundColor: "#808080", // Gray color
    },
    text: {
      color: "#808080",
      fontSize: "14px",
    },
  };

  // Function to render a status indicator
  const renderStatusIndicator = (
    title: string,
    styles: StatusIndicatorStyles
  ) => {
    return (
      <div style={containerStyle}>
        <div
          style={{ fontWeight: "bold", fontSize: "20px", marginBottom: "4px" }}
        >
          {title}
        </div>{" "}
        {/* Title font size set to 20px */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{ borderRadius: "50%", marginRight: "8px", ...styles.dot }}
          ></span>
          <span style={{ ...styles.text }}>{styles.text.content}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen max-w-screen-md p-6 py-2 mx-auto">
      <PageLayout>
        <PaddingSectionLayout>
          <section className="flex flex-col items-start text-left">
            {" "}
            {/* Adjusted for left alignment */}
            <h1 className="text-4xl font-bold mb-4">Quote #{quoteNumber}</h1>
            <p className="mb-1">
              *You are not signed in with a user account, so you cannot view or
              edit any requests or chats.
            </p>
            <p className="mb-1">
              To view and edit requests and chats, please create an account or
              sign in with your email.
            </p>
            <p className="mb-4">
              Please reach out to Bertoni's Handyman Service for any questions.
            </p>
            <div className="flex gap-4 flex-wrap justify-start">
              {" "}
              {/* Adjusted for left alignment */}
              {renderStatusIndicator("Quote Request", {
                ...pendingStyle,
                text: { content: "Pending approval", ...pendingStyle.text },
              })}
              {renderStatusIndicator("Appointment", {
                ...waitingStyle,
                text: { content: "Waiting for Quote", ...waitingStyle.text },
              })}
            </div>
          </section>
        </PaddingSectionLayout>
      </PageLayout>
    </div>
  );
};

export default QuoteDashboard;
