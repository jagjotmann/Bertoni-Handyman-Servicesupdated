import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FullSectionLayout from "../layouts/FullSectionLayout";
import { IoSearch, IoFilter, IoCloseCircle } from "react-icons/io5";
import { useLocation } from "react-router-dom";

export type Quote = {
  _id: string;
  quoteDate: string;

  quoteStatus: string;
  project: {
    name: string;
    description: string;
    address: {
      streetAddress: string;
      city: string;
      state: string;
      zipCode: string;
    };
  };
  subtotal: number;
  tax: number;
  totalCost: number;
  notes: string;
  contactPerson: {
    name: string;
    companyName?: string;
    email?: string;
    phone?: string;
  };
};
type PageItem = number | "LEFT_SPILL" | "RIGHT_SPILL";

function QuoteRequests() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([]);
  const [allQuotes, setAllQuotes] = useState<Quote[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const { filterStatus } = location.state || {};
  const [currentPage, setCurrentPage] = useState(1);
  const quotesPerPage = 10;
  const [totalPages, setTotalPages] = useState(0);

  // Calculate the indices of the first and last quotes on the current page
  const indexOfLastQuote = currentPage * quotesPerPage;
  const indexOfFirstQuote = indexOfLastQuote - quotesPerPage;
  // Extract the quotes for the current page from allQuotes
  const currentQuotes = filteredQuotes.slice(
    indexOfFirstQuote,
    indexOfLastQuote
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/quotes/all");
        const data = await response.json();
        setAllQuotes(data);
        const filteredData = filterStatus
          ? data.filter((quote: Quote) => quote.quoteStatus === filterStatus)
          : data;
        setFilteredQuotes(filteredData);
        setTotalPages(Math.ceil(data.length / quotesPerPage));
      } catch (error) {
        console.error("Failed to fetch quotes:", error);
      }
    };

    fetchData();
  }, [location.state, filterStatus]);

  useEffect(() => {
    setCurrentPage(1);
    setTotalPages(Math.ceil(filteredQuotes.length / quotesPerPage));
  }, [filterStatus, searchQuery, filteredQuotes.length]);

  // Handle search query change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Execute search when the search button is clicked
  const handleSearch = () => {
    const filtered = allQuotes.filter((quote) =>
      quote.contactPerson.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredQuotes(filtered);
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleFilterSelect = (selectedStatusName: string) => {
    setIsDropdownOpen(false); // Close the dropdown

    if (selectedStatusName === "All") {
      setFilteredQuotes(allQuotes); // If "All" is selected, show all quotes
    } else {
      const filtered = allQuotes.filter(
        (quote) => quote.quoteStatus === selectedStatusName
      );

      setFilteredQuotes(filtered); // Update state with the filtered quotes
    }
  };

  const handleDeleteQuote = async (quoteId: string) => {
    try {
      await fetch(`http://localhost:3000/quotes/${quoteId}`, {
        method: "DELETE",
      });
      const updatedQuotes = allQuotes.filter((quote) => quote._id !== quoteId);
      setFilteredQuotes(updatedQuotes);
      const updatedAllQuotes = allQuotes.filter(
        (quote) => quote._id !== quoteId
      );
      setAllQuotes(updatedAllQuotes);
    } catch (error) {
      console.error("Failed to delete quote:", error);
    }
  };

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-sm">
          {currentPage > 1 && (
            <li>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(currentPage - 1);
                }}
                href="#!"
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </a>
            </li>
          )}

          {pageNumbers.map((number) => (
            <li key={number}>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(number);
                }}
                href="#!"
                className={`flex items-center justify-center px-3 h-8 leading-tight ${
                  currentPage === number
                    ? "text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                }`}
              >
                {number}
              </a>
            </li>
          ))}

          {currentPage < totalPages && (
            <li>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(currentPage + 1);
                }}
                href="#!"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </a>
            </li>
          )}
        </ul>
      </nav>
    );
  };

  return (
    <FullSectionLayout>
      <div className="min-h-screen flex flex-col bg-[#f2f2f4]">
        {/* Header */}
        <div className="bg-white">
          <h2 className="text-2xl font-bold p-4 pl-10">Quote Requests</h2>
        </div>

        {/* Main Content */}
        <div className="m-4 bg-white rounded-lg shadow-2xl p-6">
          {/* Search and Filter Section */}
          <div className="flex items-center mb-4">
            {/* Search Bar */}
            <div className="flex items-center border-2 border-gray-300 rounded-3xl overflow-hidden">
              <input
                className="pl-5 pr-3 py-2 w-full text-lg focus:outline-none"
                type="text"
                placeholder="Search..."
                onChange={handleSearchChange}
              />
              <button className="px-5 text-gray-500" onClick={handleSearch}>
                <IoSearch size="1.25em" />
              </button>
            </div>

            {/* Filter Button */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className=" flex items-center bg-black text-white rounded-3xl px-5
              py-2 ml-4"
              >
                <span className="px-3">Filter</span> <IoFilter size="1.25em" />
              </button>

              {/* Static Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute z-10 bg-white rounded-lg shadow divide-y divide-gray-100 w-44">
                  <ul className="py-1 text-sm text-gray-700">
                    <li>
                      <button
                        onClick={() => handleFilterSelect("All")}
                        className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                      >
                        All
                      </button>
                    </li>
                    {["Pending", "Accepted", "Completed", "Declined"].map(
                      (status) => (
                        <li key={status}>
                          <button
                            onClick={() => handleFilterSelect(status)}
                            className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                          >
                            {status}
                          </button>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Results Section */}
          <div className="mb-4">
            <span className="text-md font-semibold">
              {filteredQuotes.length} results
            </span>
          </div>

          {/* Quotes Table */}
          <table className="w-full rounded-3xl mb-10">
            <thead className="bg-black rounded-3xl">
              <tr>
                <th className="px-4 py-2 border-b border-gray-300 text-left text-md font-semibold text-white tracking-wider">
                  Quote Num
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-left text-md font-semibold text-white tracking-wider">
                  Client Name
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-left text-md font-semibold text-white tracking-wider">
                  Date Created
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-left text-md font-semibold text-white tracking-wider">
                  Status
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-left text-md font-semibold text-white tracking-wider">
                  Action
                </th>
                <th className="px-4 py-2 border-b border-gray-300 text-left text-md font-semibold text-white  tracking-wider"></th>
              </tr>
            </thead>
            <tbody>
              {currentQuotes.map((quote) => {
                const quoteNum =
                  quote._id.length > 9 ? quote._id.slice(-9) : quote._id;
                return (
                  <tr
                    key={quote._id}
                    className="hover:bg-yellow-50 transition ease-in-out"
                  >
                    <td className="px-4 py-2 border-b border-gray-300">
                      {quoteNum} {/* Displaying _id as quoteNum */}
                    </td>

                    <td className="px-4 py-2 border-b border-gray-300">
                      {quote.contactPerson.name}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300">
                      {new Date(quote.quoteDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300">
                      {[
                        "Pending",
                        "Accepted",
                        "Completed",
                        "Declined",
                      ].includes(quote.quoteStatus)
                        ? quote.quoteStatus
                        : "Unknown"}
                    </td>

                    {/* Action buttons */}
                    <td className="px-4 py-2 border-b border-gray-300">
                      <Link
                        to={`/create-a-quote/${quote._id}`}
                        className="text-black underline hover:text-blue-700"
                      >
                        View
                      </Link>
                    </td>
                    <td className="border-b border-gray-300">
                      <button
                        className="flex items-center text-red-500 rounded-lg hover:text-red-700"
                        onClick={() => handleDeleteQuote(quote._id)}
                      >
                        <IoCloseCircle size="1.25em" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="mt-auto">
            <div className="flex justify-center">{renderPagination()}</div>
          </div>
        </div>
      </div>
    </FullSectionLayout>
  );
}
export default QuoteRequests;
