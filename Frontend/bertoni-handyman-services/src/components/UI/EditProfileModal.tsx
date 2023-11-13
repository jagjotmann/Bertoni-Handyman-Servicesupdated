// EditProfileModal.tsx
import React, { useState } from "react";

interface EditProfileModalProps {
  onClose: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const saveProfile = () => {
    // Implement save logic
    console.log(name, email, phoneNumber);
    onClose(); // Close modal after save
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Edit Profile</h2>
          <button onClick={onClose}>X</button>
        </div>
        <div className="my-4">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="my-4">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="my-4">
          <label>Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={saveProfile}
            className="bg-black text-white p-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
