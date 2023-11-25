// AdminPage.tsx
import React from "react";
import QuoteRequests from "./QuoteRequests";
import Management from "./Management";
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

import { IoBriefcaseOutline } from "react-icons/io5";
import { LuClock } from "react-icons/lu";
import { CiBadgeDollar } from "react-icons/ci";

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
      return <QuoteRequests />;
    } else if (selectedTab === "Settings") {
      return <h1>Settings</h1>;
    } else if (selectedTab === "Management") {
      return <Management />;
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
        <p className="text-2xl text-black-600 mt-2 font-bold p-5">Dashboard</p>
        <div className="flex gap-4 p-6">
          <div className="p-4 bg-neutral-200 rounded-lg shadow-lg flex-1 ">
            <div className="flex items-center justify-between">
              <IoBriefcaseOutline className="text-xl text-black-500" />
            </div>
            <p className="text-sm text-gray-600 mt-2 font-bold">
              Total Jobs Completed
            </p>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-medium">20</p>
            </div>
          </div>
          <div className="p-4 bg-neutral-200 rounded-lg shadow-lg flex-1 ">
            <div className="flex items-center justify-between">
              <LuClock className="text-xl text-black-500" />
            </div>
            <p className="text-sm text-gray-600 mt-2 font-bold">Pending Jobs</p>
            <p className="text-2xl font-medium">2</p>
          </div>
          <div className="p-4 bg-neutral-200 rounded-lg shadow-lg flex-1 ">
            <div className="flex items-center justify-between">
              <CiBadgeDollar className="text-xl text-black-500" />
            </div>
            <p className="text-sm text-gray-600 mt-2 font-bold">Revenue</p>
            <p className="text-2xl font-medium">$23,000</p>
          </div>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md mt-4 border-solid border-2 border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700">
            Client Activity
          </h2>
          <div className="mt-4">
            <div className="flex justify-between">
              <div>
                <p className="text-2xl font-medium">2</p>
                <p className="text-sm text-gray-600">New clients (this week)</p>
              </div>
              <div>
                <p className="text-2xl font-medium">4</p>
                <p className="text-sm text-gray-600">
                  New clients (this month)
                </p>
              </div>
            </div>
            <div className="mt-4">
              <div className="inline-block px-4 py-1 border border-black rounded-full text-sm font-sm text-gray-800 mb-4">
                Recent Clients
              </div>

              <table className="w-full text-sm text-left rtl:text-right text-black-500">
                <thead className="text-xs text-white  bg-blue-400 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Client ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Client Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Phone
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      #000
                    </th>
                    <td className="px-6 py-4">Jeff Richard</td>
                    <td className="px-6 py-4">jeff101@email.com</td>
                    <td className="px-6 py-4">(201)145-2453</td>
                    <td className="px-6 py-4">Pending Quote</td>
                  </tr>
                  <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      #001
                    </th>
                    <td className="px-6 py-4">Jeff Richard</td>
                    <td className="px-6 py-4">jeff101@email.com</td>
                    <td className="px-6 py-4">(201)145-2453</td>
                    <td className="px-6 py-4">Pending Quote</td>
                  </tr>
                  <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      #002
                    </th>
                    <td className="px-6 py-4">Jeff Richard</td>
                    <td className="px-6 py-4">jeff101@email.com</td>
                    <td className="px-6 py-4">(201)145-2453</td>
                    <td className="px-6 py-4">Pending Quote</td>
                  </tr>
                  <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      #003
                    </th>
                    <td className="px-6 py-4">Jeff Richard</td>
                    <td className="px-6 py-4">jeff101@email.com</td>
                    <td className="px-6 py-4">(201)145-2453</td>
                    <td className="px-6 py-4">Pending Quote</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminPage;
