import express from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import axios from "axios";

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
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find a user by their email
    const user = await User.findOne({ "contactInfo.email": email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check for lockout
    const now = new Date();
    if (user.lockUntil && user.lockUntil > now) {
      return res.status(429).json({
        message: "Too many failed login attempts. Please try again later.",
      });
    }

    // Check if the provided password matches the user's password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      let updates = { $inc: { loginAttempts: 1 } };
      if (user.loginAttempts + 1 >= 10 && !user.lockUntil) {
        // Assuming 10 failed attempts threshold
        updates.$set = { lockUntil: new Date(now.getTime() + 15 * 60 * 1000) }; // Lock account for 15 minutes
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
});
// ===========================================================================//

// Route to handle password change requests
router.post("/changePassword", async (req, res) => {
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
