//Quote Requests Page
import React from "react";
import FullSectionLayout from "../layouts/FullSectionLayout";
import { IoSearch, IoFilter } from "react-icons/io5";

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
  return (
    <FullSectionLayout>
      {/* Page container */}
      <div className="min-h-screen flex flex-col">
        {/* Header container with a background of white */}
        <div className="bg-white">
          <h2 className="text-2xl font-bold p-4 pl-10">Quote Requests</h2>
        </div>

        {/* Container below the header with a bg of #f2f2f4 */}
        <div className="flex-grow bg-[#f2f2f4]">
          {/* Container with bg of white, rounded corners, and shadow */}
          <div className="m-4 bg-white rounded-lg shadow-xl p-6">
            {/* Search and Filter on the same line */}
            <div className="flex items-center gap-10">
              {/* Search Bar */}
              <div className="flex items-center border-1 border-neutral-800 rounded-3xl overflow-hidden">
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
              <div className="flex items-center bg-black text-white border-1 border-neutral-800 rounded-3xl overflow-hidden">
                <p className="pl-5 pr-10 py-2 w-full text-lg">Filter</p>

                <button className="px-5">
                  <IoFilter size="1.25em" />
                </button>
              </div>

              {/* Table */}
              <div className="bg-white rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </FullSectionLayout>
  );
}

export default QuoteRequests;
