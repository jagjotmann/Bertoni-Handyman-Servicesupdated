"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        minlength: 4,
        maxlength: 25,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    // Keeping track of Login Attempts
    loginAttempts: {
        type: Number,
        required: true,
        default: 0,
    },
    lockUntil: {
        type: Date,
    },
    // personal Info
    name: {
        firstName: {
            type: String,
            maxlength: 100,
        },
        lastName: {
            type: String,
            maxlength: 100,
        },
    },
    // for password reset
    resetPasswordToken: {
        type: String,
        index: true,
        default: null, // Explicitly allows null
    },
    resetPasswordExpires: {
        type: Date,
        default: null, // Explicitly allows null
    },
    contactInfo: {
        phoneNumber: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            index: true, // Adds an index on the email field
        },
    },
    properties: [
        {
            address: {
                streetAddress: String,
                city: String,
                state: String,
                zipCode: String,
            },
            completedJobs: [String],
        },
    ],
    isAdmin: Boolean,
});
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
