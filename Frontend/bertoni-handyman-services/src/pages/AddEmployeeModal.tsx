import React from "react";
import PopupButton from './PopupButton';

const AddEmployeeModal: React.FC = () => {
  const modalContent = (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-xl mb-4">Add Employee</h2>
        <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="employeeID" style={{ fontWeight: 'bold' }}>Employee ID:</label>
            <input type="text" id="employeeID" name="employeeID" style={{ width: '100%', padding: '0.5rem', border: '1px solid black', borderRadius: '4px' }} />
          </div>
    
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="employeeName" style={{ fontWeight: 'bold' }}>Employee Name:</label>
            <input type="text" id="employeeName" name="employeeName" style={{ width: '100%', padding: '0.5rem', border: '1px solid black', borderRadius: '4px' }} />
          </div>
    
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="email" style={{ fontWeight: 'bold' }}>E-mail:</label>
            <input type="email" id="email" name="email" style={{ width: '100%', padding: '0.5rem', border: '1px solid black', borderRadius: '4px' }} />
          </div>
    
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="phone" style={{ fontWeight: 'bold' }}>Phone:</label>
            <input type="tel" id="phone" name="phone" style={{ width: '100%', padding: '0.5rem', border: '1px solid black', borderRadius: '4px' }} />
          </div>
    
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="job" style={{ fontWeight: 'bold' }}>Job:</label>
            <input type="text" id="job" name="job" style={{ width: '100%', padding: '0.5rem', border: '1px solid black', borderRadius: '4px' }} />
          </div>
    
          <button type="submit" style={{ width: '100%', padding: '0.5rem', border: '1px solid black', borderRadius: '4px', backgroundColor: 'white', transition: 'background-color 0.3s ease', }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#87CEEB'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
          onMouseDown={(e) => e.currentTarget.style.backgroundColor = '#87CEEB'}
          onMouseUp={(e) => e.currentTarget.style.backgroundColor = 'white'} >Submit</button>
        </form>
      </div>
    </div>
  );

  return (
    <PopupButton buttonText="Add Employee" modalContent={modalContent} />
  );
};

export default AddEmployeeModal;
