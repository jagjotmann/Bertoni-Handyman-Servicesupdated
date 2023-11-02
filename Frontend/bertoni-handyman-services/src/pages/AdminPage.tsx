// AdminPage.tsx
import React from "react";
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

function AdminPage() {
  // State to track which tab is currently selected
  const [selectedTab, setSelectedTab] = useState<string>("Dashboard");

  // Function to set the selected tab
  const handleTabClick = (tabName: string) => {
    setSelectedTab(tabName);
  };
  // Function to render content based on the selected tab
  const renderContent = (): JSX.Element | null => {
    if (selectedTab === "Dashboard") {
      return <h1>Dashboard</h1>;
    } else if (selectedTab === "Clients") {
      return <h1>Clients</h1>;
    } else if (selectedTab === "Calendar") {
      return <h1>Calendar</h1>;
    } else if (selectedTab === "Quote Requests") {
      return <h1>Quote Requests</h1>;
    } else if (selectedTab === "Settings") {
      return <h1>Settings</h1>;
    } else if (selectedTab === "Management") {
      return <h1>Management</h1>;
    } else {
      return null;
    }
  };

  // Function to determine the style of a tab based on its current selection status
  const getTabStyle = (tabName: string) => {
    if (selectedTab === tabName) {
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
          <Disclosure.Button className="absolute inline-flex items-center justify-center p-2 rounded-md top-4 right-4 peer focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
            <GiHamburgerMenu
              className="block w-6 h-6 text-gray-500 md:hidden"
              aria-hidden="true"
            />
          </Disclosure.Button>
          {/* Container for the sidebar content */}
          <div className="fixed top-0 z-20 w-1/2 h-screen p-3 duration-200 ease-out delay-150 bg-gray-800 -left-96 lg:left-0 lg:w-60 peer-focus:left-0 peer:transition">
            <div className="flex flex-col justify-between h-full">
              {/* Top section of the sidebar */}
              <div className="flex-1">
                {/* Header section with logo and sign-out button */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-700">
                  {/* Placeholder for the logo */}
                  <h1 className="flex-none p-2 text-base font-bold text-gray-200 cursor-pointer">
                    LOGO
                  </h1>
                  {/* Sign out button with icon */}
                  <button className="flex items-center justify-center flex-none p-2 px-3 text-sm text-gray-800 transition-transform bg-white rounded-full hover:scale-105">
                    Sign out <FaSignOutAlt className="ml-1" />
                  </button>
                </div>

                {/* Main navigation items */}
                <section className="pb-4 my-4 border-b border-gray-700">
                  {/* Each `div` here represents a navigation item with an icon and label */}

                  {/* Dashboard navigation item/Tab */}
                  <div
                    className={`flex items-center justify-start gap-4 p-2 m-auto mb-2 group rounded-md cursor-pointer ${
                      getTabStyle("Dashboard").container
                    }`}
                    onClick={() => handleTabClick("Dashboard")}
                  >
                    <FaChartBar
                      className={`text-2xl text-gray-100 group-hover:text-gray-500 ${
                        getTabStyle("Dashboard").icon
                      }`}
                    />
                    <h3
                      className={`text-base font-semibold text-gray-100 group-hover:text-gray-500 ${
                        getTabStyle("Dashboard").text
                      }`}
                    >
                      Dashboard
                    </h3>
                  </div>

                  {/* Clients navigation item/Tab */}
                  <div
                    className={`flex items-center justify-start gap-4 p-2 m-auto mb-2 rounded-md group cursor-pointer ${
                      getTabStyle("Clients").container
                    }`}
                    onClick={() => handleTabClick("Clients")}
                  >
                    <FaUserFriends
                      className={`text-2xl text-gray-100 group-hover:text-gray-500 ${
                        getTabStyle("Clients").icon
                      }`}
                    />
                    <h3
                      className={`text-base font-semibold text-gray-100 group-hover:text-gray-500 ${
                        getTabStyle("Clients").text
                      }`}
                    >
                      Clients
                    </h3>
                  </div>

                  {/* Calendar navigation item/Tab */}
                  <div
                    className={`flex items-center justify-start gap-4 p-2 m-auto mb-2 group rounded-md cursor-pointer ${
                      getTabStyle("Calendar").container
                    }`}
                    onClick={() => handleTabClick("Calendar")}
                  >
                    <FaRegCalendar
                      className={`text-2xl text-gray-100 group-hover:text-gray-500 ${
                        getTabStyle("Calendar").icon
                      }`}
                    />
                    <h3
                      className={`text-base font-semibold text-gray-100 group-hover:text-gray-500 ${
                        getTabStyle("Calendar").text
                      }`}
                    >
                      Calendar
                    </h3>
                  </div>

                  {/* Quote Requests navigation item/Tab */}
                  <div
                    className={`flex items-center justify-start gap-4 p-2 m-auto mb-2 group rounded-md cursor-pointer ${
                      getTabStyle("Quote Requests").container
                    }`}
                    onClick={() => handleTabClick("Quote Requests")}
                  >
                    <FaEnvelope
                      className={`text-2xl text-gray-100 group-hover:text-gray-500 ${
                        getTabStyle("Quote Requests").icon
                      }`}
                    />
                    <h3
                      className={`text-base font-semibold text-gray-100 group-hover:text-gray-500 ${
                        getTabStyle("Quote Requests").text
                      }`}
                    >
                      Quote Requests
                    </h3>
                  </div>
                </section>
              </div>

              {/* Bottom section of the sidebar */}
              <section className="pb-4 border-gray-100">
                {/* Settings navigation item/Tab */}
                <div
                  className={`flex items-center justify-start gap-4 p-2 m-auto mb-2 group rounded-md cursor-pointer ${
                    getTabStyle("Settings").container
                  }`}
                  onClick={() => handleTabClick("Settings")}
                >
                  <FaCog
                    className={`text-2xl text-gray-100 group-hover:text-gray-500 ${
                      getTabStyle("Settings").icon
                    }`}
                  />
                  <h3
                    className={`text-base font-semibold text-gray-100 group-hover:text-gray-500 ${
                      getTabStyle("Settings").text
                    }`}
                  >
                    Settings
                  </h3>
                </div>

                {/* Management navigation item/Tab */}
                <div
                  className={`flex items-center justify-start gap-4 p-2 m-auto mb-2 group rounded-md cursor-pointer ${
                    getTabStyle("Management").container
                  }`}
                  onClick={() => handleTabClick("Management")}
                >
                  <FaBuilding
                    className={`text-2xl text-gray-100 group-hover:text-gray-500 ${
                      getTabStyle("Management").icon
                    }`}
                  />
                  <h3
                    className={`text-base font-semibold text-gray-100 group-hover:text-gray-500 ${
                      getTabStyle("Management").text
                    }`}
                  >
                    Management
                  </h3>
                </div>
              </section>
            </div>
          </div>
        </Disclosure>
      </aside>
      {/* Main content area */}
      <main className="flex-1 w-full overflow-x-hidden md:pl-60">
        {/* Conditional rendering of components based on the selected tab */}
        {renderContent()}
      </main>
    </div>
  );
}

export default AdminPage;
