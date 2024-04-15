import React from "react";
import { useState, useEffect, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import QuotePreviewModal from "../components/UI/QuotePreviewModal";
import QuotePreview from "../components/QuotePreview";
import { Quote } from "../../../../Backend/src/models/quoteModel";

interface Material {
  name: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface Labor {
  name: string;
  description?: string;
  numHours: number;
  hourlyRate: number;
  total: number;
}

interface QuoteFormData {
  id: string;
  phone: string;
  description: string;
  name: string;
  email: string;
  address: string;
  images: string[];
  preferredEndDate: Date;
  htmlContent: string;
  itemList: Material[];
  laborList: Labor[];
}
interface MaterialProps {
  items: Material[];
  deleteItem: (indexToDelete: number) => void;
}

interface LaborProps {
  labor: Labor[];
  deleteLabor: (indexToDelete: number) => void;
}

//type for list of materials
type MaterialList = {
  items: Material[];
  deleteItem: (indexToDelete: number) => void;
};

type LaborList = {
  labor: Labor[];
  deleteLabor: (indexToDelete: number) => void;
};

//this is the handler for conditional rendering for the materials table
const Materials: React.FC<MaterialProps> = ({ items, deleteItem }) => {
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
              <td className="p-2 px-4 border-r-2">{item.name}</td>
              <td className="p-2 px-4 border-r-2">${item.unitPrice}</td>
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
  addItem: (item: Material) => void;
  closeModal: () => void;
}> = ({ addItem, closeModal }) => {
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemQuantity, setItemQuantity] = useState<number>(0);
  const [itemUnitPrice, setItemUnitPrice] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addItem({
      name: itemName,
      description: itemDescription,
      quantity: itemQuantity,
      unitPrice: itemUnitPrice,
      total: itemQuantity * itemUnitPrice
    });
    closeModal();
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
                value={itemUnitPrice}
                onChange={(e) => setItemUnitPrice(e.target.valueAsNumber)}
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
const Labor: React.FC<LaborProps> = ({ labor, deleteLabor }) => {
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
              <td className="p-2 px-4 border-r-2">${labor.hourlyRate}/hour</td>
              <td className="p-2 px-4 border-r-2">{labor.numHours}</td>
              <td className="p-2 px-4 border-r-2">${labor.hourlyRate * labor.numHours}</td>
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
  addLabor: (labor: Labor) => void;
  closeModal: () => void;
}> = ({ addLabor, closeModal }) => {
  const [laborName, setLaborName] = useState("");
  const [laborDescription, setLaborDescription] = useState("");
  const [numHours, setNumHours] = useState<number>(0);
  const [hourlyRate, setHourlyRate] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addLabor({
      name: laborName,
      description: laborDescription,
      numHours: numHours,
      hourlyRate: hourlyRate,
      total: numHours * hourlyRate
    });
    closeModal();
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
  const [quote, setQuote] = useState<Quote | null>(null); //"" allows a loading state for transparency of data loading
  const [editable, setEditable] = useState(quoteId == "new"); //allows default editing state when routed with no quote
  const navigate = useNavigate();
  const [isPreviewOpen, setPreviewOpen] = useState(false);
  const [loading, setLoading] = useState(false); //can be attached to for adding loading Text to modal?
  const [quoteHTML, setQuoteHTML] = useState("");

  const [finalTotalCost, setFinalTotalCost] = useState(0);
  const [formData, setFormData] = useState<QuoteFormData>({
    id: "",
    phone: "",
    description: "",
    name: "",
    email: "",
    address: "",
    images: [],
    preferredEndDate: new Date(),
    htmlContent: "",
    itemList: [],
    laborList: []
  });

  const handlePreview = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/quotes/${quoteId}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const quote = await response.json();
      setQuoteHTML(quote.htmlContent);
      setPreviewOpen(true);
    } catch (error) {
      console.error("Failed to fetch quote", error);
      // TODO: ADD ERROR HANDLING HERE
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const quote = await axios.get<Quote>(
          `http://localhost:3000/quotes/${quoteId}`
        );
        setQuote(quote.data);
        console.log("QUOTE DATA: ", quote.data);
        setFormData({
          id: String(quoteId),
          phone: quote?.data?.contactPerson?.phone ?? '',
          description: quote?.data?.notes ?? '',
          name: quote?.data?.contactPerson?.name ?? '',
          email: quote?.data?.contactPerson?.email ?? '',
          address: quote?.data?.project?.address?.streetAddress ?? '',
          preferredEndDate: quote?.data?.preferredEndDate,// || "Not specified",
          images: quote?.data?.images ?? [],
          htmlContent: quote.data.htmlContent?.toString() ?? "Failed to get htmlContent",
          itemList: quote.data.items || [],
          laborList: quote.data.labor || []
        });
      } catch (error) {
        console.error("Error fetching quote:", error);
      }
    };

    if (quoteId) {
      fetchQuote();
    }
  }, [quoteId]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Submitting data:", formData);
    try {
      const response = quoteId !== "new" ?
      await axios.put(`http://localhost:3000/quotes/${quoteId}`, formData) :
      await axios.post(`http://localhost:3000/quotes/create`, formData);

      console.log("Response:", response.data)
      navigate(`/create-a-quote/${quoteId}`);
    } catch (error) {
      console.error("Error submitting quote:", error);
    }
  };

  //add item to item list
  const addItem = (item: Material) => {
    const newItemList = [...formData.itemList, item];
    setFormData({...formData, itemList: newItemList});
  };
  
  const addLabor = (labor: Labor) => {
    const newLaborList = [...formData.laborList, labor];
    setFormData({...formData, laborList: newLaborList});
  };

  //handles deletion of item from list
  const handleDeleteItem = (indexToDelete: number) => {
    const updatedItemList = formData.itemList.filter((_, index) => index !== indexToDelete);
    setFormData({...formData, itemList: updatedItemList});
  };

  const handleDeleteLabor = (indexToDelete: number) => {
    const updatedLaborList = formData.laborList.filter((_, index) => index !== indexToDelete);
    setFormData({...formData, laborList: updatedLaborList});
  };

  //sums total cost of item list and labor
  useEffect(() => {
    const totalCost = formData.itemList.reduce((total, item) => total + item.unitPrice, 0);
    const laborCost = formData.laborList.reduce((total, labor) => total + labor.hourlyRate * labor.numHours, 0);
    setFinalTotalCost(totalCost + laborCost);
  }, [formData.itemList, formData.laborList]);

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
        <div className="flex-col justify-between items-center bg-white p-4">
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
            <div className="px-2 border mr-4 rounded-full">
              {quote && (
                <QuotePreviewModal
                  quote={quote}
                  isOpen={isPreviewOpen}
                  onRequestClose={() => setPreviewOpen(false)}
                ></QuotePreviewModal>
              )}
            </div>
            <button
              className="bg-green-500 hover:bg-green-700 text-center text-white font-bold px-4 rounded-full pr-4"
              type="submit"
              //submit to DB
            >
              Save
            </button>
          </div>
          <div className="pt-4">
            <div className="pb-4 px-4">
              {/* Big box on page*/}
              <div className="bg-gray-700 w-full h-[40px]">
                <button
                  className="text-gray-300 hover:text-gray-500 rounded-t-2xl text-left py-2 px-2 transition ease-in-out click:bg-gray-900"
                  onClick={() => navigate("/admin")} //Change to client link
                >
                  &lt; Back to Admin Dashboard
                </button>
              </div>

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
                      {editable ? (
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="px-2 py-1 border border-blue-gray-200 text-sm font-normal text-blue-gray-700 outline outline-0 placeholder-shown:border-blue-gray-200 focus:border-2 focus:border-gray-900"
                          placeholder="Email"
                        />
                      ) : (
                        <div>
                          <p className="text-gray-400">Email:</p>
                          <a
                            href={`mailto:${formData.email}`}
                            className="text-blue-500 hover:text-blue-300"
                          ></a>
                          {formData.email}
                        </div>
                      )}
                    </div>
                    <div>
                      {editable ? (
                        <input
                          type="phone"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="px-2 py-1 border border-blue-gray-200 text-sm font-normal text-blue-gray-700 outline outline-0 placeholder-shown:border-blue-gray-200 focus:border-2 focus:border-gray-900"
                          placeholder="Phone Number"
                        />
                      ) : (
                        <div>
                          <p className="text-gray-400">Phone:</p>
                          <p>{formData.phone}</p>
                        </div>
                      )}
                    </div>
                    <div>
                      {editable ? (
                        <input
                          type="address"
                          value={formData.address}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              address: e.target.value,
                            })
                          }
                          className="px-2 py-1 border border-blue-gray-200 text-sm font-normal text-blue-gray-700 outline outline-0 placeholder-shown:border-blue-gray-200 focus:border-2 focus:border-gray-900"
                          placeholder="Address"
                        />
                      ) : (
                        <div>
                          <p className="text-gray-400">Address:</p>
                          <p>{formData.address}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    {editable ? (
                      <textarea
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        className="px-2 py-1 min-w-full min-h-8 border border-blue-gray-200 text-sm font-normal text-blue-gray-700 outline outline-0 placeholder-shown:border-blue-gray-200 focus:border-2 focus:border-gray-900"
                        placeholder="Descripton"
                      />
                    ) : (
                      <div>
                        <p className="text-gray-400">Job Description:</p>
                        <p>{formData.description}</p>
                      </div>
                    )}
                  </div>
                  <div className="pb-2">
                    {editable ? (
                      <div>
                        <label className="text-gray-400" htmlFor="prefDate">
                          Preferred End Date:{" "}
                        </label>
                        <input
                          id="prefDate"
                          type="date"
                          value={
                            formData.preferredEndDate
                              ? formData.preferredEndDate
                                  .toISOString()
                                  .split("T")[0]
                              : ""
                          }
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              preferredEndDate: new Date(e.target.value),
                            })
                          }
                          className="px-2 py-1 border border-blue-gray-200 text-sm font-normal text-gray-400 outline outline-0 placeholder-shown:border-blue-gray-200 focus:border-2 focus:border-gray-900"
                          placeholder="Preferred End Date"
                        />
                      </div>
                    ) : (
                      <div>
                        <p className="text-gray-400">Preferred End Date:</p>
                        <p>
                          {formData.preferredEndDate
                            ? formData.preferredEndDate
                                .toISOString()
                                .split("T")[0]
                            : ""}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="pb-2">
                    <p className="text-gray-400">Images Provided:</p>
                    {formData.images.map((image, index) => (
                      <div>
                        <h1>{`Image ${index + 1}: `}</h1>
                        <img
                          key={index}
                          src={image}
                          alt={`Quote Image ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  {editable ? (
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className="px-2 py-1 min-w-full min-h-8 border border-blue-gray-200 text-sm font-normal text-blue-gray-700 outline outline-0 placeholder-shown:border-blue-gray-200 focus:border-2 focus:border-gray-900"
                      placeholder="Descripton"
                    />
                  ) : (
                    <div>
                      <p className="text-gray-400">Job Description:</p>
                      <p>{formData.description}</p>
                    </div>
                  )}
                </div>
                <div className="pb-2">
                  {editable ? (
                    <div>
                      <label className="text-gray-400" htmlFor="prefDate">
                        Preferred End Date:{" "}
                      </label>
                      <input
                        id="prefDate"
                        type="date"
                        value={formData.preferredEndDate ? formData.preferredEndDate.toISOString().split('T')[0] : 'Not specified'} //preferredEndDate can either be a date object or the string "Not specified" here
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            preferredEndDate: new Date(e.target.value), // Convert string to Date
                          })
                        }
                        className="px-2 py-1 border border-blue-gray-200 text-sm font-normal text-gray-400 outline outline-0 placeholder-shown:border-blue-gray-200 focus:border-2 focus:border-gray-900"
                        placeholder="Preferred End Date"
                      />
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-400">Preferred End Date:</p>
                      <p>{formData.preferredEndDate ? formData.preferredEndDate.toISOString().split('T')[0] : 'Not Specified'}</p>
                    </div>
                  )}
                </div>
                <div className="pb-2">
                  <p className="text-gray-400">Images Provided:</p>
                  {formData.images.map((image, index) => (
                    <div>
                      <h1>{`Image ${index + 1}: `}</h1>
                      <img
                        key={index}
                        src={image}
                        alt={`Quote Image ${index + 1}`}
                      />
                    </div>
                  ))}
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
                  <Materials items={formData.itemList} deleteItem={handleDeleteItem} />
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
                <Labor labor={formData.laborList} deleteLabor={handleDeleteLabor} />
                <span className="font-semibold text-4xl text-right pb-4">
                  Total: ${finalTotalCost}
                </span>
              </div>
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
