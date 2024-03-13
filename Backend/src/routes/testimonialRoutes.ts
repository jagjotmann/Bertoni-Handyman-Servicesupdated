const express = require("express");
const router = express.Router();
import Testimonial from "../models/testimonialModel.js";
import User from "../models/userModel.js";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
const rateLimit = require("../../dist/middlewares/ratelimit.js");
const adminRateLimit = require("../../dist/middlewares/adminRateLimit.js");

router.post(
  "/getTestimonials",
  adminRateLimit,
  async (req: Request, res: Response) => {
    try {
      const { amount } = req.body;
      const tests = await Testimonial.find()
        .populate("author")
        .sort({ date: -1 })
        .limit(amount);
      const formattedTests = tests.map((blog) => {
        return {
          _id: blog._id,
          content: blog.content,
          author: {
            // @ts-ignore
            fullName:
              // @ts-ignore
              blog.author.name.firstName + " " + blog.author.name.lastName,
          },
          // @ts-ignore
          username: blog.author.username,
          date: blog.date,
          rating: blog.rating,
        };
      });
      res.status(200).json({
        message: "Fetched Testimonials",
        testimonials: formattedTests,
      });
    } catch (err: any) {
      console.log(err);
      res.status(400).json({ error: err.message });
    }
  }
);

router.post(
  "/addTestimonial",
  rateLimit,
  async (req: Request, res: Response) => {
    const { email, content, rating } = req.body;

    const Author = await User.findOne({ contactInfo: { email: email } });

    if (!Author) {
      return res.status(400).json({ error: "No user with this email exists." });
    }

    const alreadyHasATestimonial = await Testimonial.findOne({
      author: Author._id,
    });

    if (alreadyHasATestimonial) {
      return res
        .status(400)
        .json({ error: "Cannot submit multiple testimonials." });
    }

    const authorId = Author._id;

    try {
      const newTestimonial = new Testimonial({
        author: authorId,
        date: Date.now(),
        content: content,
        rating: rating,
      });

      await newTestimonial.save();
      res.status(201).json({
        message: "Testimonial added succesfully",
        testimonial: newTestimonial,
      });
    } catch (error: any) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  }
);

router.post(
  "/deleteTestimonial",
  adminRateLimit,
  async (req: Request, res: Response) => {
    const { testimonial_id } = req.body;
    Testimonial.findByIdAndDelete(testimonial_id)
      .then((result) => {
        res.json({ message: "Deleted" });
      })
      .catch((err: any) => {
        res.json({ message: err });
      });
  }
);

module.exports = router;
