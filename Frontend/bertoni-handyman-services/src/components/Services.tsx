import React from "react";
import PaddingSectionLayout from "../layouts/PaddingSectionLayout";
import { FaCheck } from 'react-icons/fa';

const Services = () => {

  const services = [
    "Fencing",
    "Concrete",
    "Plumbing",
    "Carpentry",
    "Electrical",
    "Painting",
    "Roofing",
    "Deck/Patio",
    "Drywall Repair",
    "Tile Installation",
    "Home renovations",
    "Emergency Repairs",
  ];

  return (
    <PaddingSectionLayout>
      <h2 className="text-center text-3xl sm:text-5xl pt-7 pb-8 sm:pb-16 font-bold">
        Our Services
      </h2>
      <div className="p-4 sm:p-6 rounded-lg flex flex-col sm:flex-row md:items-center text-base lg:text-lg">
        <div className="flex-1 pr-0 sm:pr-8 pb-4 sm:pb-0">
          <p className="pb-4">
            We are a team of dedicated professionals with a passion for improving homes and enhancing the lives of homeowners.
          </p>
          <p className="">
            With years of experience in the construction industry, we aim to deliver top-notch services in small-scale home repair and improvement projects.
          </p>
        </div>
        <div aria-label="Services List" className="flex-1 bg-color p-4 sm:p-6 rounded-lg">
          <ul className="list-decimal list-inside columns-2">
          {services.map((service, index) => (
              <li className="flex items-center" key={index}>
                <span className="text-green-500 pr-2">&#x2713;</span> {service}
              </li>
              ))}
              {/*Seperated to avoid styling with checkmark*/}
              <li className="flex items-center">
                + more!
              </li>
          </ul>
        </div>
      </div>
      <style>
        {`
          .bg-color {
            background-color: #2D333A;
            color: #F2F2F4;
            padding: 20px; /* Adjust padding as needed */
          }
        `}
      </style>
    </PaddingSectionLayout>
  );
};

export default Services;
