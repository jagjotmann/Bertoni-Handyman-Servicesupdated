//Quote Requests Page
import React, { useEffect, useState } from "react";
import FullSectionLayout from "../layouts/FullSectionLayout";
import axios from "axios";

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
  const [quotes, setQuotes]: any = useState([]);

  useEffect(() => {
    async function getAllQuotes() {
      try {
        const response = await axios.get(`http://localhost:3001/quotes/all`);
        console.log(response.data);
        setQuotes(response.data);
      } catch (error: any) {
        console.log(error);
      }
    }

    getAllQuotes();
  }, []);

  return (
    <FullSectionLayout>
      <div className="px-6 pt-4">
        <h1 className="text-2xl font-bold mb-4 w-243">Quote Requests</h1>

        <div className="mb-2">
          <input
            type="text"
            className="w-324 h-49 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Search"
          />
        </div>

        <button className="w-202 h-49 bg-black text-white rounded-md px-4 py-2 hover:bg-gray-900 focus:outline-none focus:ring focus:border-blue-300">
          Filter
        </button>

        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 font-inter text-left w-128 h-30">
                Quote ID
              </th>
              <th className="py-2 px-4 font-inter text-left w-186 h-30">
                Client Name
              </th>
              <th className="py-2 px-4 font-inter text-left w-92 h-30">
                Date Created
              </th>
              <th className="py-2 px-4 font-inter text-left w-98 h-30">
                Status
              </th>
              <th className="py-2 px-4 font-inter text-left w-98 h-30">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {quotes &&
              quotes.map((quote: any, index: number) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : ""}
                >
                  <td className="py-2 px-4 w-37 h-30">{quote._id || "None"}</td>
                  <td className="py-2 px-4 w-83 h-30">
                    {quote.contactPerson && quote.contactPerson.name
                      ? quote.contactPerson.name
                      : "None"}
                  </td>
                  <td className="py-2 px-4 w-67 h-30">
                    {quote.quoteDate || "None"}
                  </td>
                  <td className="py-2 px-4 w-56 h-30">
                    {quote.quoteStatus || "None"}
                  </td>
                  <td className="py-2 px-4 w-34 h-30">View</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </FullSectionLayout>
  );
}

export default QuoteRequests;
