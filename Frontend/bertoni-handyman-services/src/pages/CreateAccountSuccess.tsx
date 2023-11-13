import React from 'react';

const CreateAccountSuccess: React.FC = () => {
  return (
    <div className="flex flex-col justify-start flex-grow h-screen px-4 pt-16">
      <div className="pt-6 m-6 text-center">
        <span className="text-5xl font-bold text-gray-700">Create Account</span>
      </div>

      <h2 className="my-4 text-3xl font-semibold text-center text-orange-500">
        Thank you for creating an account with Bertoni Handyman Services!
      </h2>

      <p className="mt-6 text-2xl text-center text-gray-700">
      We sent you a verification email. <br/>
       Please follow the link in the email to sign into your account.
      </p>
    </div>
  );
};

export default CreateAccountSuccess;
