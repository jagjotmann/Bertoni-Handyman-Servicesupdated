import React from "react";
import PaddingSectionLayout from "../layouts/PaddingSectionLayout";
import { FaStar } from "react-icons/fa";

// Sample data for client testimonials
const testimonialData = [
  { name: "Joe R", feedback: "Great Work!", stars: 5 },
  { name: "Roman S", feedback: "Great Work!", stars: 5 },
  { name: "Hannah W", feedback: "Great Work!", stars: 5 },
];

const Testimonials = () => {
  return (
    <PaddingSectionLayout>
      {/* Heading for the Testimonials section */}
      <h2
        className="text-center text-5xl pt-7 pb-16 font-bold"
        aria-label="Client Testimonials"
      >
        Client Testimonials
      </h2>
      {/* Grid layout to display the testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-8">
        {testimonialData.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between"
          >
            <div className="flex items-center pb-4">
              {/* Placeholder for the client's image/picture */}
              <div className="w-16 h-16 bg-gray-300 rounded-full mr-4"></div>
              {/* Client's name */}
              <h3>{testimonial.name}</h3>
            </div>
            {/* Client's feedback */}
            <p className="pb-4">{testimonial.feedback}</p>
            {/* 5 star review. Visually represents the rating but will be readable for screen readers */}
            <div
              className="flex justify-center"
              aria-label={`${testimonial.stars} star review`}
            >
              {[...Array(testimonial.stars)].map((_, i) => (
                <span key={i} className="text-yellow-500 w-6 h-6 inline-block">
                  <FaStar aria-hidden="true" />
                </span>
              ))}
            </div>
            {/* end of 5 star review */}
          </div>
        ))}
      </div>
    </PaddingSectionLayout>
  );
};

export default Testimonials;
