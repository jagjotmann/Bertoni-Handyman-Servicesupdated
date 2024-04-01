import express, { Request, Response } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
const adminRateLimit = require("../../dist/middlewares/adminRateLimit.js");

dotenv.config();

const router = express.Router();

// Define the sendMail function to accept dynamic parameters
async function sendMail(userEmail: string, message: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "webwizard122@gmail.com",
      pass: "webwizard@2020", //Note: Storing passwords in code is highly insecure. Use environment variables.
    },
  });

  const mailOptions = {
    from: "idealtechguru1@gmail.com",
    to: userEmail, // Use the dynamically provided email address
    subject: "Welcome to NodeJS App",
    text: message, // Use the dynamically provided message
    // Consider adding HTML and attachments here if needed
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    return true;
  } catch (error) {
    console.error("Email send failed with error:", error);
    return false;
  }
}

module.exports.sendMail = sendMail;

// Replace the existing POST route logic with a call to sendMail
router.post("/", adminRateLimit, async (req: Request, res: Response) => {
  const { message, userEmail } = req.body;

  if (!userEmail || !message) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const emailSent = await sendMail(userEmail, message);
  if (emailSent) {
    res.status(200).json({ message: "Email successfully sent" });
  } else {
    res.status(500).json({ message: "Error in sending email" });
  }
});

// export default router;
module.exports = router;
