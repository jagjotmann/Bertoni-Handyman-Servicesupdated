import React from 'react';

const ClientProfileAlternateView = () => {
    
  const clientInfo = {
    username: 'jeff101',
    name: 'Jeff Horman',
    email: 'jeff@email.com',
    phone: '988-122-1234',
    unreadMessages: false,
    quoteStatus: 'Completed',
    appointmentStatus: 'Pending',
    jobs: [
        {
            type: 'No jobs yet.',
        },
    ],
  };

  return (
    <>
    <div className="bg-white pt-5 pb-5 shadow-small text-2xl font-semibold pl-20 mb-4">Client Profile</div>

    <div className="container mx-auto my-8 shadow-small rounded-3xl">
        <div className="bg-[#2D333A] p-3 rounded-t-3xl pl-6">
            <div>
            <a href="/clients" className="text-white transition duration-300">
                ← Back to Clients
            </a>
            </div>
        </div>

      <div className="mb-4 pl-6 pt-5">
        <div>
          <span className="inline-block align-middle">
            <p className="text-gray-600">{clientInfo.username}</p>
            <h1 className="text-4xl font-semibold inline">{clientInfo.name}</h1>
          </span>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-5 rounded-xl inline-block align-middle ml-5 mt-5">
          <span>Chat {clientInfo.unreadMessages}</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 mb-5 mt-8 pl-6">

        <div className="w-full md:w-1/4 sm:w-1/3 bg-white p-4 md:p-6 shadow-small rounded-3xl flex flex-col justify-between">
            <p className="text-2xl font-semibold mb-4">Create a quote</p>
            <div className="flex justify-between items-center">
            <button className=" text-white bg-blue-800 py-1 sm:py-1 px-1 sm:px-1 text-sm sm:text-base rounded">
                start →
            </button>
            </div>
        </div>
        </div>

      <div className="mb-4 w-full bg-white pl-6">
        <h1 className="text-2xl font-semibold inline pb-7">Jobs</h1>
        <div className="flex flex-wrap justify-start -mx-2 overflow-hidden">
            {clientInfo.jobs.map((job, index) => (
            <div key={index} className="my-3 px-2 overflow-hidden sm:w-1/1 md:w-1/4 lg:w-1/4 xl:w-1/5">
                <div className="bg-gray-100 p-4  rounded flex flex-col justify-start items-start">
                <span className='font-bold text-center'></span>
                <span className="text-yellow-500"></span>
                </div>
            </div>
            ))}
        </div>
       </div>

      <div className="mb-4 pl-6">
        <h2 className="text-lg font-semibold">Contact Information</h2>
        <p>Email: {clientInfo.email}</p>
        <p>Phone: {clientInfo.phone}</p>
      </div>

      <div className="flex pl-6 pb-6">
        <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 mr-7">
          Edit Client
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ">
          Delete Client
        </button>
      </div>
    </div>
    </>
  );
};

export default ClientProfileAlternateView;

