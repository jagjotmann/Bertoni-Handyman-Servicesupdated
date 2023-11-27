import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Testimonials from "../components/Testimonials";

const AddTestimonial = () => {
  const navigate = useNavigate();
  const [params, setParams] = useState("");
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const singleValue = queryParams.get("email");
    if (!singleValue) return;
    setParams(singleValue);
  }, []);

  const [starArray, setStarArray] = useState([
    "gray",
    "gray",
    "gray",
    "gray",
    "gray",
  ]);

  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);

  const handleContentChange = (event: any) => {
    setContent(event.target.value);
  };

  const handleStarClick = (index: number) => {
    let temp_arr = starArray;
    let len = temp_arr.length;
    for (let i = 0; i <= index; i++) {
      temp_arr[i] = "yellow";
    }
    for (let i = len - 1; i > index; i--) {
      temp_arr[i] = "gray";
    }
    setRating((prev) => index + 1);
    setStarArray((prev) => [...temp_arr]);
  };

  const checkValidity = (val: string | number) => {
    if (typeof val === "string") {
      return val.trim() != "";
    } else {
      return val >= 0 && val <= 5;
    }
  };

  function invalidEmail(email: string) {
    return false;
  }

  // Handles the form submission and redirects to the "thankyou" page.
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //check if param field is a valid email, and no error occurred when sending the link with the params
    if (params.trim() == "" || invalidEmail(params)) {
      alert(
        "There was an issue with the link. Please try using the link from your email."
      );
      return;
    }

    if (!checkValidity(content) || !checkValidity(rating)) {
      alert("Please fill in all required fields.");
      return;
    }

    if (rating == 0) {
      alert("Please provide a rating.");
      return;
    }

    let testimonial_data = { email: params, content: content, rating: rating };

    //add testimonial logic
    async function AddTestimonial() {
      try {
        const response = await fetch(
          "http://localhost:3001/testimonials/addTestimonial",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(testimonial_data),
          }
        );

        if (!response.ok) {
          const data = await response.json();
          alert(data.error);
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Testimonial added successfully: ", data);
        navigate("/thankyou");
      } catch (error: any) {
        console.error("Error during saving testimonial: ", error);
      }
    }

    AddTestimonial();
  };

  return (
    <div className="min-h-screen max-w-screen-md p-6 py-2 mx-auto">
      {/* Heading for the contact form */}
      <h2 className="pt-10 text-4xl font-extrabold text-center text-gray-900 py-9">
        Add Testimonial
      </h2>
      <div className="p-6 bg-gray-200 rounded-md ">
        <form action="#" onSubmit={handleFormSubmit}>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full px-2 md:w-1/2">
              {/* Label for the email field */}
              <label
                htmlFor="email"
                className="block my-2 text-sm font-medium text-left text-gray-900"
              >
                Email
              </label>
              <input
                value={params}
                id="email"
                name="email"
                type="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
                placeholder="jane.doe@example.com"
                aria-required="true" // Adds aria-required for better screen reader experience.
                required
                readOnly
              />
            </div>
          </div>
          <div className="mt-4">
            {/* Label for the message field */}
            <label
              htmlFor="message"
              className="block my-2 text-sm font-medium text-left text-gray-900"
            >
              Comment
            </label>
            <textarea
              value={content}
              onChange={handleContentChange}
              id="message"
              name="message"
              rows={6}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 shadow-sm border border-gray-300"
              placeholder="Comment anything you would like to share in your testimonial..."
              aria-required="true" // Adds aria-required for better screen reader experience.
              required
            ></textarea>
          </div>
          <div className="mt-4">
            {/* Label for the message field */}
            <label
              htmlFor="rating"
              className="block my-2 text-sm font-medium text-left text-gray-900"
            >
              Rating
            </label>
            <div className="my-4 space-x-2 flex">
              {starArray.map((item, i) => (
                <div key={i}>
                  <FaStar
                    className={`text-${item}-500`}
                    onClick={() => handleStarClick(i)}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Submit button for the form */}
          <button
            type="submit"
            className="p-2 px-10 my-4 font-bold text-white transition-transform transform bg-orange-500 rounded-md hover:scale-105"
          >
            Send
          </button>
        </form>
      </div>
      <div className="mb-10">
        <Testimonials />
      </div>
    </div>
  );
};

export default AddTestimonial;
