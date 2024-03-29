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
const express = require("express");
const router = express.Router();
const quoteModel_js_1 = __importDefault(require("../models/quoteModel.js"));
const mongoose_1 = __importDefault(require("mongoose"));
const { sendMail } = require('./emailRoutes');
//Route to create a new quote
router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let quoteData = req.body;
    quoteData.quoteDate = new Date();
    try {
        const newQuote = new quoteModel_js_1.default(quoteData);
        yield newQuote.save();
        res
            .status(201)
            .json({ message: "Quote creates successfully", quote: newQuote });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
//Route to get all quotes
router.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quotes = yield quoteModel_js_1.default.find().sort({ quoteDate: -1 });
        res.status(200).json(quotes);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
//Route to get all quotes with search/status filter
router.get("/allWithFiler", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, status } = req.query;
    let queryConditions = {};
    if (search) {
        queryConditions["$or"] = [
            { clientName: new RegExp(search, "i") },
            { quoteNumber: new RegExp(search, "i") },
        ];
        if (status) {
            queryConditions["status"] = status;
        }
        try {
            const quotes = yield quoteModel_js_1.default.find(queryConditions);
            res.status(200).json(quotes);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}));
// Route to get a specific quote by ID
router.get("/:quoteId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { quoteId } = req.params;
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(quoteId)) {
            return res.status(400).json({ message: "Invalid quote ID" });
        }
        const quote = yield quoteModel_js_1.default.findById(quoteId);
        if (!quote) {
            return res.status(404).json({ message: "Quote not found" });
        }
        res.status(200).json(quote);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
console.log({ sendMailFunction: sendMail });
// Route to update a specific quote by ID
router.put("/:quoteId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const { quoteId } = req.params;
    const updatedQuoteData = req.body;
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(quoteId)) {
            return res.status(400).json({ message: "Invalid quote ID" });
        }
        // Retrieve the existing quote
        const originalQuote = yield quoteModel_js_1.default.findById(quoteId);
        console.log('originalQuote:', originalQuote);
        if (!originalQuote) {
            return res.status(404).json({ message: "Quote not found" });
        }
        // Update the quote
        const updatedQuote = yield quoteModel_js_1.default.findByIdAndUpdate(quoteId, updatedQuoteData, { new: true });
        console.log('updatedQuote:', updatedQuote);
        if (!updatedQuote) {
            return res.status(404).json({ message: "Quote not found" });
        }
        console.log(sendMail);
        // Generate email content based on the changes
        let emailMessage = `Hey, your quote has been updated. Here is what changed:\n`;
        // Example: Check if the status changed
        if (((_b = (_a = originalQuote.quoteStatus) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '') !== ((_d = (_c = updatedQuote.quoteStatus) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : '')) {
            emailMessage += `Status changed from ${originalQuote.quoteStatus} to ${updatedQuote.quoteStatus}.\n`;
        }
        // Add more fields as needed
        // Send email notification
        // Assuming the contact person's email is stored in updatedQuote.contactPerson.email
        if (updatedQuote.contactPerson && updatedQuote.contactPerson.email) {
            const emailSent = yield sendMail(updatedQuote.contactPerson.email, emailMessage);
            if (!emailSent) {
                console.log("Email notification send failed");
            }
        }
        res.status(200).json({ message: "Quote updated successfully", quote: updatedQuote });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Route to delete a specific quote by ID
router.delete("/:quoteId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { quoteId } = req.params;
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(quoteId)) {
            return res.status(400).json({ message: "Invalid quote ID" });
        }
        const deletedQuote = yield quoteModel_js_1.default.findByIdAndRemove(quoteId);
        if (!deletedQuote) {
            return res.status(404).json({ message: "Quote not found" });
        }
        res
            .status(200)
            .json({ message: "Quote deleted successfully", quote: deletedQuote });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
module.exports = router;
