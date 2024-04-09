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
exports.sendMail = void 0;
const express_1 = __importDefault(require("express"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const userModel_1 = __importDefault(require("../models/userModel"));
const dotenv_1 = __importDefault(require("dotenv"));
const crypto_1 = __importDefault(require("crypto"));
const adminRateLimit = require("../../dist/middlewares/adminRateLimit.js");
dotenv_1.default.config();
const router = express_1.default.Router();
// Define the sendMail function to accept dynamic parameters including HTML content
function sendMail(userEmail, subject, message, html) {
    return __awaiter(this, void 0, void 0, function* () {
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        const mailOptions = {
            from: process.env.FROM_EMAIL || "no-reply@example.com",
            to: userEmail,
            subject: subject,
            text: message, // Plain text message > use the dynamically provided message 
            html: html, // Html content version of message
        };
        try {
            yield transporter.sendMail(mailOptions);
            console.log("Email sent successfully");
            return true;
        }
        catch (error) {
            console.error("Email send failed with error:", error);
            return false;
        }
    });
}
exports.sendMail = sendMail;
module.exports.sendMail = sendMail;
// Replace the existing POST route logic with a call to sendMail
router.post("/", adminRateLimit, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { message, userEmail } = req.body;
    if (!userEmail || !message) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    // Assuming 'message' is the plain text content and you're not using HTML content here
    const emailSent = yield sendMail(userEmail, "Your Email Subject Here", message, "");
    if (emailSent) {
        res.status(200).json({ message: "Email successfully sent" });
    }
    else {
        res.status(500).json({ message: "Error in sending email" });
    }
}));
////// ==================================================================== ////////
//========== Specific Routes for Password Reset Emails  =========/////
// Forgot Password Email Route
router.post('/forgot-password', adminRateLimit, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userEmail } = req.body;
    // Generate a secure reset token
    const resetToken = crypto_1.default.randomBytes(20).toString('hex');
    // Optionally, you might want to hash this token before storing it in the database
    // const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
    // Find the user and set the reset token and expiration on their account
    const user = yield userModel_1.default.findOne({ "contactInfo.email": userEmail });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    // Set token and expiration - ensure these fields exist on your User model
    user.resetPasswordToken = resetToken; // Or use resetTokenHash if you chose to hash the token
    user.resetPasswordExpires = new Date(Date.now() + 300); // Expires 5 minutes from now
    // user.resetPasswordExpires = Date.now() + 300; // Expires 5 minutes from now
    yield user.save();
    // Construct the password reset URL
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    // Email content
    const htmlContent = `<p>You requested a password reset. Please follow this <a href="${resetUrl}">link</a> to reset your password.</p>`;
    // Send the email
    const emailSent = yield sendMail(userEmail, "Password Reset Request", "", htmlContent);
    if (emailSent) {
        res.status(200).json({ message: "Password reset email sent." });
    }
    else {
        res.status(500).json({ message: "Failed to send password reset email." });
    }
}));
//  Password Reset Confirmation Email Route
router.post('/reset-confirmation', adminRateLimit, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userEmail } = req.body;
    const htmlContent = `<p>Your password has been successfully reset. If you did not perform this action, please contact our support team immediately.</p>`;
    const emailSent = yield sendMail(userEmail, "Password Reset Confirmation", "", htmlContent);
    if (emailSent) {
        res.status(200).json({ message: "Password reset confirmation email sent." });
    }
    else {
        res.status(500).json({ message: "Failed to send confirmation email." });
    }
}));
exports.default = router;
