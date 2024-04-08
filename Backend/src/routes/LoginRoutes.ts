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

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ "contactInfo.email": email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const token = crypto.randomBytes(20).toString('hex'); // Generate a token
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  const resetUrl = `http://<your_frontend_reset_password_page>/?token=${token}`;
  const message = `You are receiving this email because you (or someone else) have requested the reset of the password for your account. Please click on the following link, or paste this into your browser to complete the process: ${resetUrl}`;

  try {
    await sendMail(user.contactInfo.email, message);
    res.status(200).json({ message: "Email sent" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Email send failed" });
  }
});


// ===========================================================================//
// Route to handle password reset requests
router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).json({ message: "Password reset token is invalid or has expired." });
  }

  // Hash the new password
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedNewPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.status(200).json({ message: "Password has been updated." });
});

module.exports = router;
