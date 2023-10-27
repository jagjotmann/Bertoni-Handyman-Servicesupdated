import React from "react";
import PaddingSectionLayout from "../layouts/PaddingSectionLayout";
import { IoIosChatbubbles, IoIosHammer, IoIosStar } from "react-icons/io";

const infoCardData = [
  {
    title: "Fast Quotes",
    description: "Submit a quote request and get a quick estimate.",
    icon: <IoIosChatbubbles style={{ fontSize: "34px" }} />,
  },
  {
    title: "Great Service",
    description: "Get the most-qualified professionals for the job.",
    icon: <IoIosHammer style={{ fontSize: "34px" }} />,
  },
  {
    title: "Best Quality",
    description: "We provide the best quality of work for our clients.",
    icon: <IoIosStar style={{ fontSize: "34px" }} />,
  },
];

const InfoCards = () => {
  return (
    <PaddingSectionLayout>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 sm:grid-cols-2">
        {infoCardData.map((data, index) => (
          <div
            key={index}
            className="flex flex-col justify-between p-6 bg-gray-100 rounded-lg shadow-md"
          >
            <div className="flex justify-center gap-8 items-center pb-4 text-lg font-medium">
              {data.icon}
              <h1>{data.title}</h1>
            </div>
            <div className="flex justify-center">
              <p>{data.description}</p>
            </div>
          </div>
        ))}
      </div>
    </PaddingSectionLayout>
  );
};

export default InfoCards;
