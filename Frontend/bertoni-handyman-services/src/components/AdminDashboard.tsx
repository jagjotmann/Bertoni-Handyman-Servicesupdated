import React, { useEffect, useState } from "react";
import { IoBriefcaseOutline } from "react-icons/io5";
import { LuClock } from "react-icons/lu";
import { CiBadgeDollar } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import type { Quote } from "../pages/QuoteRequests";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const navigateToQuoteRequests = (filterStatus: string) => {
    navigate("/quote-requests", { state: { filterStatus } });
  };

  const [pendingQuotes, setPendingQuotes] = useState<Quote[]>([]);

  const [newClientsThisWeek, setNewClientsThisWeek] = useState(0);
  const [newClientsThisMonth, setNewClientsThisMonth] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("quotes/all");
        const data: Quote[] = await response.json();

        const now = new Date();
        const oneWeekAgo = new Date(new Date().setDate(now.getDate() - 7));
        const oneMonthAgo = new Date(new Date().setMonth(now.getMonth() - 1));

        const sortedData = data.sort(
          (a, b) =>
            new Date(b.quoteDate).getTime() - new Date(a.quoteDate).getTime()
        );

        const limitedPendingQuotes = sortedData
          .filter((quote: Quote) => quote.quoteStatus === "Pending")
          .slice(0, 8);

        const quotesFromLastWeek = sortedData.filter(
          (quote) => new Date(quote.quoteDate) >= oneWeekAgo
        );

        const quotesFromLastMonth = sortedData.filter(
          (quote) =>
            new Date(quote.quoteDate) >= oneMonthAgo &&
            new Date(quote.quoteDate) < oneWeekAgo
        );

        setPendingQuotes(limitedPendingQuotes);

        setNewClientsThisWeek(quotesFromLastWeek.length);
        // For monthly count, ensure you're not double-counting this week's quotes
        setNewClientsThisMonth(
          quotesFromLastMonth.length + quotesFromLastWeek.length
        );
      } catch (error) {
        console.error("Failed to fetch quotes:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex-1 w-full overflow-x-hidden">
      <p className="text-2xl text-black-600 mt-2 font-bold p-5">Dashboard</p>
      <div className="flex gap-4 p-6">
        <div
          className="p-4 bg-neutral-200 rounded-lg shadow-lg flex-1 cursor-pointer"
          onClick={() => navigateToQuoteRequests("Completed")}
        >
          <IoBriefcaseOutline className="text-xl text-black-500" />
          <p className="text-sm text-gray-600 mt-2 font-bold">
            Total Jobs Completed
          </p>
          <p className="text-2xl font-medium">20</p>
        </div>

        <div
          className="p-4 bg-neutral-200 rounded-lg shadow-lg flex-1 cursor-pointer"
          onClick={() => navigateToQuoteRequests("Pending")}
        >
          <LuClock className="text-xl text-black-500" />
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
        <h2 className="text-xl font-semibold text-gray-700">Client Activity</h2>
        <div className="mt-4">
          <div className="flex justify-between">
            <div>
              <p className="text-2xl font-medium">{newClientsThisWeek}</p>
              <p className="text-sm text-gray-600">New clients (this week)</p>
            </div>
            <div>
              <p className="text-2xl font-medium">{newClientsThisMonth}</p>
              <p className="text-sm text-gray-600">New clients (this month)</p>
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
                {pendingQuotes.map((quote) => (
                  <tr
                    key={quote._id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <td className="px-6 py-4">{quote.contactPerson.name}</td>
                    <td className="px-6 py-4">
                      <a
                        href={`mailto:${quote.contactPerson.email}`}
                        className="text-blue-500 hover:text-blue-300"
                      >
                        {quote.contactPerson.email}
                      </a>
                    </td>
                    <td className="px-6 py-4">{quote.contactPerson.phone}</td>
                    <td className="px-6 py-4">{quote.quoteStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
