// loginRoutes.ts
import express from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";
const jwt = require("jsonwebtoken");

// Function to create Tokens
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const createToken = (_id: any) => {
  return jwt.sign({ _id }, process.env.SECRET, {
    expiresIn: "1h",
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

    // Check if the provided password matches the user's password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

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
