import React from "react";

const QuoteLogin = () => {
    return (
        <div className="bg-white min-h-screen flex flex-col items-center p-4">
            <div className="bg-white p-9 w-full max-lg">
                <h1 className="font-bold text-3xl mb-4">Quote #0000001</h1>
                <div className="text-gray-700 mb-6 text-xs font-bold">
                   <p>*You are not signed in with a user account, so you cannot view or edit any requests or chats.</p>
                   <p>To view and edit requests and chats, please create an account or sign in with your email.</p>
                   <p>Please reach out to Bertoni's Handyman Services for any questions.</p>
                </div>
                <div className="flex space-x-10">
                    <div className="px-6 py-3 p-2 bg-white-200 rounded-lg" style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                          <h2 className="font-bold text-xsm    ">Quote Request</h2>
                          <div className="text-yellow-600 text-xs">Pending approval</div>
                    </div>
                    <div className="px-6 py-3 p-2 bg-white-200 rounded-lg" style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                        <h2 className="font-bold text-xsm    ">Appointment</h2>
                        <div className="text-gray-600 text-xs">Waiting for Quote</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
  
export default QuoteLogin;