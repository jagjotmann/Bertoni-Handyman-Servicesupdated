"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const testimonialModel_js_1 = __importDefault(require("../models/testimonialModel.js"));
const userModel_js_1 = __importDefault(require("../models/userModel.js"));
const rateLimit = require("../../dist/middlewares/ratelimit.js");
const adminRateLimit = require("../../dist/middlewares/adminRateLimit.js");
router.post("/getTestimonials", adminRateLimit, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount } = req.body;
        const tests = yield testimonialModel_js_1.default.find()
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
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
}));
router.post("/addTestimonial", rateLimit, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, content, rating } = req.body;
    const Author = yield userModel_js_1.default.findOne({ contactInfo: { email: email } });
    if (!Author) {
        return res.status(400).json({ error: "No user with this email exists." });
    }
    const alreadyHasATestimonial = yield testimonialModel_js_1.default.findOne({
        author: Author._id,
    });
    if (alreadyHasATestimonial) {
        return res
            .status(400)
            .json({ error: "Cannot submit multiple testimonials." });
    }
    const authorId = Author._id;
    try {
        const newTestimonial = new testimonialModel_js_1.default({
            author: authorId,
            date: Date.now(),
            content: content,
            rating: rating,
        });
        yield newTestimonial.save();
        res.status(201).json({
            message: "Testimonial added succesfully",
            testimonial: newTestimonial,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}));
router.post("/deleteTestimonial", adminRateLimit, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { testimonial_id } = req.body;
    testimonialModel_js_1.default.findByIdAndDelete(testimonial_id)
        .then((result) => {
        res.json({ message: "Deleted" });
    })
        .catch((err) => {
        res.json({ message: err });
    });
}));
module.exports = router;
