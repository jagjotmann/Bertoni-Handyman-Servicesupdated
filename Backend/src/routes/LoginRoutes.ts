import axios from "axios";
import bcrypt from "bcrypt";
import express from "express";
import User from "../models/userModel";
const adminRateLimit = require("../../dist/middlewares/adminRateLimit.js");
const jwt = require("jsonwebtoken");

// Function to create Tokens
const createToken = (_id: any) => {
  return jwt.sign({ _id }, process.env.SECRET, {
    expiresIn: "30min",
  });
};

// Initialize an express router to handle login-related routes
const router = express.Router();

// Route to handle user login
router.post("/", adminRateLimit, async (req, res) => {
  const { email, password, recaptchaToken } = req.body;

  // First, verify the reCAPTCHA token
  try {
    const recaptchaResponse = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      {},
      {
        params: {
          secret: process.env.reCAPTCHA_SECRET_KEY, // Use your secret key here
          response: recaptchaToken,
        },
      }
    );

    if (!recaptchaResponse.data.success) {
      return res.status(403).json({ message: "reCAPTCHA verification failed" });
    }

    try {
      // Find a user by their email
      const user = await User.findOne({ "contactInfo.email": email });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Check for lockout
      const now = new Date();
      // @ts-ignore
      if (user.lockUntil && user.lockUntil > now) {
        return res.status(429).json({
          message: "Too many failed login attempts. Please try again later.",
        });
      }

      // Check if the provided password matches the user's password
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        const updates = { $inc: { loginAttempts: 1 } };
        // @ts-ignore
        if (user.loginAttempts + 1 >= 10 && !user.lockUntil) {
          // Assuming 10 failed attempts threshold
          // @ts-ignore
          updates.$set = {
            lockUntil: new Date(now.getTime() + 15 * 60 * 1000),
          }; // Lock account for 15 minutes
        }
        await User.updateOne({ "contactInfo.email": email }, updates);

        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Reset loginAttempts and lockUntil on successful login
      await User.updateOne(
        { "contactInfo.email": email },
        { $set: { loginAttempts: 0, lockUntil: null } }
      );

      // Create a token
      const token = createToken(user._id);

      // Return success response if login is successful
      res.status(200).json({ message: "Login successful", token }); // Include the token in the response
    } catch (error) {
      // Handle any server errors
      const errorMessage = (error as Error).message; // Type assertion for better error handling,
      res.status(500).json({ error: errorMessage });
    }
  } catch (error) {
    const errorMessage = (error as Error).message; // Type assertion for better error handling,
    res.status(500).json({ error: errorMessage });
  }
});
// ===========================================================================//

// Route to handle password change requests
router.post("/changePassword", adminRateLimit, async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ "contactInfo.email": email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify if the old password is correct
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }

    // Hash the new password before storing it
    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
    user.password = hashedNewPassword;

    // Save the user's new password
    await user.save();
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error: any) {
    // Handle any server errors
    const errorMsg = (error as Error).message; // Type assertion for better error handling
    res.status(500).json({ error: errorMsg });
  }
});

module.exports = router;
