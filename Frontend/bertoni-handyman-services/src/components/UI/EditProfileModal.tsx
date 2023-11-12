import React from "react";

interface EditProfileModalProps {
  onClose: () => void;
}
const EditProfileModal: React.FC<EditProfileModalProps> = ({ onClose }) => {
  // Modal content and form submission logic go here

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        {/* Close button */}
        <div className="flex justify-end">
          <button onClick={onClose}>X</button>
        </div>

        {/* Form fields */}
        <form>
          {/* Form fields go here */}
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
