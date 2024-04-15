// AdminPage.tsx
import React from "react";
import QuoteRequests from "./QuoteRequests";
import Management from "./Management";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import {
  FaSignOutAlt,
  FaRegCalendar,
  FaUserFriends,
  FaEnvelope,
  FaCog,
  FaBuilding,
  FaChartBar,
} from "react-icons/fa";
import CreateQuote from "./CreateQuote";
import AdminDashboard from "../components/AdminDashboard";
import GoogleCalendar from "./GoogleCalendar";

function AdminPage() {
  // State to track which tab is currently selected
  const [selectedTab, setSelectedTab] = useState<string>("Dashboard");

  const navigate = useNavigate(); // Hook for navigation
  const location = useLocation();

  // Function to handle logout
  const handleLogout = () => {
    console.log("Removing token...");
    localStorage.removeItem("token"); // Remove the token from local storage
    console.log("Token removed");
    navigate("/login"); // Redirect to login page.
  };

  // Function to set the selected tab
  const handleTabClick = (tabName: string) => {
    setSelectedTab(tabName);
  };

  //GoogleCalendar EmbedURL
  const embedUrl =
    "https://calendar.google.com/calendar/embed?src=wizardsweb42%40gmail.com&ctz=America%2FLos_Angeles";

  // Function to determine the style of a tab based on its current selection status
  const getTabStyle = (tabName: string) => {
    if (location.pathname === tabName) {
      return {
        container: "text-gray-500",
        icon: "text-gray-500",
        text: "text-gray-500",
      }; // Style for the selected tab
    } else {
      return {
        container: "",
        icon: "",
        text: "",
      }; // Default style for other tabs
    }
  };

  return (
    <div className="flex">
      {/* Sidebar section */}
      <aside className="h-screen">
        {/* The `Disclosure` component from `@headlessui/react` provides an accessible hide/show functionality */}
        <Disclosure as="nav">
          {/* Hamburger button for mobile view / responsiveness */}
          <Disclosure.Button className="group peer absolute right-4 top-4 inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <GiHamburgerMenu
              className="block h-6 w-6 text-gray-500 md:hidden"
              aria-hidden="true"
            />
          </Disclosure.Button>
          {/* Container for the sidebar content */}
          <div className="peer:transition fixed -left-96 top-0 z-20 h-screen w-1/2 bg-gray-800 p-3 delay-150 duration-200 ease-out peer-focus:left-0 lg:left-0 lg:w-60">
            <div className="flex h-full flex-col justify-between">
              {/* Top section of the sidebar */}
              <div className="flex-1">
                {/* Header section with logo and sign-out button */}
                <div className="mb-6 flex items-center justify-between border-b border-gray-700 pb-4">
                  {/* Placeholder for the logo */}
                  <svg
                    width="90"
                    height="45"
                    viewBox="0 0 157 78"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="2.23223"
                      y1="50.519"
                      x2="44.8057"
                      y2="7.94549"
                      stroke="url(#paint0_linear_2_10)"
                      stroke-width="5"
                    />
                    <path
                      d="M45.7631 5.69855C44.492 5.15932 43.0245 5.75257 42.4853 7.02363C41.946 8.29469 42.5393 9.76223 43.8104 10.3015L45.7631 5.69855ZM142.81 52.3015L145.112 53.2778L147.065 48.6749L144.763 47.6985L142.81 52.3015ZM43.8104 10.3015L142.81 52.3015L144.763 47.6985L45.7631 5.69855L43.8104 10.3015Z"
                      fill="url(#paint1_linear_2_10)"
                    />
                    <rect
                      x="36.7867"
                      y="44"
                      width="8"
                      height="8"
                      fill="#FDA91E"
                    />
                    <rect
                      x="46.7867"
                      y="44"
                      width="8"
                      height="8"
                      fill="#FDA91E"
                    />
                    <rect
                      x="46.7867"
                      y="35"
                      width="8"
                      height="8"
                      fill="#FDA91E"
                    />
                    <rect
                      x="36.7867"
                      y="35"
                      width="8"
                      height="8"
                      fill="#FDA91E"
                    />
                    <path
                      d="M85.8624 52.4114L145.275 53.2034L44.0214 10.2238L85.8624 52.4114Z"
                      fill="url(#paint2_linear_2_10)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_2_10"
                        x1="-5.2132"
                        y1="59.5001"
                        x2="45.2868"
                        y2="7.50007"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FB6900" />
                        <stop offset="1" stop-color="#FEB423" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_2_10"
                        x1="199.787"
                        y1="47"
                        x2="70.7868"
                        y2="-13.5001"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FB6900" />
                        <stop offset="1" stop-color="#FEB423" />
                      </linearGradient>
                      <linearGradient
                        id="paint2_linear_2_10"
                        x1="201.787"
                        y1="59.5"
                        x2="14.2867"
                        y2="-13.5"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#FB6900" />
                        <stop offset="1" stop-color="#FEC42B" />
                      </linearGradient>
                    </defs>
                  </svg>
                  {/* Sign out button with icon */}
                  <button
                    onClick={handleLogout}
                    className="flex flex-none items-center justify-center rounded-full bg-white p-2 px-3 text-sm text-gray-800 transition-transform hover:scale-105"
                  >
                    Sign out <FaSignOutAlt className="ml-1" />
                  </button>
                </div>

                {/* Main navigation items */}
                <section className="my-4 border-b border-gray-700 pb-4">
                  {/* Each `div` here represents a navigation item with an icon and label */}

                  {/* Dashboard navigation item/Tab */}

                  <Link to="/admin/dashboard">
                    <div
                      className={`group m-auto mb-2 flex cursor-pointer items-center justify-start gap-4 rounded-md p-2 ${
                        getTabStyle("/admin/dashboard").container
                      }`}
                      onClick={() => handleTabClick("Dashboard")}
                    >
                      <FaChartBar
                        className={`text-2xl text-gray-100 group-hover:text-gray-500 ${
                          getTabStyle("/admin/dashboard").icon
                        }`}
                      />
                      <h3
                        className={`text-base font-semibold text-gray-100 group-hover:text-gray-500 ${
                          getTabStyle("/admin/dashboard").text
                        }`}
                      >
                        Dashboard
                      </h3>
                    </div>
                  </Link>

                  {/* Clients navigation item/Tab */}
                  <Link to="/admin/create-quote">
                    <div
                      className={`group m-auto mb-2 flex cursor-pointer items-center justify-start gap-4 rounded-md p-2 ${
                        getTabStyle("/admin/create-quote").container
                      }`}
                      onClick={() => handleTabClick("Clients")}
                    >
                      <FaUserFriends
                        className={`text-2xl text-gray-100 group-hover:text-gray-500 ${
                          getTabStyle("/admin/create-quote").icon
                        }`}
                      />
                      <h3
                        className={`text-base font-semibold text-gray-100 group-hover:text-gray-500 ${
                          getTabStyle("/admin/create-quote").text
                        }`}
                      >
                        Create A Quote
                      </h3>
                    </div>
                  </Link>

                  {/* Calendar navigation item/Tab */}
                  <Link to="calendar">
                    <div
                      className={`group m-auto mb-2 flex cursor-pointer items-center justify-start gap-4 rounded-md p-2 ${
                        getTabStyle("/admin/calendar").container
                      }`}
                      onClick={() => handleTabClick("Calendar")}
                    >
                      <FaRegCalendar
                        className={`text-2xl text-gray-100 group-hover:text-gray-500 ${
                          getTabStyle("/admin/calendar").icon
                        }`}
                      />
                      <h3
                        className={`text-base font-semibold text-gray-100 group-hover:text-gray-500 ${
                          getTabStyle("/admin/calendar").text
                        }`}
                      >
                        Calendar
                      </h3>
                    </div>
                  </Link>

                  {/* Quote Requests navigation item/Tab */}
                  <Link to="quote-requests">
                    <div
                      className={`group m-auto mb-2 flex cursor-pointer items-center justify-start gap-4 rounded-md p-2 ${
                        getTabStyle("/admin/quote-requests").container
                      }`}
                      onClick={() => handleTabClick("Quote Requests")}
                    >
                      <FaEnvelope
                        className={`text-2xl text-gray-100 group-hover:text-gray-500 ${
                          getTabStyle("/admin/quote-requests").icon
                        }`}
                      />
                      <h3
                        className={`text-base font-semibold text-gray-100 group-hover:text-gray-500 ${
                          getTabStyle("/admin/quote-requests").text
                        }`}
                      >
                        Quote Requests
                      </h3>
                    </div>
                  </Link>
                </section>
              </div>

              {/* Bottom section of the sidebar */}
              <section className="border-gray-100 pb-4">
                {/* Settings navigation item/Tab */}
                <Link to="settings">
                  <div
                    className={`group m-auto mb-2 flex cursor-pointer items-center justify-start gap-4 rounded-md p-2 ${
                      getTabStyle("/admin/settings").container
                    }`}
                    onClick={() => handleTabClick("Settings")}
                  >
                    <FaCog
                      className={`text-2xl text-gray-100 group-hover:text-gray-500 ${
                        getTabStyle("/admin/settings").icon
                      }`}
                    />
                    <h3
                      className={`text-base font-semibold text-gray-100 group-hover:text-gray-500 ${
                        getTabStyle("/admin/settings").text
                      }`}
                    >
                      Settings
                    </h3>
                  </div>
                </Link>

                {/* Management navigation item/Tab */}
                <Link to="management">
                  <div
                    className={`group m-auto mb-2 flex cursor-pointer items-center justify-start gap-4 rounded-md p-2 ${
                      getTabStyle("/admin/management").container
                    }`}
                    onClick={() => handleTabClick("Management")}
                  >
                    <FaBuilding
                      className={`text-2xl text-gray-100 group-hover:text-gray-500 ${
                        getTabStyle("/admin/management").icon
                      }`}
                    />
                    <h3
                      className={`text-base font-semibold text-gray-100 group-hover:text-gray-500 ${
                        getTabStyle("/admin/management").text
                      }`}
                    >
                      Management
                    </h3>
                  </div>
                </Link>
              </section>
            </div>
          </div>
        </Disclosure>
      </aside>
      {/* Main content area */}
      <main className="w-full flex-1 overflow-x-hidden md:pl-60">
        <Routes>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="create-quote" element={<CreateQuote />} />
          <Route
            path="calendar"
            element={
              <GoogleCalendar
                embedUrl={embedUrl}
                width="800px"
                height="600px"
              />
            }
          />
          <Route path="quote-requests" element={<QuoteRequests />} />
          <Route path="settings" element={<h1>Settings</h1>} />
          <Route path="management" element={<Management />} />
        </Routes>
      </main>
    </div>
  );
}

export default AdminPage;
