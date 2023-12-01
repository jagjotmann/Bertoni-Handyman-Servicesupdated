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
// loginRoutes.ts
const express_1 = __importDefault(require("express"));
const userModel_js_1 = __importDefault(require("../models/userModel.js"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// Initialize an express router to handle login-related routes
const router = express_1.default.Router();
// Route to handle user login
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Find a user by their email
        const user = yield userModel_js_1.default.findOne({ "contactInfo.email": email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // Check if the provided password matches the user's password
        const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // Return success response if login is successful
        res.status(200).json({ message: "Login successful", user });
    }
    catch (error) {
        // Handle any server errors
        const errorMessage = error.message; // Type assertion for better error handling
        res.status(500).json({ error: errorMessage });
    }
}));
// Route to handle password change requests
router.post("/changePassword", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, oldPassword, newPassword } = req.body;
    try {
        // Find the user by email
        const user = yield userModel_js_1.default.findOne({ "contactInfo.email": email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Verify if the old password is correct
        const isMatch = yield bcrypt_1.default.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Old password is incorrect" });
        }
        // Hash the new password before storing it
        const saltRounds = 10;
        const hashedNewPassword = yield bcrypt_1.default.hash(newPassword, saltRounds);
        user.password = hashedNewPassword;
        // Save the user's new password
        yield user.save();
        res.status(200).json({ message: "Password changed successfully" });
    }
    catch (error) {
        // Handle any server errors
        const errorMsg = error.message; // Type assertion for better error handling
        res.status(500).json({ error: errorMsg });
    }
}));
module.exports = router;
