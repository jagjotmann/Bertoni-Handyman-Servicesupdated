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
const nodemailer_1 = __importDefault(require("nodemailer"));
require("dotenv").config();
const router = express.Router();
let transporter = nodemailer_1.default.createTransport({ service: process.env.EMAIL_SERVICE, auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS, }, });
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () { const { message, userEmail } = req.body; if (!userEmail || !message) {
    return res.status(400).json({ message: "Missing required fields" });
} let mailOptions = { from: process.env.EMAIL_USER, to: userEmail, subject: "Update on Your Request", text: message, }; try {
    yield transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email successfully sent" });
}
catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in sending email" });
} }));
module.exports = router;
