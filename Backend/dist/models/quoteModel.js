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
const QuoteSchema = new mongoose_1.Schema({
    quoteDate: {
        type: Date,
        required: true,
    },
    project: {
        name: {
            type: String,
        },
        address: {
            streetAddress: {
                type: String,
            },
            streetAddress2: String,
            city: {
                type: String,
            },
            state: {
                type: String,
            },
            zipCode: {
                type: String,
            },
        },
        description: String,
    },
    images: {
        type: [String],
        required: false,
    },
    quoteStatus: {
        type: String,
        required: true,
        enum: ["Pending", "Accepted", "Declined", "Completed"],
        default: "Pending",
    },
    items: [
        {
            name: {
                type: String,
            },
            description: String,
            quantity: {
                type: Number,
                min: 1,
            },
            unitPrice: {
                type: Number,
                min: 0,
            },
            total: {
                type: Number,
                min: 0,
            },
        },
    ],
    labor: [
        {
            name: {
                type: String,
            },
            description: String,
            numHours: {
                type: Number,
                min: 0,
            },
            hourlyRate: {
                type: Number,
                min: 0,
            },
            total: {
                type: Number,
                min: 0,
            },
        },
    ],
    subtotal: {
        type: Number,
        default: 0,
    },
    tax: {
        type: Number,
        default: 0,
    },
    totalCost: {
        type: Number,
        default: 0,
    },
    notes: String,
    preferredEndDate: Date,
    contactPerson: {
        name: {
            type: String,
        },
        companyName: String,
        email: String,
        phone: String,
    },
    scheduled: {
        type: Boolean,
    },
    htmlContent: {
        type: String,
    },
});
const QuoteModel = mongoose_1.default.model("Quote", QuoteSchema);
exports.default = QuoteModel;
