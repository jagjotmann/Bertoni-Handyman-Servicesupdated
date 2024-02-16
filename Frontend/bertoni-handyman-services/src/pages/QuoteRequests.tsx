//Quote Requests Page
import { useState, useEffect } from "react";
import FullSectionLayout from "../layouts/FullSectionLayout";
import { IoSearch, IoFilter, IoCloseCircle } from "react-icons/io5";

type Quote = {
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

function QuoteRequests() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  // Apply filters based on search query and selected status
  useEffect(() => {
    const fetchData = async () => {
      const queryParam = searchQuery
        ? `?search=${encodeURIComponent(searchQuery)}`
        : "";
      const statusParam = selectedStatus
        ? `&status=${encodeURIComponent(selectedStatus)}`
        : "";
      const response = await fetch(`quotes/all${queryParam}${statusParam}`);
      const data = await response.json();
      setFilteredQuotes(data);
    };
    fetchData();
  }, [searchQuery, selectedStatus]);

  // Handle search query change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Toggle filter dropdown visibility
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Set selected status from filter dropdown
  const handleFilterSelect = (status: string) => {
    setSelectedStatus(status);
    setIsDropdownOpen(false);
  };

  console.log(filteredQuotes);
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
                className="pl-5 pr-3 py-2 w-full text-lg focus:outline-none"
                type="text"
                placeholder="Search..."
                onChange={handleSearchChange}
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
                onClick={toggleDropdown}
              >
                <span className="text-lg pr-10">Filter</span>
                <IoFilter size="1.25em" />
              </button>

              {/* Static Dropdown Menu */}
              {isDropdownOpen && (
                <div
                  id="dropdown"
                  className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute"
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    {["All", "Pending", "Declined", "Completed"].map(
                      (status) => (
                        <li key={status}>
                          <button
                            className="block px-4 py-2 text-left w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={() =>
                              handleFilterSelect(status === "All" ? "" : status)
                            }
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

          {/* Display the number of results */}
          <div className="mb-4">
            <span className="text-md font-semibold">
              {filteredQuotes.length} results
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
              {filteredQuotes.map((quote, index) => (
                <tr key={quote._id}>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {quote.project.name}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {quote.contactPerson.name}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {new Date(quote.quoteDate).toLocaleDateString()}
                  </td>
                  <td
                    className={`px-4 py-2 border-b border-gray-300 ${
                      quote.quoteStatus === "Completed"
                        ? "text-green-500"
                        : quote.quoteStatus === "Denied"
                        ? "text-red-500"
                        : quote.quoteStatus === "Pending"
                        ? "text-yellow-500"
                        : "text-purple-500"
                    }`}
                  >
                    {quote.quoteStatus}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {/* Assuming you have some action to perform here */}
                    <button className="text-black underline hover:text-blue-700">
                      View
                    </button>
                  </td>
                  <td className="border-b border-gray-300">
                    <button className="text-black rounded-lg hover:text-red-500">
                      <IoCloseCircle size="1.25em" />
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
