import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



const dummyClient = {
  id: "719127591",
  name: "John Doe",
  email: "jeff@email.com",
  phone: "988-122-1234",
  address: "123 Main Rd. West Way",
  description: "Description of client needs given in “Get a Quote” form.",
  preferredEndDate: "4/3/2024",
};

type MaterialTuple = [string, number];

type MaterialList = {
  items: MaterialTuple[];
};

const Materials: React.FC<MaterialList> = ({ items }) => {
  if (items.length === 0) {
    return <div className="text-left text-gray-400">Add an item...</div>;
  }
  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index} className="mb-4 flex space-x-4">
            <div>
              <span className="font-semibold">Material:</span> {item[0]}
            </div>
            <div>
              <span className="font-semibold">Price:</span> ${item[1]}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const CreateQuote = () => {
  const [client, setClient] = useState(dummyClient);
  const navigate = useNavigate();

  const itemList: MaterialTuple[] = [
    ["Wood", 95.75],
    ["Sheet Metal", 24.99],
  ];

  const totalCost = itemList.reduce((total, item) => total + item[1], 0);

  return (
    <div className="bg-gray-100">
      <div className="mb-4 flex justify-between items-center bg-white">
        <div className="flex justify-start">
          <h1 className="text-xl font-bold mr-2">Create a Quote</h1>
          <p className="bg-blue-500 text-xs/6 text-white border-black font-bold px-2 rounded-full">
            ID: {client.id}
          </p>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-white text-black border border-black hover:bg-red-500 font-bold px-6 rounded-full mr-2"
            type="button"
          >
            Cancel
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold px-6 rounded-full mr-2"
            type="button"
          >
            Save
          </button>
        </div>
      </div>
      <div className="">
        <div className="pb-4 px-4">
          <button
            className="bg-gray-700 w-full text-white rounded-t-xl text-left py-2 px-2"
            onClick={() => navigate(-1)}
          >
            &lt; Back to Client Profile
          </button>
          <div className="bg-white divide-y-2 divide-gray-700 px-8 flex flex-col">
            <div>
              <label
                className=" block text-grey-darker text-lg font-bold py-4"
                htmlFor="client-info"
              >
                Client Info
              </label>
              <div className="flex flex-row justify-between py-2 font-bold">
                <div>
                  <p className="text-gray-400">Name:</p>
                  <p>{client.name}</p>
                </div>
                <div>
                  <p className="text-gray-400">Phone:</p>
                  <p>{client.phone}</p>
                </div>
                <div>
                  <p className="text-gray-400">Address:</p>
                  <p>{client.address}</p>
                </div>
              </div>
              <div className="font-bold py-2">
                <p className="text-gray-400">Job Decription:</p>
                <p>{client.description}</p>
              </div>
              <div className="font-bold py-2">
                <p className="text-gray-400">Preferred Client Finish Date:</p>
                <p>{client.preferredEndDate}</p>
              </div>
            </div>
            <div className="">
              <div className="py-6 flex justify-start items-center">
                <label
                  className="block text-grey-darker text-lg font-bold mb-2 pr-6"
                  htmlFor="materials"
                >
                  Materials
                </label>
                <button
                  className="bg-black hover:bg-blue-700 text-sm text-white font-bold py-2 px-4"
                  type="button"
                >
                  Add item
                </button>
              </div>
              <div className="pd-4">
                <Materials items={itemList} />
              </div>
              <div className="pb-6 flex justify-start items-center">
                <label
                  className="block text-grey-darker text-lg font-bold mb-2 pr-6"
                  htmlFor="labor"
                >
                  Labor
                </label>
                <button
                  className="bg-black hover:bg-blue-700 text-sm text-white font-bold py-2 px-4"
                  type="button"
                >
                  Assign Job
                </button>
              </div>
              {/*List assigned employee here*/}
              <span className="font-semibold text-end">Total Cost:</span> $
              {totalCost}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQuote;
