const express = require("express");
const router = express.Router();
import Quote from "../models/quoteModel.js";
import { Request, Response } from "express";
import mongoose, { FilterQuery } from "mongoose";
const { sendMail } = require("./emailRoutes");

//Route to create a new quote
router.post("/create", async (req: Request, res: Response) => {
  let quoteData = req.body;
  quoteData.quoteDate = new Date();
  try {
    const newQuote = new Quote(quoteData);
    await newQuote.save();
    res
      .status(201)
      .json({ message: "Quote creates successfully", quote: newQuote });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

//Route to get all quotes
router.get("/all", async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 0;
  const limit = parseInt(req.query.limit as string) || 0;
  const skip = (page - 1) * limit;

  try {
    let query = Quote.find().sort({ quoteDate: -1 });
    let quotes;
    let total = await Quote.countDocuments();

    if (page > 0 && limit > 0) {
      quotes = await query.skip(skip).limit(limit);
      res
        .status(200)
        .json({
          quotes,
          total,
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          limit,
        });
    } else {
      quotes = await query;
      res.status(200).json(quotes);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

//Route to get all quotes with search/status filter
router.get("/allWithFilter", async (req: Request, res: Response) => {
  const { search, status } = req.query;
  let queryConditions: FilterQuery<typeof Quote> = {};
  if (search) {
    queryConditions["$or"] = [
      { clientName: new RegExp(search as string, "i") },
      { quoteNumber: new RegExp(search as string, "i") },
    ];
    if (status) {
      queryConditions["status"] = status;
    }
    try {
      const quotes = await Quote.find(queryConditions);
      res.status(200).json(quotes);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
});

// Route to get a specific quote by ID
router.get("/:quoteId", async (req: Request, res: Response) => {
  const { quoteId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(quoteId)) {
      return res.status(400).json({ message: "Invalid quote ID" });
    }

    const quote = await Quote.findById(quoteId);
    if (!quote) {
      return res.status(404).json({ message: "Quote not found" });
    }
    res.status(200).json(quote);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

console.log({ sendMailFunction: sendMail });

// Route to update a specific quote by ID
router.put("/:quoteId", async (req: Request, res: Response) => {
  const { quoteId } = req.params;
  const updatedQuoteData = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(quoteId)) {
      return res.status(400).json({ message: "Invalid quote ID" });
    }

    // Retrieve the existing quote
    const originalQuote = await Quote.findById(quoteId);
    console.log("originalQuote:", originalQuote);

    if (!originalQuote) {
      return res.status(404).json({ message: "Quote not found" });
    }

    // Update the quote
    const updatedQuote = await Quote.findByIdAndUpdate(
      quoteId,
      updatedQuoteData,
      { new: true }
    );
    console.log("updatedQuote:", updatedQuote);

    if (!updatedQuote) {
      return res.status(404).json({ message: "Quote not found" });
    }

    console.log(sendMail);

    // Generate email content based on the changes
    let emailMessage = `Hey, your quote has been updated. Here is what changed:\n`;
    // Example: Check if the status changed
    if (
      (originalQuote.status?.toString() ?? "") !==
      (updatedQuote.status?.toString() ?? "")
    ) {
      emailMessage += `Status changed from ${originalQuote.status} to ${updatedQuote.status}.\n`;
    }
    // Add more fields as needed

    // Send email notification
    // Assuming the contact person's email is stored in updatedQuote.contactPerson.email
    if (updatedQuote.contactPerson && updatedQuote.contactPerson.email) {
      const emailSent = await sendMail(
        updatedQuote.contactPerson.email,
        emailMessage
      );
      if (!emailSent) {
        console.log("Email notification send failed");
      }
    }

    res
      .status(200)
      .json({ message: "Quote updated successfully", quote: updatedQuote });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Route to delete a specific quote by ID
router.delete("/:quoteId", async (req: Request, res: Response) => {
  const { quoteId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(quoteId)) {
      return res.status(400).json({ message: "Invalid quote ID" });
    }

    const deletedQuote = await Quote.findByIdAndRemove(quoteId);
    if (!deletedQuote) {
      return res.status(404).json({ message: "Quote not found" });
    }
    res
      .status(200)
      .json({ message: "Quote deleted successfully", quote: deletedQuote });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
