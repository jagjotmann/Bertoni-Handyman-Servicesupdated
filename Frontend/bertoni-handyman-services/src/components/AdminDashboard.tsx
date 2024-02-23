import React from "react";
import { IoBriefcaseOutline } from "react-icons/io5";
import { LuClock } from "react-icons/lu";
import { CiBadgeDollar } from "react-icons/ci";
import { Link } from "react-router-dom";

const tempData = [
  {
    clientID: "#000",
    clientName: "Sean Celli",
    clientEmail: "sean.celli@yahoo.com",
    clientPhone: "(210)145-2453",
    status: "Pending Quote",
  },
  {
    clientID: "#001",
    clientName: "Austin Loft",
    clientEmail: "austin.loft@yahoo.com",
    clientPhone: "(210)145-2453",
    status: "Pending Quote",
  },
  {
    clientID: "#002",
    clientName: "Alex Fedororv",
    clientEmail: "alex.ferororv@yahoo.com",
    clientPhone: "(210)145-2453",
    status: "Pending Quote",
  },
  {
    clientID: "#003",
    clientName: "Ahmed Osman",
    clientEmail: "ahmed.osman@yahoo.com",
    clientPhone: "(210)145-2453",
    status: "Pending Quote",
  },
];

const AdminDashboard = () => {
  return (
    <main className="flex-1 w-full overflow-x-hidden">
      <p className="text-2xl text-black-600 mt-2 font-bold p-5">Dashboard</p>
      <div className="flex gap-4 p-6">
        <div className="p-4 bg-neutral-200 rounded-lg shadow-lg flex-1 ">
          <Link
            to={{
              pathname: "/quote-requests",
              state: { filterStatus: "Completed" },
            }}
          >
            <div className="flex items-center justify-between">
              <IoBriefcaseOutline className="text-xl text-black-500" />
              <p className="text-sm text-gray-600 mt-2 font-bold">
                Total Jobs Completed
              </p>
              <p className="text-2xl font-medium">20</p>
            </div>
          </Link>
        </div>

        <div className="p-4 bg-neutral-200 rounded-lg shadow-lg flex-1 ">
          <Link
            to={{
              pathname: "/quote-requests",
              state: { filterStatus: "Pending" },
            }}
          >
            <div className="flex items-center justify-between">
              <LuClock className="text-xl text-black-500" />
              <p className="text-sm text-gray-600 mt-2 font-bold">
                Pending Jobs
              </p>
              <p className="text-2xl font-medium">2</p>
            </div>
          </Link>
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
              <p className="text-2xl font-medium">2</p>
              <p className="text-sm text-gray-600">New clients (this week)</p>
            </div>
            <div>
              <p className="text-2xl font-medium">4</p>
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
                {tempData.map((data) => (
                  <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {data.clientID}
                    </th>
                    <td className="px-6 py-4">{data.clientName}</td>
                    <td className="px-6 py-4">
                      <a
                        href={`mailto:${data.clientEmail}`}
                        className="text-blue-500 hover:text-blue-300"
                      >
                        {data.clientEmail}
                      </a>
                    </td>
                    <td className="px-6 py-4">{data.clientPhone}</td>
                    <td className="px-6 py-4">{data.status}</td>
                  </tr>
                ))}
                {/* <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
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
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
