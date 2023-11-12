import React, { useState, useRef } from "react";
import PageLayout from "../layouts/PageLayout";
import PaddingSectionLayout from "../layouts/PaddingSectionLayout";
import EditProfileModal from "./UI/EditProfileModal";

interface EmailDashboardProps {
  email?: string;
  quoteNumber?: string;
}

interface StatusIndicatorStyles {
  dot: React.CSSProperties;
  text: React.CSSProperties & { content: string };
}

const EmailDashboard: React.FC<EmailDashboardProps> = ({ quoteNumber }) => {
  const [isEditProfileModalVisible, setIsEditProfileModalVisible] =
    useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleEditProfileModal = () => {
    setIsEditProfileModalVisible(!isEditProfileModalVisible);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const deleteImage = () => {
    setSelectedImage(null);
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
  // Styles for the "Waiting for Email" status
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
          <section className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-bold">Welcome, Jeff Richard</h1>
            <button
              className="text-gray-600 hover:underline"
              style={{
                fontSize: "20px",
                background: "none",
                border: "none",
                textDecoration: "underline",
              }}
              onClick={toggleEditProfileModal}
            >
              Edit Profile
            </button>
          </section>

          {/* Status Indicators Section */}
          <section className="flex flex-col items-start text-left">
            <div className="flex gap-4 flex-wrap justify-start">
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

          <hr
            style={{
              borderTop: "2px solid black",
              width: "100%",
              margin: "20px 0",
              textAlign: "center",
            }}
          />

          <section className="flex flex-col items-start text-left">
            <h2 className="text-4xl font-bold">Chat history</h2>
            <p
              style={{
                color: "gray",
                fontSize: "10px",
              }}
            >
              {" "}
              Chat started at 9/10/2024 at 3:40pm
            </p>
            {/* Chat content here */}
            {/* Chat Messages */}
            <div className="mt-4 mb-2">
              <div className="mb-2 font-bold">You</div>
              <p
                style={{
                  color: "gray",
                  fontSize: "10px",
                }}
              >
                {" "}
                9/10/2024, 3:40pm
              </p>
              <div className="bg-gray-200 p-3 rounded-lg max-w-lg mb-2">
                <p>Text</p>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {/* Mock images */}
                <div className="bg-orange-300 p-3 rounded-lg cursor-pointer">
                  Image
                </div>
                <div className="bg-orange-300 p-3 rounded-lg cursor-pointer">
                  Image
                </div>
              </div>
            </div>
            <hr
              style={{
                borderTop: "1px solid #D3D3D3",
                width: "100%",
                margin: "20px 0",
                textAlign: "center",
              }}
            />
            <div className="mt-4 mb-2">
              <div className="mb-2 font-bold">Bertoni Handyman Services</div>
              <p
                style={{
                  color: "gray",
                  fontSize: "10px",
                }}
              >
                {" "}
                9/10/2024, 3:40pm
              </p>
              <div className="bg-gray-200 p-3 rounded-lg max-w-lg">
                <p>Text</p>
              </div>
            </div>
            <hr
              style={{
                borderTop: "1px solid #D3D3D3",
                width: "100%", // Set the width to fit the content area
                textAlign: "center",
                margin: "20px 0",
              }}
            />

            <textarea
              style={{
                width: "100%",
                borderRadius: "18px",
                padding: "10px 15px",
                border: "none",
                margin: "10px 0",
                backgroundColor: "#f1f0f0",
              }}
              placeholder="Begin typing..."
            />
            {/* File input for attaching images */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
              accept="image/*"
            />
            {/* Attach image button */}

            <button
              onClick={() => fileInputRef.current?.click()}
              style={{
                backgroundColor: "#D3D3D3", // Gray background
                color: "#000", // Text color
                padding: "10px 15px",
                borderRadius: "4px", // Slightly rounded corners
                border: "1px solid #C0C0C0", // Slightly darker border for definition
                fontSize: "16px",
                margin: "10px 0",
                cursor: "pointer",
              }}
            >
              <span>Attach Image</span>
            </button>
            {/* Display the selected image and a delete button */}
            {selectedImage && (
              <div style={{ position: "relative", display: "inline-block" }}>
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected"
                  style={{
                    width: "100px",
                    borderRadius: "10px",
                    margin: "10px 0",
                  }}
                />
                <button
                  onClick={deleteImage}
                  style={{
                    position: "absolute",
                    top: "0",
                    right: "0",
                    background: "red",
                    borderRadius: "50%",
                    border: "none",
                    color: "white",
                  }}
                >
                  X
                </button>
              </div>
            )}
            {/* Add chat button */}
            <div>
              <button
                style={{
                  backgroundColor: "#000",
                  color: "#fff",
                  padding: "10px 15px",
                  borderRadius: "0px",
                  border: "none",
                  margin: "10px 0",
                }}
              >
                Add chat
              </button>
            </div>
          </section>
        </PaddingSectionLayout>
      </PageLayout>

      {isEditProfileModalVisible && (
        <EditProfileModal onClose={toggleEditProfileModal} />
      )}
    </div>
  );
};

export default EmailDashboard;
