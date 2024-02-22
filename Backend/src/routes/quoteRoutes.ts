const express = require("express");
const router = express.Router();
import Quote from "../models/quoteModel.js";
import { Request, Response } from "express";
import mongoose, { FilterQuery } from "mongoose";

//Route to create a new quote
router.post("/create", async (req: Request, res: Response) => {
  const quoteData = req.body;
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
  try {
    const quotes = await Quote.find().sort({ quoteDate: -1 });
    res.status(200).json(quotes);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

//Route to get all quotes with search/status filter
router.get("/allWithFiler", async (req: Request, res: Response) => {
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

// Route to update a specific quote by ID
router.put("/:quoteId", async (req: Request, res: Response) => {
  const { quoteId } = req.params;
  const updatedQuoteData = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(quoteId)) {
      return res.status(400).json({ message: "Invalid quote ID" });
    }

    const updatedQuote = await Quote.findByIdAndUpdate(
      quoteId,
      updatedQuoteData,
      { new: true }
    );
    if (!updatedQuote) {
      return res.status(404).json({ message: "Quote not found" });
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
