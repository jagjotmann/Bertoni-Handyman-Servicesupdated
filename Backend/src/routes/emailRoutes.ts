const express = require("express");
import { Request, Response } from "express";
import nodemailer from "nodemailer";
require("dotenv").config();

const router = express.Router();
let transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/", async (req: Request, res: Response) => {
  const { message, userEmail } = req.body;

  if (!userEmail || !message) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Update on Your Request",
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email successfully sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in sending email" });
  }
});

module.exports = router;
