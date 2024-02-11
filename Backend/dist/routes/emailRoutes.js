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
const express_1 = __importDefault(require("express"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = express_1.default.Router();
// Define the sendMail function to accept dynamic parameters
function sendMail(userEmail, message) {
    return __awaiter(this, void 0, void 0, function* () {
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: 'webwizard122@gmail.com',
                pass: 'webwizard@2020', // Note: Storing passwords in code is highly insecure. Use environment variables.
            }
        });
        const mailOptions = {
            from: 'idealtechguru1@gmail.com',
            to: userEmail, // Use the dynamically provided email address
            subject: 'Welcome to NodeJS App',
            text: message, // Use the dynamically provided message
            // Consider adding HTML and attachments here if needed
        };
        try {
            yield transporter.sendMail(mailOptions);
            console.log('Email sent successfully');
            return true;
        }
        catch (error) {
            console.error('Email send failed with error:', error);
            return false;
        }
    });
}
// Replace the existing POST route logic with a call to sendMail
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { message, userEmail } = req.body;
    if (!userEmail || !message) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    const emailSent = yield sendMail(userEmail, message);
    if (emailSent) {
        res.status(200).json({ message: "Email successfully sent" });
    }
    else {
        res.status(500).json({ message: "Error in sending email" });
    }
}));
exports.default = router;
