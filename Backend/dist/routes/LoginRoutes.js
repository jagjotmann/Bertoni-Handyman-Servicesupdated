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
const axios_1 = __importDefault(require("axios"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_1 = __importDefault(require("express"));
const userModel_1 = __importDefault(require("../models/userModel"));
const crypto_1 = __importDefault(require("crypto"));
const emailRoutes_1 = require("./emailRoutes");
const adminRateLimit = require("../../dist/middlewares/adminRateLimit.js");
const jwt = require("jsonwebtoken");
// Function to create Tokens
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, {
        expiresIn: "30min",
    });
};
// Initialize an express router to handle login-related routes
const router = express_1.default.Router();
// Route to handle user login
router.post("/", adminRateLimit, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, recaptchaToken } = req.body;
    // First, verify the reCAPTCHA token
    try {
        const recaptchaResponse = yield axios_1.default.post(`https://www.google.com/recaptcha/api/siteverify`, {}, {
            params: {
                secret: process.env.reCAPTCHA_SECRET_KEY, // Use your secret key here
                response: recaptchaToken,
            },
        });
        if (!recaptchaResponse.data.success) {
            return res.status(403).json({ message: "reCAPTCHA verification failed" });
        }
        try {
            // Find a user by their email
            const user = yield userModel_1.default.findOne({ "contactInfo.email": email });
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
            const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
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
                yield userModel_1.default.updateOne({ "contactInfo.email": email }, updates);
                return res.status(401).json({ message: "Invalid credentials" });
            }
            // Reset loginAttempts and lockUntil on successful login
            yield userModel_1.default.updateOne({ "contactInfo.email": email }, { $set: { loginAttempts: 0, lockUntil: null } });
            // Create a token
            const token = createToken(user._id);
            // Return success response if login is successful
            res.status(200).json({ message: "Login successful", token }); // Include the token in the response
        }
        catch (error) {
            // Handle any server errors
            const errorMessage = error.message; // Type assertion for better error handling,
            res.status(500).json({ error: errorMessage });
        }
    }
    catch (error) {
        const errorMessage = error.message; // Type assertion for better error handling,
        res.status(500).json({ error: errorMessage });
    }
}));
// ===========================================================================//
// Route to handle password change requests
router.post('/forgot-password', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield userModel_1.default.findOne({ "contactInfo.email": email });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const token = crypto_1.default.randomBytes(20).toString('hex'); // Generate a token
    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + 300); // Expires 5 minutes from now
    yield user.save();
    const resetUrl = `http://<your_frontend_reset_password_page>/?token=${token}`;
    const message = `You are receiving this email because you (or someone else) have requested the reset of the password for your account. Please click on the following link, or paste this into your browser to complete the process: ${resetUrl}`;
    try {
        yield (0, emailRoutes_1.sendMail)(user.contactInfo.email, "Your Subject Here", message, "");
        res.status(200).json({ message: "Email sent" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Email send failed" });
    }
}));
// ===========================================================================//
// Route to handle password reset requests
router.post('/reset-password', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, newPassword } = req.body;
    const user = yield userModel_1.default.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
    });
    if (!user) {
        return res.status(400).json({ message: "Password reset token is invalid or has expired." });
    }
    // validation for the new password:
    if (newPassword.length < 8 || !newPassword.match(/[\d!@#$%^&*]/)) {
        return res.status(400).json({ message: "Password does not meet complexity requirements." });
    }
    // Hash the new password
    const hashedNewPassword = yield bcrypt_1.default.hash(newPassword, 10);
    user.password = hashedNewPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    yield user.save();
    // Send confirmation email
    const htmlContent = `<p>Your password has been successfully reset. If you did not perform this action, please contact our support team immediately.</p>`;
    yield (0, emailRoutes_1.sendMail)(user.contactInfo.email, "Password Reset Successful", "", htmlContent);
    res.status(200).json({ message: "Password has been updated." });
}));
module.exports = router;
