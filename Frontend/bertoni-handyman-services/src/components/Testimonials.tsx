import React, { useState, useEffect } from "react";
import PaddingSectionLayout from "../layouts/PaddingSectionLayout";
import { FaStar } from "react-icons/fa";

// Sample data for client testimonials
type Author = {
  fullName: string;
};
type Testimonial = {
  author: Author;
  username: string;
  _id: string;
  date: Date;
  content: string;
  rating: number;
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    async function FetchTestimonials() {
      try {
        const response = await fetch(
          "http://localhost:3001/testimonials/allTestimonials",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setTestimonials(data.testimonials);
      } catch (err: any) {
        console.log(err);
      }
    }
    FetchTestimonials();
  }, []);

  return (
    <PaddingSectionLayout id="testimonials-section">
      {/* Heading for the Testimonials section */}
      <h2
        className="pb-16 text-5xl font-bold text-center "
        aria-label="Client Testimonials"
      >
        Client Testimonials
      </h2>
      {/* Grid layout to display the testimonials */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 sm:grid-cols-2 mb-8">
        {testimonials &&
          testimonials.length > 0 &&
          testimonials.map((testimonial: Testimonial, index) => (
            <div
              key={index}
              className="flex flex-col justify-between p-6 bg-gray-100 rounded-lg shadow-md"
            >
              <div className="flex items-center pb-4">
                {/* Placeholder for the client's image/picture */}
                <div className="w-16 h-16 mr-4 bg-gray-300 rounded-full"></div>
                {/* Client's name */}
                <div className="block">
                  <h3>{testimonial.author.fullName}</h3>
                  <p className="text-[10px] text-gray-500">
                    {new Date(testimonial.date).toDateString()}
                  </p>
                </div>
              </div>
              {/* Client's feedback */}
              <p className="pb-4 text-center">{testimonial.content}</p>
              {/* 5 star review. Visually represents the rating but will be readable for screen readers */}
              <div
                className="flex justify-center"
                aria-label={`${testimonial.rating} star review`}
              >
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span
                    key={i}
                    className="inline-block w-6 h-6 text-yellow-500"
                  >
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
