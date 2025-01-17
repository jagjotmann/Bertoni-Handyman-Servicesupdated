//Management Page
import React from "react";
import FullSectionLayout from "../layouts/FullSectionLayout";
import PopupButton from './PopupButton';
import AddEmployeeModal from './AddEmployeeModal';

const employees = [
  {
    employeeID: "#000",
    employeeName: "Jeff Richard",
    email: "jeff101@email.com",
    phone: "(201)145-2453",
    job: "Roofing",
  },
  {
    employeeID: "#001",
    employeeName: "Jeff Richard",
    email: "jeff101@email.com",
    phone: "(201)145-2453",
    job: "Windows",
  },
  {
    employeeID: "#002",
    employeeName: "Jeff Richard",
    email: "jeff101@email.com",
    phone: "(201)145-2453",
    job: "Cabinets",
  },
  {
    employeeID: "#003",
    employeeName: "Jeff Richard",
    email: "jeff101@email.com",
    phone: "(201)145-2453",
    job: "Lawn",
  },
];

function Management() {
  return (
    <FullSectionLayout>
      <div className="px-6 pt-4">
      <h1 className="text-2xl font-bold mb-4 w-243">Management</h1>

        <table className="w-full border-collapse border border-gray-200 mt-2">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 font-inter text-left w-128 h-30">
                Employee ID
              </th>
              <th className="py-2 px-4 font-inter text-left w-186 h-30">
                Employee Name
              </th>
              <th className="py-2 px-4 font-inter text-left w-92 h-30">
                E-mail
              </th>
              <th className="py-2 px-4 font-inter text-left w-98 h-30">
                Phone
              </th>
              <th className="py-2 px-4 font-inter text-left w-98 h-30">Job</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((request, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                <td className="py-2 px-4 w-37 h-30">{request.employeeID}</td>
                <td className="py-2 px-4 w-83 h-30">{request.employeeName}</td>
                <td className="py-2 px-4 w-67 h-30">{request.email}</td>
                <td className="py-2 px-4 w-56 h-30">{request.phone}</td>
                <td className="py-2 px-4 w-34 h-30">{request.job}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddEmployeeModal/>
    </FullSectionLayout>
  );
}

export default Management;
