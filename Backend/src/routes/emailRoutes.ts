import express, { Request, Response } from "express";
import nodemailer from "nodemailer";
import User from "../models/userModel";
import dotenv from "dotenv";
import crypto from 'crypto';
import path from "path";
const adminRateLimit = require("../../dist/middlewares/adminRateLimit.js");

dotenv.config();

const router = express.Router();

// Define the sendMail function to accept dynamic parameters including HTML content
async function sendMail(userEmail: string, subject: string, message: string, html: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      // user: process.env.EMAIL_USERNAME, 
      user: "webwizard122@gmail.com",  
      pass: "tnvk cpxs zewp tbvv"
      // pass: process.env.EMAIL_PASSWORD, 
    },
  });

  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: userEmail,
    subject: subject,
    text: message, // Plain text message > use the dynamically provided message 
    html: html,  // Html content version of message
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

// module.exports = { sendMail }
// module.exports.sendMail = sendMail;

// Replace the existing POST route logic with a call to sendMail
router.post("/", adminRateLimit, async (req: Request, res: Response) => {
  const { message, userEmail } = req.body;

  if (!userEmail || !message) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Assuming 'message' is the plain text content and you're not using HTML content here
  const emailSent = await sendMail(userEmail, "Your Email Subject Here", message, "");  
  if (emailSent) {
    res.status(200).json({ message: "Email successfully sent" });
  } else {
    res.status(500).json({ message: "Error in sending email" });
  }
});

////// ==================================================================== ////////
//========== Specific Routes for Password Reset Emails  =========/////

// Forgot Password Email Route
router.post('/forgot-password', adminRateLimit, async (req: Request, res: Response) => {
  const { userEmail } = req.body;

  // Generate a secure reset token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Optionally, you might want to hash this token before storing it in the database
  // const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

  // Find the user and set the reset token and expiration on their account
  const user = await User.findOne({ "contactInfo.email": userEmail });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Set token and expiration - ensure these fields exist on your User model
  user.resetPasswordToken = resetToken; // Or use resetTokenHash if you chose to hash the token
  user.resetPasswordExpires = new Date(Date.now() + 300); // Expires 5 minutes from now

  // user.resetPasswordExpires = Date.now() + 300; // Expires 5 minutes from now

  await user.save();

  // Construct the password reset URL
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  // Email content
  const htmlContent = `<p>You requested a password reset. Please follow this <a href="${resetUrl}">link</a> to reset your password.</p>`;

  // Send the email
  const emailSent = await sendMail(userEmail, "Password Reset Request", "", htmlContent);
  if (emailSent) {
    res.status(200).json({ message: "Password reset email sent." });
  } else {
    res.status(500).json({ message: "Failed to send password reset email." });
  }
});


//  Password Reset Confirmation Email Route
router.post('/reset-confirmation', adminRateLimit, async (req: Request, res: Response) => {
  const { userEmail } = req.body;

  const htmlContent = `<p>Your password has been successfully reset. If you did not perform this action, please contact our support team immediately.</p>`;

  const emailSent = await sendMail(userEmail, "Password Reset Confirmation", "", htmlContent);
  if (emailSent) {
    res.status(200).json({ message: "Password reset confirmation email sent." });
  } else {
    res.status(500).json({ message: "Failed to send confirmation email." });
  }
});

module.exports = { router, sendMail }
// module.exports = router;

