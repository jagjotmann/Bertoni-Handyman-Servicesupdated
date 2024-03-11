import React from "react";
import { useState, useEffect, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

//name of material and cost
type MaterialTuple = [string, number];

//hourly rate, and number of hours
type LaborTuple = [number, number];

//type for list of materials
type MaterialList = {
  items: MaterialTuple[];
  deleteItem: (indexToDelete: number) => void;
};

type LaborList = {
  labor: LaborTuple[];
  deleteLabor: (indexToDelete: number) => void;
};

//this is the handler for conditional rendering for the materials table
const Materials: React.FC<MaterialList> = ({ items, deleteItem }) => {
  if (items.length === 0) {
    return <div className="text-left text-gray-400">Add an item...</div>;
  }

  const handleDeleteClick = (index: number) => {
    deleteItem(index);
  };

  return (
    <div>
      <table className="table-auto lg:table-fixed lg:w-1/3">
        <thead>
          <tr className="bg-blue-500 text-white font-semibold">
            <th className="py-2 rounded-l-full">Item</th>
            <th className="py-2">Cost</th>
            <th className="py-2 rounded-r-full"></th>{" "}
            {/* Empty header for the Delete column */}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="p-2 px-4 border-r-2">{item[0]}</td>
              <td className="p-2 px-4 border-r-2">${item[1]}</td>
              <td className="p-2 px-4">
                <button
                  type="button"
                  className="text-red-600 border border-red-500 px-2 hover:bg-red-500 hover:text-white"
                  onClick={() => handleDeleteClick(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

//this is the modal when add Item is clicked
const AddItemModal: React.FC<{
  addItem: (item: MaterialTuple) => void;
  closeModal: () => void;
}> = ({ addItem, closeModal }) => {
  const [itemName, setItemName] = useState("");
  const [itemCost, setItemCost] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const costNumber = parseFloat(itemCost);
    if (itemName && !isNaN(costNumber)) {
      addItem([itemName, costNumber]);
      closeModal();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
      <div className="modal-container p-4 shadow rounded-xl bg-white">
        <div className="modal-content">
          <h2 className="text-3xl font-bold pb-4 justify-center">
            Add Material
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="pb-4">
              <input
                type="text"
                id="itemName"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                required
                className="border border-gray-800 rounded-md p-2 w-full"
                placeholder="Name"
              />
            </div>
            <div className="pb-4">
              <input
                type="number"
                id="itemCost"
                value={itemCost}
                onChange={(e) => setItemCost(e.target.value)}
                required
                className="border border-gray-800 rounded-md p-2 w-full"
                placeholder="Cost"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-green-600 text-white font-semibold py-2 px-6"
              >
                Add
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-5"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

//this is the handler for conditional rendering for labor table
const Labor: React.FC<LaborList> = ({ labor, deleteLabor }) => {
  if (labor.length === 0) {
    return <div className="text-left text-gray-400">Add labor cost...</div>;
  }

  const handleDeleteClick = (index: number) => {
    deleteLabor(index);
  };

  return (
    <div>
      <table className="table-auto lg:table-fixed lg:w-1/3">
        <thead>
          <tr className="bg-blue-500 text-white font-semibold">
            <th className="pl-2 py-2 rounded-l-full">Hourly Rate</th>
            <th className="py-2"># Hours</th>
            <th className="py-2">Total Cost</th>
            <th className="py-2 rounded-r-full"></th>{" "}
            {/* Empty header for the Delete column */}
          </tr>
        </thead>
        <tbody>
          {labor.map((labor, index) => (
            <tr key={index} className="border-b">
              <td className="p-2 px-4 border-r-2">${labor[0]}/hour</td>
              <td className="p-2 px-4 border-r-2">{labor[1]}</td>
              <td className="p-2 px-4 border-r-2">${labor[0] * labor[1]}</td>
              <td className="p-2 px-4">
                <button
                  type="button"
                  className="text-red-600 border border-red-500 px-2 hover:bg-red-500 hover:text-white"
                  onClick={() => handleDeleteClick(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

//this is the modal for when assign job is clicked
const AddLaborModal: React.FC<{
  addLabor: (labor: LaborTuple) => void;
  closeModal: () => void;
}> = ({ addLabor, closeModal }) => {
  const [hourlyRate, setHourlyRate] = useState<number>(0);
  const [numHours, setNumHours] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (hourlyRate > 0 && numHours > 0) {
      addLabor([hourlyRate, numHours]);
      closeModal();
    }
  };

  const handleHourlyRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setHourlyRate(value);
    }
  };

  const handleNumHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setNumHours(value);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
      <div className="modal-container p-4 shadow rounded-xl bg-white">
        <div className="modal-content">
          <h2 className="text-3xl font-bold pb-4 justify-center">Add Labor</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row">
              <div className="pb-4">
                <label
                  className="block text-gray-800 text-sm font-semibold"
                  htmlFor="hourlyRate"
                >
                  Hourly Rate
                </label>
                <input
                  type="number"
                  id="hourlyRate"
                  value={hourlyRate.toString()}
                  onChange={handleHourlyRateChange}
                  required
                  className="border border-gray-800 rounded-md p-2"
                  placeholder="Hourly Rate"
                />
              </div>
              <div className="pb-4">
                <label
                  className="block text-gray-800 text-sm font-semibold"
                  htmlFor="Number of Hours"
                >
                  Number of Hours
                </label>
                <input
                  type="number"
                  id="numHours"
                  value={numHours.toString()}
                  onChange={handleNumHoursChange}
                  required
                  className="border border-gray-800 rounded-md p-2"
                  placeholder="Number of Hours"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-green-600 text-white font-semibold py-2 px-6"
              >
                Add
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-5"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

//Main component
const CreateQuote: React.FC = () => {
  const { quoteId } = useParams<{ quoteId: string }>();
  //variables
  //const [client, setClient] = useState(dummyClient);
  const [quote, setQuote] = useState(""); //"" allows a loading state for transparency of data loading
  const [editable, setEditable] = useState(quoteId=="new"); //allows default editing state when routed with no quote
  const navigate = useNavigate();

  const [itemList, setItemList] = useState<MaterialTuple[]>([]);
  const [laborList, setLaborList] = useState<LaborTuple[]>([]);
  const [finalTotalCost, setFinalTotalCost] = useState(0);
  const [formData, setFormData] = useState({ //form for quote client info
    id: "",
    phone: "",
    description: "",
    name: "",
    email: "",
    address: "",
    preferredEndDate: "",
  });

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const quote = await axios.get(`/quotes/${quoteId}`);
        setQuote(quote.data);
        setFormData({
          id: String(quoteId),
          phone: quote.data.contactPerson.phone,
          description: quote.data.project.description,
          name: quote.data.contactPerson.name,
          email: quote.data.contactPerson.email,
          address: quote.data.project.address.streetAddress,
          preferredEndDate: quote.data.project.preferredEndDate,
        });
      } catch (error) {
        console.error('Error fetching quote:', error);
      }
    };

    if (quoteId) {
      fetchQuote();
    }
  }, [quoteId]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("handleSubmit function called"); // Debugging
    try {
      if (quoteId!="new") {
        await axios.put(`/quote/${quoteId}`, formData);
      } else {
        await axios.post(`/quote/create`, formData);
      }
      // redirect to CreateQuote @ quoteId
    } catch (error) {
      console.error('Error submitting quote:', error);
    }
  };

  //add item to item list
  const addItem = (item: MaterialTuple) => {
    setItemList([...itemList, item]);
  };

  //add Labor
  const addLabor = (labor: LaborTuple) => {
    setLaborList([...laborList, labor]);
  };

  //handles deletion of item from list
  const handleDeleteItem = (indexToDelete: number) => {
    const updatedItemList = itemList.filter(
      (_, index) => index !== indexToDelete
    );
    setItemList(updatedItemList);
  };

  const handleDeleteLabor = (indexToDelete: number) => {
    const updatedLaborList = laborList.filter(
      (_, index) => index !== indexToDelete
    );
    setLaborList(updatedLaborList);
  };

  //sums total cost of item list and labor (***still need to do this part***)
  useEffect(() => {
    const totalCost = itemList.reduce((total, item) => total + item[1], 0);
    const laborCost = laborList.reduce(
      (total, laborEntry) => total + laborEntry[0] * laborEntry[1],
      0
    );
    const updatedTotalCost = totalCost + laborCost;
    setFinalTotalCost(updatedTotalCost);
  }, [itemList, laborList]);

  //Modal variables
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"addItem" | "assignJob" | null>(
    null
  );

  //function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

  //sets which modal is open
  const toggleModal = (type: "addItem" | "assignJob" | null) => {
    if (type == null) {
      setIsModalOpen(!isModalOpen);
    } else {
      setModalType(type);
    }
  };

  return (
    <div className="bg-gray-100 pt-4">
      <form onSubmit={handleSubmit}>
      <div className="flex justify-between items-center bg-white p-4">
        <div className="flex justify-start items-center">
          <h1 className="text-3xl font-bold pr-2">Create a Quote</h1>
          <p className="bg-blue-500 text-xs text-white font-bold py-1 px-2 rounded-full">
            ID: {formData.id}
          </p>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-white text-black border border-black hover:bg-red-500 font-bold px-4 rounded-full mr-4"
            type="button"
            //Route back to client profile
          >
            Cancel
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-center text-white font-bold px-4 rounded-full pr-4"
            type="submit"
            //submit to DB
          >
            Save
          </button>
        </div>
      </div>
      <div className="pt-4">
        <div className="pb-4 px-4">
          {/* Big box on page*/}
          <button
            className="bg-gray-700 w-full text-white rounded-t-2xl text-left py-2 px-2"
            onClick={() => navigate("/admin")} //Change to client link
          >
            &lt; Back to Admin Dashboard
          </button>
          <div className="bg-white px-8 flex flex-col shadow-xl rounded-b-2xl">
            {/*White portion of box below client profile link*/}
            <div>
              <label
                className=" block text-grey-darker text-lg font-bold py-4"
                htmlFor="client-info"
              >
                Client Info
              </label>
              <div className="flex flex-row justify-between py-2 font-bold">
                {/*Horizontal flexbox for name, phone address*/}
                <div>
                  {editable ?
                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="px-2 py-1 border border-blue-gray-200 text-sm font-normal text-blue-gray-700 outline outline-0 placeholder-shown:border-blue-gray-200 focus:border-2 focus:border-gray-900" placeholder= "Email"/>
                  :<div>
                    <p className="text-gray-400">Email:</p>
                    <a
                    href={`mailto:${formData.email}`}
                    className="text-blue-500 hover:text-blue-300"
                    ></a>
                    {formData.email}
                  </div>
                  }
                </div>
                <div>
                  {editable ?
                  <input type="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="px-2 py-1 border border-blue-gray-200 text-sm font-normal text-blue-gray-700 outline outline-0 placeholder-shown:border-blue-gray-200 focus:border-2 focus:border-gray-900" placeholder= "Phone Number"/>
                  :<div>
                    <p className="text-gray-400">Phone:</p>
                    <p>{formData.phone}</p>
                  </div>
                  }
                </div>
                <div>
                  {editable ?
                  <input type="address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="px-2 py-1 border border-blue-gray-200 text-sm font-normal text-blue-gray-700 outline outline-0 placeholder-shown:border-blue-gray-200 focus:border-2 focus:border-gray-900" placeholder= "Address"/>
                  :<div>
                    <p className="text-gray-400">Address:</p>
                    <p>{formData.address}</p>
                  </div>
                  }
                </div>
              </div>
              <div>
                  {editable ?
                  <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="px-2 py-1 min-w-full min-h-8 border border-blue-gray-200 text-sm font-normal text-blue-gray-700 outline outline-0 placeholder-shown:border-blue-gray-200 focus:border-2 focus:border-gray-900" placeholder= "Descripton"/>
                  :<div>
                    <p className="text-gray-400">Job Description:</p>
                    <p>{formData.description}</p>
                  </div>
                  }
                </div>
                <div className="pb-2">
                  {editable ?
                  <div>
                    <label className="text-gray-400" htmlFor="prefDate">Preferred End Date: </label>
                    <input id="prefDate" type="date" value={formData.preferredEndDate} onChange={(e) => setFormData({ ...formData, preferredEndDate: e.target.value })} className="px-2 py-1 border border-blue-gray-200 text-sm font-normal text-gray-400 outline outline-0 placeholder-shown:border-blue-gray-200 focus:border-2 focus:border-gray-900" placeholder= "Preferred End Date"/>
                  </div>
                  :<div>
                    <p className="text-gray-400">Preferred End Date:</p>
                    <p>{formData.preferredEndDate}</p>
                  </div>
                  }
                </div>
            </div>
            <div className="">
              {/*Materials through labor section*/}
              <div className="py-6 flex justify-start items-center border-t-2 border-gray-800">
                {/*Materials Section*/}
                <label
                  className="text-grey-darker text-lg font-bold pb-2 pr-6"
                  htmlFor="materials"
                >
                  Materials
                </label>
                <button
                  className="bg-black hover:bg-blue-700 text-sm text-white font-bold py-2 px-6"
                  type="button"
                  onClick={() => toggleModal("addItem")}
                >
                  Add item
                </button>
              </div>
              <div className="pd-4">
                <Materials items={itemList} deleteItem={handleDeleteItem} />
              </div>
              <div className="pb-6 flex justify-start items-center pt-2">
                {/*Labor Section*/}
                <label
                  className="block text-grey-darker text-lg font-bold pb-2 pr-6"
                  htmlFor="labor"
                >
                  Labor
                </label>
                <button
                  className="bg-black hover:bg-blue-700 text-sm text-white font-bold py-2 px-4"
                  type="button"
                  onClick={() => toggleModal("assignJob")}
                >
                  Assign Job
                </button>
              </div>
              <Labor labor={laborList} deleteLabor={handleDeleteLabor} />
            </div>
            <span className="font-semibold text-4xl text-right pb-4">
              Total: ${finalTotalCost}
            </span>
          </div>
        </div>
      </div>
      </form>
      {modalType === "addItem" && (
        <AddItemModal addItem={addItem} closeModal={closeModal} />
      )}
      {modalType === "assignJob" && (
        <AddLaborModal addLabor={addLabor} closeModal={closeModal} />
      )}
    </div>
  );
};

export default CreateQuote;
