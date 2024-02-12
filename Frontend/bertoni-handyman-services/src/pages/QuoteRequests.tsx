//Quote Requests Page
import React, { useState } from "react";
import FullSectionLayout from "../layouts/FullSectionLayout";
import { IoSearch, IoFilter } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";

const quoteRequests = [
  {
    quoteNumber: "#000",
    clientName: "Jeff Richard",
    dateCreated: "1 Day ago",
    status: "Pending",
    action: "View",
  },
  {
    quoteNumber: "#001",
    clientName: "Jeff Richard",
    dateCreated: "1 Day ago",
    status: "Pending",
    action: "View",
  },
  {
    quoteNumber: "#002",
    clientName: "Jeff Richard",
    dateCreated: "1 Day ago",
    status: "Pending",
    action: "View",
  },
  {
    quoteNumber: "#003",
    clientName: "Jeff Richard",
    dateCreated: "2 months ago",
    status: "Completed",
    action: "View",
  },
];

function QuoteRequests() {
  const [quotes, setQuotes] = useState({});

  return (
    <FullSectionLayout>
      {/* Page container */}
      <div className="min-h-screen flex flex-col bg-[#f2f2f4]">
        {/* Header container with a background of white */}
        <div className="bg-white">
          <h2 className="text-2xl font-bold p-4 pl-10">Quote Requests</h2>
        </div>

        {/* Container with bg of white, rounded corners, and shadow */}
        <div className="m-4 bg-white rounded-lg shadow-2xl p-6">
          {/* Search and Filter on the same line */}
          <div className="flex items-center mb-4">
            {/* Search Bar */}
            <div className="flex items-center border-2 border-gray-300 rounded-3xl overflow-hidden">
              <input
                className="pl-5 pr-3 py-2 w-full text-lg"
                type="text"
                placeholder="Search..."
              />
              <button className="px-5 text-gray-500 ">
                <IoSearch size="1.25em" />
              </button>
            </div>

            {/* Filter Button */}
            <div className="relative">
              <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="flex items-center bg-black text-white rounded-3xl px-5 py-2 ml-4"
              >
                <span className="text-lg pr-10">Filter</span>
                <IoFilter size="1.25em" />
              </button>

              {/* Static Dropdown Menu */}
              <div
                id="dropdown"
                className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute"
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Pending
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Created
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Declined
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Display the number of results */}
          <div className="mb-4">
            <span className="text-md font-semibold">
              {quotes.length} results
            </span>
          </div>

          {/* Table Container */}
          <table className="w-full rounded-3xl  mb-10">
            <thead className="bg-black rounded-3xl">
              <tr>
                <th className="px-4 py-2 border-b border-gray-300 text-left text-md font-semibold text-white  tracking-wider ">
                  Quote Num
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-left text-md font-semibold text-white  tracking-wider">
                  Client Name
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-left text-md font-semibold text-white  tracking-wider">
                  Date Created
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-left text-md font-semibold text-white  tracking-wider">
                  Status
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-left text-md font-semibold text-white  tracking-wider">
                  Action
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-left text-md font-semibold text-white  tracking-wider"></th>
              </tr>
            </thead>
            <tbody>
              {quoteRequests.map((request, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {request.quoteNumber}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {request.clientName}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {request.dateCreated}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {request.status}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    <button className="text-black underline hover:text-blue-700">
                      {request.action}
                    </button>
                  </td>
                  <td className="border-b border-gray-300">
                    <button className="text-black  rounded-lg  hover:text-red-500">
                      <IoIosCloseCircle size="1.25em" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </FullSectionLayout>
  );
}

export default QuoteRequests;
