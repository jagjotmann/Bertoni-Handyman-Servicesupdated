import React from "react";
import PaddingSectionLayout from "../layouts/PaddingSectionLayout";
import { FaCheck } from 'react-icons/fa';

const Services = () => {
  return (
    <PaddingSectionLayout>
      <h2 className="text-center text-3xl sm:text-5xl pt-7 pb-8 sm:pb-16 font-bold">
        Our Services
      </h2>
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col sm:flex-row">
        <div className="flex-1 pr-0 sm:pr-8 pb-4 sm:pb-0">
          <p className="pb-4">
            We are a team of dedicated professionals with a passion for improving homes and enhancing the lives of homeowners.
          </p>
          <p className="pb-4">
            With years of experience in the construction industry, we aim to deliver top-notch services in small-scale home repair and improvement projects.
          </p>
        </div>
        <div className="flex-1 bg-color p-4 sm:p-6 rounded-lg">
          <ul className="list-decimal list-inside columns-2">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">&#x2713;</span> Fencing
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">&#x2713;</span> Concrete
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">&#x2713;</span> Plumbing
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">&#x2713;</span> Carpentry
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">&#x2713;</span> Electrical
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">&#x2713;</span> Painting
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">&#x2713;</span> Roofing
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">&#x2713;</span> Deck/Patio
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">&#x2713;</span> Drywall Repair
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">&#x2713;</span> Tile Installation
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">&#x2713;</span> Home renovations
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">&#x2713;</span> Emergency Repairs
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2"></span> + more!
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
